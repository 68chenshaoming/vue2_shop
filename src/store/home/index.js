import {
    reqGetMenu,
    reqGetUsers,
    reqChangeUserState,
    reqAddUser,
    reqEdUser,
    // reqPutEdUser
    reqDeleteUser
} from "@/api/index"
const state = {
    menulist: [],
    userlist: [],
    user: {},
    changestate: {},
    edlist: {}
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
    }
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
    }

}
const getters = {

}
export default ({
    state,
    mutations,
    actions,
    getters
})