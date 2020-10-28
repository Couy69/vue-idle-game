<template>
  <div class="main" @contextmenu.prevent="contextmenu($event)">
    <div class="user-status">
      <div class="hp" title="血量">
        <img src="../assets/icons/S_Holy01.png" alt="">
        <div class="value">
          {{attribute.CURHP.value}}/{{attribute.MAXHP.value}}
        </div>
      </div>
      <div class="other">
        <div class="item" title="攻击力">
          <img src="../assets/icons/S_Sword06.png" alt="">
          <div class="value">
            {{attribute.ATK.value}}
          </div>
        </div>
        <div class="item" title="防御力">
          <img src="../assets/icons/icon_11.png" alt="">
          <div class="value">
            {{attribute.DEF.value}}
          </div>
        </div>
        <div class="item" title="暴击几率">
          <img src="../assets/icons/icon_78.png" alt="">
          <div class="value">
            {{attribute.CRIT.value}}%
          </div>
        </div>
        <div class="item" title="暴击伤害">
          <img src="../assets/icons/S_Sword01.png" alt="">
          <div class="value">
            {{attribute.CRITDMG.value}}%
          </div>
        </div>

      </div>
    </div>
    <div class="user-item">
      <div class="gold">GOLD: <span>{{userGold}}</span></div>
      <div class="weapon" @mouseover="showItemInfo('weapon')" @mouseleave="closeItemInfo">
        <div class="title" v-if="weapon">
          <div class='icon' :style="{'box-shadow':'0 0 2px 1px weapon.quality.color'}">
            <img :src="weapon.type.iconSrc" alt="">
          </div>
          <div class='name' :style="{color:weapon.quality.color}">{{weapon.quality.name}}的{{weapon.type.name}}</div>
        </div>
      </div>
      <div class="armor" @mouseover="showItemInfo('armor')" @mouseleave="closeItemInfo">
        <div class="title" v-if="armor">
          <div class='icon' :style="{'box-shadow':'0 0 2px 1px weapon.quality.color'}">
            <img :src="armor.type.iconSrc" alt="">
          </div>
          <div class='name' :style="{color:armor.quality.color}">{{armor.quality.name}}的{{armor.type.name}}</div>
        </div>
      </div>
      <div class="acc" @mouseover="showItemInfo('acc')" @mouseleave="closeItemInfo">
        <div class="title" v-if="acc">
          <div class='icon' :style="{'box-shadow':'0 0 2px 1px weapon.quality.color'}">
            <img :src="acc.type.iconSrc" alt="">
          </div>
          <div class='name' :style="{color:acc.quality.color}">{{acc.quality.name}}的{{acc.type.name}}</div>
        </div>
      </div>
    </div>
    <div class="sys-info">
      <div class="info enter">系统：<span> 你已进入史莱姆森林</span></div>
      <div class="info battle">系统：<span> 遭遇了史莱姆（lv1）</span></div>
      <div class="info win">系统：<span> 击杀了史莱姆（lv1）</span></div>
      <div class="info trophy">系统：<span> 获得：金币+33</span></div>
      <div class="info battle">系统：<span> 遭遇了史莱姆（lv1）</span></div>
      <div class="info win">系统：<span> 击杀了史莱姆（lv1）</span></div>
      <div class="info trophy">系统：<span> 获得：金币+33</span></div>
      <div class="info battle">系统：<span> 遭遇了史莱姆王（lv5）</span></div>
      <div class="info win">系统：<span> 击杀了史莱姆王（lv5）</span></div>
      <div class="info trophy">系统：<span> 获得：金币+33</span></div>
      <div class="info trophy">系统：<span> 获得：<a style="color:#fff;text-decoration: underline;">普通的士兵护石</a>，<a style="color:#fff;text-decoration: underline;">普通的士兵防御力</a></span></div>
    </div>
    <div class="map">
      <div class="plan">
        <zones></zones>
      </div>
      <div class="icon" style="top:170px;left:323px"></div>
      <div class="icon" style="top:670px;left:483px"></div>
      <div class="icon" style="top: 231px;left: 846px;"></div>
    </div>
    <div class="dialog" :class="{weaponShow:weaponShow,armorShow:armorShow,accShow:accShow}">
      <weaponPanel :item="weapon" v-if="weaponShow"></weaponPanel>
      <armorPanel :item="armor" v-if="armorShow"></armorPanel>
      <accPanel :item="acc" v-if="accShow"></accPanel>
    </div>
  </div>
