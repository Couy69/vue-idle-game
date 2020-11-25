<template>
  <div class="extras">
    <!-- <a class="github" target="_blank" @click="navToGithub" title="源码" src="https://github.com/Couy69/vue-idle-game"></a> -->
    <div class="update-info github" @click="drawerOpen" type="primary">
      <img src="../../assets/icons/menu/extras.png" alt="">
      <span>更新日志</span>
      <i class="new" v-if="!checkedUpdateInfo"></i>
    </div>
    <transition name="fade">
      <div class="drawer-update" v-if="showExtrasInfo">
        <i class="close" @click="closePanel"></i>
        <div class="scroll">
          <div class="info" v-for="(item,index) in update" :key="index">
            <h1> {{item.title}}</h1>
            <span v-if="item.desc"> {{item.desc}}</span>
            <h2>功能调整</h2>
            <p v-for="(v) in item.adjust" :key="v.id">{{v}}</p>
            <h2 v-if="item.majorization">优化</h2>
            <p v-for="(v) in item.majorization" :key="v.id">{{v}}</p>
            <h2 v-if="item.bug">bug修复</h2>
            <p v-for="(v) in item.bug" :key="v.id">{{v}}</p>
          </div>
        </div>

        <div class="footer">
          <span>创作不易，给个star？</span>
          <a class="github" target="_blank" @click="navToGithub" title="源码" src="https://github.com/Couy69/vue-idle-game">
          </a>
        </div>
      </div>
    </transition>

  </div>
</template>
<script>
export default {
  name: "extras",
  data() {
    return {
      checkedUpdateInfo: false,
      showExtrasInfo: false,
      update: [{
        title: '2020-11-25 (1.2.0)',
        desc: '- 时隔半个多月的更新,这次修改的内容比较多',
        adjust: [
          '-  添加导入导出存档功能：背包装备过多可能导致存档数据比较长，所以建议导出前处理一下背包装备 ',
          '-  添加自动出售：背包栏可以开启自动出售，自动出售会卖出低品质的装备（低于神器）',
          '-  添加装备强化与词条重铸：需要金币',
          '-  添加独特级别的防具与饰品',
        ],
        majorization: [
          '- 加强副本强度（一级副本基本没有加强，100级强度大概增加了五倍，这个强度变化是线性的）',
          '- 加了一些动画',
          '- 装备数值调整',
          '- 独特装备掉率修改为4%,商店有较小概率刷新出独特装备',
          '- 售出装备获得金币调高了三倍，增加了高级副本金币获取'
        ],
        bug: [
          '- 修复自动出售可能将背包其余装备卖出的bug',
        ]
      }, {
        title: '2020-11-09 (1.1.1)',
        adjust: [
          '-  适配移动端',
        ],
      },
      {
        title: '2020-11-06 (1.1.0)',
        desc: '',
        adjust: [
          '- （功能）添加装备锁定功能',
          '- （功能）装备新增百分比词条',
          '- （功能）添加 60~100 级副本',
          '- （功能）完成副本时可能掉落独特级别的装备（通关后 2.5%掉落率，无尽挑战不会掉落）',
          '- （功能）通关后开启无尽挑战'
        ],
        majorization: [
          '- （优化）调整了商店价格（前期更低，后期更高），现在商店等级最高为 110 级',
          '- （优化）调整并添加了一些新装备',
          '- （优化）上调了 90 与 100 级副本的难度'
        ],
        bug: [
          '- （bug）修复了手动结束副本挑战可能导致副本加速的 bug'
        ]
      },]
    };
  },
  mounted() {
    this.checkedUpdateInfo = localStorage.getItem('checkedUpdateInfo')
  },
  methods: {
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
  }
};


</script>
<style lang="scss" scoped>
.extras {
  position: fixed;
  width: 0.5rem;
  height: 0.55rem;
  display: flex;
  bottom: 0.3rem;
  right: 0.3rem;
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
      font-size: .23rem;
      letter-spacing: 1px;
    }
    span {
      margin: 0.06rem;
      font-size: .13rem;
      letter-spacing: 1px;
    }
    h2 {
      padding-left: 0.2rem;
      line-height: 0.3rem;
      margin: 0.1rem 0;
      font-size: .18rem;
      letter-spacing: 1px;
    }
    p {
      padding-left: 0.25rem;
      line-height: 0.2rem;
      color: #fafafa;
      font-size: .13rem;
      letter-spacing: 1px;
    }
  }
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  background: #111;
  width: 100%;
  height: 0.5rem;
  padding: 0.1rem 0.3rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .github {
    margin-left: 0.1rem;
    background: #fafafa;
    display: block;
    width: 0.32rem;
    height: 0.32rem;
    border-radius: 50%;
    background-image: url(../../assets/icons/github.svg);
    background-size: cover;
  }
}
</style>
