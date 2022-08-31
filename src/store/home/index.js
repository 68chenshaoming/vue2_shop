import {
    reqGetMenu,
    reqGetUsers,
    reqChangeUserState,
    reqAddUser,
    reqEdUser,
    // reqPutEdUser
    reqDeleteUser,
    reqGetRightsList,
    reqGetRoles,
    reqDeleteRight,
    reqRoleById,
    reqDeleteRole,
    reqAddRole,
    reqSetRight,
    reqGetRole,
    reqGetCateList,
    reqGetParentCateList,
    reqPostCate,
    reqGetCateById
} from "@/api/index"
const state = {
    menulist: [],
    userlist: [],
    user: {},
    changestate: {},
    edlist: {},
    rolelist: [],
    catelist: {}
}
const mutations = {
    GETMENULIST(state, menulist) {
        state.menulist = menulist
    },
    GETUSERLIST(state, userlist) {
        state.userlist = userlist
    },
    GETUSER(state, user) {
        state.user = user
    },
    CAHENSTATE(state, changestate) {
        state.changeState = changestate
    },
    EDUSER(state, edlist) {
        state.edlist = edlist
    },
    GETROLES(state, rolelist) {
        state.rolelist = rolelist
    },
    // CATELIST(state, catelist) {
    //     state.catelist = catelist
    // }

}
const actions = {
    async GetMenu({
        commit
    }, ) {
        let result = await reqGetMenu()

        if (result.data.meta.status == 200) {
            commit('GETMENULIST', result.data.data)

        } else {
            return this._vm.$message.error(result.data.meta.msg)
        }
    },
    async GetUsers({
        commit
    }, parmas = {}) {
        let result = await reqGetUsers(parmas)

        if (result.data.meta.status !== 200) {
            return this._vm.$message.error(result.data.meta.msg)
        }
        commit('GETUSERLIST', result.data.data.users)
        commit('GETUSER', result.data.data)

    },
    async changeState({
        commit
    }, {
        uId,
        type
    }) {
        let result = await reqChangeUserState(uId, type)

        if (result.data.meta.status !== 200) {
            return this.state.changeState.mg_state = !this.state.changeState.mg_state
        } else {
            this._vm.$message.success('更新状态成功')
            commit('CAHENSTATE', result.data.data)
        }
    },
    async addUser({
        commit
    }, user) {
        let result = await reqAddUser(user)

        if (result.data.meta.status !== 201) {
            console.log(result.data.meta.status)
            return this._vm.$message.error(result.data.meta.msg)
        } else {

        }
        this._vm.$message.success('添加用户成功')


    },
    async edUser({
        commit
    }, id) {
        let result = await reqEdUser(id)
        if (result.data.meta.status == 200) {
            commit('EDUSER', result.data.data)
        }
    },
    // async putEdUser({},
    //     id,
    //     user = {}
    // ) {
    //     let result = await reqPutEdUser(id, user)
    //     console.log(result)
    //     if (result.data.meta.status == 200) {
    //         console.log(result)
    //         return result.data
    //     }

    // }
    // 删除用户
    async removeUser({}, id) {
        let result = await reqDeleteUser(id)
        if (result.data.meta.status == 200)
            return result.data
        this._vm.$message.error('删除用户失败')
    },

    // 获取列表
    // async getRightsList({}, list) {
    //     let result = await reqGetRightsList(list)
    //     console.log(result)
    // }
    async getRoleList({
        commit
    }) {
        let result = await reqGetRoles()
        // console.log(result.data.data)
        if (result.data.meta.status !== 200) {

            return this.$message.error('获取角色列表失败')
        }
        commit('GETROLES', result.data.data)
    },
    async removeRight({
        commit
    }, {
        roleId,
        rightId
    }) {
        let result = await reqDeleteRight(roleId, rightId)
        if (result.data.meta.status == 200) {

            return result.data
        }
    },
    async editRoleById({}, id) {
        let result = await reqRoleById(id)
        if (result.data.meta.status == 200) {
            return result.data.data
        }
    },
    async deleteRole({}, id) {
        let {
            data: res
        } = await reqDeleteRole(id)
        console.log(res)
        if (res.meta.status = 200) {
            return res
        }
    },
    async addRole({}, role) {
        let {
            data: res
        } = await reqAddRole(role)
        if (res.meta.status == 201) {
            return res
        }
    },
    async setRight({}) {
        let {
            data: res
        } = await reqSetRight()
        if (res.meta.status == 200) {
            return res
        }
    },
    async setRole() {
        let {
            data: res
        } = await reqGetRole()
        if (res.meta.status == 200) {
            return res
        }
    },
    async getCateList({}, params = {}) {
        const {
            data: res
        } = await reqGetCateList(params)
        if (res.meta.status == 200) {
            return res
        }

    },
    // async getParentCateList(params) {
    //     let {
    //         data: res
    //     } = await reqGetParentCateList(params)
    //     if (res.meta.status === 200) {
    //         return res
    //     }
    // }
    // async addCatePost({}, user) {
    //     const {
    //         data: res
    //     } = await reqPostCate(user)
    //     console.log(res)
    // }
    // async getCateListById({
    //     commit
    // }, id) {
    //     let {
    //         data: res
    //     } = await reqGetCateById(id)
    //     if (res.meta.status == 200)
    //         commit('CATELIST', res.data)
    // }

}
const getters = {

}
export default ({
    state,
    mutations,
    actions,
    getters
})