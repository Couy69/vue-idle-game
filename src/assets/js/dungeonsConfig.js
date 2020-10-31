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
          needDPS: '100',
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
          needDPS: '200',
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
              gold: 500,
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