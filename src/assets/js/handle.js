function deepCopy(data) {
  return JSON.parse(JSON.stringify(data))
}

/**
 * 根据强化等级计算强化后属性
 * @param {obj} entry 装备基础属性
 * @param {number} lv  装备强化等级
 */
function CalculateStrAttr(entry, lv) {
  var a = 1
  // 确定强化系数
  a = (1.05 ** lv ** 1.1)
  entry.map((item) => {
    let value
    switch (item.type) {
      case 'ATK':
        value = Math.round(a * item.value)
        item.value = value
        item.showValue = '+' + value
        break;
      case 'DEF':
        value = Math.round(a * item.value)
        item.value = value
        item.showValue = '+' + value
        break;
      case 'HP':
        value = Math.round(a * item.value)
        item.value = value
        item.showValue = '+' + value
        break;
      case 'ATKPERCENT':
        value = Math.round(a * item.value)
        item.value = value
        item.showValue = '+' + value + '%'
        break;
      case 'DEFPERCENT':
        value = Math.round(a * item.value)
        item.value = value
        item.showValue = '+' + value + '%'
        break;
      case 'HPPERCENT':
        value = Math.round(a * item.value)
        item.value = value
        item.showValue = '+' + value + '%'
        break;
      case 'CRIT':
        value = Math.round(a * item.value)
        item.value = value
        item.showValue = '+' + value + '%'
        break;
      case 'CRITDMG':
        value = Math.round(a * item.value)
        item.value = value
        item.showValue = '+' + value + '%'
        break;
      default:
        break;
    }

  })
  return entry
}

/**
 * 随机化生成副本
 * @param {number} lv  副本等级
 * @param {number} difficulty(1:普通 2:困难 3:极难) 副本难度
 */
function createRandomDungeons(lv, difficulty) {
  lv = lv||1,difficulty = difficulty||1;
  var df = difficulty==1?1:difficulty==2?1.15:1.4
  var dungeonsConfig = {
    id:lv+''+difficulty,
    battleTime: 2000,
    name: 'Lv'+lv+'_'+(difficulty==1?'普通':difficulty==2?'困难':'极难'),
    eventNum: '5',
    lv: lv,
    needDPS: parseInt(lv*lv**1.3*2*difficulty),
    difficulty:difficulty,
    difficultyName:difficulty==1?'普通':difficulty==2?'困难':'极难',
    top:Math.random()*70+15+'%',
    left:Math.random()*70+10+'%',
    eventType: [{
      name: 'moster',
      type: 'monster',
      eventType: 'battle',
      attribute: {
        HP: parseInt(lv*lv**1.1*(Math.random()*5+15)*df),
        ATK: parseInt(lv*lv**1.1*(Math.random()*1+2)*df),
      },
      trophy: {
        gold: parseInt(lv**1.15*(Math.random()*5+8)*df),
        equip: [
          0.2*df, 0.08*df, 0.03*df, 0*df
        ],
      }
    }, {
      name: 'moster',
      type: 'monster',
      eventType: 'battle',
      attribute: {
        HP: parseInt(lv*lv**1.1*(Math.random()*5+15)*df),
        ATK: parseInt(lv*lv**1.1*(Math.random()*1+2)*df),
      },
      trophy: {
        gold: parseInt(lv**1.15*(Math.random()*5+8)*df),
        equip: [
          0.2*df, 0.08*df, 0.03*df, 0*df
        ],
      }
    }, {
      name: 'moster',
      type: 'monster',
      eventType: 'battle',
      attribute: {
        HP: parseInt(lv*lv**1.1*(Math.random()*5+15)*df),
        ATK: parseInt(lv*lv**1.1*(Math.random()*1+2)*df),
      },
      trophy: {
        gold: parseInt(lv**1.15*(Math.random()*5+8)*df),
        equip: [
          0.2*df, 0.08*df, 0.03*df, 0*df
        ],
      }
    }, {
      name: 'moster',
      type: 'monster',
      eventType: 'battle',
      attribute: {
        HP: parseInt(lv*lv**1.1*(Math.random()*5+15)*df),
        ATK: parseInt(lv*lv**1.1*(Math.random()*1+2)*df),
      },
      trophy: {
        gold: parseInt(lv**1.15*(Math.random()*5+8)*df),
        equip: [
          0.2*df, 0.08*df, 0.03*df, 0*df
        ],
      }
    }, {
      name: 'boss',
      type: 'boss',
      eventType: 'battle',
      attribute: {
        HP: parseInt(lv*lv**1.1*(Math.random()*5+35)*df),
        ATK: parseInt(lv*lv**1.1*(Math.random()*1+3)*df),
      },
      trophy: {
        gold: parseInt(lv**1.15*(Math.random()*10+25)*df),
        equip: [
          0.25-0.05*df, 0.55-0.15*df, 0.15+0.15*df, 0.05+0.05*df
        ],
      }
    }, ]
  }
  return dungeonsConfig
}


