<template>
  <div class="weapon">
    <!-- <div class="btn" style="position:relative;z-index:999;">
      <button @click="createNewWeapon">随机生成</button>
    </div> -->
    <div class="weaponPanel" :style="{'box-shadow':' 0 0 5px 5px '+weapon.quality.color}" v-if="JSON.stringify(weapon)!='{}'">
      <div class="title">
        <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px '+weapon.quality.color}">
          <img :src="weapon.type.iconSrc" alt="">
        </div>
        <div class='name' :style="{color:weapon.quality.color}">{{weapon.type.name}}</div>
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
          <div>{{v.name}} : {{v.showVal}}</div>
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
      }],
      category: [{
        name: '狱岩石太刀',
        des: '用狱岩石制作的太刀，据说拥有让使用者潜力爆发的神秘力量',
        iconSrc: './icons/W_Sword016.png',
        entry: [{
          'valCoefficient': 0.9,
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
          'valCoefficient': 1.1,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'DEF',
          'valCoefficient': 0.4,
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
          'valCoefficient': 1.1,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'HP',
          'valCoefficient': 0.9,
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
          'valCoefficient': 1.5,
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
          'valCoefficient': 1.6,
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
          'valCoefficient': 1.7,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }]
      },
      {
        name: '冰晶之刃',
        des: '剑锋覆盖着冰晶，碰到的敌人都会被冻住。',
        iconSrc: './icons/W_Sword018.png',
        entry: [{
          'valCoefficient': 1.3,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        },{
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
      }]
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
      var index = Math.floor((Math.random() * this.category.length));
      let type = this.category[index], lv = weapon.lv
      type.entry.map(item => {
        switch (item.type) {
          case 'ATK':
            var random = parseInt(lv * item.valCoefficient + (Math.random() * lv / 2 + 1))
            random = parseInt(random * weapon.quality.qualityCoefficient)
            random = random||1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'DEF':
            var random = parseInt((lv * item.valCoefficient + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * weapon.quality.qualityCoefficient)
            random = random||1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'HP':
            var random = parseInt((lv * item.valCoefficient * 10 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * weapon.quality.qualityCoefficient)
            random = random||1
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
            var random = parseInt(lv * 0.3 + (Math.random() * lv / 2 + 1))
            random = parseInt(random * weapon.quality.qualityCoefficient)
            random = random||1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'DEF':
            var random = parseInt((lv * 0.2 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * weapon.quality.qualityCoefficient)
            random = random||1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'HP':
            var random = parseInt((lv * 0.2 * 10 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * weapon.quality.qualityCoefficient)
            random = random||1
            item.value = random
            item.showVal = '+' + random
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
@font-face {
  font-family: "Lato-Regular";
  src: url(../../assets/fonts/Lato-Regular.ttf);
}
.weaponPanel {
  font-family: Lato-Regular, "Noto Sans SC", "Noto Sans", "Source Sans Pro",
    "Avenir", Helvetica, Arial, sans-serif !important;
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
      height: .46rem;
      margin-left: .20rem;
      line-height: .46rem;
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
