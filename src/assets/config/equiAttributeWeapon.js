/**
 * 武器属性配置文件
 * @author couy
 */

export const equiAttributeWeapon = {
  data(){
    return {
      quality: [{
        name: '破旧',
        qualityCoefficient: 0.7,
        probability: '0.25',
        color: '#a1a1a1',
        extraEntryNum: 1,
      }, {
        name: '普通',
        qualityCoefficient: 1,
        probability: '0.55',
        color: '#fff', extraEntryNum: 2,
      }, {
        name: '神器',
        qualityCoefficient: 1.5,
        probability: '0.15',
        color: '#ff00ff', extraEntryNum: 3,
      }, {
        name: '史诗',
        qualityCoefficient: 2,
        probability: '0.05',
        color: '#f78918', extraEntryNum: 4,
      }, {
        name: '独特',
        qualityCoefficient: 2.2,
        probability: '0',
        color: '#ff0000', extraEntryNum: 5,
      }],
      uniqueCategory: [{
        name: '创世亡命剑',
        des: '只有被选中的勇士才能唤醒它真正的力量。',
        iconSrc: './icons/U_Sword01.png',
        entry: [{
          'valCoefficient': 1.8,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'CRIT',
          'valCoefficient': 1.5,
          'value': '8',
          'showVal': '+8%',
          'name': '暴击率'
        }, {
          'valCoefficient': 1.3,
          'value': '11',
          'showVal': '+11',
          type: 'CRITDMG',
          'name': '暴击伤害'
        }]
      }, {
        name: '无名剑',
        des: '没有人知道它的来历。',
        iconSrc: './icons/U_Sword02.png',
        entry: [{
          'valCoefficient': 2.7,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'CRIT',
          'valCoefficient': 2.5,
          'value': '8',
          'showVal': '+8%',
          'name': '暴击率'
        }]
      }, {
        name: '死亡之刃',
        des: '万物生自守恒，源力破则失。',
        iconSrc: './icons/U_Sword04.png',
        entry: [{
          'valCoefficient': 1.8,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'CRIT',
          'valCoefficient': 1.5,
          'value': '8',
          'showVal': '+8%',
          'name': '暴击率'
        }, {
          'valCoefficient': 1.3,
          'value': '11',
          'showVal': '+11',
          type: 'CRITDMG',
          'name': '暴击伤害'
        }]
      }, {
        name: '霜龙利刃',
        des: '傲雪冷心绝，万念化冰华。',
        iconSrc: './icons/U_Sword05.png',
        entry: [{
          'valCoefficient': 1.8,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'CRIT',
          'valCoefficient': 1.5,
          'value': '8',
          'showVal': '+8%',
          'name': '暴击率'
        }, {
          'valCoefficient': 1.3,
          'value': '11',
          'showVal': '+11',
          type: 'CRITDMG',
          'name': '暴击伤害'
        }]
      }, {
        name: '阿加雷斯血色巨剑',
        des: '诚既勇兮又以武，终刚强兮不可凌。身既死兮神以灵，子魂魄兮为鬼雄。',
        iconSrc: './icons/U_Sword03.png',
        entry: [{
          'valCoefficient': 1.8,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'CRIT',
          'valCoefficient': 1.5,
          'value': '8',
          'showVal': '+8%',
          'name': '暴击率'
        }, {
          'valCoefficient': 1.3,
          'value': '11',
          'showVal': '+11',
          type: 'CRITDMG',
          'name': '暴击伤害'
        }]
      }, {
        name: '神龙纳格林之刃',
        des: '神龙纳格林的爪子锻造的利刃',
        iconSrc: './icons/U_Sword06.png',
        entry: [{
          'valCoefficient': 2.8,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          'valCoefficient': 2.2,
          'value': '11',
          'showVal': '+11',
          type: 'CRITDMG',
          'name': '暴击伤害'
        }]
      }, {
        name: '大师大冒险家之剑',
        des: '大师大冒险家之剑',
        iconSrc: './icons/U_Sword07.png',
        entry: [{
          'valCoefficient': 2.4,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'HP',
          'valCoefficient': 1.8,
          'value': '8',
          'showVal': '8',
          'name': '生命值'
        }]
      }, {
        name: '六翼天使武刃',
        des: '六翼天使武刃',
        iconSrc: './icons/U_Sword08.png',
        entry: [{
          'valCoefficient': 2.6,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'DEF',
          'valCoefficient': 1.8,
          'value': '8',
          'showVal': '8',
          'name': '防御力'
        }]
      }, {
        name: '数珠丸恒次',
        des: '具体情况不明，传说为日莲上人所有',
        iconSrc: './icons/U_Sword09.png',
        entry: [{
          'valCoefficient': 3.9,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }]
      }, {
        name: '埃苏莱布斯军刀',
        des: '',
        iconSrc: './icons/U_Sword10.png',
        entry: [{
          'valCoefficient': 1.9,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'DEF',
          'valCoefficient': 1.2,
          'value': '8',
          'showVal': '8',
          'name': '防御力'
        }, {
          type: 'BLOC',
          'valCoefficient': 1.2,
          'value': '8',
          'showVal': '8',
          'name': '格挡'
        }]
      },],
      category: [{
        name: '狱岩石太刀',
        des: '用狱岩石制作的太刀，据说拥有让使用者潜力爆发的神秘力量',
        iconSrc: './icons/W_Sword016.png',
        entry: [{
          'valCoefficient': 1.2,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'CRIT',
          'valCoefficient': 1.3,
          'value': '8',
          'showVal': '+8%',
          'name': '暴击率'
        }]
      },
      {
        name: '战士长剑',
        des: '六级战士使用的长剑',
        iconSrc: './icons/W_Sword007.png',
        entry: [{
          'valCoefficient': 1.2,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'DEF',
          'valCoefficient': 0.5,
          'value': '8',
          'showVal': '8',
          'name': '防御力'
        }]
      },
      {
        name: '赤柳血刃',
        des: '似乎会给使用者提供生命气息',
        iconSrc: './icons/W_Sword019.png',
        entry: [{
          'valCoefficient': 1.3,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'HP',
          'valCoefficient': 1.1,
          'value': '8',
          'showVal': '8',
          'name': '生命值'
        }]
      },
      {
        name: '普通长剑',
        des: '朴实无华普通长剑，有的只有强力的攻击力',
        iconSrc: './icons/W_Sword001.png',
        entry: [{
          'valCoefficient': 1.7,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }]
      }
        ,
      {
        name: '紫炎波刃剑',
        des: '传说中的狂战士最喜爱的剑。',
        iconSrc: './icons/W_Sword021.png',
        entry: [{
          'valCoefficient': 1.7,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }]
      },
      {
        name: '毛毛的爪子',
        des: '这？这也是武器？',
        iconSrc: './icons/W_Fist003.png',
        entry: [{
          'valCoefficient': 2,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          type: 'CRIT',
          'valCoefficient': 0.7,
          'value': '8',
          'showVal': '+8%',
          'name': '暴击率'
        }]
      },
      {
        name: '冰晶之刃',
        des: '剑锋覆盖着冰晶，碰到的敌人都会被冻住。',
        iconSrc: './icons/W_Sword018.png',
        entry: [{
          'valCoefficient': 1.4,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          'valCoefficient': 1.3,
          'value': '11',
          'showVal': '+11',
          type: 'CRITDMG',
          'name': '暴击伤害'
        }]
      }
      ],
      extraEntry: [{
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
    }
  },
  methods: {
  }
};