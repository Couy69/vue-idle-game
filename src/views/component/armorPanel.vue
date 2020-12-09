<template>
  <div class="armor">
    <!-- <div class="btn" style="position:relative;z-index:999;">
      <button @click="createNewarmor">随机生成</button>
    </div> -->
    <div class="armorPanel" :style="{'box-shadow':' 0 0 5px 5px '+armor.quality.color + 'b8'}" v-if="JSON.stringify(armor)!='{}'">
      <div class="title">
        <div class='icon' :class="{unique:armor.quality.name=='独特'}" :style="{'box-shadow':'inset 0 0 7px 2px '+armor.quality.color}">
          <img :src="armor.type.iconSrc" alt="">
        </div>
        <div class='name' :style="{color:armor.quality.color}">{{armor.type.name}} {{armor.enchantlvl?'(+'+armor.enchantlvl+')':''}}</div>
      </div>
      <div class='type'>
        <div :style="{color:armor.quality.color}">{{armor.quality.name}}</div>
        <div>防具</div>
      </div>
      <div class='lv'>
        <div>lv{{armor.lv}}</div>
      </div>
      <div class="entry">
        <div v-for="v in armor.type.entry" :key="v.id">
          <!-- <div>{{v.name}} : {{v.showVal}}</div> -->
          <div>{{v.name}} : {{v.showVal}} <span style="color:#68d5ed" v-if="armor.enchantlvl">(+{{Math.round(v.value*(1.05**(armor.enchantlvl)**1.1)-v.value)}})</span></div>
        </div>
      </div>
      <div class="extraEntry">
        <div v-for="v in armor.extraEntry" :key="v.id">
          <div>{{v.name}} : {{v.showVal}}</div>
        </div>
      </div>
      <div class="des">
        <div>
          {{armor.type.des}}
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "armorPanel",
  data() {
    return {
      armor: {},
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
      }, {
        name: '独特',
        qualityCoefficient: 2.2,
        probability: '0',
        color: '#ff0000', extraEntryNum: 5,
      }],
      uniqueCategory: [{
        name: '红月的夜行衣',
        des: '',
        iconSrc: './icons/U_Armor06.png',
        entry: [{
          'valCoefficient': 1.2,
          'value': '11',
          'showVal': '+11',
          type: 'DEF',
          'name': '防御力'
        }, {
          type: 'HP',
          'valCoefficient': 1.5,
          'value': '8',
          'showVal': '8',
          'name': '生命值'
        }, {
          'valCoefficient': 1.2,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }]
      }, {
        name: '肃清者戎衣',
        des: '相传看到这一袭黑衣的人都死了。',
        iconSrc: './icons/U_Armor05.png',
        entry: [{
          type: 'HP',
          'valCoefficient': 1.6,
          'value': '8',
          'showVal': '8',
          'name': '生命值'
        }, {
          'valCoefficient': 2.4,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        },{
          'valCoefficient': 1.2,
          'value': '11',
          'showVal': '+11',
          type: 'BLOC',
          'name': '格挡'
        },]
      }, {
        name: '争执连身衣',
        des: '',
        iconSrc: './icons/U_Armor01.png',
        entry: [{
          'valCoefficient': 1.0,
          'value': '11',
          'showVal': '+11',
          type: 'DEF',
          'name': '防御力'
        }, {
          type: 'HP',
          'valCoefficient': 1.4,
          'value': '8',
          'showVal': '8',
          'name': '生命值'
        }, {
          'valCoefficient': 1.4,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }]
      }, {
        name: '剑豪盔甲',
        des: '',
        iconSrc: './icons/U_Armor02.png',
        entry: [{
          'valCoefficient': 2.1,
          'value': '11',
          'showVal': '+11',
          type: 'DEF',
          'name': '防御力'
        }, {
          type: 'HP',
          'valCoefficient': 2.6,
          'value': '8',
          'showVal': '8',
          'name': '生命值'
        }]
      }, {
        name: '隐武士铠甲',
        des: '',
        iconSrc: './icons/U_Armor03.png',
        entry: [{
          'valCoefficient': 1.3,
          'value': '11',
          'showVal': '+11',
          type: 'DEF',
          'name': '防御力'
        }, {
          type: 'HP',
          'valCoefficient': 1.7,
          'value': '8',
          'showVal': '8',
          'name': '生命值'
        }, {
          'valCoefficient': 0.9,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }]
      }, {
        name: '芬撒里尔追踪者',
        des: '',
        iconSrc: './icons/U_Armor04.png',
        entry: [{
          'valCoefficient': 0.9,
          'value': '11',
          'showVal': '+11',
          type: 'DEF',
          'name': '防御力'
        }, {
          'valCoefficient': 1.7,
          'value': '11',
          'showVal': '+11',
          type: 'CRITDMG',
          'name': '暴击伤害'
        }, {
          'valCoefficient': 1.7,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }]
      },{
        name: '先代狂龙战士盔甲',
        des: '',
        iconSrc: './icons/U_Armor07.png',
        entry: [{
          'valCoefficient': 1.5,
          'value': '11',
          'showVal': '+11',
          type: 'DEF',
          'name': '防御力'
        }, {
          'valCoefficient': 1.2,
          'value': '11',
          'showVal': '+11',
          type: 'BLOC',
          'name': '格挡'
        },{
          type: 'HP',
          'valCoefficient': 1.4,
          'value': '8',
          'showVal': '8',
          'name': '生命值'
        },]
      },],
      category: [
        {
          name: '紫金守护胸甲',
          des: '够肉才能输出',
          iconSrc: './icons/A_A2.png',
          entry: [{
            'valCoefficient': 2,
            'value': '11',
            'showVal': '+11',
            type: 'DEF',
            'name': '防御力'
          }, {
            type: 'HP',
            'valCoefficient': 0.6,
            'value': '8',
            'showVal': '8',
            'name': '生命值'
          }]
        },
        {
          name: '战士重铠',
          des: '六级战士使用的重型铠甲',
          iconSrc: './icons/A_A5.png',
          entry: [{
            'valCoefficient': 1.1,
            'value': '11',
            'showVal': '+11',
            type: 'DEF',
            'name': '防御力'
          }, {
            type: 'HP',
            'valCoefficient': 0.8,
            'value': '8',
            'showVal': '8',
            'name': '生命值'
          }]
        },
        {
          name: '天权轻甲',
          des: '舍弃了防御性能的轻甲，因为更加轻便，攻击性能更加突出',
          iconSrc: './icons/A_A7.png',
          entry: [{
            'valCoefficient': 0.7,
            'value': '11',
            'showVal': '+11',
            type: 'DEF',
            'name': '防御力'
          }, {
            type: 'HP',
            'valCoefficient': 0.5,
            'value': '8',
            'showVal': '8',
            'name': '生命值'
          }, {
            'valCoefficient': 0.5,
            'value': '11',
            'showVal': '+11',
            type: 'ATK',
            'name': '攻击力'
          }]
        },
        {
          name: '赤柳血铠',
          des: '似乎会给使用者提供生命气息',
          iconSrc: './icons/A_A3.png',
          entry: [{
            'valCoefficient': 0.9,
            'value': '11',
            'showVal': '+11',
            type: 'DEF',
            'name': '防御力'
          }, {
            type: 'HP',
            'valCoefficient': 1.2,
            'value': '8',
            'showVal': '8',
            'name': '生命值'
          }]
        },
        {
          name: '哈皮毛毛连身衣',
          des: '哈皮毛毛',
          iconSrc: './icons/A_A9.png',
          entry: [{
            'valCoefficient': 0.8,
            'value': '11',
            'showVal': '+11',
            type: 'DEF',
            'name': '防御力'
          }, {
            type: 'HP',
            'valCoefficient': 0.8,
            'value': '8',
            'showVal': '8',
            'name': '生命值'
          }, {
            'valCoefficient': 0.4,
            'value': '11',
            'showVal': '+11',
            type: 'ATK',
            'name': '攻击力'
          }]
        }
      ],
      extraEntry: [{
        'value': '11',
        'showVal': '+11',
        type: 'ATK',
        'name': '攻击力'
      }, {
        type: 'HP',
        'value': '20',
        'showVal': '+20',
        'name': '生命值'
      }, {
        type: 'DEF',
        'value': '8',
        'showVal': '+8%',
        'name': '防御力'
      }, {
        'value': '11%',
        'showVal': '+11%',
        type: 'DEFPERCENT',
        'name': '防御力'
      }, {
        'value': '11%',
        'showVal': '+11%',
        type: 'HPPERCENT',
        'name': '生命值'
      },]
    };
  },
  props: ['item'],
  mounted() {
  },
  watch: {
    item() {
      this.armor = this.$deepCopy(this.item)
    }
  },
  methods: {
    createNewItem(qualityIndex, lv) {
      var armor = {}
      armor.itemType = 'armor'
      armor.quality = qualityIndex > -1 ? this.quality[qualityIndex] : this.createQua()
      armor.lv = lv || this.createLv()
      armor.type = this.createType(armor)
      armor.extraEntry = this.createExtraEntry(armor)
      return JSON.stringify(armor)
    },
    createLv(Max) {
      return parseInt(Math.random() * (Max || 39)) + 1
    },
    createType(armor) {
      if (armor.quality.name == '独特') {
        var index = Math.floor((Math.random() * this.uniqueCategory.length));
        var type = this.uniqueCategory[index], lv = armor.lv
      } else {
        var index = Math.floor((Math.random() * this.category.length));
        var type = this.category[index], lv = armor.lv
      }
      type.entry.map(item => {
        switch (item.type) {
          case 'ATK':
            var random = parseInt(lv * item.valCoefficient + (Math.random() * lv / 2 + 1))
            random = parseInt(random * armor.quality.qualityCoefficient)
            random = random || 1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'DEF':
            var random = parseInt((lv * item.valCoefficient + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * armor.quality.qualityCoefficient)
            random = random || 1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'HP':
            var random = parseInt((lv * item.valCoefficient * 10 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * armor.quality.qualityCoefficient)
            random = random || 1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'CRIT':
            var random = parseInt(Math.random() * 5 + 5)
            random = parseInt(random * armor.quality.qualityCoefficient)
            item.value = random
            item.showVal = '+' + random + '%'
            break;
          case 'CRITDMG':
            var random = parseInt(Math.random() * 20 + 20)
            random = parseInt(random * armor.quality.qualityCoefficient)
            item.value = random
            item.showVal = '+' + random + '%'
            break;
          case 'BLOC':
            var random = parseInt((lv * 1.3 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * armor.quality.qualityCoefficient)
            random = random || 1
            item.value = random
            item.showVal = '+' + random
            break;
          default:
            break;
        }
      })
      return type
    },
    createQua() {
      var index = Math.floor((Math.random() * this.qualityProbability.length));
      var a = this.qualityProbability[index], b = this.qualityProbability, quality
      switch (a) {
        case b[0]:
          quality = this.quality[0]
          break;
        case b[1]:
          quality = this.quality[1]
          break;
        case b[2]:
          quality = this.quality[2]
          break;
        case b[3]:
          quality = this.quality[3]
          break;
        default:
          break;
      }
      return quality
    },
    createExtraEntry(armor) {
      var n = armor.quality.extraEntryNum, extraEntry = [], lv = armor.lv
      for (let i = 0; i < n; i++) {
        var index = Math.floor((Math.random() * this.extraEntry.length));
        extraEntry.push(this.extraEntry[index])
      }
      var b = this.$deepCopy(extraEntry)
      b.map(item => {
        switch (item.type) {
          case 'ATK':
            var random = parseInt(lv * 0.3 + (Math.random() * lv / 2 + 1))
            random = parseInt(random * armor.quality.qualityCoefficient)
            random = random || 1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'DEF':
            var random = parseInt((lv * 0.2 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * armor.quality.qualityCoefficient)
            random = random || 1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'HP':
            var random = parseInt((lv * 0.2 * 10 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * armor.quality.qualityCoefficient)
            random = random || 1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'CRIT':
            var random = parseInt(Math.random() * 5 + 5)
            random = parseInt(random * armor.quality.qualityCoefficient)
            item.value = random
            item.showVal = '+' + random + '%'
            break;
          case 'CRITDMG':
            var random = parseInt(Math.random() * 12 + 20)
            random = parseInt(random * armor.quality.qualityCoefficient)
            item.value = random
            item.showVal = '+' + random + '%'
            break;
          case 'DEFPERCENT':
            var random = parseFloat(lv * 0.12 + (Math.random() * lv / 10 + 4)).toFixed(2)
            random = parseFloat(random * armor.quality.qualityCoefficient).toFixed(2)
            random = random || 1
            item.value = random
            item.showVal = '+' + random + '%'
            break;
          case 'HPPERCENT':
            var random = parseFloat(lv * 0.11 + (Math.random() * lv / 10 + 4)).toFixed(2)
            random = parseFloat(random * armor.quality.qualityCoefficient).toFixed(2)
            random = random || 1
            item.value = random
            item.showVal = '+' + random + '%'
            break;
          default:
            break;
        }
      })
      extraEntry = b
      return extraEntry
    }
  }
};


</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.armorPanel {
  color: #f1f1f1;
  width: 3rem;
  height: auto;
  background: rgba(0, 0, 0, 0.8);
  border: #393839;
  border-radius: 0.05rem;
  padding: 0.16rem;
  box-sizing: border-box;
  .title {
    display: flex;
    padding-bottom: 0.1rem;
    border-bottom: 1px solid #777;
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
    padding-left: 0.2rem;
    padding-bottom: 0.1rem;
    border-bottom: 1px solid #777;
    div {
      text-align: left;
    }
  }
  .extraEntry {
    width: 100%;
    padding-left: 0.2rem;
    margin-top: 0.1rem;
    padding-bottom: 0.1rem;
    color: #68d5ed;
    border-bottom: 1px solid #777;
    div {
      text-align: left;
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
.btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.2rem;
  button {
    padding: 0.06rem 0.12rem;
  }
}
</style>
