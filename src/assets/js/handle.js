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
 *  返回一条随机属性
 * @param {number} lv  装备强化等级
 */
function createRandomEntry(lv,qualityCoefficient){

  let extraEntry=[{
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
  },]

  let entry = {}
  let index = Math.floor((Math.random() * extraEntry.length));
  entry = extraEntry[index]

  switch (entry.type) {
    case 'ATK':
      var random = parseInt(lv * 0.5 + (Math.random() * lv / 2 + 1))
      random = parseInt(random * qualityCoefficient)
      random = random || 1
      entry.value = random
      entry.showVal = '+' + random
      break;
    case 'DEF':
      var random = parseInt((lv * 0.2 + (Math.random() * lv / 2 + 1)))
      random = parseInt(random * qualityCoefficient)
      random = random || 1
      entry.value = random
      entry.showVal = '+' + random
      break;
    case 'HP':
      var random = parseInt((lv * 0.2 * 10 + (Math.random() * lv / 2 + 1)))
      random = parseInt(random * qualityCoefficient)
      random = random || 1
      entry.value = random
      entry.showVal = '+' + random
      break;
    case 'ATKPERCENT':
      var random = parseFloat(lv * 0.11 + (Math.random() * lv / 8 + 1)).toFixed(2)
      random = parseFloat(random * qualityCoefficient).toFixed(2)
      random = random || 1
      entry.value = random
      entry.showVal = '+' + random + '%'
      break;
    case 'DEFPERCENT':
      var random = parseFloat(lv * 0.1 + (Math.random() * lv / 8 + 1)).toFixed(2)
      random = parseFloat(random * qualityCoefficient).toFixed(2)
      random = random || 1
      entry.value = random
      entry.showVal = '+' + random + '%'
      break;
    case 'HPPERCENT':
      var random = parseFloat(lv * 0.13 + (Math.random() * lv / 8 + 1)).toFixed(2)
      random = parseFloat(random * qualityCoefficient).toFixed(2)
      random = random || 1
      entry.value = random
      entry.showVal = '+' + random + '%'
      break;
    case 'CRIT':
      var random = parseInt(Math.random() * 5 + 5)
      random = parseInt(random * qualityCoefficient)
      entry.value = random
      entry.showVal = '+' + random + '%'
      break;
    case 'CRITDMG':
      var random = parseInt(Math.random() * 12 + 20)
      random = parseInt(random * qualityCoefficient)
      entry.value = random
      entry.showVal = '+' + random + '%'
      break;
    default:
      break;
  }
  return entry
}

export default {
  deepCopy,
  CalculateStrAttr,
  createRandomEntry
}