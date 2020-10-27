<template>
  <div class="main">
    <div class="user-status">
      <div class="hp" title="血量">
        <img src="../assets/icons/S_Holy01.png" alt="">
        <div class="value">
          1006/1006
        </div>
      </div>
      <div class="other">
        <div class="item" title="攻击力">
          <img src="../assets/icons/S_Sword06.png" alt="">
          <div class="value">
            120
          </div>
        </div>
        <div class="item" title="防御力">
          <img src="../assets/icons/icon_11.png" alt="">
          <div class="value">
            33
          </div>
        </div>
        <div class="item" title="暴击几率">
          <img src="../assets/icons/icon_78.png" alt="">
          <div class="value">
            8%
          </div>
        </div>
        <div class="item" title="暴击伤害">
          <img src="../assets/icons/S_Sword01.png" alt="">
          <div class="value">
            150%
          </div>
        </div>

      </div>
    </div>
    <div class="user-item">
      <div class="weapon" @mouseover="showItemInfo('weapon')" @mouseleave="closeItemInfo">
        <div class="title">
          <div class='icon' :style="{'box-shadow':'0 0 2px 1px weapon.quality.color'}">
            <img :src="weapon.iconSrc" alt="">
          </div>
          <div class='name' :style="{color:weapon.quality.color}">{{weapon.quality.name}}的{{weapon.type.name}}</div>
        </div>
      </div>
      <div class="armor">
        <div class="title">
          <div class='icon' :style="{'box-shadow':'0 0 2px 1px weapon.quality.color'}">
            <img :src="armor.iconSrc" alt="">
          </div>
          <div class='name' :style="{color:armor.quality.color}">{{armor.quality.name}}的{{armor.type.name}}</div>
        </div>
      </div>
      <div class="acc">
        <div class="title">
          <div class='icon' :style="{'box-shadow':'0 0 2px 1px weapon.quality.color'}">
            <img :src="acc.iconSrc" alt="">
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
      <div class="info trophy">系统：<span> 获得：<a style="color:#fff;text-decoration: underline;">普通的士兵护石</a>，<a style="color:#fff;text-decoration: underline;">普通的士兵护甲</a></span></div>
    </div>
    <div class="map">
      <div class="plan">副本进度条</div>
      <div class="icon" style="top:170px;left:323px"></div>
      <div class="icon" style="top:670px;left:483px"></div>
      <div class="icon" style="top: 231px;left: 846px;"></div>
    </div>
    <div class="dialog" :class="{weaponShow:weaponShow}">
      <weaponPanel></weaponPanel>
    </div>
  </div>
</template>
<script>
import weaponPanel from './component/weaponPanel'
export default {
  name: "login",
  data() {
    return {
      weaponShow: false,
      weapon: {
        "iconSrc": "./icons/W_Sword020.png",
        "lv": 35,
        "quality": {
          "name": "史诗",
          "qualityCoefficient": 2,
          "probability": "0.05",
          "color": "#f78918",
          "extraEntryNum": 4
        },
        "type": {
          "name": "赤柳血刃",
          "des": "似乎会给使用者提供生命气息",
          "entry": [{
            "valCoefficient": 0.9,
            "val": 88,
            "showVal": "+88",
            "type": "ATK",
            "name": "攻击力"
          }, {
            "type": "HP",
            "valCoefficient": 1.4,
            "val": 1006,
            "showVal": "+1006",
            "name": "生命值"
          }]
        },
        "extraEntry": [{ "val": 32, "showVal": "+32", "type": "ATK", "name": "攻击力" }, { "type": "CRIT", "val": 8, "showVal": "+8%", "name": "暴击率" }, { "type": "CRIT", "val": 12, "showVal": "+12%", "name": "暴击率" }, { "type": "CRIT", "val": 12, "showVal": "+12%", "name": "暴击率" }]
      },
      armor: {
        "iconSrc": "./icons/A_Armor04.png",
        "lv": 35,
        "quality": {
          "name": "普通",
          "qualityCoefficient": 2,
          "probability": "0.05",
          "color": "#fff",
          "extraEntryNum": 4
        },
        "type": {
          "name": "士兵护甲",
          "des": "似乎会给使用者提供生命气息",
        },
      },
      acc: {
        "iconSrc": "./icons/Ac_9.png",
        "lv": 35,
        "quality": {
          "name": "普通",
          "qualityCoefficient": 2,
          "probability": "0.05",
          "color": "#fff",
          "extraEntryNum": 4
        },
        "type": {
          "name": "生命戒指",
          "des": "似乎会给使用者提供生命气息",
        },
      },
    };
  },
  components: { weaponPanel },
  mounted() {
  },
  methods: {
    showItemInfo(type) {
      if (type == 'weapon') {
        this.weaponShow = true
      }
    },
    closeItemInfo() {
      this.weaponShow = false
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
    cursor: pointer;
    & > div {
      background: rgba(0, 0, 0, 0.7);
      width: calc(100% - 40px);
      margin: 0 20px;
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
