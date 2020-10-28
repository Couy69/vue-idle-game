import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'index',
      component: () => import('./views/index.vue')
    },
    {
      path: '/armor',
      name: 'armor',
      component: () => import('./views/component/armorPanel.vue')
    },
    {
      path: '/acc',
      name: 'acc',
      component: () => import('./views/component/accPanel.vue')
    }
  ]
})


/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}