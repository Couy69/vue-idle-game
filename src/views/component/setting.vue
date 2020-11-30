<template>
  <div class="setting">
    <!-- <a class="github" target="_blank" @click="navToGithub" title="源码" src="https://github.com/Couy69/vue-idle-game"></a> -->
    <div class="update-info" @click="clearSaveData" type="primary">
      <img src="../../assets/icons/menu/clear.png" alt="">
      <span>清除存档</span>
    </div>

  </div>
</template>
<script>
import { assist } from '../../assets/js/assist';
export default {
  name: "setting",
  mixins: [assist],
  data() {
    return {
    };
  },
  mounted() {

  },
  methods: {
    clearSaveData() {
      this.$message({
        message: '这将清除你的存档并刷新游戏，你确定要这样做吗?',
        title:'提示',
        confirmBtnText:'我要重开！',
        onClose: () => {
          localStorage.removeItem("_sd")
          location.reload();
        }
      })
    }
  }
};


</script>
<style lang="scss" scoped>
.setting {
  position: fixed;
  width: 0.5rem;
  height: 0.55rem;
  display: flex;
  bottom: 0.1rem;
  right: 0.1rem;
  z-index: 1;
  cursor: pointer;
  .update-info {
    margin-right: 0.2rem;
    cursor: pointer;
    width: 0.5rem;
    height: 0.55rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 0.35rem;
      height: 0.35rem;
    }
    span {
      white-space: nowrap;
      font-size: 0.12rem;
    }
  }
}
</style>
