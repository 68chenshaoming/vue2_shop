<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home   ' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addDialogVisible = true"
            >添加角色</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <!-- 角色列表区 -->
    <el-table :data="roleList" border stripe>
      <!-- 展开列 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row
            :class="['bdbottom', i1 === 0 ? 'bdtop' : 'bdbottom', 'vcenter']"
            v-for="(item1, i1) in scope.row.children"
            :key="item1.id"
          >
            <!-- 渲染一级权限 -->
            <el-col :span="5">
              <el-tag>
                {{ item1.authName }}
              </el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <!-- 渲染二 三级权限 -->
            <el-col :span="19">
              <el-row
                :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                v-for="(item2, i2) in item1.children"
                :key="item2.id"
              >
                <el-col :span="6">
                  <el-tag type="success">{{ item2.authName }}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>

                <el-col :span="18">
                  <el-tag
                    type="warning"
                    v-for="(item3, i3) in item2.children"
                    :key="item3.id"
                    closable
                    @close="removeRightById(scope.row, item3.id)"
                  >
                    {{ item3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 索引列 -->
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="editRoleById(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteRoleById(scope.row.id)"
          >
            删除
          </el-button>
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-setting"
            @click="showSetRightDialog(scope.row)"
          >
            分配权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑对话框 -->
    <el-dialog title="提示" :visible.sync="editDialogVisible" width="50%">
      <el-form :model="editForm" ref="editFormRef" label-width="70px">
        <el-form-item label="角色名称">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加用户 -->
    <el-dialog title="提示" :visible.sync="addDialogVisible" width="50%">
      <el-form :model="editForm" ref="editFormRef" label-width="70px">
        <el-form-item label="角色名称">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @closed="setRightdialogClosed"
    >
      <el-tree
        :data="rightLit"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKets"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // 编辑对话框
      editDialogVisible: false,
      editForm: {},
      addDialogVisible: false,
      // 分配权限
      setRightDialogVisible: false,
      rightLit: [],
      defKets: [],
      roleId: '',
      // 树形控件
      treeProps: {
        label: 'authName',
        children: 'children',
      },
      addForm: {
        roleName: '',
        roleDesc: '',
      },
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    getRoleList() {
      this.$store.dispatch('getRoleList')
    },
    // 根据id删除对应的权限
    async removeRightById(role, rightId) {
      // 弹框提示
      const confirmResult = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除')
      }

      let params = { roleId: role.id, rightId }

      this.$store.dispatch('removeRight', params).then((res) => {
        if (res.meta.status == 200) {
          role.children = res.data
          // this.getRoleList()
        }
      })
    },
    //通过ID获取role
    editRoleById(id) {
      this.editDialogVisible = true
      this.$store.dispatch('editRoleById', id).then((res) => {
        console.log(res)
        this.editForm = res
      })
    },

    //编辑
    async editRole() {
      let { data: res } = await this.$http.put(
        'roles/' + this.editForm.roleId,
        {
          roleName: this.editForm.roleName,
          roleDesc: this.editForm.roleDesc,
        }
      )
      if (res.meta.status == 200) {
        this.editDialogVisible = false
        this.getRoleList()
      }
    },

    //删除
    async deleteRoleById(id) {
      let confirmResult = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      if (confirmResult == 'cancel') {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })
      } else {
        this.$store.dispatch('deleteRole', id).then((res) => {
          if ((res.meta.status = 200)) {
            this.getRoleList()
          }
        })
      }
    },
    //添加
    addRole() {
      this.$store
        .dispatch('addRole', {
          roleName: this.addForm.roleName,
          roleDesc: this.addForm.roleDesc,
        })
        .then((res) => {
          if (res.meta.status == 201) {
            this.getRoleList()
            this.addDialogVisible = false
          }
        })
    },
    //展示分配权限
    showSetRightDialog(role) {
      //获取所有权限的数据
      this.roleId = role.id
      this.$store.dispatch('setRight').then((res) => {
        this.rightLit = res.data
        // console.log(this.rightLit)
      }),
        // 递归获取三级节点id
        this.getLeafKey(role, this.defKets)
      this.setRightDialogVisible = true
    },
    //通过递归的形式,获取角色下所有的三级权限的id
    getLeafKey(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach((item) => {
        this.getLeafKey(item, arr)
      })
    },
    //监听分配权限对话框
    setRightdialogClosed() {
      this.defKets = []
    },
    //点击为角色分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ]
      const idStr = keys.join(',')
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败')
      }
      this.$message.success('分配权限成功')
      this.getRoleList()
      this.setRightDialogVisible = false
    },
  },
  computed: {
    ...mapState({
      roleList: (state) => state.home.rolelist,
    }),
  },
}
</script>

<style scoped lang='less'>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
