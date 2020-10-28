<template>
  <div class="zones">
    <div class="progress-bar"></div>
    <div class="icon-bar">
      <div class="player" :style="{left:left+'%'}">
        <img src="../../assets/icons/map/player1.png" alt="">
      </div>
      <div class="monster" v-for="(v,k) in zones.eventType" :key="k" :style="{left:(100/zones.eventNum)*(k+1)+'%'}">
        <img :src="'./icons/map/'+v.type+'.png'" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "zones",
  data() {
    return {
      left: 0,
      pro: {},
      nextEvent: 1,
      zones: {
        battleTime: 2000,
        name: '史莱姆森林',
        time: '60',
        id: '1',
        eventNum: '5',
        lv: 1,
        eventType: [{
          name: '小史莱姆', type: 'monster',
          eventType: 'battle',
          attribute: {
            HP: 100,
            ATK: 1,
          },
          trophy: {
            gold: 30,
            equip: [
              0.2, 0.1, 0.05, 0, 0
            ],
          }
        }, {
          name: '小史莱姆', type: 'monster', eventType: 'battle',
          attribute: {
            HP: 100,
            ATK: 1,
          },
          trophy: {
            gold: 30,
            equip: [
              0.2, 0.1, 0.05, 0, 0
            ],
          }
        }, {
          name: '小史莱姆',
          type: 'monster', eventType: 'battle',
          attribute: {
            HP: 100,
            ATK: 1,
          },
          trophy: {
            gold: 30,
            equip: [
              0.2, 0.1, 0.05, 0, 0
            ],
          }
        }, {
          name: '小史莱姆',
          type: 'monster', eventType: 'battle',
          attribute: {
            HP: 100,
            ATK: 1,
          },
          trophy: {
            gold: 30,
            equip: [
              0.2, 0.1, 0.05, 0, 0
            ],
          }
        }, {
          name: '史莱姆王',
          type: 'boss', eventType: 'battle',
          attribute: {
            HP: 200,
            ATK: 2,
          },
          trophy: {
            gold: 30,
            equip: [
              0.2, 0.1, 0.05, 0, 0
            ],
          }
        },]
      }
    };
  },
  mounted() {
    this.evenHandle()
  },
  methods: {
    evenHandle() {
      let startEnent = () => {
        if (this.left >= this.nextEvent * 100 / this.zones.eventNum) {
          this.evenInExecution()
          this.nextEvent++
          if (this.nextEvent <= this.zones.eventNum) {
            setTimeout(() => {
              this.pro = setInterval(() => {
                startEnent()
              }, 100)
            }, 2000)
          } else {
            setTimeout(() => {
              this.evenEnd()
            }, 2000)
          }

          clearInterval(this.pro)
        }

        this.left += 0.5
      }
      this.evenBegin()
      this.pro = setInterval(() => {
        startEnent()
      }, 100)
    },
    evenBegin() {
      console.log('evenBegin')
      this.$store.commit("set_sys_info", {
        msg: "你已进入" + this.zones.name,
        type: 'enter'
      });
    },
    evenInExecution() {
      console.log('evenInExecution' + this.nextEvent)
      var event = this.zones.eventType[this.nextEvent - 1]
      switch (event.eventType) {
        case 'battle':
          this.$store.commit("set_sys_info", {
            msg: `
              你遭遇了${event.name}(lv${this.zones.lv}),正在战斗中...
            `,
            type: 'battle'
          });
          setTimeout(() => {
            this.battleCom(event)
          }, 2000)
          break;

        default:
          break;
      }

    },
    // <div class="info win">系统：<span> 击杀了史莱姆（lv1）</span></div>
    //   <div class="info trophy">系统：<span> 获得：金币+33</span></div>
    //   <div class="info battle">系统：<span> 遭遇了史莱姆（lv1）</span></div>
    evenEnd() {
      var event = this.zones.eventType[this.nextEvent - 2]

      setTimeout(() => {
        // this.battleCom(event)
        this.$store.commit("set_sys_info", {
          msg: `
              副本探索成功！
            `,
          type: 'win'
        });
      }, 100)
    },
    battleCom(event) {
      // TODO: 详细的战斗计算公式 
      if ('win') {
        // TODO: 战利品获取随机计算
        this.$store.commit("set_sys_info", {
          msg: `
              战斗获胜：你获得了金币：${event.trophy.gold}
            `,
          type: 'trophy'
        });
      } else {

      }
    }
  }
};


</script>
<style lang="scss" scoped>
.zones {
  width: 100%;
  height: 100%;
  position: relative;
  .progress-bar {
    position: absolute;
    bottom: 5px;
    left: 10px;
    right: 10px;
    border: 1px solid #fff;
  }
  .icon-bar {
    margin: 0 30px;
    width: calc(100% - 60px);
    height: 100%;
    position: relative;
    & > div {
      position: absolute;
      height: 40px;
      width: 40px;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      img {
        width: 40px;
        height: 40px;
      }
    }
    .player {
      z-index: 2;
      img {
        transform: rotateY(180deg);
      }
    }
    .monster {
      left: 20%;
    }
  }
}
</style>
