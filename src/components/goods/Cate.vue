<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home   ' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格 -->
      <tree-table
        class="treeTable"
        :data="catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag
            type="success"
            size="mini"
            v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag type="warning" size="min" v-else>三级</el-tag>
        </template>
        <template slot="opt" slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="getCateListById(scope.row.cat_id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteCate(scope.row.cat_id)"
            >删除</el-button
          >
        </template>
      </tree-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="querInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateClose"
    >
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- options指定数据源 -->
          <el-cascader
            change-on-select
            clearable
            v-model="selectedKeys"
            :options="parentCateList"
            :props="{
              expandTrigger: 'hover',
              value: 'cat_id',
              label: 'cat_name',
              children: 'children',
            }"
            @change="parentCateChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCatePost">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="提示" :visible.sync="editDialogVisible" width="50%">
      <el-form :model="editForm" label-width="70px">
        <el-form-item label="分类名称">
          <el-input v-model="editForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //查询条件
      querInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      //商品分类的数据列表
      catelist: [],
      total: 0,
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isok',
        },
        {
          label: '排序',
          type: 'template',
          template: 'order',
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt',
        },
      ],
      addCateDialogVisible: false,
      addCateForm: {
        //将要添加的分类名称
        cat_name: '',
        // 父级分类的ID
        cat_pid: 0,
        //分类的等级默认添加的是一级分类
        cat_level: 0,
      },
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ],
      },
      // 父级分类的列表
      parentCateList: [],
      //选择父级分类的ID数组
      selectedKeys: [],
      //编辑用户框
      editDialogVisible: false,
      editForm: {},
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    getCateList() {
      this.$store
        .dispatch('getCateList', {
          type: this.querInfo.type,
          pagenum: this.querInfo.pagenum,
          pagesize: this.querInfo.pagesize,
        })
        .then((res) => {
          this.catelist = res.data.result
          this.total = res.data.total
        })
    },
    // async getCateList() {
    //   const { data: res } = await this.$http.get(`categories`, {
    //     params: this.querInfo,
    //   })
    //   console.log(res)
    // },
    //监听pagesize的改变
    handleSizeChange(newSize) {
      this.querInfo.pagesize = newSize
      this.getCateList()
    },
    //监听pagenum改变
    handleCurrentChange(newPage) {
      this.querInfo.pagenum = newPage
      this.getCateList()
    },
    showAddCateDialog() {
      this.getParentCateList()
      this.addCateDialogVisible = true
    },
    //获取前两级数据列表
    async getParentCateList() {
      // this.$store
      //   .dispatch('getParentCateList', { params: { type: 2 } })
      //   .then((res) => (this.parentCateList = res.data))
      const { data: res } = await this.$http.get('categories', {
        params: { type: 2 },
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取失败')
      } else {
        this.parentCateList = res.data
      }
    },
    parentCateChange() {
      if (this.selectedKeys.length > 0) {
        //父级分类的id
        this.addCateForm.cat_pid =
          this.selectedKeys[this.selectedKeys.length - 1]
        this.addCateForm.cat_level = this.selectedKeys.length
        return
      } else {
        this.addCateForm.cat_pid = 0

        this.addCateForm.cat_level = 0
      }
    },
    //添加用户
    async addCatePost() {
      console.log(this.addCateForm)
      const { data: res } = await this.$http.post('categories', {
        cat_pid: this.addCateForm.cat_pid,
        cat_name: this.addCateForm.cat_name,
        cat_level: this.addCateForm.cat_level,
      })
      if (res.meta.status !== 201) {
        return this.$message.error('添加用户失败')
      }

      this.getCateList()
      this.$message.success('添加用户成功')
      this.addCateDialogVisible = false
    },

    addCateClose() {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_level = 0
      this.addCateForm.cat_pid = 0
    },

    //通过id获取编辑
    async getCateListById(id) {
      this.cateId = id
      let { data: res } = await this.$http.get(`categories/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('获取失败')
      } else {
        this.editForm = res.data

        console.log(this.editForm)
      }
      this.editDialogVisible = true
      // this.$store.dispatch('getCateListById', id).then(() => {
      //   this.editForm = this.$store.state.home.catelist
      //   console.log(this.editForm)
      //   this.editDialogVisible = true
      // })
    },
    //编辑提交用户

    async editCate() {
      const { data: res } = await this.$http.put(
        `categories/${this.editForm.cat_id}}`,
        {
          cat_name: this.editForm.cat_name,
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('修改用户失败')
      }
      this.$message.success('修改用户成功')

      this.getCateList()
      this.editDialogVisible = false
      console.log(res)
    },
    //删除用户
    // async deleteCate(id) {
    //   let { data: res } = await this.$http.delete(`categories/${id}`)
    //   if (res.meta.status !== 200) {
    //     return this.$message.error('删除失败')
    //   } else {
    //     this.getCateList()
    //     this.$message.success('删除成功')
    //   }
    // },
    async deleteCate(id) {
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
        let { data: res } = await this.$http.delete(`categories/${id}`)
        if (res.meta.status !== 200) {
          return this.$message.error('删除失败')
        } else {
          this.getCateList()
          this.$message.success('删除成功')
        }
      }
    },
  },
  computed: {},
}
</script>

<style lang="less" scoped>
.treeTable {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
</style>
