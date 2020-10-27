import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

var vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$toast = function (msg, type) {
  Vue.prototype.$message({
    message: msg,
    type: type || 'warning'
  })
}
export default vue;