<template>
  <transition name="fade">
    <div class="message" v-show="visible">
      <div class="title">
        <span>{{title}}</span>
      </div>
      <div class="body">
        <p>{{ message }}</p>
      </div>

      <div class="footer">
        <div class="button" @click="close()" @keydown.enter="close()">{{closeBtnText}}</div>
        <div class="button" @click="handleClick()" @keydown.enter="handleClick()">{{confirmBtnText}}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MizMessage',
  data() {
    return {
      visible: true,
      message: '',
      closed: false,
      onClose: null,
      verticalOffset: 0,
      closeBtnText:'取消',
      confirmBtnText:'确认',
      title:'提示'
    }
  },
  computed: {
    style() {
      return {
        'top': this.verticalOffset + 'px'
      }
    }
  },
  methods: {
    close() {
      this.visible = false
      this.closed = true
    }
    ,handleClick(){
      this.visible = false 
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss">
.message {
  position: absolute;
  z-index: 9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #fff;
  border-radius: 6px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.7);
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  width: 3rem;
  .title {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-start;
    padding-left: .3rem;
    font-size: 20px;
    height: 0.5rem;
  }
  .body {
    padding: 0.3rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    font-size: .16rem;
    .prompt-message {
      font-size: 0.12rem;
      margin: 0.04rem 0;
    }
    p{
      text-indent: .32rem;
      letter-spacing: 1px;
    }
  }
  .footer {
    padding:.1rem .3rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>