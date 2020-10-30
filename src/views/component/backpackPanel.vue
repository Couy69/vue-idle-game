<template>
  <div class="backpackPanel">
    <div v-for="(v, k) in grid" :key="k">
      <div class="grid">
        <div class="title" v-if="v.lv" @contextmenu.prevent="openMenu(k,$event)" @mouseover="showItemInfo($event,v.itemType,v)" @mouseleave="closeItemInfo">
          <div class="icon" :style="{ 'box-shadow': 'inset 0 0 7px 2px ' + v.quality.color }">
            <img :src="v.type.iconSrc" alt="" />
          </div>
        </div>
      </div>
    </div>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="equipTheEquipment()">装备</li>
      <li @click="sellTheEquipment()">售出</li>
    </ul>
  </div>
</template>
<script>
import { assist } from '../../assets/js/assist';
export default {
  name: "backpackPanel",
  data() {
    return {
      grid: [],
      left:'',
      top:'',
      visible:false,
      currentItem:{},
      currentItemIndex:'',
    };
  },
  mixins: [assist],
  created() {
    this.grid = new Array(32).fill({});
  },
  watch:{
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  mounted() {
    var item = {
      lv: 30,
      itemType:'armor',
      quality: {
        name: "神器",
        qualityCoefficient: 1.5,
        probability: "0.15",
        color: "#ff00ff",
        extraEntryNum: 3,
      },
      type: {
        name: "赤柳血铠",
        des: "似乎会给使用者提供生命气息",
        iconSrc: "./icons/A_A3.png",
        entry: [
          {
            valCoefficient: 0.9,
            value: 51,
            showVal: "+51",
            type: "DEF",
            name: "防御力",
          },
          {
            type: "HP",
            valCoefficient: 1.4,
            value: 634,
            showVal: "+634",
            name: "生命值",
          },
        ],
      },
      extraEntry: [
        { type: "HP", value: 99, showVal: "+99", name: "生命值" },
        { type: "HP", value: 93, showVal: "+93", name: "生命值" },
        { type: "HP", value: 97, showVal: "+97", name: "生命值" },
      ],
    };
    // this.$set(this.grid,0,item)
  },
  methods: {
    openMenu(k, e) {
      this.currentItemIndex=k
      this.currentItem=this.grid[k]
      console.log(e)
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 15; // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.offsetY;
      this.visible = true;
    },
    closeMenu() {
      this.visible = false;
    },
    showItemInfo($event, type, item) {
      var p = this.findComponentUpward(this, 'index')
      p.showItemInfo($event, type, item)
    },
    closeItemInfo() {
      var p = this.findComponentUpward(this, 'index')
      p.weaponShow = p.armorShow = p.accShow = false
    },
    equipTheEquipment(){
      switch (this.currentItem.itemType) {
        case 'weapon':
          this.grid[this.currentItemIndex] = this.$store.state.playerAttribute.weapon
          this.$store.commit('set_player_weapon',this.currentItem)
          break;
        case 'armor':
          this.grid[this.currentItemIndex] = this.$store.state.playerAttribute.armor
          this.$store.commit('set_player_armor',this.currentItem)
          break;
        case 'acc':
          this.grid[this.currentItemIndex] = this.$store.state.playerAttribute.acc
          this.$store.commit('set_player_acc',this.currentItem)
          break;
        default:
          break;
      }
      
    },
    sellTheEquipment(){
      this.grid[this.currentItemIndex] = {}
      var gold = this.currentItem.lv*this.currentItem.quality.qualityCoefficient*10
      this.$store.commit("set_player_gold", gold);
      this.$store.commit("set_sys_info", {
          msg: `
              出售装备获得金币${gold}
            `,
          type: 'trophy',
        });
    }
  },
};
</script>
<style lang="scss" scoped>
.backpackPanel {
  width: 5rem;
  height: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.14rem 0.14rem;
  justify-items: flex-start;
  align-items: flex-start;
  position: relative;
}
.grid {
  width: 0.6rem;
  height: 0.6rem;
  border: 1px solid #ccc;
  margin-left: -1px;
  margin-top: -1px;
  box-shadow: inset 0 0 6px 6px rgba($color: #000000, $alpha: 0.5);
  .title {
    display: flex;
    width: 100%;
    cursor: pointer;
    .icon {
      width: 0.56rem;
      height: 0.56rem;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.04rem;
    }
  }
}
.contextmenu {
  margin: 0;
  background: #000;
  border:1px solid #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

  li {
    margin: 0;
    padding: 9px 16px;
    cursor: pointer;
    border-top:1px solid #ccc;
    margin-top: -1px;
    font-size: 14px;
    letter-spacing: 6px;
    &:hover {
      color: #ccc;
    }
  }
}
</style>
