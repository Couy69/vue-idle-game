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
        <div class="item" title="防御力及减伤比例">
          <img src="../assets/icons/icon_11.png" alt="">
          <div class="value">
            {{attribute.DEF.value}} <span style="font-size:.14rem;">({{Math.round((1-attribute.REDUCDMG)*100)}}%)</span>
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
      <div class="uii">
        <div class="gold" v-if="attribute.DPS">DPS: <span>{{(attribute.DPS).toFixed(2)}}</span></div>
        <div class="gold">GOLD: <span>{{userGold}}</span></div>
      </div>

      <div class="weapon" @mouseover="showItemInfo($event,'weapon',playerWeapon)" @mouseleave="closeItemInfo">
        <div class="title" v-if="playerWeapon">
          <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px '+playerWeapon.quality.color}">
            <img :src="playerWeapon.type.iconSrc" alt="">
          </div>
          <div class='name' :style="{color:playerWeapon.quality.color}">{{playerWeapon.quality.name}}的{{playerWeapon.type.name}}</div>
        </div>
      </div>
      <div class="armor" @mouseover="showItemInfo($event,'armor',playerArmor)" @mouseleave="closeItemInfo">
        <div class="title" v-if="playerArmor">
          <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px  '+playerArmor.quality.color}">
            <img :src="playerArmor.type.iconSrc" alt="">
          </div>
          <div class='name' :style="{color:playerArmor.quality.color}">{{playerArmor.quality.name}}的{{playerArmor.type.name}}</div>
        </div>
      </div>
      <div class="acc" @mouseover="showItemInfo($event,'acc',playerAcc)" @mouseleave="closeItemInfo">
        <div class="title" v-if="playerAcc">
          <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px '+playerAcc.quality.color}">
            <img :src="playerAcc.type.iconSrc" alt="">
          </div>
          <div class='name' :style="{color:playerAcc.quality.color}">{{playerAcc.quality.name}}的{{playerAcc.type.name}}</div>
        </div>
      </div>
    </div>
    <div class="sys-info">
      <div id='sysInfo'>
        <div class="info enter" :class="{enter:v.type=='enter',battle:v.type=='battle',win:v.type=='win',trophy:v.type=='trophy',}" v-for="(v,k) in sysInfo" :key="k">系统<i style="font-size:.12rem" v-if="v.time">({{v.time}})</i>：
          <span>{{v.msg}}</span>
          <a v-if="v.equip" v-for="(o,p) in v.equip" :key="p" :style="{color:o.quality.color}" @mouseover="showItemInfo($event,o.itemType,o)" @mouseleave="closeItemInfo">{{o.type.name}}</a>
        </div>
      </div>

      <!-- <div class="info battle">系统：<span> 遭遇了史莱姆（lv1）</span></div>
      <div class="info win">系统：<span> 击杀了史莱姆（lv1）</span></div>
      <div class="info trophy">系统：<span> 获得：金币+33</span></div>
      <div class="info battle">系统：<span> 遭遇了史莱姆（lv1）</span></div>
      <div class="info win">系统：<span> 击杀了史莱姆（lv1）</span></div>
      <div class="info trophy">系统：<span> 获得：金币+33</span></div>
      <div class="info battle">系统：<span> 遭遇了史莱姆王（lv5）</span></div>
      <div class="info win">系统：<span> 击杀了史莱姆王（lv5）</span></div>
      <div class="info trophy">系统：<span> 获得：金币+33</span></div>
      <div class="info trophy">系统：<span> 获得：<a style="color:#fff;text-decoration: underline;">普通的士兵护石</a>，<a style="color:#fff;text-decoration: underline;">普通的士兵防御力</a></span></div> -->
    </div>
    <div class="map">
      <div class="plan" v-show='inDungeons'>
        <dungeons></dungeons>
      </div>
      <div class="dungeons-Info" v-if="dungeons">
        <i class="dungeons-close" @click="closeDungeonsInfo"></i>
        <div class="dungeons-title">{{dungeons.name}}</div>
        <div class="jjj">
          <div class="dungeons-dps">推荐DPS：{{dungeons.needDPS}}</div>
          <div class="dungeons-lv">副本等级{{dungeons.lv}}</div>
        </div>
        <div class="image">占位副本图</div>
        <div class="dungeons-lv"></div>
        <div class="dungeons-btn" @click="evenBegin()">开始挑战</div>
      </div>
      <div class="event-icon low-level" @click="showDungeonsInfo(0)" v-show='!inDungeons' style="    top: 48%;left: 10%;">
         <span>lv1</span>
      </div>
      <div class="event-icon low-level" @click="showDungeonsInfo(1)" v-show='!inDungeons' style="top: 38%;left: 17%;"><span>lv5</span></div>
      <div class="event-icon low-level" @click="showDungeonsInfo(2)" v-show='!inDungeons' style="top: 54%;left: 30%;"><span>lv10</span></div>
      <div class="event-icon low-level" @click="showDungeonsInfo(3)" v-show='!inDungeons' style="top: 28%;left: 43%;"><span>lv15</span></div>
      <div class="event-icon low-level" @click="showDungeonsInfo(4)" v-show='!inDungeons' style="top: 39%;left: 48%;"><span>lv20</span></div>
      <!-- <div class="event-icon" @click="showDungeonsInfo(3)" v-show='!inDungeons' style="top: 25%;left: 40%;">lv15</div>
      <div class="event-icon" @click="showDungeonsInfo(3)" v-show='!inDungeons' style="top: 25%;left: 40%;">lv15</div>
      <div class="event-icon" @click="showDungeonsInfo(3)" v-show='!inDungeons' style="top: 25%;left: 40%;">lv15</div>
      <div class="event-icon" @click="showDungeonsInfo(3)" v-show='!inDungeons' style="top: 25%;left: 40%;">lv15</div> -->

    </div>
    <div class="menu">
      <div class="Backpack" @click="openBackpackPanel">
        <!-- <img src="../assets/icons/S_Sword06.png" alt=""> -->
        <span>背包</span>
      </div>
      <div class="Backpack" @click="GMOpened = true">
        <!-- <img src="../assets/icons/S_Sword06.png" alt=""> -->
        <span>GM</span>
      </div>
    </div>
    <div class="dialog" :style='itemDialogStyle'>
      <weaponPanel :item="weapon" v-show="weaponShow"></weaponPanel>
      <armorPanel :item="armor" v-show="armorShow"></armorPanel>
      <accPanel :item="acc" v-show="accShow"></accPanel>
    </div>
    <div class="dialog-backpackPanel" v-show="backpackPanelOpened">
      <div class="title">
        <span>背包</span>
        <i class="close" @click="closePanel"></i>
      </div>
      <backpackPanel></backpackPanel>
    </div>
    <div class="dialog-backpackPanel" v-show="GMOpened">
      <div class="title">
        <span>GM面板</span>
        <i class="close" @click="closePanel"></i>
      </div>
      <div>
        <input :v-model="GMEquipLv" type="text" placeholder="随机生成一套输入等级的装备">
        <button @click="createGMEquip">确定</button>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
