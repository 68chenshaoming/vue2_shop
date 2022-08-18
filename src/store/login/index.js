import {
    reqGetLogin
} from "@/api"

const state = {}
const mutations = {}
const actions = {
    async GetLogin({
        commit
    }, user) {
        const result = await reqGetLogin(user)
        if (result.data.meta.status !== 200)
            return this._vm.$message.error('登录失败');
        this._vm.$message.success('登录成功');
        window.sessionStorage.setItem("token", result.data.data.token);

    }

}
const getters = {}

export default ({
    state,
    mutations,
    actions,
    getters
})