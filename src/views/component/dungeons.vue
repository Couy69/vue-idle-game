<template>
  <div class="dungeons">
    <div class="progress-bar"></div>
    <div class="icon-bar">
      <div class="player" :style="{left:left+'%','backgroundPosition':parseInt(left%4)*32+'px 96px'}">
        <!-- <img src="../../assets/icons/map/player-s.png" alt=""> -->
        <!-- :style="{background-position:}" -->
      </div>
      <div class="monster" v-for="(v,k) in dungeons.eventType" :key="k" :style="{left:(100/dungeons.eventNum)*(k+1)+'%'}">
        <img :src="'./icons/map/'+v.type+'.png'" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { assist } from '../../assets/js/assist';
import { dungeonsConfig } from '../../assets/js/dungeonsConfig';
export default {
  name: "dungeons",
  mixins: [assist, dungeonsConfig],
  data() {
    return {
      left: 0,
      pro: {},
      timeOut: {},
      nextEvent: 1,
      dungeons: {
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
        if (this.left >= this.nextEvent * 100 / this.dungeons.eventNum) {
          this.evenInExecution()
          this.nextEvent++
          if (this.nextEvent <= this.dungeons.eventNum) {
            this.timeOut = setTimeout(() => {
              this.pro = setInterval(() => {
                startEnent()
              }, 50)
            }, 2000)
          } else {
            setTimeout(() => {
              this.eventEnd()
            }, 2000)
          }

          clearInterval(this.pro)
        }

        this.left += 0.5
      }
      this.eventBegin()
      this.pro = setInterval(() => {
        startEnent()
      }, 50)
    },
    eventBegin() {
      this.$store.commit("set_sys_info", {
        msg: "你已进入" + this.dungeons.name,
        type: 'warning'
      });
      if (this.dungeons.name == '黑色火山') {
        this.$store.commit("set_sys_info", {
          msg: "似乎这就是最后的挑战了",
          type: 'battle'
        });
        this.$store.commit("set_sys_info", {
          msg: "加油吧",
          type: 'battle'
        });
      }
    },
    evenInExecution() {
      var event = this.dungeons.eventType[this.nextEvent - 1]
      switch (event.eventType) {
        case 'battle':
          this.$store.commit("set_sys_info", {
            msg: `
              你遭遇了${event.name}(lv${this.dungeons.lv}),正在战斗中...
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
    forcedToStopEvent() {
      clearInterval(this.pro)
      clearTimeout(this.timeOut)
      this.pro = {}
      this.left = 0
      this.nextEvent = 1
      this.dungeons = {}
    },
    eventEnd() {

      setTimeout(() => {
        // this.battleCom(event)
        if (this.dungeons.type == "endless") {
          this.$store.commit("set_sys_info", {
            msg: `
                挑战成功，可以挑战下一层了
              `,
            type: "win",
          });
          this.$store.commit("set_endless_lv", this.$store.state.playerAttribute.endlessLv + 1);
          this.$store.commit("set_player_curhp", 9999999);
        } else {
          this.$store.commit("set_sys_info", {
            msg: `
                副本探索成功！
              `,
            type: "win",
          });
        }

        let p = this.findComponentUpward(this, 'index')
        let backpackPanel = this.findBrothersComponents(this, 'backpackPanel', false)[0]

        if (this.dungeons.name == '黑色火山' && !this.$store.state.playerAttribute.endlessLv) {

          this.$store.commit("set_sys_info", {
            msg: "击败了最后的boss，你通关了！",
            type: 'warning'
          });
          this.$store.commit("set_sys_info", {
            msg: "开启了无尽挑战，可点击地图右上角副本图标进入",
            type: 'warning'
          });
          this.$store.commit("set_sys_info", {
            msg: "试试你的极限吧",
            type: 'warning'
          });

          this.$store.commit('set_endless_lv', 1)
        }
        this.forcedToStopEvent()
        let backpackPanelSign = backpackPanel.itemNum / backpackPanel.grid.length < 0.8
        if (p.reChallenge && backpackPanelSign) {
          p.eventBegin()
        } else if (p.reEChallenge) {
          this.$store.commit("set_endless_lv", this.$store.state.playerAttribute.endlessLv - 1);
          p.eventBegin()
        } else if (p.upEChallenge) {
          p.endlessLv = this.$store.state.playerAttribute.endlessLv
          p.dungeons.lv = this.$store.state.playerAttribute.endlessLv
          p.eventBegin()
        } else {
          p.dungeons = ''
          p.inDungeons = false
        }

        // if(p.reEChallenge){
        //   this.$store.commit("set_endless_lv", this.$store.state.playerAttribute.endlessLv - 1);
        // }
        // if(p.upEChallenge){
        // }

      }, 100)
    },
    // 计算战斗过程
    battleCom(event) {
      var playerAttribute = this.$store.state.playerAttribute.attribute,
        battleTime,
        healthRecoverySpeed = this.$store.state.playerAttribute.healthRecoverySpeed,
        reducedDamage = this.$store.state.playerAttribute.attribute.REDUCDMG,
        playerDPS = playerAttribute.DPS,
        monsterAttribute = this.$deepCopy(event.attribute) //HP: 100,ATK: 1,

      // 战斗伤害计算公式 
      // 1 - 0.06 * armor / (1 + (0.06 * armor))

      // 无尽模式下怪物加强
      if (this.dungeons.type == 'endless') {
        var endlessLv = this.$store.state.playerAttribute.endlessLv || 0
        //设定一个怪物加强系数
        monsterAttribute.ATK = monsterAttribute.ATK * (1 + 100 / 75)
        monsterAttribute.HP = monsterAttribute.HP * (1 + 100 / 75)
        monsterAttribute.ATK = monsterAttribute.ATK + endlessLv * 1000
        monsterAttribute.HP = monsterAttribute.HP + endlessLv * 1100

      } else {
        //设定一个怪物加强系数
        monsterAttribute.ATK = monsterAttribute.ATK * (1 + this.dungeons.lv / 55)
        monsterAttribute.HP = monsterAttribute.HP * (1 + this.dungeons.lv / 55)
      }

      var playerDeadTime = (playerAttribute.CURHP.value / reducedDamage / monsterAttribute.ATK),
        monsterDeadTime = (monsterAttribute.HP / playerDPS)

      // 战斗获胜
      if (monsterDeadTime < playerDeadTime) {
        battleTime = monsterDeadTime
        var takeDmg = -battleTime * Number(monsterAttribute.ATK)
        takeDmg = parseInt(takeDmg * reducedDamage)
        this.$store.commit('set_player_curhp', takeDmg)

        // 无尽模式下怪物加强
        if (this.dungeons.type == 'endless') {
          this.$store.commit("set_sys_info", {
            msg: `
              击杀了${event.name}(无尽层数：${this.dungeons.lv})，受到了${Math.abs(takeDmg)}点伤害
            `,
            type: 'win'
          });
        } else {
          this.$store.commit("set_sys_info", {
            msg: `
              击杀了${event.name}(lv${this.dungeons.lv})，受到了${Math.abs(takeDmg)}点伤害
            `,
            type: 'win'
          });
        }
        this.caculateTrophy(event)

      } else {
        // 玩家死亡
        this.$store.commit('set_player_curhp', 'full')
        clearInterval(this.pro)
        clearTimeout(this.timeOut)
        this.pro = {}
        this.timeOut = {}
        this.left = 0
        this.nextEvent = 1
        var p = this.findComponentUpward(this, 'index')
        p.inDungeons = false
        this.dungeons = {}
        var takeDmg = monsterDeadTime * Number(monsterAttribute.ATK)
        takeDmg = parseInt(takeDmg * reducedDamage)
        this.$store.commit("set_sys_info", {
          msg: `
              战斗失败！受到了${takeDmg}点伤害
            `,
          type: 'warning'
        });


      }
    },
    //战利品计算
    caculateTrophy(event) {
      var items = []
      var lv = this.dungeons.lv
      // 获取独特装备
      if (event.type == 'boss' && this.dungeons.type != 'endless') {
        var randow = 0.96
        if(this.dungeons.name == '黑色火山'){
          randow = 0.92
        }
        if (Math.random() > randow) {
          var random = Math.random()
          if (random <= 0.3 && random > 0) {
            var b = this.findBrothersComponents(this, 'weaponPanel', false)[0]
            var item = b.createNewItem(4, parseInt(lv + Math.random() * 6))
            items.push(JSON.parse(item))
          } else if (random <= 0.6 && random > 0.3) {
            var b = this.findBrothersComponents(this, 'armorPanel', false)[0]
            var item = b.createNewItem(4, parseInt(lv + Math.random() * 6))
            items.push(JSON.parse(item))
          } else {
            var b = this.findBrothersComponents(this, 'accPanel', false)[0]
            var item = b.createNewItem(4, parseInt(lv + Math.random() * 6))
            items.push(JSON.parse(item))
          }

        }
      }
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
        // this.createEquip(equipQua,lv)
        var index = Math.floor((Math.random() * 3));
        if (index == 0) {
          var b = this.findBrothersComponents(this, 'weaponPanel', false)[0]
          var item = b.createNewItem(equipQua, lv)
        } else if (index == 1) {
          var b = this.findBrothersComponents(this, 'armorPanel', false)[0]
          var item = b.createNewItem(equipQua, lv)
        } else {
          var b = this.findBrothersComponents(this, 'accPanel', false)[0]
          var item = b.createNewItem(equipQua, lv)
        }
        items.push(JSON.parse(item))
        var backpackPanel = this.findBrothersComponents(this, 'backpackPanel', false)[0]
        this.$store.commit("set_sys_info", {
          msg: `
              获得了:金币${event.trophy.gold}
            `,
          type: 'trophy',
          equip: items
        });
        this.$store.commit("set_player_gold", event.trophy.gold);
        items.map(item => {
          // 当开启了自动出售并且新获得的装备品质低于史诗时，自动出售
          if (backpackPanel.autoSell && (item.quality.name == '破旧' || item.quality.name == '普通')) {
            var gold = item.lv * item.quality.qualityCoefficient * 10
            this.$store.commit("set_player_gold", parseInt(gold));
            this.$store.commit("set_sys_info", {
              msg: `
              自动出售装备获得金币：${parseInt(gold)}
            `,
              type: 'trophy',
            });
          } else {
            for (let i = 0; i < backpackPanel.grid.length; i++) {
              if (JSON.stringify(backpackPanel.grid[i]).length < 3) {
                this.$set(backpackPanel.grid, i, item)
                break;
              }
            }
          }
        })
      } else {
        //金币获取倍率
        var goldObtainRatio = 1
        if (this.dungeons.type == 'endless') {
          var endlessLv = this.$store.state.playerAttribute.endlessLv
          goldObtainRatio+= endlessLv/50
        }
        this.$store.commit("set_sys_info", {
          msg: `
              获得了:金币${parseInt(event.trophy.gold*goldObtainRatio)}
            `,
          type: 'trophy',
          equip: []
        });
        this.$store.commit("set_player_gold", parseInt(event.trophy.gold*goldObtainRatio));
      }

    }
  }
};


</script>
<style lang="scss" scoped>
.dungeons {
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
      height: 34px;
      width: 34px;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      img {
        height: 34px;
        width: 34px;
      }
    }
    .player {
      z-index: 2;
      height: 48px;
      width: 32px;
      // background-position: -0px 96px !important;
      background-repeat: no-repeat;
      background: url(../../assets/icons/map/player-s.png);
    }
    .monster {
      left: 20%;
    }
  }
}
</style>
