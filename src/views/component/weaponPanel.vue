<template>
  <div class="weapon">
    <!-- <div class="btn" style="position:relative;z-index:999;">
      <button @click="createNewWeapon">随机生成</button>
    </div> -->
    <div class="weaponPanel" :style="{'box-shadow':' 0 0 5px 5px '+weapon.quality.color + 'b8'}" v-if="JSON.stringify(weapon)!='{}'">
      <div class="title">
        <div class='icon' :class="{unique:weapon.quality.name=='独特'}" :style="{'box-shadow':'inset 0 0 7px 2px '+weapon.quality.color}">
          <img :src="weapon.type.iconSrc" alt="">
        </div>
        <div class='name' :style="{color:weapon.quality.color}">{{weapon.type.name}} {{weapon.enchantlvl?'(+'+weapon.enchantlvl+')':''}}</div>
      </div>
      <div class='type'>
        <div :style="{color:weapon.quality.color}">{{weapon.quality.name}}</div>
        <div>武器</div>
      </div>
      <div class='lv'>
        <div>lv{{weapon.lv}}</div>
      </div>
      <div class="entry">
        <div v-for="v in weapon.type.entry" :key="v.id">
          <!-- <div>{{v.name}} : {{v.showVal}}</div> -->
          <div>{{v.name}} : {{v.showVal}} <span style="color:#68d5ed" v-if="weapon.enchantlvl">(+{{Math.round(v.value*(1.05**(weapon.enchantlvl)**1.1)-v.value)}})</span></div>
        </div>
      </div>
      <div class="extraEntry">
        <div v-for="v in weapon.extraEntry" :key="v.id">
          <div>{{v.name}} : {{v.showVal}}</div>
        </div>
      </div>
      <div class="des">
        <div>
          {{weapon.type.des}}
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "weaponPanel",
  data() {
    return {
      weapon: {

      },
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
        name: '创世亡命剑',
        des: '只有被选中的勇士才能唤醒它真正的力量。',
        iconSrc: './icons/U_Sword01.png',
        entry: [{
          'valCoefficient': 1.8,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'CRIT',
          'valCoefficient': 1.5,
          'value': '8',
          'showVal': '+8%',
          'name': '暴击率'
        }, {
          'valCoefficient': 1.3,
          'value': '11',
          'showVal': '+11',
          type: 'CRITDMG',
          'name': '暴击伤害'
        }]
      }, {
        name: '无名剑',
        des: '没有人知道它的来历。',
        iconSrc: './icons/U_Sword02.png',
        entry: [{
          'valCoefficient': 2.7,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'CRIT',
          'valCoefficient': 2.5,
          'value': '8',
          'showVal': '+8%',
          'name': '暴击率'
        }]
      }, {
        name: '死亡之刃',
        des: '万物生自守恒，源力破则失。',
        iconSrc: './icons/U_Sword04.png',
        entry: [{
          'valCoefficient': 1.8,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'CRIT',
          'valCoefficient': 1.5,
          'value': '8',
          'showVal': '+8%',
          'name': '暴击率'
        }, {
          'valCoefficient': 1.3,
          'value': '11',
          'showVal': '+11',
          type: 'CRITDMG',
          'name': '暴击伤害'
        }]
      }, {
        name: '霜龙利刃',
        des: '傲雪冷心绝，万念化冰华。',
        iconSrc: './icons/U_Sword05.png',
        entry: [{
          'valCoefficient': 1.8,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'CRIT',
          'valCoefficient': 1.5,
          'value': '8',
          'showVal': '+8%',
          'name': '暴击率'
        }, {
          'valCoefficient': 1.3,
          'value': '11',
          'showVal': '+11',
          type: 'CRITDMG',
          'name': '暴击伤害'
        }]
      }, {
        name: '阿加雷斯血色巨剑',
        des: '诚既勇兮又以武，终刚强兮不可凌。身既死兮神以灵，子魂魄兮为鬼雄。',
        iconSrc: './icons/U_Sword03.png',
        entry: [{
          'valCoefficient': 1.8,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'CRIT',
          'valCoefficient': 1.5,
          'value': '8',
          'showVal': '+8%',
          'name': '暴击率'
        }, {
          'valCoefficient': 1.3,
          'value': '11',
          'showVal': '+11',
          type: 'CRITDMG',
          'name': '暴击伤害'
        }]
      },{
        name: '神龙纳格林之刃',
        des: '神龙纳格林的爪子锻造的利刃',
        iconSrc: './icons/U_Sword06.png',
        entry: [{
          'valCoefficient': 2.8,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        },  {
          'valCoefficient': 2.2,
          'value': '11',
          'showVal': '+11',
          type: 'CRITDMG',
          'name': '暴击伤害'
        }]
      },{
        name: '大师大冒险家之剑',
        des: '大师大冒险家之剑',
        iconSrc: './icons/U_Sword07.png',
        entry: [{
          'valCoefficient': 2.4,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'HP',
          'valCoefficient': 1.8,
          'value': '8',
          'showVal': '8',
          'name': '生命值'
        }]
      },{
        name: '六翼天使武刃',
        des: '六翼天使武刃',
        iconSrc: './icons/U_Sword08.png',
        entry: [{
          'valCoefficient': 2.6,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        },{
          type: 'DEF',
          'valCoefficient': 1.8,
          'value': '8',
          'showVal': '8',
          'name': '防御力'
        }]
      },{
        name: '数珠丸恒次',
        des: '具体情况不明，传说为日莲上人所有',
        iconSrc: './icons/U_Sword09.png',
        entry: [{
          'valCoefficient': 3.9,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }]
      },{
        name: '埃苏莱布斯军刀',
        des: '',
        iconSrc: './icons/U_Sword10.png',
        entry: [{
          'valCoefficient': 1.9,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        },{
          type: 'DEF',
          'valCoefficient': 1.2,
          'value': '8',
          'showVal': '8',
          'name': '防御力'
        },{
          type: 'BLOC',
          'valCoefficient': 1.2,
          'value': '8',
          'showVal': '8',
          'name': '格挡'
        }]
      },],
      category: [{
        name: '狱岩石太刀',
        des: '用狱岩石制作的太刀，据说拥有让使用者潜力爆发的神秘力量',
        iconSrc: './icons/W_Sword016.png',
        entry: [{
          'valCoefficient': 1.2,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'CRIT',
          'valCoefficient': 1.3,
          'value': '8',
          'showVal': '+8%',
          'name': '暴击率'
        }]
      },
      {
        name: '战士长剑',
        des: '六级战士使用的长剑',
        iconSrc: './icons/W_Sword007.png',
        entry: [{
          'valCoefficient': 1.2,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'DEF',
          'valCoefficient': 0.5,
          'value': '8',
          'showVal': '8',
          'name': '防御力'
        }]
      },
      {
        name: '赤柳血刃',
        des: '似乎会给使用者提供生命气息',
        iconSrc: './icons/W_Sword019.png',
        entry: [{
          'valCoefficient': 1.3,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'HP',
          'valCoefficient': 1.1,
          'value': '8',
          'showVal': '8',
          'name': '生命值'
        }]
      },
      {
        name: '普通长剑',
        des: '朴实无华普通长剑，有的只有强力的攻击力',
        iconSrc: './icons/W_Sword001.png',
        entry: [{
          'valCoefficient': 1.7,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }]
      }
        ,
      {
        name: '紫炎波刃剑',
        des: '传说中的狂战士最喜爱的剑。',
        iconSrc: './icons/W_Sword021.png',
        entry: [{
          'valCoefficient': 1.7,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }]
      },
      {
        name: '毛毛的爪子',
        des: '这？这也是武器？',
        iconSrc: './icons/W_Fist003.png',
        entry: [{
          'valCoefficient': 2,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'CRIT',
          'valCoefficient': 0.7,
          'value': '8',
          'showVal': '+8%',
          'name': '暴击率'
        }]
      },
      {
        name: '冰晶之刃',
        des: '剑锋覆盖着冰晶，碰到的敌人都会被冻住。',
        iconSrc: './icons/W_Sword018.png',
        entry: [{
          'valCoefficient': 1.4,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          'valCoefficient': 1.3,
          'value': '11',
          'showVal': '+11',
          type: 'CRITDMG',
          'name': '暴击伤害'
        }]
      }
      ],
      extraEntry: [{
        'value': '11',
        'showVal': '+11',
        type: 'ATK',
        'name': '攻击力'
      }, {
        type: 'CRIT',
        'value': '8',
        'showVal': '+8%',
        'name': '暴击率'
      }, {
        type: 'CRITDMG',
        'value': '20',
        'showVal': '+20%',
        'name': '暴击伤害'
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
        type: 'ATKPERCENT',
        'name': '攻击力'
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
      this.weapon = this.$deepCopy(this.item)
    }
  },
  methods: {
    createNewItem(qualityIndex, lv) {
      var weapon = {}
      weapon.itemType = 'weapon'
      weapon.quality = qualityIndex > -1 ? this.quality[qualityIndex] : this.createQua()
      weapon.lv = lv || this.createLv()
      weapon.type = this.createType(weapon)
      weapon.extraEntry = this.createExtraEntry(weapon)
      return JSON.stringify(weapon)
    },
    createLv(Max) {
      return parseInt(Math.random() * (Max || 39)) + 1
    },
    createType(weapon) {
      if (weapon.quality.name == '独特') {
        var index = Math.floor((Math.random() * this.uniqueCategory.length));
        var type = this.uniqueCategory[index], lv = weapon.lv
      } else {
        var index = Math.floor((Math.random() * this.category.length));
        var type = this.category[index], lv = weapon.lv
      }

      type.entry.map(item => {
        switch (item.type) {
          case 'ATK':
            var random = parseInt(lv * item.valCoefficient + (Math.random() * lv / 2 + 1))
            random = parseInt(random * weapon.quality.qualityCoefficient)
            random = random || 1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'DEF':
            var random = parseInt((lv * item.valCoefficient + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * weapon.quality.qualityCoefficient)
            random = random || 1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'HP':
            var random = parseInt((lv * item.valCoefficient * 10 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * weapon.quality.qualityCoefficient)
            random = random || 1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'CRIT':
            var random = parseInt(Math.random() * 5 + 7)
            random = parseInt(random * weapon.quality.qualityCoefficient)
            item.value = random
            item.showVal = '+' + random + '%'
            break;
          case 'CRITDMG':
            var random = parseInt(Math.random() * 20 + 20)
            random = parseInt(random * weapon.quality.qualityCoefficient)
            item.value = random
            item.showVal = '+' + random + '%'
            break;
          case 'BLOC':
            var random = parseInt((lv * 0.2 * 2 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * weapon.quality.qualityCoefficient)
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
    createExtraEntry(weapon) {
      var n = weapon.quality.extraEntryNum, extraEntry = [], lv = weapon.lv
      for (let i = 0; i < n; i++) {
        var index = Math.floor((Math.random() * this.extraEntry.length));
        extraEntry.push(this.extraEntry[index])
      }
      var b = this.$deepCopy(extraEntry)
      b.map(item => {
        switch (item.type) {
          case 'ATK':
            var random = parseInt(lv * 0.5 + (Math.random() * lv / 2 + 1))
            random = parseInt(random * weapon.quality.qualityCoefficient)
            random = random || 1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'DEF':
            var random = parseInt((lv * 0.2 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * weapon.quality.qualityCoefficient)
            random = random || 1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'HP':
            var random = parseInt((lv * 0.2 * 10 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * weapon.quality.qualityCoefficient)
            random = random || 1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'ATKPERCENT':
            var random = parseFloat(lv * 0.11 + (Math.random() * lv / 10 + 4)).toFixed(2)
            random = parseFloat(random * weapon.quality.qualityCoefficient).toFixed(2)
            random = random || 1
            item.value = random
            item.showVal = '+' + random + '%'
            break;
          case 'DEFPERCENT':
            var random = parseFloat(lv * 0.1 + (Math.random() * lv / 10 + 4)).toFixed(2)
            random = parseFloat(random * weapon.quality.qualityCoefficient).toFixed(2)
            random = random || 1
            item.value = random
            item.showVal = '+' + random + '%'
            break;
          case 'HPPERCENT':
            var random = parseFloat(lv * 0.13 + (Math.random() * lv / 10 + 4)).toFixed(2)
            random = parseFloat(random * weapon.quality.qualityCoefficient).toFixed(2)
            random = random || 1
            item.value = random
            item.showVal = '+' + random + '%'
            break;
          case 'CRIT':
            var random = parseInt(Math.random() * 5 + 5)
            random = parseInt(random * weapon.quality.qualityCoefficient)
            item.value = random
            item.showVal = '+' + random + '%'
            break;
          case 'CRITDMG':
            var random = parseInt(Math.random() * 12 + 20)
            random = parseInt(random * weapon.quality.qualityCoefficient)
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
.weaponPanel {
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
