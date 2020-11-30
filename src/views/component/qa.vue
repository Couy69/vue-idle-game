<template>
  <div class="qa">
    <!-- <a class="github" target="_blank" @click="navToGithub" title="源码" src="https://github.com/Couy69/vue-idle-game"></a> -->
    <div class="update-info" @click="drawerOpen" type="primary">
      <img src="../../assets/icons/menu/Q&A.png" alt="">
      <span>Q&A</span>
      <i class="new" v-if="!checkedUpdateInfo"></i>
    </div>
    <transition name="fade">
      <div class="drawer-update" v-if="showExtrasInfo">
        <i class="close" @click="closePanel"></i>
        <h1>Q&A</h1>
        <p>这里是之前玩家提的一些问题</p>
        <p>收到了很多反馈我就不一一放出来了，不过提的建议我都会在更新时将你的名字po出来</p>
        <div class="scroll">
          <div class="info" v-for="(item,index) in update" :key="index">
            <h1>{{item.name}}<span>({{item.created_at}})</span>:</h1>
            <p v-if="item.suggest"> {{item.suggest}}</p>
            <p style="padding-left:0"><img src="../../assets/img/35017881.jpg" alt="">:<span>{{item.standby1}}</span> </p>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>
<script>
import { assist } from '../../assets/js/assist';
export default {
  name: "qa",
  mixins:[assist],
  data() {
    return {
      checkedUpdateInfo: false,
      showExtrasInfo: false,
      // TODO: 
      update: [
        {
        name: '木匠',
        suggest: '越更新越强了',
        created_at: '2020-11-26 19:13:42',
        standby1: '装备越来越强，副本当然也越来越强了，现在的副本强度应该正正好',
      },{
        name: 'QQ',
        suggest: '自动出售设置装备颜色 仓库安排上 好像没有人物等级的概念',
        created_at: '2020-11-26 20:26:15',
        standby1: '自动出售这个可以有，仓库暂时就不加了，人物等级没有这个设定（根据身上装备等级来的，同理商店装备的等级也是如此）',
      },{
        name: '木匠',
        suggest: '无尽模式选择向上和重复的效果是一样的',
        created_at: '2020-11-26 20:36:07',
        standby1: '重复是循环当前层数，向上是挑战成功就继续下一层',
      },{
        name: 'Mrlin',
        suggest: '强化不能继承？',
        created_at: '2020-11-27 10:12:47',
        standby1: '暂时不能，之后应该也不会加这个功能',
      },{
        name: '云玩家',
        suggest: '您好，游戏很好玩，提一个小意见，就是强化的概率能显示出来吗？',
        created_at: '2020-11-27 07:53:55',
        standby1: '可以有,已经加到了强化tips中',
      },{
        name: '卜玉和银',
        suggest: '素盏鸣那个戒指，我的一戴上去只有100滴血',
        created_at: '2020-11-27 10:36:10',
        standby1: '人物初始就是100滴血，说明你身上的装备并没有加血量的装备',
      },{
        name: 'zjw',
        suggest: '已经装备的装备能不能强化呢',
        created_at: '2020-11-27 10:44:04',
        standby1: '脱下来才可以强化哦',
      },{
        name: 'masy',
        suggest: '不能后台吗？发现一后台就自动暂停了。',
        created_at: '2020-11-28 09:18:31',
        standby1: '后台这个是游览器的限制，切换到后台就暂停了当前应用，谷歌游览器用户可以尝试地址栏输入 chrome://flags/,搜索calc选项改成Disabled',
      },{
        name: 'MarkH2',
        suggest: '能加入稀有度的說明嗎?',
        created_at: '2020-11-28 14:34:37',
        standby1: '稀有等级：破旧-普通-神器-史诗-独特，稀有度越高词条越多同时属性越好',
      }]
    };
  },
  mounted() {
    this.checkedUpdateInfo = localStorage.getItem('checkedUpdateInfo')
    this.update = this.update.reverse()
  },
  methods: {
    eastereEgg1(e){
      setTimeout(()=>{
        this.reKeyCode = []
      },3000)
      this.reKeyCode.push(e.keyCode)
      if(JSON.stringify(this.reKeyCode) == JSON.stringify(this.keyCode)){
        var p = this.findComponentUpward(this, 'index')
        if(!p.GMmodel){
          p.GMmodel = true
          this.$store.commit("set_sys_info", {
            msg: `
              你发现了彩蛋，想必你也是个游戏热爱者。
            `,
            type: 'win'
          });
          this.$store.commit("set_sys_info", {
            msg: `
              开启了GM模式，如果你是玩家的话，请不要滥用GM模式哦。
            `,
            type: 'win'
          });  
        }  
      }
    },
    drawerOpen() {
      this.showExtrasInfo = true
      this.checkedUpdateInfo = true
      localStorage.setItem('checkedUpdateInfo', true)
    },
    closePanel() {
      localStorage.setItem('checkedUpdateInfo', true)
      this.showExtrasInfo = false
    },
    navToGithub() {
      window.open('https://github.com/Couy69/vue-idle-game', '_blank');
    },
    async submitSuggest() {
      if(this.disabled){
        return
      }
      try {
        let data = await this.$api.post(
          "v1/Suggest/add",
          {
            name: this.name,
            suggest: this.suggest,
          }
        );
        console.log(data)
        if (data.data.error_code == 20000) {
          this.$store.commit("set_sys_info", {
            msg: `
              你的建议已经提交了哦，十分感谢😘
            `,
            type: 'win'
          });
        } else {
          this.$store.commit("set_sys_info", {
            msg: `
              提交失败：${data.data.msg}
            `,
            type: 'win'
          });
        }
      } catch (error) {
        console.log(error);
      }
      this.disabled = true
      setTimeout(()=>{
        this.disabled = false
      },1000)
    }
  }
};


