<template>
  <div class="backpackPanel">
    <div v-for="(v, k) in grid" :key="k">
      <div class="grid">
        <div class="title" v-if="v.type">
          <div class='icon' :style="{'box-shadow':'0 0 2px 1px '+v.item.quality.color}">
            <img :src="v.item.type.iconSrc" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "backpackPanel",
  data() {
    return {
      grid: [],
    };
  },
  created() {
    this.grid = new Array(32).fill({});
  },
  mounted() {
    // TODO: 需要deep监听 
    this.$nextTick(()=>{
      this.grid[0] = {
        type: "item",
        item: {"lv":30,"quality":{"name":"神器","qualityCoefficient":1.5,"probability":"0.15","color":"#ff00ff","extraEntryNum":3},"type":{"name":"赤柳血铠","des":"似乎会给使用者提供生命气息","iconSrc":"./icons/A_A3.png","entry":[{"valCoefficient":0.9,"value":51,"showVal":"+51","type":"DEF","name":"防御力"},{"type":"HP","valCoefficient":1.4,"value":634,"showVal":"+634","name":"生命值"}]},"extraEntry":[{"type":"HP","value":99,"showVal":"+99","name":"生命值"},{"type":"HP","value":93,"showVal":"+93","name":"生命值"},{"type":"HP","value":97,"showVal":"+97","name":"生命值"}]}
      };  
    })
    
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.backpackPanel {
  width: 5rem;
  height: 3rem;
  display: flex;
  flex-wrap: wrap;
  padding: 0.31rem 0.14rem;
  justify-items: flex-start;
  align-items: flex-start;
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
</style>
