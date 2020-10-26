<template>
  <div class="weapon">
    <div class="weaponPanel">
      <div class="title">
        <div class='icon' :style="{'box-shadow':'0 0 2px 1px weapon.quality.color'}">
          <img :src="weapon.iconSrc" alt="">
        </div>
        <div class='name' :style="{color:weapon.quality.color}">{{weapon.quality.name}}的{{weapon.type.name}}</div>
      </div>
      <div class='type'>
        <div>{{weapon.quality.name}}</div>
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
    </div>
    <div>
      <button @click="createNewWeapon">随机生成</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "weaponPanel",
  data() {
    return {
      weapon: {
        quality: {
          name: ''
        },
        type: {
          entry: []
        }
      },
      quality: [{
        name: '破旧',
        qualityCoefficient: 0.5,
        probability: '0.1',
        color: '#eee',
      }, {
        name: '普通',
        qualityCoefficient: 1,
        probability: '0.9',
        color: '#fff',
      }],
      category: [{
        name: '致命之刃',
        entry: [{
          'val': 0.9,
          'showVal': '+11',
          'name': '攻击力'
        }, {
          'val': 1.3,
          'showVal': '+8%',
          'name': '暴击率'
        }]
      },
      {
        name: '战士长剑',
        entry: [{
          'val': 1.1,
          'showVal': '+11',
          'name': '攻击力'
        }, {
          'val': 1,
          'showVal': '+7',
          'name': '护甲'
        }]
      }
      ],
      extraEntry: [{
        'val': 11,
        'showVal': '+11',
        'name': '攻击力'
      }, {
        'val': 8,
        'showVal': '+8%',
        'name': '暴击率'
      }]
    };
  },
  mounted() {
    this.createNewWeapon()
    
  },
  methods: {
    createNewWeapon() {
      this.weapon.iconSrc =this.createIconSrc()
      this.weapon.lv = this.createLv()
      this.weapon.type = this.createType()
      this.weapon.quality = this.createQua()
      this.weapon.extraEntry = this.createExtraEntry()
      console.log(this.weapon)
    },
    createIconSrc() {
      var count = parseInt(Math.random()*20)+1
      if(count<10){
        count='0'+count
      }
      var src = './icons/W_Sword0'+count+'.png'
      return src
    },
    createLv(Max) {
      return parseInt(Math.random() * (Max || 39))+1
    },
    createType() {
      var index = Math.floor((Math.random() * this.category.length));
      let type = this.category[index],lv = this.weapon.lv
      // switch (this.type) {
      //   case value:
          
      //     break;
      
      //   default:
      //     break;
      // }
      return type
    },
    createQua() {
      var index = Math.floor((Math.random() * this.quality.length));
      return this.quality[index]
    },
    createExtraEntry() {
      return [this.extraEntry[0]]
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
  width: 300px;
  height: auto;
  background: rgba(0, 0, 0, 0.4);
  border: #000;
  border-radius: 10px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  padding: 16px;
  box-sizing: border-box;
  .title {
    display: flex;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
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
    border-bottom: 1px solid #ccc;
    div {
      text-align: left;
    }
  }
  .extraEntry {
    width: 100%;
    padding-left: 20px;
    margin-top: 10px;
    div {
      text-align: left;
    }
  }
}
</style>
