/**
 * 副本配置
 * @author couy69@gmail.com
 */

export const dungeonsConfig = {
  data() {
    return {
      dungeonsArr: [
        {
          battleTime: 2000,
          name: '史莱姆森林',
          time: '20',
          id: '1',
          eventNum: '5',
          lv: 1,
          needDPS: '2',
          eventType: [{
            name: '小史莱姆',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 20,
              ATK: 1,
            },
            trophy: {
              gold: 10,
              equip: [
                1, 0, 0, 0
              ],
            }
          }, {
            name: '小史莱姆',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 20,
              ATK: 1,
            },
            trophy: {
              gold: 10,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '小史莱姆',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 20,
              ATK: 1,
            },
            trophy: {
              gold: 10,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '小史莱姆',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 20,
              ATK: 1,
            },
            trophy: {
              gold: 10,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '史莱姆王',
            type: 'boss',
            eventType: 'battle',
            attribute: {
              HP: 40,
              ATK: 2,
            },
            trophy: {
              gold: 20,
              equip: [
                0.25, 0.55, 0.15, 0.05
              ],
            }
          }, ]
        }
        , {
          battleTime: 2000,
          name: '幽暗密林',
          time: '20',
          needDPS: '10',
          id: '2',
          eventNum: '5',
          lv: 5,
          eventType: [{
            name: '猫妖',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 60,
              ATK: 4,
            },
            trophy: {
              gold: 20,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '猫妖',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 60,
              ATK: 4,
            },
            trophy: {
              gold: 20,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '猫妖',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 60,
              ATK: 4,
            },
            trophy: {
              gold: 20,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '猫妖',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 60,
              ATK: 4,
            },
            trophy: {
              gold: 20,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '倔强的哈尼克',
            type: 'boss',
            eventType: 'battle',
            attribute: {
              HP: 80,
              ATK: 8,
            },
            trophy: {
              gold: 50,
              equip: [
                0.2, 0.4, 0.15, 0.05
              ],
            }
          }, ]
        }
        , {
          battleTime: 2000,
          name: '龙人之塔',
          time: '20',
          needDPS: '20',
          id: '2',
          eventNum: '5',
          lv: 10,
          eventType: [{
            name: '翼龙',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 80,
              ATK: 6,
            },
            trophy: {
              gold: 40,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '翼龙',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 80,
              ATK: 9,
            },
            trophy: {
              gold: 40,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '翼龙',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 80,
              ATK: 10,
            },
            trophy: {
              gold: 40,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '翼龙',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 80,
              ATK: 10,
            },
            trophy: {
              gold: 40,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '鲁卡斯',
            type: 'boss',
            eventType: 'battle',
            attribute: {
              HP: 200,
              ATK: 15,
            },
            trophy: {
              gold: 100,
              equip: [
                0.2, 0.4, 0.35, 0.05
              ],
            }
          }, ]
        }
        , {
          battleTime: 2000,
          name: '人偶玄关',
          time: '20',
          needDPS: '70',
          id: '2',
          eventNum: '5',
          lv: 15,
          eventType: [{
            name: '人偶师',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 225,
              ATK: 40,
            },
            trophy: {
              gold: 100,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '人偶师',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 225,
              ATK: 40,
            },
            trophy: {
              gold: 100,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '人偶师',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 225,
              ATK: 40,
            },
            trophy: {
              gold: 100,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '人偶师',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 225,
              ATK: 40,
            },
            trophy: {
              gold: 100,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '人偶之王道格里',
            type: 'boss',
            eventType: 'battle',
            attribute: {
              HP: 550,
              ATK: 100,
            },
            trophy: {
              gold: 100,
              equip: [
                0.2, 0.3, 0.35, 0.15
              ],
            }
          }, ]
        }, {
          battleTime: 2000,
          name: '城主宫殿',
          time: '20',
          needDPS: '100',
          id: '4',
          eventNum: '5',
          lv: 20,
          eventType: [{
            name: '龙人',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 400,
              ATK: 70,
            },
            trophy: {
              gold: 150,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '龙人',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 400,
              ATK: 70,
            },
            trophy: {
              gold: 150,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '龙人',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 400,
              ATK: 70,
            },
            trophy: {
              gold: 150,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '龙人',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 400,
              ATK: 70,
            },
            trophy: {
              gold: 150,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '光之城主赛格哈特',
            type: 'boss',
            eventType: 'battle',
            attribute: {
              HP: 700,
              ATK: 130,
            },
            trophy: {
              gold: 400,
              equip: [
                0.2, 0.3, 0.35, 0.15
              ],
            }
          }, ]
        }

        , {
          battleTime: 2000,
          name: '神殿外围',
          time: '20',
          needDPS: '200',
          id: '4',
          eventNum: '5',
          lv: 25,
          desc:'',
          eventType: [{
            name: 'GBL教信徒',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 1000,
              ATK: 140,
            },
            trophy: {
              gold: 150,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: 'GBL教信徒',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 1000,
              ATK: 140,
            },
            trophy: {
              gold: 150,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: 'GBL教神官',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 1000,
              ATK: 160,
            },
            trophy: {
              gold: 150,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: 'GBL教大祭司',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 1100,
              ATK: 200,
            },
            trophy: {
              gold: 150,
              equip: [
                0.2, 0.45, 0.25, 0.10
              ],
            }
          }, {
            name: 'GBL教大主教',
            type: 'boss',
            eventType: 'battle',
            attribute: {
              HP: 1500,
              ATK: 200,
            },
            trophy: {
              gold: 300,
              equip: [
                0.2, 0.3, 0.35, 0.15
              ],
            }
          }, ]
        }

        , {
          battleTime: 2000,
          name: '第一脊椎',
          time: '20',
          needDPS: '250',
          id: '4',
          eventNum: '5',
          lv: 30,
          desc:'',
          eventType: [{
            name: '红章鱼',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 3000,
              ATK: 150,
            },
            trophy: {
              gold: 170,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '红章鱼',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 3000,
              ATK: 150,
            },
            trophy: {
              gold: 170,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '蓝章鱼',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 3000,
              ATK: 175,
            },
            trophy: {
              gold: 180,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '蓝章鱼',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 3000,
              ATK: 175,
            },
            trophy: {
              gold: 180,
              equip: [
                0.2, 0.5, 0.25, 0.05
              ],
            }
          }, {
            name: '巨型章鱼',
            type: 'boss',
            eventType: 'battle',
            attribute: {
              HP: 3000,
              ATK: 250,
            },
            trophy: {
              gold: 400,
              equip: [
                0.2, 0.3, 0.35, 0.15
              ],
            }
          }, ]
        }
        , {
          battleTime: 2000,
          name: '第二脊椎',
          time: '20',
          needDPS: '300',
          id: '4',
          eventNum: '5',
          lv: 35,
          desc:'',
          eventType: [{
            name: '龙头炮',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 3500,
              ATK: 320,
            },
            trophy: {
              gold: 250,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '龙头炮',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 3500,
              ATK: 320,
            },
            trophy: {
              gold: 250,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '激光龙头炮',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 3500,
              ATK: 350,
            },
            trophy: {
              gold: 250,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '激光龙头炮',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 3500,
              ATK: 350,
            },
            trophy: {
              gold: 250,
              equip: [
                0.2, 0.5, 0.25, 0.05
              ],
            }
          }, {
            name: '长脚的罗特斯',
            type: 'boss',
            eventType: 'battle',
            attribute: {
              HP: 3500,
              ATK: 400,
            },
            trophy: {
              gold: 800,
              equip: [
                0.2, 0.3, 0.35, 0.15
              ],
            }
          }, ]
        }
        , {
          battleTime: 2000,
          name: '天帷禁地',
          time: '20',
          needDPS: '350',
          id: '4',
          eventNum: '5',
          lv: 40,
          desc:'',
          eventType: [{
            name: '疯狂的信徒',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 4000,
              ATK: 250,
            },
            trophy: {
              gold: 300,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '疯狂的信徒',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 4000,
              ATK: 250,
            },
            trophy: {
              gold: 300,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: 'GBL女教徒',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 4000,
              ATK: 300,
            },
            trophy: {
              gold: 300,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: 'GBL女教徒',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 4000,
              ATK: 300,
            },
            trophy: {
              gold: 300,
              equip: [
                0.2, 0.5, 0.25, 0.05
              ],
            }
          }, {
            name: '审判者马塞尔',
            type: 'boss',
            eventType: 'battle',
            attribute: {
              HP: 4500,
              ATK: 475,
            },
            trophy: {
              gold: 600,
              equip: [
                0.2, 0.3, 0.35, 0.15
              ],
            }
          }, ]
        }

        , {
          battleTime: 2000,
          name: '根特外围',
          time: '20',
          needDPS: '400',
          id: '4',
          eventNum: '5',
          lv: 45,
          desc:'向安徒恩发起进攻的瞬间， 浓浓的黑雾如帷帐般笼罩着安徒恩巨大的身体， 士兵们一个个倒在伸手不见五指的黑暗之中……必须要解决这可怕的黑雾， 不能让我们的士兵白白牺牲',
          eventType: [{
            name: '卡勒特普通士兵',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 4000,
              ATK: 450,
            },
            trophy: {
              gold: 400,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '卡勒特普通士兵',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 4100,
              ATK: 450,
            },
            trophy: {
              gold: 400,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '卡勒特普通士兵',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 4500,
              ATK: 450,
            },
            trophy: {
              gold: 400,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '卡勒特普通士兵',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 4500,
              ATK: 450,
            },
            trophy: {
              gold: 400,
              equip: [
                0.2, 0.5, 0.25, 0.05
              ],
            }
          }, {
            name: '纵火犯本汀克',
            type: 'boss',
            eventType: 'battle',
            attribute: {
              HP: 4500,
              ATK: 550,
            },
            trophy: {
              gold: 1000,
              equip: [
                0.2, 0.3, 0.35, 0.15
              ],
            }
          }, ]
        }
        
        , {
          battleTime: 2000,
          name: '根特东门',
          time: '20',
          needDPS: '400',
          id: '4',
          eventNum: '5',
          lv: 50,
          desc:'既然无法回收安徒恩的能量， 那就只能先破坏安徒恩的关节部位， 才能确保大部队的总攻。',
          eventType: [{
            name: '卡勒特纵火兵',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 4500,
              ATK: 500,
            },
            trophy: {
              gold: 450,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '卡勒特纵火兵',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 4600,
              ATK: 500,
            },
            trophy: {
              gold: 450,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '卡勒特改造士兵',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 4700,
              ATK: 500,
            },
            trophy: {
              gold: 450,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '卡勒特改造士兵',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 4800,
              ATK: 500,
            },
            trophy: {
              gold: 450,
              equip: [
                0.2, 0.5, 0.25, 0.05
              ],
            }
          }, {
            name: '机动队长苏雷德',
            type: 'boss',
            eventType: 'battle',
            attribute: {
              HP: 4500,
              ATK: 600,
            },
            trophy: {
              gold: 1200,
              equip: [
                0.2, 0.3, 0.35, 0.15
              ],
            }
          }, ]
        }
        
        , {
          battleTime: 2000,
          name: '根特南门',
          time: '20',
          needDPS: '600',
          id: '4',
          eventNum: '5',
          lv: 55,
          desc:'安徒恩似乎打算退回魔界， 决不能让他这么轻易地回去！ 这么多的杀戮这么多的罪孽， 只有死亡才能赎清他的罪恶。 一定要阻止他返回魔界！ 向他的腿部发起进攻， 阻止他前进！',
          eventType: [{
            name: '卡勒特强化先锋卫队',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 5500,
              ATK: 550,
            },
            trophy: {
              gold: 500,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '卡勒特间谍',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 5600,
              ATK: 550,
            },
            trophy: {
              gold: 500,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '卡勒特强化先锋卫队',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 5100,
              ATK: 700,
            },
            trophy: {
              gold: 500,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '卡勒特间谍',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 5200,
              ATK: 700,
            },
            trophy: {
              gold: 500,
              equip: [
                0.2, 0.5, 0.25, 0.05
              ],
            }
          }, {
            name: 'GT-9600',
            type: 'boss',
            eventType: 'battle',
            attribute: {
              HP: 5500,
              ATK: 900,
            },
            trophy: {
              gold: 1500,
              equip: [
                0.2, 0.3, 0.35, 0.15
              ],
            }
          }, ]
        }
        , {
          battleTime: 2000,
          name: '补给线阻断战',
          time: '20',
          needDPS: '1000',
          id: '4',
          eventNum: '5',
          lv: 60,
          desc:'黑色火山， 安徒恩的心脏所在之处， 他最脆弱的地方， 但同时也可以说是最强大的地方。',
          eventType: [{
            name: '西克特·帕菲斯',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 6000,
              ATK: 700,
            },
            trophy: {
              gold: 600,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '裴特舒·帕菲斯',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 6000,
              ATK: 800,
            },
            trophy: {
              gold: 500,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '机械臂捷克',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 6000,
              ATK: 900,
            },
            trophy: {
              gold: 500,
              equip: [
                0.2, 0.1, 0.05, 0
              ],
            }
          }, {
            name: '夜战司令官巴比伦',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 5800,
              ATK: 1000,
            },
            trophy: {
              gold: 500,
              equip: [
                0.2, 0.5, 0.25, 0.05
              ],
            }
          }, {
            name: '机械师吉赛尔',
            type: 'boss',
            eventType: 'battle',
            attribute: {
              HP: 6000,
              ATK: 2100,
            },
            trophy: {
              gold: 1500,
              equip: [
                0.2, 0.3, 0.35, 0.15
              ],
            }
          }, ]
        }

        , {
          battleTime: 2000,
          name: '黑雾之源',
          time: '20',
          needDPS: '1500',
          id: '4',
          eventNum: '5',
          lv: 70,
          desc:'',
          eventType: [{
            name: '吞噬魔',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 7000,
              ATK: 1400,
            },
            trophy: {
              gold: 900,
              equip: [
                0.2, 0.1, 0.15, 0.05
              ],
            }
          }, {
            name: '吞噬魔',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 7000,
              ATK: 1410,
            },
            trophy: {
              gold: 900,
              equip: [
                0.2, 0.1, 0.15, 0.05
              ],
            }
          }, {
            name: '吞噬魔',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 7000,
              ATK: 1420,
            },
            trophy: {
              gold: 900,
              equip: [
                0.2, 0.1, 0.15, 0.05
              ],
            }
          }, {
            name: '吞噬魔',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 7000,
              ATK: 1500,
            },
            trophy: {
              gold: 900,
              equip: [
                0.2, 0.1, 0.15, 0.05
              ],
            }
          }, {
            name: '歼灭之内尔贝',
            type: 'boss',
            eventType: 'battle',
            attribute: {
              HP: 8000,
              ATK: 2400,
            },
            trophy: {
              gold: 2200,
              equip: [
                0.2, 0.3, 0.35, 0.15
              ],
            }
          }, ]
        }

        , {
          battleTime: 2000,
          name: '震颤的大地',
          time: '20',
          needDPS: '2000',
          id: '4',
          eventNum: '5',
          lv: 80,
          desc:'既然无法回收安徒恩的能量， 那就只能先破坏安徒恩的关节部位， 才能确保大部队的总攻。',
          eventType: [{
            name: '湮灭之弗雷伊内斯',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 8000,
              ATK: 2500,
            },
            trophy: {
              gold: 1000,
              equip: [
                0.2, 0.1, 0.15, 0.1
              ],
            }
          }, {
            name: '湮灭之弗雷伊内斯',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 8000,
              ATK: 2500,
            },
            trophy: {
              gold: 1000,
              equip: [
                0.2, 0.1, 0.15, 0.1
              ],
            }
          }, {
            name: '湮灭之弗雷伊内斯',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 8000,
              ATK: 2500,
            },
            trophy: {
              gold: 1000,
              equip: [
                0.2, 0.1, 0.15, 0.1
              ],
            }
          }, {
            name: '湮灭之弗雷伊内斯',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 8000,
              ATK: 2500,
            },
            trophy: {
              gold: 1000,
              equip: [
                0.2, 0.1, 0.15, 0.1
              ],
            }
          }, {
            name: '毁灭之塔伊奥利',
            type: 'boss',
            eventType: 'battle',
            attribute: {
              HP: 12000,
              ATK: 3000,
            },
            trophy: {
              gold: 2500,
              equip: [
                0.2, 0.3, 0.35, 0.15
              ],
            }
          }, ]
        }

        , {
          battleTime: 2000,
          name: '擎天之柱',
          time: '20',
          needDPS: '2500',
          id: '4',
          eventNum: '5',
          lv: 90,
          desc:'安徒恩似乎打算退回魔界， 决不能让他这么轻易地回去！ 这么多的杀戮这么多的罪孽， 只有死亡才能赎清他的罪恶。 一定要阻止他返回魔界！ 向他的腿部发起进攻， 阻止他前进！',
          eventType: [{
            name: '火焰之克瑞夫',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 9000,
              ATK: 3510,
            },
            trophy: {
              gold: 1200,
              equip: [
                0.2, 0.1, 0.15, 0.1
              ],
            }
          }, {
            name: '守门将克拉特',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 9000,
              ATK: 3600,
            },
            trophy: {
              gold: 800,
              equip: [
                0.2, 0.1, 0.15, 0.1
              ],
            }
          }, {
            name: '火焰之克瑞夫',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 9100,
              ATK: 3700,
            },
            trophy: {
              gold: 1200,
              equip: [
                0.2, 0.1, 0.15, 0.1
              ],
            }
          }, {
            name: '守门将克拉特',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 9100,
              ATK: 3800,
            },
            trophy: {
              gold: 1200,
              equip: [
                0.2, 0.1, 0.15, 0.1
              ],
            }
          }, {
            name: '炽炎',
            type: 'boss',
            eventType: 'battle',
            attribute: {
              HP: 15000,
              ATK: 5200,
            },
            trophy: {
              gold: 3000,
              equip: [
                0.2, 0.3, 0.35, 0.15
              ],
            }
          }, ]
        }

        , {
          battleTime: 2000,
          name: '黑色火山',
          time: '20',
          needDPS: '1000',
          id: '4',
          eventNum: '5',
          lv: 100,
          desc:'黑色火山， 安徒恩的心脏所在之处， 他最脆弱的地方， 但同时也可以说是最强大的地方。',
          eventType: [{
            name: '阿托尔',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 10000,
              ATK: 5750,
            },
            trophy: {
              gold: 1500,
              equip: [
                0.2, 0.1, 0.10, 0.05
              ],
            }
          }, {
            name: '梅尔塔',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 10000,
              ATK: 6050,
            },
            trophy: {
              gold: 1500,
              equip: [
                0.2, 0.1, 0.10, 0.05
              ],
            }
          }, {
            name: '魔眼赛尔',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 10000,
              ATK: 6150,
            },
            trophy: {
              gold: 1500,
              equip: [
                0.2, 0.1, 0.10, 0.05
              ],
            }
          }, {
            name: '恐怖邪念体',
            type: 'monster',
            eventType: 'battle',
            attribute: {
              HP: 10000,
              ATK: 6250,
            },
            trophy: {
              gold: 1500,
              equip: [
                0.2, 0.5, 0.25, 0.1
              ],
            }
          }, {
            name: '克雷斯',
            type: 'boss',
            eventType: 'battle',
            attribute: {
              HP: 15000,
              ATK: 8500,
            },
            trophy: {
              gold: 4000,
              equip: [
                0.2, 0.3, 0.35, 0.15
              ],
            }
          }, ]
        }
      ]
    }
  },
  methods: {}
};