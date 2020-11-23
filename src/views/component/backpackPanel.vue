<template>
  <div class="backpackPanel">
    <div v-for="(v, k) in grid" :key="k">
      <div class="grid">
        <div class="title" v-if="v.lv" @contextmenu.prevent="openMenu(k,$event)" @touchstart.stop.prevent="openMenu(k,$event)"  @mouseover="showItemInfo($event,v.itemType,v)" @mouseleave="closeItemInfo">
          <div class="icon" :class="{unique:v.quality.name=='独特'}" :style="{ 'box-shadow': 'inset 0 0 7px 2px ' + v.quality.color }">
            <img :src="v.type.iconSrc" alt="" />
          </div>
          <div class="title-lock" v-if="v.locked">
            <img src="../../assets/icons/lock.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="backpack-capacity" :class="{'height-capacity':itemNum/grid.length>0.8}">{{itemNum}}/{{grid.length}}</div>
    <div class="handle">
      <div class="handle-checkbox" @click="autoSell=!autoSell"><input type="checkbox" name="" v-model="autoSell">自动出售</div>
      <div class="button" @click="neaten">一键整理</div>
      <div class="button" @click="sell">一键出售</div>
    </div>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="showItemInfo($event,currentItem.itemType,currentItem,'touch')" v-if="$store.state.operatorSchemaIsMobile">查看</li>
      <li @click="equipTheEquipment()">装备</li>
      <li @click="strengthenEquipment()">强化</li>
      <li @click="strengthenEquipment()">重铸</li>
      <li @click="lockTheEquipment(true)" v-if="!currentItem.locked">锁定</li>
      <li @click="lockTheEquipment(false)" v-if="currentItem.locked">解锁</li>
      <li @click="sellTheEquipment()">出售</li>
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
      left: '',
      top: '',
      visible: false,
      currentItem: {},
      currentItemIndex: '',
      autoSell:false,
    };
  },
  mixins: [assist],
  created() {
    this.grid = new Array(32).fill({});
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
  },
  computed: {
    itemNum() {
      let count = 0
      this.grid.map((item) => {
        if (JSON.stringify(item) != '{}') {
          count++
        }
      })
      if (count / this.grid.length > 0.8) {
        this.$store.commit("set_sys_info", {
          msg: `
              背包快满了，请注意及时清理！
            `,
          type: 'warning',
        });
      }
      return count
    }
  },
  mounted() {
    var item = {
      lv: 30,
      itemType: 'armor',
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
    try {
      var p = this.findComponentUpward(this, 'index')
      if (JSON.stringify(p.saveData) != '{}') {
        this.grid = p.saveData.backpackEquipment
      }
    } catch (error) {
      console.log(error)
      this.$store.commit("set_sys_info", {
        msg: `
              糟糕，存档坏了！
            `,
        type: 'warning'
      });
    }

  },
  methods: {
    neaten() {
      var tem = new Array(32).fill({}),
        temIndex = 0
      this.grid.map((item, index) => {
        if (JSON.stringify(item) != '{}') {
          tem[temIndex] = item
          temIndex++
        }
      })
      this.grid = this.$deepCopy(tem)
      tem = []
    },
    sell() {
      this.grid.map((item, index) => {
        if (JSON.stringify(item) != '{}') {
          this.currentItemIndex = index
          this.currentItem = item
          this.sellTheEquipment(true)
        }
      })

    },
    openMenu(k, e) {
      this.currentItemIndex = k
      this.currentItem = this.grid[k]
      this.$store.commit('set_need_strengthen_equipment',this.currentItem)
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      if(e.type ==  'touchstart'){
        var left = e.changedTouches[0].clientX - offsetLeft + 15; // 15: margin right
      }else{
        var left = e.clientX - offsetLeft + 15; // 15: margin right
      }
      

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
    showItemInfo($event, type, item,SchemaIsMobile) {
      if(SchemaIsMobile != 'touch'&&this.$store.state.operatorSchemaIsMobile){
        return
      }
      var p = this.findComponentUpward(this, 'index')
      p.showItemInfo($event, type, item)
    },
    closeItemInfo() {
      var p = this.findComponentUpward(this, 'index')
      p.weaponShow = p.armorShow = p.accShow = false
    },
    lockTheEquipment(v) {
      this.currentItem.locked = v;
    },
    equipTheEquipment() {
      switch (this.currentItem.itemType) {
        case 'weapon':
          this.grid[this.currentItemIndex] = this.$store.state.playerAttribute.weapon
          this.$store.commit('set_player_weapon', this.currentItem)
          break;
        case 'armor':
          this.grid[this.currentItemIndex] = this.$store.state.playerAttribute.armor
          this.$store.commit('set_player_armor', this.currentItem)
          break;
        case 'acc':
          this.grid[this.currentItemIndex] = this.$store.state.playerAttribute.acc
          this.$store.commit('set_player_acc', this.currentItem)
          break;
        default:
          break;
      }

    },
    strengthenEquipment(v){
      var p = this.findComponentUpward(this, 'index')
      p.closePanel()
      p.strengthenEquipmentPanelOpened = true
    },
    sellTheEquipment(withoutWarning,sellMsg) {
      if (this.currentItem.locked) {

        !withoutWarning&&this.$store.commit("set_sys_info", {
          msg: `
              装备已锁定，请先解锁再出售。
            `,
          type: 'warning',
        });
        return
      }
      this.$set(this.grid, this.currentItemIndex, {});
      var gold = this.currentItem.lv * this.currentItem.quality.qualityCoefficient * 10
      this.$store.commit("set_player_gold", parseInt(gold));
      this.$store.commit("set_sys_info", {
        msg: `
              ${sellMsg?sellMsg:''}出售装备获得金币${parseInt(gold)}
            `,
        type: 'trophy',
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.backpackPanel {
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
  .handle-checkbox{
    display: flex;
    align-items: center;
    cursor: pointer;
    input{
      width: .17rem;
      height:.17rem;
      margin-right: 2px;
      margin-top: 1px;
      
    }
  }
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
    position: relative;
    .icon {
      width: 0.56rem;
      height: 0.56rem;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.04rem;
      img {
        width: 80%;
        height: 80%;
      }
    }
  }
  .title-lock {
    position: absolute;
    // width: 0.2rem;
    // height: 0.2rem;
    // background: red;
    top: -0.03rem;
    right: -0.11rem;
    width: 0;
    height: 0;
    border-left: 0.24rem solid transparent;
    border-right: 0.24rem solid transparent;
    border-bottom: 0.24rem solid rgba(255, 0, 0, 0.658);
    font-size: 0;
    line-height: 0;
    transform: rotate(45deg);
    img {
      width: 0.16rem;
      height: 0.16rem;
      transform: rotate(-45deg) translate(-50%, -0%);
      position: absolute;
      top: 50%;
      left: 50%;
    }
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
.backpack-capacity {
  position: absolute;
  bottom: 0.2rem;
  left: 0.2rem;
  font-size: 0.2rem;
}
.height-capacity {
  color: red;
}
</style>
