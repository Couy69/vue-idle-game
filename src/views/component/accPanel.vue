<template>
  <div class="acc">
    <!-- <div class="btn" style="position:relative;z-index:999;">
      <button @click="createNewacc">随机生成</button>
    </div> -->
    <div class="accPanel" :style="{'box-shadow':' 0 0 5px 5px '+acc.quality.color}">
      <div class="title">
        <div class='icon' :style="{'box-shadow':'0 0 2px 1px '+acc.quality.color}">
          <img :src="acc.type.iconSrc" alt="">
        </div>
        <div class='name' :style="{color:acc.quality.color}">{{acc.quality.name}}的{{acc.type.name}}</div>
      </div>
      <div class='type'>
        <div :style="{color:acc.quality.color}">{{acc.quality.name}}</div>
        <div>饰品</div>
      </div>
      <div class='lv'>
        <div>lv{{acc.lv}}</div>
      </div>
      <div class="entry">
        <div v-for="v in acc.type.entry" :key="v.id">
          <div>{{v.name}} : {{v.showVal}}</div>
        </div>
      </div>
      <div class="extraEntry">
        <div v-for="v in acc.extraEntry" :key="v.id">
          <div>{{v.name}} : {{v.showVal}}</div>
        </div>
      </div>
      <div class="des">
        <div>
          {{acc.type.des}}
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "accPanel",
  data() {
    return {
      acc: {"iconSrc":"./icons/A_A3.png","lv":8,"quality":{"name":"普通","qualityCoefficient":1,"probability":"0.55","color":"#fff","extraEntryNum":2},"type":{"name":"十字军项链","des":"十字军佩戴的项链","iconSrc":"./icons/Ac_1.png","entry":[{"valCoefficient":0.9,"value":9,"showVal":"+9","type":"DEF","name":"防御力"}]},"extraEntry":[{"type":"DEF","value":5,"showVal":"+5","name":"防御力"},{"type":"CRITDMG","value":21,"showVal":"+21%","name":"暴击伤害"}]},
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
          name: '生命指环',
          des: '据说拥有增强佩戴者体质的神秘功效',
          iconSrc: './icons/Ac_9.png',
          entry: [{
            'valCoefficient': 1.1,
            'value': '11',
            'showVal': '+11',
            type: 'HP',
            'name': '生命值'
          }]
        },
        {
          name: '十字军项链',
          des: '十字军佩戴的项链',
          iconSrc: './icons/Ac_1.png',
          entry: [{
            'valCoefficient': 0.9,
            'value': '11',
            'showVal': '+11',
            type: 'DEF',
            'name': '防御力'
          }]
        },
        {
          name: '冰龙凝雪',
          des: '冰龙凝雪',
          iconSrc: './icons/Ac_7.png',
          entry: [{
            'valCoefficient': 0.9,
            'value': '11',
            'showVal': '+11',
            type: 'CRITDMG',
            'name': '暴击伤害'
          }]
        },
        {
          name: '银魂之眼',
          des: '银魂之眼',
          iconSrc: './icons/Ac_7.png',
          entry: [{
            'valCoefficient': 0.9,
            'value': '11',
            'showVal': '+11',
            type: 'CRIT',
            'name': '暴击率'
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
  props:['item'],
  mounted() {
    this.acc = this.item
  },
  methods: {
    createNewacc() {
      this.acc.quality = this.createQua()
      this.acc.lv = this.createLv()
      this.acc.type = this.createType()
      this.acc.extraEntry = this.createExtraEntry(this.acc)
      console.log(this.acc)
    },
    createLv(Max) {
      return parseInt(Math.random() * (Max || 39)) + 1
    },
    createType() {
      var index = Math.floor((Math.random() * this.category.length));
      let type = this.category[index], lv = this.acc.lv
      type.entry.map(item => {
        switch (item.type) {
          case 'ATK':
            var random = parseInt(lv * item.valCoefficient + (Math.random() * lv / 2 + 1))
            random = parseInt(random * this.acc.quality.qualityCoefficient)
            item.value = random
            item.showVal = '+' + random
            break;
          case 'DEF':
            var random = parseInt((lv * item.valCoefficient + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * this.acc.quality.qualityCoefficient)
            item.value = random
            item.showVal = '+' + random
            break;
          case 'HP':
            var random = parseInt((lv * item.valCoefficient * 10 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * this.acc.quality.qualityCoefficient)
            item.value = random
            item.showVal = '+' + random
            break;
          case 'CRIT':
            var random = parseInt(Math.random() * 5 + 5)
            random = parseInt(random * this.acc.quality.qualityCoefficient)
            item.value = random
            item.showVal = '+' + random + '%'
            break;
          case 'CRITDMG':
            var random = parseInt(Math.random() * 20 + 10)
            random = parseInt(random * this.acc.quality.qualityCoefficient)
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
    createExtraEntry(v) {
      var n = v.quality.extraEntryNum, extraEntry = [], lv = v.lv
      for (let i = 0; i < n; i++) {
        var index = Math.floor((Math.random() * this.extraEntry.length));
        console.log(index)
        extraEntry.push(this.extraEntry[index])
      }
      console.log(extraEntry)
      var b = JSON.parse(JSON.stringify(extraEntry))
      b.map(item => {
        switch (item.type) {
          case 'ATK':
            var random = parseInt(lv * 0.3 + (Math.random() * lv / 2 + 1))
            random = parseInt(random * this.acc.quality.qualityCoefficient)
            item.value = random
            item.showVal = '+' + random
            break;
          case 'DEF':
            var random = parseInt((lv * 0.2 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * this.acc.quality.qualityCoefficient)
            item.value = random
            item.showVal = '+' + random
            break;
          case 'HP':
            var random = parseInt((lv * 0.2 * 10 + (Math.random() * lv / 2 + 1)))
            random = parseInt(random * this.acc.quality.qualityCoefficient)
            item.value = random
            item.showVal = '+' + random
            break;
          case 'CRIT':
            var random = parseInt(Math.random() * 5 + 2)
            random = parseInt(random * this.acc.quality.qualityCoefficient)
            item.value = random
            item.showVal = '+' + random + '%'
            break;
          case 'CRITDMG':
            var random = parseInt(Math.random() * 12 + 10)
            random = parseInt(random * this.acc.quality.qualityCoefficient)
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
.accPanel {
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
    color: #68d5ed;
    border-bottom: 1px solid #777;
    div {
      text-align: left;
    }
  }
}
.des {
  color: #777;
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
  button {
    padding: 6px 12px;
  }
}
</style>
