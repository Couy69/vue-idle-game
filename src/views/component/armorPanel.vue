<template>
  <div class="armor">
    <!-- <div class="btn" style="position:relative;z-index:999;">
      <button @click="createNewarmor">随机生成</button>
    </div> -->
    <div class="armorPanel" :style="{'box-shadow':' 0 0 5px 5px '+armor.quality.color}"  v-if="JSON.stringify(armor)!='{}'">
      <div class="title">
        <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px '+armor.quality.color}">
          <img :src="armor.type.iconSrc" alt="">
        </div>
        <div class='name' :style="{color:armor.quality.color}">{{armor.type.name}}</div>
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
          <div>{{v.name}} : {{v.showVal}}</div>
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
      }],
      category: [
        {
          name: '紫金守护胸甲',
          des: '够肉才能输出',
          iconSrc:'./icons/A_A2.png',
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
          iconSrc:'./icons/A_A5.png',
          entry: [{
            'valCoefficient': 1.1,
            'value': '11',
            'showVal': '+11',
            type: 'DEF',
            'name': '防御力'
          }, {
            type: 'HP',
            'valCoefficient': 0.7,
            'value': '8',
            'showVal': '8',
            'name': '生命值'
          }]
        },
        {
          name: '天权轻甲',
          des: '舍弃了防御性能的轻甲，因为更加轻便，攻击性能更加突出',
          iconSrc:'./icons/A_A7.png',
          entry: [{
            'valCoefficient': 0.5,
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
          },{
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
          iconSrc:'./icons/A_A3.png',
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
      }]
    };
  },
  props:['item'],
  mounted() {
  },
  watch: {
    item() {
      this.armor = JSON.parse(JSON.stringify(this.item))
    }
  },
  methods: {
    createNewItem(qualityIndex,lv) {
      var armor ={}
      armor.itemType= 'armor'
      armor.quality = qualityIndex>-1?this.quality[qualityIndex]:this.createQua()
      armor.lv = lv||this.createLv()
      armor.type = this.createType(armor)
      armor.extraEntry = this.createExtraEntry(armor)
      return JSON.stringify(armor)
    },
    createLv(Max) {
      return parseInt(Math.random() * (Max || 39)) + 1
    },
    createType(armor) {
      var index = Math.floor((Math.random() * this.category.length));
      let type = this.category[index], lv = armor.lv
      type.entry.map(item => {
        switch (item.type) {
          case 'ATK':
            var random = parseInt(lv * item.valCoefficient + (Math.random() * lv / 2 + 1))
            random = parseInt(random * armor.quality.qualityCoefficient)
            random = random||1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'DEF':
            var random = parseInt((lv * item.valCoefficient + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * armor.quality.qualityCoefficient)
            random = random||1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'HP':
            var random = parseInt((lv * item.valCoefficient * 10 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * armor.quality.qualityCoefficient)
            random = random||1
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
            var random = parseInt(Math.random() * 20 + 10)
            random = parseInt(random * armor.quality.qualityCoefficient)
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
    createExtraEntry(armor) {
      var n = armor.quality.extraEntryNum, extraEntry = [], lv = armor.lv
      for (let i = 0; i < n; i++) {
        var index = Math.floor((Math.random() * this.extraEntry.length));
        extraEntry.push(this.extraEntry[index])
      }
      var b = JSON.parse(JSON.stringify(extraEntry))
      b.map(item => {
        switch (item.type) {
          case 'ATK':
            var random = parseInt(lv * 0.3 + (Math.random() * lv / 2 + 1))
            random = parseInt(random * armor.quality.qualityCoefficient)
            random = random||1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'DEF':
            var random = parseInt((lv * 0.2 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * armor.quality.qualityCoefficient)
            random = random||1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'HP':
            var random = parseInt((lv * 0.2 * 10 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * armor.quality.qualityCoefficient)
            random = random||1
            item.value = random
            item.showVal = '+' + random
            break;
          case 'CRIT':
            var random = parseInt(Math.random() * 5 + 2)
            random = parseInt(random * armor.quality.qualityCoefficient)
            item.value = random
            item.showVal = '+' + random + '%'
            break;
          case 'CRITDMG':
            var random = parseInt(Math.random() * 12 + 10)
            random = parseInt(random * armor.quality.qualityCoefficient)
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
.armorPanel {
  font-family: Lato-Regular, "Noto Sans SC", "Noto Sans", "Source Sans Pro",
    "Avenir", Helvetica, Arial, sans-serif !important;
  color: #f1f1f1;
  width: 3.00rem;
  height: auto;
  background: rgba(0, 0, 0, 0.8);
  border: #393839;
  border-radius: .05rem;
  padding: .16rem;
  box-sizing: border-box;
  .title {
    display: flex;
    padding-bottom: .10rem;
    border-bottom: 1px solid #777;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: .04rem;
    }
    .name {
      height: .46rem;
      margin-left: .20rem;
      line-height: .46rem;
    }
  }
  .type {
    padding: .10rem;
    display: flex;
    width: 100%;
    align-content: center;
    justify-content: space-between;
  }
  .lv {
    padding-right: .10rem;
    display: flex;
    width: 100%;
    align-content: center;
    justify-content: flex-end;
  }
  .entry {
    width: 100%;
    padding-left: .20rem;
    padding-bottom: .10rem;
    border-bottom: 1px solid #777;
    div {
      text-align: left;
    }
  }
  .extraEntry {
    width: 100%;
    padding-left: .20rem;
    margin-top: .10rem;
    padding-bottom: .10rem;
    color: #68d5ed;
    border-bottom: 1px solid #777;
    div {
      text-align: left;
    }
  }
}
.des {
  color: #777;
  font-size: .12rem;
  margin-top: .10rem;
  text-align: left;
  text-indent: .24rem;
}
.btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: .20rem;
  button {
    padding: .06rem .12rem;
  }
}
</style>
