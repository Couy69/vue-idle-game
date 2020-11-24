<template>
  <div class="equiment">
    <div class="equimentPanel" v-if="JSON.stringify(equiment)!='{}'">
      <cTooltip placement="bottom">
        <template v-slot:content>
          <div class="panel-title">- 强化 -</div>
        </template>
        <template v-slot:tip>
          <p class="info">* 花费金币强化装备</p>
          <p class="info">* 强化装备会加强装备的基础属性</p>
          <p class="info">* 强化等级越高成功率越低</p>
          <p class="info">* 强化等级高于5时强化失败可能会降低强化等级</p>
        </template>
      </cTooltip>

      <div class="title">

        <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px '+equiment.quality.color}">
          <img :src="equiment.type.iconSrc" alt="">
        </div>
        <div class='name' :style="{color:equiment.quality.color}">{{equiment.type.name}} {{equiment.enchantlvl?'(+'+equiment.enchantlvl+')':''}}</div>
      </div>
      <div class="entry">
        <div class="old">
          <div v-for="v in equiment.type.entry" :key="v.id">
            <div>{{v.name}} : + {{Math.round(v.value*(1.05**(equiment.enchantlvl)**1.1))}}</div>
          </div>
        </div>
        <div class="arror">➡</div>
        <div class="new">
          <div v-for="v in equiment.type.entry" :key="v.id">
            <div>{{Math.round(v.value*(1.05**(equiment.enchantlvl+1)**1.1))}} <span class="set"> ⬆({{Math.round(v.value*(1.05**(equiment.enchantlvl+1)**1.1)-Math.round(v.value*(1.05**(equiment.enchantlvl)**1.1)))}})</span></div>
          </div>
        </div>
      </div>
      <div class="btn-group">
        <p>需要金币：<span :class="{'red':userGold<strengthenNeedGold}">{{strengthenNeedGold}}</span></p>
        <div class="button" @click="startStreng">强化至+{{parseInt(equiment.enchantlvl)+1}}</div>
      </div>
      <cTooltip placement="bottom">
        <template v-slot:content>
          <div class="panel-title">- 词条重铸 -</div>
        </template>
        <template v-slot:tip>
          <p class="info">* 花费金币重铸装备词条</p>
        </template>
      </cTooltip>

      <div class="extraEntry">
        <div class="extraEntry-item" v-for="(v,k) in equiment.extraEntry" :key="v.id" @click="recastTheEquiment(v,k)"  @mouseover="changeRecastStatus(v,k,true)" @mouseleave="changeRecastStatus(v,k,false)">
          <button class="btn btn-snake-border">
            <div class="btn-borders">
              <div class="border-top"></div>
              <div class="border-right"></div>
              <div class="border-bottom"></div>
              <div class="border-left"></div>
            </div>
            <div v-if="v.recastStatus" class="recast-info" :class="{red:userGold<recastNeedGold}">点击花费{{recastNeedGold}}金币重铸</div>
            <div v-else>{{v.name}} : {{v.showVal}}</div>
          </button>

        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { assist } from '../../assets/js/assist';
