import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/global.css"
import 'element-ui/lib/theme-chalk/index.css';
import '@/plugins/element'
import "@/assets/fonts/iconfont.css"
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
Vue.config.productionTip = false
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1",
  Vue.prototype.$http = axios
Vue.component('tree-table', TreeTable)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')