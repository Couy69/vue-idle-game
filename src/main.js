import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/base.scss'

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


Vue.prototype.$deepCopy = function(data){
  return JSON.parse(JSON.stringify(data))
}

export default vue;