import cTooltip from '../uiComponent/tooltip'
import handle from '../../assets/js/handle'
export default {
  components: { cTooltip },
  name: "equimentPanel",
  mixins: [assist],
  data() {
    return {
      equiment: {},
      recast:false,
      qualityProbability: [0.25, 0.55, 0.15, 0.05,],
      quality: [{
        name: '破旧',
        qualityCoefficient: 0.7,
        probability: '0.25',
        color: '#a1a1a1',
        extraEntryNum: 1,
      }, {
        name: '普通',
        qualityCoefficient: 1,
        probability: '0.55',
        color: '#fff', extraEntryNum: 2,
      }, {
        name: '神器',
        qualityCoefficient: 1.5,
        probability: '0.15',
        color: '#ff00ff', extraEntryNum: 3,
      }, {
        name: '史诗',
        qualityCoefficient: 2,
        probability: '0.05',
        color: '#f78918', extraEntryNum: 4,
      }],
    };
  },
  mounted() {
  },
  computed: {
    userGold() { return this.$store.state.playerAttribute.GOLD },
    item() { return this.$store.state.needStrengthenEquipment},
    strengthenNeedGold(){
      var a = parseInt((this.equiment.lv+1)*(1.1**(this.equiment.enchantlvl)**1.1)*(10+this.equiment.lv/5))+100
      return a
    },
    recastNeedGold(){
      var a = parseInt(this.equiment.lv * this.equiment.quality.qualityCoefficient * (200 + 10 * this.equiment.lv)/4)
      return a
    }
  },
  watch: {
    item() {
      this.equiment = this.$deepCopy(this.item)
      if(!this.equiment.enchantlvl){
        this.$set(this.equiment,'enchantlvl',0)
      }
    }
  },
  methods: {
    changeRecastStatus(v,k,status){
      v.recastStatus = status
      this.$set(this.equiment.extraEntry,k,v)
    },
    // 强化装备
    startStreng() {
      if (this.$store.state.playerAttribute.GOLD < this.strengthenNeedGold) {
        this.$store.commit("set_sys_info", {
          msg: `
              钱不够啊，强化啥呢。
            `,
          type: "warning",
        });
        return
      }
      let lv = this.equiment.enchantlvl
      let probabilityOfSuccess = 1
      if(lv<=5){
        probabilityOfSuccess = 1
      }else if(lv==6){
        probabilityOfSuccess = 0.8
      }else if(lv==7){
        probabilityOfSuccess = 0.65
      }else if(lv==8){
        probabilityOfSuccess = 0.45
      }else if(lv==9){
        probabilityOfSuccess = 0.2
      }else{
        probabilityOfSuccess = 0.1
      }
      let r = Math.random()
      if(r<probabilityOfSuccess){
        // 强化成功
        lv++
      }else{
        // 强化失败
        if(lv>=5){
          lv= lv-1
        }
      }

      this.$store.commit("set_player_gold", -parseInt(this.strengthenNeedGold));

      this.changeTheEquimentByLv(lv)
      this.changeTheEquiment()
    },
    // 重铸装备
    recastTheEquiment(v,k){
      console.log(v,k)
      if (this.$store.state.playerAttribute.GOLD < this.recastNeedGold) {
        this.$store.commit("set_sys_info", {
          msg: `
              钱不够啊，重铸啥呢。
            `,
          type: "warning",
        });
        return
      }
      let newEntry = handle.createRandomEntry(this.equiment.lv,this.equiment.quality.qualityCoefficient)
      this.$set(this.equiment.extraEntry, k, newEntry);
      this.$store.commit("set_player_gold", -parseInt(this.recastNeedGold));
      this.changeTheEquiment()
    },
    //根据强化等级变动装备
    changeTheEquimentByLv(lv){
      this.equiment.enchantlvl = lv
    },
    //修改成功时保存这个装备
    changeTheEquiment(){
      var backpackPanel = this.findBrothersComponents(this, 'backpackPanel', false)[0]
      this.$set(backpackPanel.grid, backpackPanel.currentItemIndex, this.$deepCopy(this.equiment));
    }
  }
};


</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
@font-face {
  font-family: "Lato-Regular";
  src: url(../../assets/fonts/Lato-Regular.ttf);
}
.equimentPanel {
  font-family: Lato-Regular, "Noto Sans SC", "Noto Sans", "Source Sans Pro",
    "Avenir", Helvetica, Arial, sans-serif !important;
  color: #f1f1f1;
  width: 4rem;
  height: auto;
  background: rgba(0, 0, 0, 0.8);
  border: #393839;
  border-radius: 0.05rem;
  padding: 0 0.16rem;
  box-sizing: border-box;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 0.1rem;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.04rem;
    }
    .name {
      height: 0.46rem;
      margin-left: 0.2rem;
      line-height: 0.46rem;
    }
  }
  .type {
    padding: 0.1rem;
    display: flex;
    width: 100%;
    align-content: center;
    justify-content: space-between;
  }
  .lv {
    padding-right: 0.1rem;
    display: flex;
    width: 100%;
    align-content: center;
    justify-content: flex-end;
  }
  .entry {
    width: 100%;
    padding: 0.2rem 0.4rem;
    display: flex;
    justify-content: space-around;
    font-size: 0.18rem;
    align-items: center;
    div {
      text-align: left;
      & > div {
        height: 0.26rem;
      }
      .set {
        color: #2fe20f;
        margin-left: 0.1rem;
      }
    }
  }
  .extraEntry {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding-left: 0.2rem;
    padding-bottom: 0.1rem;
    color: #68d5ed;
    div {
      display: flex;
      justify-content: center;
      & > div {
        display: flex;
        justify-content: center;
      }
    }
  }
}
.des {
  color: #777;
  font-size: 0.12rem;
  margin-top: 0.1rem;
  text-align: left;
  text-indent: 0.24rem;
}
.btn-group {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.08rem;
  background: #000;
}
$blue: #ccc;
.extraEntry-item {
  border-radius: 4px;
  margin: 0.03rem;
  &:hover {
    // box-shadow: 0 0 2px 2px #6094b1;
  }
}
.btn {
  width: 100%;
  position: relative;
  padding: 0.1rem 0.3rem;
  font-family: Lato, sans-serif;
  font-size: 0.15rem;
  line-height: 0.15rem;

  color: #d8e8e8;
  text-decoration: none;
  background-color: #101010;
  border: transparent;
  outline: transparent;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  border-radius: 4px;
  transition: .2s;
  &:hover {
    box-shadow: inset 0 0 7px 7px #53868ec9;
    .btn-borders {
      display: flex !important;
    }
  }
  .btn-text {
    color: $blue;
  }
  &-snake-border {
    .btn-borders {
      display: none !important;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .border-top {
        position: absolute;
        top: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, transparent, $blue);
        animation: moveHorizontally 2s linear infinite;
      }

      .border-right {
        position: absolute;
        right: 0;
        width: 2px;
        height: 100%;
        background: linear-gradient(to bottom, transparent, $blue);
        animation: moveVertically 2s 1s linear infinite;
      }

      .border-bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(to left, transparent, $blue);
        animation: moveHorizontally 2s linear reverse infinite;
      }

      .border-left {
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background: linear-gradient(to top, transparent, $blue);
        animation: moveVertically 2s 1s linear reverse infinite;
      }
    }
  }
}

