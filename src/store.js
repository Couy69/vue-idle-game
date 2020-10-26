import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openTab:[],//所有打开的路由
    activeRouterPath:'/main', //激活状态
    currentCamera:{}, //当前选择的摄像头
    currentGarage:{}, //当前选择的车库
    alarmData:{}, //报警记录
  },
  mutations: {
    // 添加tabs
    add_tabs (state, data) {
      this.state.openTab.push(data);
    },
    // 删除单个tabs
    delete_tabs (state, route) {
      let index = 0;
      for (let option of state.openTab) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      this.state.openTab.splice(index, 1);
    },
    // 删除所有tabs
    delete_all_tabs (state) {
      this.state.openTab=[{route:'/main',name:'首页'}];
    },
    // 重置tabs(重新登录)
    reset_all_tabs (state) {
      this.state.openTab=[];
    },
    // 删除其他tabs
    delete_other_tabs (state,route) {
      var tag
      if(route == '/main'){
        this.state.openTab=[{route:'/main',name:'首页'}]
        return
      }
      for (let option of state.openTab) {
        if (option.route === route) {
          tag = JSON.parse(JSON.stringify(option))
          break;
        }
      }
      this.state.openTab=[{route:'/main',name:'首页'}].concat(tag);
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
      this.state.activeRouterPath = index;
    },
    // 
    set_current_camera(state,data){
      this.state.currentCamera = data;
    },
    set_current_garage(state,data){
      this.state.currentGarage = data;
    },
    set_alarm_data(state,data){
      this.state.alarmData = data;
    }
  },
  actions: {

  }
})
