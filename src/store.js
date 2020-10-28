import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sysInfo: [{
      type: '',
      msg: "欢迎你，菜鸟勇士。"
    }],
    playerAttribute: {
      GOLD: 0,
      weapon: {
        "lv": 1,
        "quality": {
          name: '破旧',
          qualityCoefficient: 0.7,
          probability: '0.25',
          color: '#a1a1a1',
          extraEntryNum: 1,
        },
        "type": {
          "name": "新手短剑",
          "des": "新手菜鸡使用的短剑",
          "iconSrc": "./icons/W_Sword001.png",
          "entry": [{
            "valCoefficient": 0.9,
            "value": 1,
            "showVal": "+1",
            "type": "ATK",
            "name": "攻击力"
          }]
        },
        "extraEntry": [{
          "value": 1,
          "showVal": "+1",
          "type": "ATK",
          "name": "攻击力"
        }]
      },
      armor: {
        "lv": 1,
        "quality": {
          name: '破旧',
          qualityCoefficient: 0.7,
          probability: '0.25',
          color: '#a1a1a1',
          extraEntryNum: 1,
        },
        "type": {
          "name": "新手布衣",
          "des": "新手菜鸡穿的普通衣物",
          "iconSrc": "./icons/A_A3.png",
          "entry": [{
            "valCoefficient": 0.9,
            "value": 1,
            "showVal": "+1",
            "type": "DEF",
            "name": "防御力"
          }]
        },
        "extraEntry": [{
          "type": "HP",
          "value": 10,
          "showVal": "+10",
          "name": "生命值"
        }, ]
      },
      acc: {
        "lv": 1,
        "quality": {
          name: '破旧',
          qualityCoefficient: 0.7,
          probability: '0.25',
          color: '#a1a1a1',
          extraEntryNum: 1,
        },
        "type": {
          "name": "新手指环",
          "des": "一个普通的指环",
          "iconSrc": "./icons/Ac_10.png",
          "entry": [{
            "valCoefficient": 0.9,
            "value": 20,
            "showVal": "+20",
            "type": "HP",
            "name": "生命值"
          }]
        },
        "extraEntry": [{
          "type": "DEF",
          "value": 1,
          "showVal": "+1",
          "name": "防御力"
        }]
      },
    }
  },
  getters: {
    calculatePlayerAttribute: state => {
      var p = state.playerAttribute
      var warpon = p.weapon,
        armor = p.armor,
        acc = p.acc,
        entry = []
      var attribute = {
        CURHP: {
          value: 0,
          showValue: '',
        },
        MAXHP: {
          value: 0,
          showValue: '',
        },
        ATK: {
          value: 0,
          showValue: '',
        },
        DEF: {
          value: 0,
          showValue: '',
        },
        CRIT: {
          value: 0,
          showValue: '',
        },
        CRITDMG: {
          value: 0,
          showValue: '',
        },
      }
      entry = [].concat(warpon.type.entry).concat(warpon.extraEntry).concat(armor.type.entry).concat(armor.extraEntry).concat(acc.type.entry).concat(acc.extraEntry)
      entry.map(item => {
        switch (item.type) {
          case 'ATK':
            attribute.ATK.value += Number(item.value)
            attribute.ATK.showValue = '+' + (attribute.ATK.value)
            break;
          case 'DEF':
            attribute.DEF.value += Number(item.value)
            attribute.DEF.showValue = '+' + (attribute.DEF.value)
            break;
          case 'HP':
            attribute.MAXHP.value += Number(item.value)
            attribute.MAXHP.showValue = '+' + (attribute.MAXHP.value)
            break;
          case 'CRIT':
            attribute.CRIT.value += Number(item.value)
            attribute.CRIT.showValue = '+' + attribute.CRIT.value + '%'
            break;
          case 'CRITDMG':
            attribute.CRITDMG.value += Number(item.value)
            attribute.CRITDMG.showValue = '+' + attribute.CRITDMG.value + '%'
            break;
          default:
            break;
        }
      })
      attribute.MAXHP.value += 100
      attribute.CURHP = attribute.MAXHP
      // state.playerAttribute.attribute=attribute
      return attribute
    }

  },
  mutations: {
    set_sys_info(state, data) {
      this.state.sysInfo.push(data);
    }
  },
})