</script>
<style lang="scss" scoped>
.qa {
  position: fixed;
  width: 0.5rem;
  height: 0.55rem;
  display: flex;
  bottom: 0.1rem;
  right: 1.5rem;
  z-index: 1;
  cursor: pointer;
  .update-info {
    margin-right: 0.2rem;
    cursor: pointer;
    width: 0.5rem;
    height: 0.55rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 0.35rem;
      height: 0.35rem;
    }
    span {
      white-space: nowrap;
      font-size: 0.12rem;
    }
    .new {
      display: flex;
      width: 0.3rem;
      height: 0.16rem;
      position: absolute;
      top: 0rem;
      right: 0px;
      transform: translate(50%, -50%);
      background-image: url("../../assets/icons/menu/NEW.png");
      background-size: contain;
      background-repeat: no-repeat;
      animation: tipsMove 1s infinite;
    }
  }
}
@keyframes tipsMove {
  0% {
    transform: translate(50%, -50%);
  }
  25% {
    transform: translate(50%, -70%);
  }
  50% {
    transform: translate(50%, -50%);
  }
  75% {
    transform: translate(50%, -80%);
  }
  100% {
    transform: translate(50%, -50%);
  }
}
.drawer-update {
  position: fixed;
  width: 30%;
  height: 100%;
  background: #111;
  top: 0;
  right: 0;
  padding: 0.2rem;
  z-index: 10;
  .scroll {
    height: calc(100% - 0.5rem);
    overflow-y: auto;
  }
  .close {
    cursor: pointer;
    position: absolute;
    top: 0.13rem;
    right: 0.15rem;
    display: block;
    width: 0.3rem;
    height: 0.3rem;
    background-image: url(../../assets/icons/close.png);
    background-size: cover;
  }
  .info {
    padding: 0.2rem;
    text-align: left;
    h1 {
      margin: 0.06rem 0;
      font-size: 0.23rem;
      letter-spacing: 1px;
    }
    span {
      margin: 0.06rem;
      font-size: 0.13rem;
      letter-spacing: 1px;
    }
    h2 {
      padding-left: 0.2rem;
      line-height: 0.3rem;
      margin: 0.1rem 0;
      font-size: 0.18rem;
      letter-spacing: 1px;
    }
    p {
      margin: .1rem;
      padding-left: 0.25rem;
      line-height: 0.2rem;
      color: #fafafa;
      font-size: 0.14rem;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      img{
        margin-right: .1rem;
        border-radius: 50%;
        width: .25rem;
        height:.25rem
      }
    }
  }
}
</style>
