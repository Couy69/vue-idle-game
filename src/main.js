import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/base.scss'

import {
  getAxiosInstance
} from '@/assets/js/api' // 导入api接口
getAxiosInstance().then(v => {
  Vue.prototype.$api = v
}).catch(e => {
  console.log(e)
});

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Message from './views/uiComponent/message/index'
Vue.prototype.$message = Message

Vue.prototype.$deepCopy = function(data){
  data = JSON.stringify(data).length>1?data:{}
  return JSON.parse(JSON.stringify(data))
}

export default vue;