@keyframes moveHorizontally {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(100%);
  }
}

@keyframes moveVertically {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(100%);
  }
}

.fb {
  width: 54px;
  height: 50px;
  line-height: 100px;
  border-radius: 10%;
  overflow: hidden;
  position: relative;
  // background: rgba(0, 0, 0, 0.1);
  z-index: 10;
  i {
    color: $blue;
    font-size: 24px;
    font-weight: bold;
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fb-content {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    position: absolute;
    top: 2px;
    left: 2px;
    background: #061b21;
    border-radius: 8%;
    display: flex;
    z-index: 2;
  }
  &::after {
    content: "";
    position: absolute;
    display: inline-block;
    background-color: #3e94ce;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    animation: bgmove 2s linear infinite;
    @keyframes bgmove {
      0% {
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
      }
      25% {
        top: 0;
        left: 0;
        width: 5px;
        height: 100%;
      }
      50% {
        top: calc(100% - 5px);
        left: 0;
        width: 100%;
        height: 5px;
      }
      75% {
        top: 0px;
        left: calc(100% - 5px);
        width: 5px;
        height: 100%;
      }
      100% {
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
      }
    }
  }
  &::before {
    content: "";
    padding: 50%;
    position: absolute;
    top: -25%;
    left: -25%;
    bottom: -25%;
    right: -25%;
    transform-origin: center center;
    transform: rotate(30deg) scale(2);
    background: conic-gradient(
      #3e94ce,
      #3e94ce8a,
      rgba(0, 0, 0, 0.06),
      rgba(0, 0, 0, 0.06)
    );
    animation: rotate 2s linear infinite;
    @keyframes rotate {
      100% {
        transform: rotate(-330deg) scale(2);
      }
    }
  }
}

.cameraPosition {
  height: calc(100%);
  padding: 20px;
  background: #1a1b1d;
  font-family: "Noto Sans", "Source Sans Pro", "Avenir", Helvetica, Arial,
    sans-serif !important;
}
.base-title {
  color: #04e2ff;
  font-size: 20px;
  transform: scale(0.8);
}
.breathLight {
  width: 300px;
  height: 10px;
  background: linear-gradient(
    90deg,
    #04e2ff 0%,
    #0267ff 25%,
    #04e2ff 50%,
    #0267ff 75%,
    #04e2ff 100%
  );
  border-radius: 10px;
  box-shadow: 0 0 2px 1px #cecece4f;
  background-size: 200% 200%;
  animation: lineRGB linear 3s infinite;
}
.el-header-light-line {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(
    90deg,
    #04e2ff 0%,
    #0267ff 25%,
    #04e2ff 50%,
    #0267ff 75%,
    #04e2ff 100%
  );
  background-size: 200% 200%;
  height: 2px;
  animation: lineRGB linear 3s infinite;
}
.el1 {
  top: 0;
  left: 0;
}
.el2 {
  width: 2px;
  height: 100%;
  top: 0;
  left: 0;
}
.el3 {
  width: 2px;
  height: 100%;
  top: 0;
  right: 0;
}
.el4 {
  left: 0;
  bottom: 0;
}
@keyframes lineRGB {
  0% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}
.recast-info{
  font-size: .14rem;
  color: #04e2ff;
}
.red{
  color:red;
}
</style>
