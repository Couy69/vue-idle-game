<template>
  <div class="shop">
    <div class="content">
      <div class="grid" v-for="(v, k) in grid" :key="k">
        <div
          class="title"
          v-if="v.lv"
          @contextmenu.prevent="openMenu(k, $event)"
          @mouseover="showItemInfo($event, v.itemType, v)"
          @mouseleave="closeItemInfo"
        >
          <div
            class="icon"
            :style="{ 'box-shadow': 'inset 0 0 7px 2px ' + v.quality.color }"
          >
            <img :src="v.type.iconSrc" alt="" />
          </div>
          <span class="info">{{v.lv * v.quality.qualityCoefficient * 300}}</span>
        </div>
      </div>
    </div>
    <div class="handle">
      
      <div class="info">
        <span v-show="timeStart" class="timeStart">下次刷新次数获取：{{timeo}}s</span>
        <span>剩余刷新次数：{{refreshTime}}次。</span>
      </div>
      
      <div class="button" @click="refreshShopItems">刷新</div>
      <!-- <div class="button" @click="sell">一键出售</div> -->
    </div>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="buyTheEquipment()">购买</li>
    </ul>
  </div>
</template>
<script>
import { assist } from "../../assets/js/assist";
export default {
  name: "shop",
  data() {
    return {
      grid: [],
      left: "",
      top: "",
      visible: false,
      currentItem: {},
      currentItemIndex: "",
      refreshTime:5,
      timeo:60,
      timeStart:false,
      timeInterval:'',
    };
  },
  mixins: [assist],
  created() {
    this.grid = new Array(5).fill({});
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
    refreshTime(value){
      if(value<5){
        
        if(this.timeStart){
          return
        }
        this.timeStart = true
        this.timeInterval = setInterval(()=>{
          this.timeo--
          if(this.timeo<=0){
            this.refreshTime++
            this.timeo = 60
          }
        },1000)
      }else{
        this.timeStart = false
        this.timeo = 5
        clearInterval(this.timeInterval)
      }
    }
  },
  mounted() {
    this.refreshShopItems();
  },
  methods: {
    refreshShopItems() {
      if(this.refreshTime>5){
        this.refreshTime=5
      }
      if(this.refreshTime<1){
        this.$store.commit("set_sys_info", {
          msg: `
              刷新次数不够了，等等吧。
            `,
          type: "enter",
        });
        return 
      }
      this.refreshTime--
      this.grid = new Array(5).fill({});
      var wlv = Number(this.$store.state.playerAttribute.weapon.lv);
      var alv = Number(this.$store.state.playerAttribute.weapon.lv);
      var acclv = Number(this.$store.state.playerAttribute.weapon.lv);
      for (let i = 0; i < 5; i++) {
        var lv = parseInt((wlv + alv + acclv) / 3 + Math.random() * 3);
        this.createShopItem(lv);
      }
    },
    createShopItem(lv) {
      var equip = [0, 0.5, 0.35, 0.15];
      var equipQua = -1;
      var r = Math.random();
      if (r <= equip[0]) {
        // 获得破旧装备
        equipQua = 0;
      } else if (r < equip[1] + equip[0] && r >= equip[0]) {
        // 获得普通装备
        equipQua = 1;
      } else if (
        r < equip[2] + equip[1] + equip[0] &&
        r >= equip[1] + equip[0]
      ) {
        // 获得神器装备
        equipQua = 2;
      } else if (
        r < equip[3] + equip[2] + equip[1] + equip[0] &&
        r >= equip[2] + equip[1] + equip[0]
      ) {
        // 获得史诗装备
        equipQua = 3;
      } else {
        // 未获得装备
      }
      if (equipQua != -1) {
        // this.createEquip(equipQua,lv)
        var index = Math.floor(Math.random() * 3);
        if (index == 0) {
          var b = this.findBrothersComponents(this, "weaponPanel", false)[0];
          var item = b.createNewItem(equipQua, lv);
        } else if (index == 1) {
          var b = this.findBrothersComponents(this, "armorPanel", false)[0];
          var item = b.createNewItem(equipQua, lv);
        } else {
          var b = this.findBrothersComponents(this, "accPanel", false)[0];
          var item = b.createNewItem(equipQua, lv);
        }
        item = JSON.parse(item);
        for (let i = 0; i < this.grid.length; i++) {
          if (JSON.stringify(this.grid[i]).length < 3) {
            this.$set(this.grid, i, item);
            break;
          }
        }
      }
    },
    openMenu(k, e) {
      this.currentItemIndex = k;
      this.currentItem = this.grid[k];
      console.log(e);
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft - 15; // 15: margin right

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
      var p = this.findComponentUpward(this, "index");
      p.showItemInfo($event, type, item);
    },
    closeItemInfo() {
      var p = this.findComponentUpward(this, "index");
      p.weaponShow = p.armorShow = p.accShow = false;
    },
    buyTheEquipment() {
      var gold =
        this.currentItem.lv * this.currentItem.quality.qualityCoefficient * 300;
      console.log(gold);
      console.log(this.$store.state.playerAttribute.GOLD);
      if (this.$store.state.playerAttribute.GOLD < gold) {
        this.$store.commit("set_sys_info", {
          msg: `
              钱不够啊，买啥呢。
            `,
          type: "enter",
        });
      } else {
        this.$store.commit("set_player_gold", -gold);

        var backpackPanel = this.findBrothersComponents(
          this,
          "backpackPanel",
          false
        )[0];
        for (let i = 0; i < backpackPanel.grid.length; i++) {
          if (JSON.stringify(backpackPanel.grid[i]).length < 3) {
            this.$set(backpackPanel.grid, i, this.currentItem);
            break;
          }
        }
        this.$set(this.grid, this.currentItemIndex, {});
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.shop {
  width: 5.02rem;
  height: 3.1rem;
  display: flex;
  flex-wrap: wrap;
  padding: 0.14rem 0.14rem 0.14rem;
  justify-items: flex-start;
  align-items: flex-start;
  position: relative;
}
.handle {
  padding-top: 0.1rem;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  width: 100%;
  height: 0.5rem;
  .info{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    flex: 1;
    margin-left: .2rem;
  }
}
.content {
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.grid {
  width: 0.6rem;
  height: 0.6rem;
  border: 1px solid #ccc;
  box-shadow: inset 0 0 6px 6px rgba($color: #000000, $alpha: 0.5);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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
  .info{
    position: absolute;
    bottom: -.26rem;
    font-size: .24rem;
  }
}
.contextmenu {
  margin: 0;
  background: #000;
  border: 1px solid #fff;
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
    border-top: 1px solid #ccc;
    margin-top: -1px;
    font-size: 14px;
    letter-spacing: 6px;
    &:hover {
      color: #ccc;
    }
  }
}
</style>
