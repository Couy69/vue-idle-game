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
import { assist } from '../../assets/js/assist';
export default {
  name: "zones",
  mixins: [assist],
  data() {
    return {
      left: 0,
      pro: {},
      timeOut:{},
      nextEvent: 1,
      zonesArr: [{
        battleTime: 2000,
        name: '史莱姆森林',
        time: '60',
        id: '1',
        eventNum: '5',
        lv: 1,
        needDPS: '2',
        eventType: [{
          name: '小史莱姆', type: 'monster',
          eventType: 'battle',
          attribute: {
            HP: 20,
            ATK: 1,
          },
          trophy: {
            gold: 30,
            equip: [
              1, 0, 0, 0
            ],
          }
        }, {
          name: '小史莱姆', type: 'monster', eventType: 'battle',
          attribute: {
            HP: 20,
            ATK: 1,
          },
          trophy: {
            gold: 30,
            equip: [
              0.2, 0.1, 0.05, 0
            ],
          }
        }, {
          name: '小史莱姆',
          type: 'monster', eventType: 'battle',
          attribute: {
            HP: 20,
            ATK: 1,
          },
          trophy: {
            gold: 30,
            equip: [
              0.2, 0.1, 0.05, 0
            ],
          }
        }, {
          name: '小史莱姆',
          type: 'monster', eventType: 'battle',
          attribute: {
            HP: 20,
            ATK: 1,
          },
          trophy: {
            gold: 30,
            equip: [
              0.2, 0.1, 0.05, 0
            ],
          }
        }, {
          name: '史莱姆王',
          type: 'boss', eventType: 'battle',
          attribute: {
            HP: 40,
            ATK: 2,
          },
          trophy: {
            gold: 30,
            equip: [
              0.25, 0.55, 0.15, 0.05
            ],
          }
        },]
      }, {
        battleTime: 2000,
        name: '幽暗密林',
        time: '60',
        needDPS: '10',
        id: '2',
        eventNum: '5',
        lv: 5,
        eventType: [{
          name: '猫妖', type: 'monster',
          eventType: 'battle',
          attribute: {
            HP: 60,
            ATK: 6,
          },
          trophy: {
            gold: 100,
            equip: [
              0.2, 0.1, 0.05, 0
            ],
          }
        }, {
          name: '猫妖', type: 'monster', eventType: 'battle',
          attribute: {
            HP: 60,
            ATK: 6,
          },
          trophy: {
            gold: 100,
            equip: [
              0.2, 0.1, 0.05, 0
            ],
          }
        }, {
          name: '猫妖',
          type: 'monster', eventType: 'battle',
          attribute: {
            HP: 60,
            ATK: 6,
          },
          trophy: {
            gold: 100,
            equip: [
              0.2, 0.1, 0.05, 0
            ],
          }
        }, {
          name: '猫妖',
          type: 'monster', eventType: 'battle',
          attribute: {
            HP: 60,
            ATK: 6,
          },
          trophy: {
            gold: 100,
            equip: [
              0.2, 0.1, 0.05, 0
            ],
          }
        }, {
          name: '倔强的哈尼克',
          type: 'boss', eventType: 'battle',
          attribute: {
            HP: 100,
            ATK: 10,
          },
          trophy: {
            gold: 100,
            equip: [
              0.2, 0.4, 0.15, 0.05
            ],
          }
        },]
      }, {
        battleTime: 2000,
        name: '天空之城',
        time: '60',
        needDPS: '20',
        id: '2',
        eventNum: '5',
        lv: 10,
        eventType: [{
          name: '翼龙', type: 'monster',
          eventType: 'battle',
          attribute: {
            HP: 100,
            ATK: 6,
          },
          trophy: {
            gold: 100,
            equip: [
              0.2, 0.1, 0.05, 0
            ],
          }
        }, {
          name: '翼龙', type: 'monster',
          eventType: 'battle',
          attribute: {
            HP: 100,
            ATK: 9,
          },
          trophy: {
            gold: 100,
            equip: [
              0.2, 0.1, 0.05, 0
            ],
          }
        }, {
          name: '翼龙', type: 'monster',
          eventType: 'battle',
          attribute: {
            HP: 100,
            ATK: 10,
          },
          trophy: {
            gold: 100,
            equip: [
              0.2, 0.1, 0.05, 0
            ],
          }
        }, {
          name: '翼龙', type: 'monster',
          eventType: 'battle',
          attribute: {
            HP: 100,
            ATK: 10,
          },
          trophy: {
            gold: 100,
            equip: [
              0.2, 0.1, 0.05, 0
            ],
          }
        }, {
          name: '光之城主赛格哈特',
          type: 'boss', eventType: 'battle',
          attribute: {
            HP: 200,
            ATK: 15,
          },
          trophy: {
            gold: 200,
            equip: [
              0.2, 0.4, 0.35, 0.05
            ],
          }
        },]
      }],
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
            HP: 20,
            ATK: 1,
          },
          trophy: {
            gold: 30,
            equip: [
              1, 0, 0, 0
            ],
          }
        }, {
          name: '小史莱姆', type: 'monster', eventType: 'battle',
          attribute: {
            HP: 20,
            ATK: 1,
          },
          trophy: {
            gold: 30,
            equip: [
              0.2, 0.1, 0.05, 0
            ],
          }
        }, {
          name: '小史莱姆',
          type: 'monster', eventType: 'battle',
          attribute: {
            HP: 20,
            ATK: 1,
          },
          trophy: {
            gold: 30,
            equip: [
              0.2, 0.1, 0.05, 0
            ],
          }
        }, {
          name: '小史莱姆',
          type: 'monster', eventType: 'battle',
          attribute: {
            HP: 20,
            ATK: 1,
          },
          trophy: {
            gold: 30,
            equip: [
              0.2, 0.1, 0.05, 0
            ],
          }
        }, {
          name: '史莱姆王',
          type: 'boss', eventType: 'battle',
          attribute: {
            HP: 40,
            ATK: 2,
          },
          trophy: {
            gold: 30,
            equip: [
              0.25, 0.55, 0.15, 0.05
            ],
          }
        },]
      }
    };
  },
  mounted() {
    // this.evenHandle()
  },
  methods: {
    evenHandle() {
      let startEnent = () => {
        if (this.left >= this.nextEvent * 100 / this.zones.eventNum) {
          this.evenInExecution()
          this.nextEvent++
          if (this.nextEvent <= this.zones.eventNum) {
            this.timeOut =setTimeout(() => {
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
      this.$store.commit("set_sys_info", {
        msg: "你已进入" + this.zones.name,
        type: 'enter'
      });
    },
    evenInExecution() {
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
      clearInterval(this.pro)
      this.pro = {}
      this.left = 0
      this.nextEvent = 1
      var p = this.findComponentUpward(this, 'index')
      p.inZones = false
      this.zones = {}

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
    // 计算战斗过程
    battleCom(event) {
      var playerAttribute = this.$store.state.playerAttribute.attribute,
        battleTime,
        healthRecoverySpeed = this.$store.state.playerAttribute.healthRecoverySpeed,
        reducedDamage = this.$store.state.playerAttribute.attribute.REDUCDMG,
        playerDPS = playerAttribute.DPS,
        monsterAttribute = event.attribute //HP: 100,ATK: 1,

      // 战斗伤害计算公式 
      // 1 - 0.06 * armor / (1 / (0.06 * armor))

      var playerDeadTime = parseInt(playerAttribute.CURHP.value / monsterAttribute.ATK),
        monsterDeadTime = parseInt(monsterAttribute.HP / playerDPS)

      // 战斗获胜
      if (monsterDeadTime < playerDeadTime) {
        battleTime = monsterDeadTime
        var takeDmg = -battleTime * Number(monsterAttribute.ATK)
        takeDmg = parseInt(takeDmg * reducedDamage)
        this.$store.commit('set_player_curhp', takeDmg)

        this.$store.commit("set_sys_info", {
          msg: `
              击杀了${event.name}(lv${this.zones.lv})，受到了${Math.abs(takeDmg)}点伤害
            `,
          type: 'win'
        });

        this.caculateTrophy(event)

      } else {
        console.log(this.pro)
        // 玩家死亡
        this.$store.commit('set_player_curhp', 'full')
        clearInterval(this.pro)
        clearTimeout(this.timeOut)
        this.pro = {}
        this.timeOut = {} 
        this.left = 0
        this.nextEvent = 1
        var p = this.findComponentUpward(this, 'index')
        p.inZones = false
        this.zones = {}
        this.$store.commit("set_sys_info", {
          msg: `
              战斗失败！受到了${monsterDeadTime*Number(monsterAttribute.ATK)}点伤害
            `,
          type: 'enter'
        });


      }
    },
    caculateTrophy(event) {
      var trophy = event.trophy
      var equip = [
        0.25, 0.25, 0.25, 0.25
      ]
      var equip = trophy.equip
      var equipQua = -1;
      var r = Math.random()
      if (r <= equip[0]) {
        // 获得破旧装备
        equipQua = 0
      } else if (r < equip[1] + equip[0] && r >= equip[0]) {
        // 获得普通装备
        equipQua = 1
      }
      else if (r < equip[2] + equip[1] + equip[0] && r >= equip[1] + equip[0]) {
        // 获得神器装备
        equipQua = 2
      }
      else if (r < equip[3] + equip[2] + equip[1] + equip[0] && r >= equip[2] + equip[1] + equip[0]) {
        // 获得史诗装备
        equipQua = 3
      } else {
        // 未获得装备
      }

      if (equipQua != -1) {
        var lv = this.zones.lv
        // this.createEquip(equipQua,lv)
        var index = Math.floor((Math.random() * 3));
        if (index == 0) {
          var b = this.findBrothersComponents(this, 'weaponPanel', false)[0]
          var item = b.createNewItem(equipQua, lv)
          console.log(item)
        } else if (index == 1) {
          var b = this.findBrothersComponents(this, 'armorPanel', false)[0]
          var item = b.createNewItem(equipQua, lv)
          console.log(item)
        } else {
          var b = this.findBrothersComponents(this, 'accPanel', false)[0]
          var item = b.createNewItem(equipQua, lv)
          console.log(item)
        }
        item = JSON.parse(item)
        var backpackPanel = this.findBrothersComponents(this, 'backpackPanel', false)[0]
        for (let i = 0; i < backpackPanel.grid.length; i++) {
          if (JSON.stringify(backpackPanel.grid[i]).length < 3) {
            this.$set(backpackPanel.grid, i, item)
            break;
          }

        }
        this.$store.commit("set_sys_info", {
          msg: `
              获得了:金币${event.trophy.gold}
            `,
          type: 'trophy',
          equip: [item]
        });
        this.$store.commit("set_player_gold", event.trophy.gold);
      } else {
        this.$store.commit("set_sys_info", {
          msg: `
              获得了:金币${event.trophy.gold}
            `,
          type: 'trophy',
          equip: []
        });
        this.$store.commit("set_player_gold", event.trophy.gold);
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
