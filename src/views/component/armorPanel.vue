<template>
  <div class="armor">
    <!-- <div class="btn" style="position:relative;z-index:999;">
      <button @click="createNewarmor">随机生成</button>
    </div> -->
    <div class="armorPanel" :style="{'box-shadow':' 0 0 5px 5px '+armor.quality.color}">
      <div class="title">
        <div class='icon' :style="{'box-shadow':'0 0 2px 1px '+armor.quality.color}">
          <img :src="armor.iconSrc" alt="">
        </div>
        <div class='name' :style="{color:armor.quality.color}">{{armor.quality.name}}的{{armor.type.name}}</div>
      </div>
      <div class='type'>
        <div :style="{color:armor.quality.color}">{{armor.quality.name}}</div>
        <div>武器</div>
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
      armor: {
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
        name: '神话',
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
        des:'用狱岩石制作的太刀，据说拥有让使用者潜力爆发的神秘力量',
        entry: [{
          'valCoefficient': 0.9,
          'val': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'CRIT',
          'valCoefficient': 1.3,
          'val': '8',
          'showVal': '+8%',
          'name': '暴击率'
        }]
      },
      {
        name: '战士长剑',
        des:'六级战士使用的长剑',
        entry: [{
          'valCoefficient': 1.1,
          'val': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'DEF',
          'valCoefficient': 0.4,
          'val': '8',
          'showVal': '8',
          'name': '护甲'
        }]
      },
      {
        name: '赤柳血刃',
        des:'似乎会给使用者提供生命气息',
        entry: [{
          'valCoefficient': 0.9,
          'val': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'HP',
          'valCoefficient': 1.4,
          'val': '8',
          'showVal': '8',
          'name': '生命值'
        }]
      },
      {
        name: '普通长剑',
        des:'朴实无华普通长剑，有的只有强力的攻击力',
        entry: [{
          'valCoefficient': 1.5,
          'val': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }]
      }
      ],
      extraEntry: [{
        'val': '11',
        'showVal': '+11',
        type: 'ATK',
        'name': '攻击力'
      }, {
        type: 'CRIT',
        'val': '8',
        'showVal': '+8%',
        'name': '暴击率'
      }, {
        type: 'CRITDMG',
        'val': '20',
        'showVal': '+20%',
        'name': '暴击伤害'
      }, {
        type: 'HP',
        'val': '20',
        'showVal': '+20',
        'name': '生命值'
      }, {
        type: 'DEF',
        'val': '8',
        'showVal': '+8%',
        'name': '护甲'
      }]
    };
  },
  mounted() {
    // this.createNewarmor()

  },
  methods: {
    createNewarmor() {
      this.armor.iconSrc = this.createIconSrc()
      this.armor.quality = this.createQua()
      this.armor.lv = this.createLv()
      this.armor.type = this.createType()
      this.armor.extraEntry = this.createExtraEntry(this.armor)
      console.log(this.armor)
    },
    createIconSrc() {
      var count = parseInt(Math.random() * 20) + 1
      if (count < 10) {
        count = '0' + count
      }
      var src = './icons/W_Sword0' + count + '.png'
      return src
    },
    createLv(Max) {
      return parseInt(Math.random() * (Max || 39)) + 1
    },
    createType() {
      var index = Math.floor((Math.random() * this.category.length));
      let type = this.category[index], lv = this.armor.lv
      type.entry.map(item => {
        switch (item.type) {
          case 'ATK':
            var random = parseInt(lv * item.valCoefficient + (Math.random() * lv / 2 + 1))
            random = parseInt(random * this.armor.quality.qualityCoefficient)
            item.val = random
            item.showVal = '+' + random
            break;
          case 'DEF':
            var random = parseInt((lv * item.valCoefficient + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * this.armor.quality.qualityCoefficient)
            item.val = random
            item.showVal = '+' + random
            break;
          case 'HP':
            var random = parseInt((lv * item.valCoefficient * 10 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * this.armor.quality.qualityCoefficient)
            item.val = random
            item.showVal = '+' + random
            break;
          case 'CRIT':
            var random = parseInt(Math.random() * 5 + 5)
            random = parseInt(random * this.armor.quality.qualityCoefficient)
            item.val = random
            item.showVal = '+' + random + '%'
            break;
          case 'CRITDMG':
            var random = parseInt(Math.random() * 20 + 10)
            random = parseInt(random * this.armor.quality.qualityCoefficient)
            item.val = random
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
    createExtraEntry(v) {
      var n = v.quality.extraEntryNum, extraEntry = [], lv = v.lv
      for (let i = 0; i < n; i++) {
        var index = Math.floor((Math.random() * this.qualityProbability.length));
        extraEntry.push(this.extraEntry[index])
      }
      var b = JSON.parse(JSON.stringify(extraEntry))
      b.map(item => {
        switch (item.type) {
          case 'ATK':
            var random = parseInt(lv * 0.3 + (Math.random() * lv / 2 + 1))
            random = parseInt(random * this.armor.quality.qualityCoefficient)
            item.val = random
            item.showVal = '+' + random
            break;
          case 'DEF':
            var random = parseInt((lv * 0.2 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * this.armor.quality.qualityCoefficient)
            item.val = random
            item.showVal = '+' + random
            break;
          case 'HP':
            var random = parseInt((lv * 0.2 * 10 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * this.armor.quality.qualityCoefficient)
            item.val = random
            item.showVal = '+' + random
            break;
          case 'CRIT':
            var random = parseInt(Math.random() * 5 + 2)
            random = parseInt(random * this.armor.quality.qualityCoefficient)
            item.val = random
            item.showVal = '+' + random + '%'
            break;
          case 'CRITDMG':
            var random = parseInt(Math.random() * 12 + 10)
            random = parseInt(random * this.armor.quality.qualityCoefficient)
            item.val = random
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
  width: 300px;
  height: auto;
  background: rgba(0, 0, 0, 0.8);
  border: #393839;
  border-radius: 5px;
  padding: 16px;
  box-sizing: border-box;
  .title {
    display: flex;
    padding-bottom: 10px;
    border-bottom: 1px solid #777;
    .icon {
      width: 46px;
      height: 46px;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
    }
    .name {
      height: 46px;
      margin-left: 20px;
      line-height: 46px;
    }
  }
  .type {
    padding: 10px;
    display: flex;
    width: 100%;
    align-content: center;
    justify-content: space-between;
  }
  .lv {
    padding-right: 10px;
    display: flex;
    width: 100%;
    align-content: center;
    justify-content: flex-end;
  }
  .entry {
    width: 100%;
    padding-left: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #777;
    div {
      text-align: left;
    }
  }
  .extraEntry {
    width: 100%;
    padding-left: 20px;
    margin-top: 10px;
    padding-bottom: 10px;
    color:#68d5ed;
    border-bottom: 1px solid #777;
    div {
      text-align: left;
    }
  }
}
.des{
  color:#777;
  font-size: 12px;
  margin-top: 10px;
  text-align: left;
  text-indent: 24px;
}
.btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  button{
    padding: 6px 12px;
  }
}
</style>
