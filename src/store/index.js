import Vue from 'vue'
import Vuex from "vuex"
//使用插件一次
Vue.use(Vuex);
import login from "@/store/login"
import home from "@/store/home"
//对外暴露一个Store类的一个实例
export default new Vuex.Store({
  //实现Vuex仓库模块式开发仓库数据
  modules: {
    login,
    home
  }
})