</template>
<script>
import weaponPanel from './component/weaponPanel'
import armorPanel from './component/armorPanel'
import accPanel from './component/accPanel'
import zones from './component/zones'
export default {
  name: "index",
  data() {
    return {
      weaponShow: false,
      armorShow: false,
      accShow: false,
      weapon: '',
      armor: '',
      acc: '',
      userGold:'',
      attribute: { "CURHP": { "value": 100, "showValue": "+100" }, "MAXHP": { "value": 100, "showValue": "+100" }, "ATK": { "value": 0, "showValue": "+0" }, "DEF": { "value": 0, "showValue": "+0" }, "CRIT": { "value": 0, "showValue": "+0%" }, "CRITDMG": { "value": 0, "showValue": "+0%" } },
    };
  },
  components: { weaponPanel, armorPanel, accPanel,zones },
  mounted() {
    // 从store中加载装备与人物数据
    this.weapon = this.$store.state.playerAttribute.weapon
    this.armor = this.$store.state.playerAttribute.armor
    this.acc = this.$store.state.playerAttribute.acc
    this.userGold = this.$store.state.playerAttribute.GOLD
    this.attribute = this.$store.getters.calculatePlayerAttribute
  },
  methods: {
    contextmenu(e){
      // 鼠标右键
    },
    showItemInfo(type) {
      switch (type) {
        case 'weapon':
          this.weaponShow = true
          break;
        case 'armor':
          this.armorShow = true
          break;
        case 'acc':
          this.accShow = true
          break;
        default:
          break;
      }
    },
    closeItemInfo() {
      this.weaponShow = this.armorShow = this.accShow = false
    },
    calculatePlayerAttribute() {

    }
  }
};


</script>
<style lang="scss" scoped>
@font-face {
  font-family: "Lato-Regular";
  src: url(../assets/fonts/Lato-Regular.ttf);
}
* {
  box-sizing: border-box;
  user-select: none;
}
a {
  cursor: pointer;
}
.main {
  background: #111;
  font-family: Lato-Regular, "Noto Sans SC", "Noto Sans", "Source Sans Pro",
    "Avenir", Helvetica, Arial, sans-serif !important;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: #eee;
  height: 100%;
  .user-status {
    position: absolute;
    top: 10px;
    left: 10px;
    border: 2px solid #ccc;
    height: 400px;
    width: 400px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    .hp {
      cursor: pointer;
      height: 70px;
      width: 100%;
      display: flex;
      border: 2px solid #ccc;
      align-items: center;
      padding-left: 20px;
      img {
        width: 50px;
        height: 50px;
      }
      .value {
        font-size: 26px;
        font-weight: bold;
        text-align: center;
        flex: 1;
      }
    }
    .other {
      img {
        width: 40px;
        height: 40px;
      }
      display: flex;
      flex: 1;
      padding: 20px;
      border: 2px solid #ccc;
      margin-top: 20px;
      flex-wrap: wrap;
      & > div {
        cursor: pointer;
        width: 50%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 20px;
        .value {
          margin-left: 10px;
          font-size: 24px;
          font-weight: normal;
        }
      }
    }
  }
  .user-item {
    position: absolute;
    top: 10px;
    left: 420px;
    border: 2px solid #ccc;
    height: 400px;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 40px 0;
    padding-top: 10px;
    cursor: pointer;
    & > div {
      background: rgba(0, 0, 0, 0.7);
      width: calc(100% - 40px);
      margin: 0 20px;
    }
    .gold {
      // margin: 0;
      // background: transparent;
      // font-size: 24px;
      // text-align: left;
      // padding: 0 20px;
      // width: 100%;
      // display: flex;
      // align-items: center;
      // span{
      //   border:2px solid #fff;
      //   text-align: right;
      //   font-size: 20px;
      //   display: inline-block;
      //   padding: 6px;
      //   margin-left: 10px;
      //   width: calc(100% - 40px);
      // }

      cursor: pointer;
      height: 70px;
      margin: 20px;
      margin-top: 8px;
      width: calc(100% -40px);
      display: flex;
      border: 2px solid #ccc;
      align-items: center;
      padding-left: 20px;
      font-size: 26px;
      span {
        font-size: 20px;
        font-weight: bold;
        text-align: right;
        flex: 1;
        padding: 10px 20px;
      }
    }
    .title {
      display: flex;
      padding: 10px;
      width: 100%;
      .icon {
        width: 56px;
        height: 56px;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
      }
      .name {
        font-size: 22px;
        height: 46px;
        margin-left: 20px;
        line-height: 46px;
      }
    }
  }
  .sys-info {
    position: absolute;
    border: 2px solid #ccc;
    height: calc(100% - 440px);
    width: 810px;
    bottom: 10px;
    left: 10px;
  }
  .map {
    position: absolute;
    right: 10px;
    left: 830px;
    top: 10px;
    bottom: 10px;
    border: 2px solid #ccc;
    background-image: url(../assets/img/map.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .plan {
      position: absolute;
      top: 10px;
      width: calc(100% - 30px);
      left: 15px;
      height: 100px;
      background: rgba(0, 0, 0, 0.7);
      text-align: center;
      font-size: 40px;
      line-height: 100px;
    }
    .icon {
      position: absolute;
      width: 45px;
      height: 45px;
      background-image: url(../assets/icons/I_Scroll.png);
      border-radius: 50%;
      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      box-shadow: 0 0 4px 4px rgba(184, 171, 255, 70%);
    }
  }
}
.dialog {
  position: absolute;
  display: none;
}
.weaponShow {
  top: 67px;
  left: 798px;
  display: flex;
}
.armorShow {
  top: 177px;
  left: 798px;
  display: flex;
}
.accShow {
  top: 277px;
  left: 798px;
  display: flex;
}
.sys-info {
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: flex-start;
  justify-content: flex-start;
  .info {
    margin: 3px 0;
  }
  .enter > span {
    color: #f90202;
  }
  .battle > span {
    color: #de8618;
  }
  .win > span {
    color: #24c4de;
  }
  .trophy > span {
    color: #2fe20f;
  }
}
</style>