import weaponPanel from './component/weaponPanel'
import armorPanel from './component/armorPanel'
import accPanel from './component/accPanel'
import backpackPanel from './component/backpackPanel'
import dungeons from './component/dungeons'
import { assist } from '../assets/js/assist';
export default {
  name: "index",
  mixins: [assist],
  data() {
    return {
      time: '00:00:00',
      sysInfo: {},
      weaponShow: false,
      armorShow: false,
      accShow: false,
      weapon: {},
      inDungeons: false,  //是否在副本进程中
      dungeons: '',
      acc: {},
      armor: {},
      backpackPanelOpened: false,
      itemDialogStyle: {},
      GMEquipLv:'1',
      GMOpened:false,
      // attribute: { "CURHP": { "value": 100, "showValue": "+100" }, "MAXHP": { "value": 100, "showValue": "+100" }, "ATK": { "value": 0, "showValue": "+0" }, "DEF": { "value": 0, "showValue": "+0" }, "CRIT": { "value": 0, "showValue": "+0%" }, "CRITDMG": { "value": 0, "showValue": "+0%" } },
    };
  },
  components: { weaponPanel, armorPanel, accPanel, dungeons, backpackPanel },
  created() {
    window.onresize = () => {
      this.initial()
    };
    this.initial()
  },
  mounted() {
    this.$store.getters.calculatePlayerAttribute;
    // 从store中加载装备与人物数据
    // this.weapon = this.$store.state.playerAttribute.weapon
    // this.armor = this.$store.state.playerAttribute.armor
    // this.acc = this.$store.state.playerAttribute.acc
    // this.userGold = this.$store.state.playerAttribute.GOLD
    // this.attribute = this.$store.getters.calculatePlayerAttribute
    setInterval(() => {
      this.$store.commit('set_player_curhp', this.healthRecoverySpeed)
    }, 1000)
    this.sysInfo = this.$store.state.sysInfo

    this.weapon = this.playerWeapon
    this.armor = this.playerArmor
    this.acc = this.playerAcc
  },
  computed: {
    attribute() { return this.$store.state.playerAttribute.attribute },
    healthRecoverySpeed() { return this.$store.state.playerAttribute.healthRecoverySpeed },
    userGold() { return this.$store.state.playerAttribute.GOLD },
    playerWeapon() { return this.$store.state.playerAttribute.weapon },
    playerArmor() { return this.$store.state.playerAttribute.armor },
    playerAcc() { return this.$store.state.playerAttribute.acc },
  },
  watch: {
    sysInfo() {
      var element = document.getElementById('sysInfo')
      //渲染完成后滚至最下端
      this.$nextTick(() => {
        element.scrollTop = element.scrollHeight + 20
      })
    }
  },
  methods: {
    createGMEquip(){
      var b = this.findComponentDownward(this, "weaponPanel");
      var item = b.createNewItem(2, this.GMEquipLv);
      item = JSON.parse(item);
      var backpackPanel = this.findComponentDownward(
        this,
        "backpackPanel",
        );
      for (let i = 0; i < backpackPanel.grid.length; i++) {
        if (JSON.stringify(backpackPanel.grid[i]).length < 3) {
          this.$set(backpackPanel.grid, i, item);
          break;
        }
      }
      var b = this.findComponentDownward(this, "armorPanel");
      var item = b.createNewItem(2, this.GMEquipLv);
      item = JSON.parse(item);
      var backpackPanel = this.findComponentDownward(
        this,
        "backpackPanel",
        );
      for (let i = 0; i < backpackPanel.grid.length; i++) {
        if (JSON.stringify(backpackPanel.grid[i]).length < 3) {
          this.$set(backpackPanel.grid, i, item);
          break;
        }
      }
      var b = this.findComponentDownward(this, "accPanel");
      var item = b.createNewItem(2, this.GMEquipLv);
      item = JSON.parse(item);
      var backpackPanel = this.findComponentDownward(
        this,
        "backpackPanel",
        );
      for (let i = 0; i < backpackPanel.grid.length; i++) {
        if (JSON.stringify(backpackPanel.grid[i]).length < 3) {
          this.$set(backpackPanel.grid, i, item);
          break;
        }
      }
      this.backpackPanelOpened = true
      this.GMOpened = false
    },
    showDungeonsInfo(k) {
      var b = this.findComponentDownward(this, 'dungeons')
      this.dungeons = b.dungeonsArr[k]
    },
    closeDungeonsInfo() {
      this.dungeons = ''
    },
    evenBegin() {
      var b = this.findComponentDownward(this, 'dungeons')
      b.dungeons = this.dungeons
      b.evenHandle()
      this.dungeons = ''
      this.inDungeons = true
    },
    openBackpackPanel() {
      this.backpackPanelOpened = !this.backpackPanelOpened
    },
    closePanel() {
      this.backpackPanelOpened = false
      this.GMOpened = false
    },
    initial() {
      let html = document.documentElement;
      let wW = html.clientHeight;
      let designSize = 1000; //设计高度
      if (!this.fullScreen) {
        wW = html.clientHeight;
      }
      let rem = (wW * 100) / designSize;
      document.documentElement.style.fontSize = rem + "px";
    },
    contextmenu(e) {
      // 鼠标右键
    },
    showItemInfo(e, type, item) {
      let x = e.pageX, y = e.pageY, maxH = window.innerHeight
      if (y < window.innerHeight / 2) {
        this.itemDialogStyle = {
          display: 'flex',
          'top': y + 20 + 'px',
          'left': x + 20 + 'px',
        }
      } else {
        this.itemDialogStyle = {
          display: 'flex',
          'bottom': maxH - y + 20 + 'px',
          'left': x + 20 + 'px',
        }
      }
      switch (type) {
        case 'weapon':
          this.weapon = item
          this.weaponShow = true
          break;
        case 'armor':
          this.armor = item
          this.armorShow = true
          break;
        case 'acc':
          this.acc = item
          this.accShow = true
          break;
        default:
          break;
      }
    },
    closeItemInfo() {
      this.weaponShow = this.armorShow = this.accShow = false
    },
    setSysInfo() {
      this.$store.commit("set_sys_info", {
        msg: `
              副本探索成功！
            `,
        type: 'win'
      });
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
    top: 0.1rem;
    left: 0.1rem;
    border: 2px solid #ccc;
    height: 4rem;
    width: 4rem;
    padding: 0.2rem;
    display: flex;
    flex-direction: column;
    .hp {
      cursor: pointer;
      height: 0.7rem;
      width: 100%;
      display: flex;
      border: 2px solid #ccc;
      align-items: center;
      padding-left: 0.2rem;
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
      .value {
        font-size: 0.26rem;
        font-weight: bold;
        text-align: center;
        flex: 1;
      }
    }
    .other {
      img {
        width: 0.4rem;
        height: 0.4rem;
      }
      display: flex;
      flex: 1;
      padding: 0.2rem;
      border: 2px solid #ccc;
      margin-top: 0.2rem;
      flex-wrap: wrap;
      & > div {
        cursor: pointer;
        width: 50%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 0.2rem;
        .value {
          margin-left: 0.1rem;
          font-size: 0.24rem;
          font-weight: normal;
        }
      }
    }
  }
  .user-item {
    position: absolute;
    top: 0.1rem;
    left: 4.2rem;
    border: 2px solid #ccc;
    height: 4rem;
    width: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 0.4rem 0;
    padding-top: 0.1rem;
    cursor: pointer;
    & > div {
      background: rgba(0, 0, 0, 0.7);
      width: calc(100% - 0.4rem);
      margin: 0 20rem;
    }
    .uii {
      display: flex;
      width: calc(100% -0.4rem);
    }
    .gold {
      cursor: pointer;
      height: 0.7rem;
      margin: 0.1rem;
      margin-top: 0.08rem;
      width: calc(50%);
      display: flex;
      align-items: center;
      padding-left: 0.1rem;
      font-size: 0.22rem;
      span {
        font-size: 0.2rem;
        font-weight: bold;
        text-align: right;
        flex: 1;
        padding: 0.1rem 0.08rem;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
      }
    }
    .title {
      display: flex;
      padding: 0.1rem;
      width: 100%;
      .icon {
        width: 0.56rem;
        height: 0.56rem;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.04rem;
      }
      .name {
        font-size: 0.22rem;
        height: 0.46rem;
        margin-left: 0.2rem;
        line-height: 0.46rem;
      }
    }
  }
  .sys-info {
    position: absolute;
    border: 2px solid #ccc;
    height: calc(100% - 4.4rem);
    width: 8.1rem;
    bottom: 0.1rem;
    left: 0.1rem;

    transition: 0.2s;
    padding: 0.2rem;

    & > div {
      overflow-y: auto;
      transition: 0.2s;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
    .info {
      margin: 0.03rem 0;
    }
    a {
      cursor: pointer;
      text-decoration: underline;
      margin-left: 0.05rem;
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
  .map {
    position: absolute;
    right: 0.1rem;
    left: 8.3rem;
    top: 0.1rem;
    bottom: 0.1rem;
    border: 2px solid #ccc;
    background-image: url(../assets/img/map.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .plan {
      position: absolute;
      top: 0.1rem;
      width: calc(100% - 0.3rem);
      left: 0.15rem;
      height: 1rem;
      background: rgba(0, 0, 0, 0.7);
      text-align: center;
      font-size: 0.4rem;
      line-height: 1rem;
    }
    .event-icon {
      position: absolute;
      cursor: pointer;
      width: 0.55rem;
      height: 0.55rem;
      background-image: url(../assets/icons/icon_81.png);
      border-radius: 50%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background-repeat: no-repeat;
      background-position: center;
      background-color: rgba(245, 54, 54, 0.7);
      box-shadow: 0 0 4px 4px rgba(184, 171, 255, 70%);
      span{
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        text-shadow: 1px 1px 3px rgb(0,0,0);
      }
    }
    .low-level{
      background-color: rgba(100 ,255, 36 , 0.7);
    }
  }
}
.dialog {
  position: absolute;
  display: none;
  z-index: 10;
}
.weaponShow {
  top: 0.67rem;
  left: 7.98rem;
  display: flex;
}
.armorShow {
  top: 1.77rem;
  left: 7.98rem;
  display: flex;
}
.accShow {
  top: 2.77rem;
  left: 7.98rem;
  display: flex;
}
.menu {
  position: absolute;
  bottom: 0.4rem;
  left: 8.7rem;
  display: flex;
  & > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    span {
      color: #fff;
      font-size: 30px;
      font-weight: bold;
    }
  }
}
.dialog-backpackPanel {
  position: absolute;
  z-index: 9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #fff;
  border-radius: 6px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.7);
  background: rgba(0, 0, 0, 0.7);
  .title {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    padding: 0.1rem;
    .close {
      cursor: pointer;
      position: absolute;
      top: 0.1rem;
      right: 0.1rem;
      display: block;
      width: 0.3rem;
      height: 0.3rem;
      background-image: url(../assets/icons/close.png);
      background-size: cover;
    }
  }
}
.dungeons-Info {
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  border: 2px solid #ccc;
  height: 4rem;
  padding: 0.1rem;
  .dungeons-close {
    cursor: pointer;
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
    display: block;
    width: 0.23rem;
    height: 0.23rem;
    background-image: url(../assets/icons/close.png);
    background-size: cover;
  }
  .dungeons-title {
    margin-top: 0.1rem;
    font-size: 20px;
  }
  .jjj {
    width: 100%;
    justify-content: space-around;
    display: flex;
    padding: 0.15rem;
    align-items: center;
  }
  .image {
    width: 100%;
    height: 2rem;
    background: #000;
  }
  .dungeons-btn {
    margin: 0.2rem 0.4rem;
    padding: 0.1rem 0.3rem;
    cursor: pointer;
    color: #fff;
    background: #000;
    border: 1px solid #fff;
  }
}
</style>