/**
 *  返回一条随机属性
 * @param {number} lv  装备强化等级
 */
function createRandomEntry(lv, qualityCoefficient) {

  let extraEntry = [{
      'value': '11',
      'showVal': '+11',
      type: 'ATK',
      'name': '攻击力'
    }, {
      type: 'CRIT',
      'value': '8',
      'showVal': '+8%',
      'name': '暴击率'
    }, {
      type: 'CRITDMG',
      'value': '20',
      'showVal': '+20%',
      'name': '暴击伤害'
    }, {
      type: 'HP',
      'value': '20',
      'showVal': '+20',
      'name': '生命值'
    }, {
      type: 'DEF',
      'value': '8',
      'showVal': '+8%',
      'name': '防御力'
    }, {
      'value': '11%',
      'showVal': '+11%',
      type: 'ATKPERCENT',
      'name': '攻击力'
    }, {
      'value': '11%',
      'showVal': '+11%',
      type: 'DEFPERCENT',
      'name': '防御力'
    }, {
      'value': '11%',
      'showVal': '+11%',
      type: 'HPPERCENT',
      'name': '生命值'
    },
    {
      'value': '11%',
      'showVal': '+11%',
      type: 'BLOC',
      'name': '格挡'
    },
    // {
    //   'value': '11%',
    //   'showVal': '+11%',
    //   type: 'EVA',
    //   'name': '闪避'
    // },
  ]

  let randomCoefficient = Math.random() ,EntryLevel = Math.floor(randomCoefficient*100)+'%'
  let entry = {}
  let index = Math.floor((Math.random()  * extraEntry.length));
  entry = extraEntry[index]
  entry.EntryLevel = EntryLevel
  switch (entry.type) {
    case 'ATK':
      var random = parseInt(lv * 1 + (randomCoefficient  * lv / 2 + 1))
      random = parseInt(random * qualityCoefficient)
      random = random || 1
      entry.value = random
      entry.showVal = '+' + random
      break;
    case 'DEF':
      var random = parseInt((lv * 0.4 + (randomCoefficient  * lv / 2 + 1)))
      random = parseInt(random * qualityCoefficient)
      random = random || 1
      entry.value = random
      entry.showVal = '+' + random
      break;
    case 'HP':
      var random = parseInt((lv * 0.2 * 15 + (randomCoefficient  * lv / 2 + 1)))
      random = parseInt(random * qualityCoefficient)
      random = random || 1
      entry.value = random
      entry.showVal = '+' + random
      break;
    case 'ATKPERCENT':
      var random = parseFloat(lv * 0.11 + (randomCoefficient  * lv / 8 + 1)).toFixed(2)
      random = parseFloat(random * qualityCoefficient).toFixed(2)
      random = random || 1
      entry.value = random
      entry.showVal = '+' + random + '%'
      break;
    case 'DEFPERCENT':
      var random = parseFloat(lv * 0.1 + (randomCoefficient  * lv / 8 + 1)).toFixed(2)
      random = parseFloat(random * qualityCoefficient).toFixed(2)
      random = random || 1
      entry.value = random
      entry.showVal = '+' + random + '%'
      break;
    case 'HPPERCENT':
      var random = parseFloat(lv * 0.13 + (randomCoefficient  * lv / 8 + 1)).toFixed(2)
      random = parseFloat(random * qualityCoefficient).toFixed(2)
      random = random || 1
      entry.value = random
      entry.showVal = '+' + random + '%'
      break;
    case 'CRIT':
      var random = parseInt(randomCoefficient  * 5 + 5)
      random = parseInt(random * qualityCoefficient)
      entry.value = random
      entry.showVal = '+' + random + '%'
      break;
    case 'CRITDMG':
      var random = parseInt(randomCoefficient  * 12 + 20)
      random = parseInt(random * qualityCoefficient)
      entry.value = random
      entry.showVal = '+' + random + '%'
      break;
    case 'BLOC':
      var random = parseInt((lv * 0.6 + (randomCoefficient  * lv / 2 + 1)))
      random = parseInt(random * qualityCoefficient)
      random = random || 1
      entry.value = random
      entry.showVal = '+' + random
      break;
      // case 'EVA':
      //     var random = parseInt(randomCoefficient  * 12 + 3)
      //     random = parseInt(random * qualityCoefficient)
      //     entry.value = random
      //     entry.showVal = '+' + random + '%'
      //     break;
    default:
      break;
  }
  return entry
}

export default {
  deepCopy,
  CalculateStrAttr,
  createRandomEntry,
  createRandomDungeons
}