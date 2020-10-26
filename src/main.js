import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入nprogress（页面加载进度条）
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入
NProgress.configure({
  easing: 'ease', // 动画方式    
  speed: 500, // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})




var vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();
  next();
});
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

Vue.prototype.$toast = function (msg, type) {
  Vue.prototype.$message({
    message: msg,
    type: type || 'warning'
  })
}
export default vue;