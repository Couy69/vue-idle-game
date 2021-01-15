/**
 * 项链属性配置文件
 * @author couy
 */

export const equiAttributeNeck = {
  data(){
    return{
      qualityNeck: [{
        name: '破旧',
        qualityCoefficient: 0.6,
        probability: '0.25',
        color: '#a1a1a1',
        extraEntryNum: 1,
      }, {
        name: '普通',
        qualityCoefficient: 0.9,
        probability: '0.55',
        color: '#fff', extraEntryNum: 2,
      }, {
        name: '神器',
        qualityCoefficient: 1.3,
        probability: '0.15',
        color: '#ff00ff', extraEntryNum: 3,
      }, {
        name: '史诗',
        qualityCoefficient: 1.6,
        probability: '0.05',
        color: '#f78918', extraEntryNum: 4,
      }, {
        name: '独特',
        qualityCoefficient: 2,
        probability: '0',
        color: '#ff0000', extraEntryNum: 5,
      }],
      extraEntryNeck: [{
        'value': '11',
        'showVal': '+11',
        type: 'ATK',
        'name': '攻击力'
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
        type: 'DEFPERCENT',
        'name': '防御力'
      }, {
        'value': '11%',
        'showVal': '+11%',
        type: 'HPPERCENT',
        'name': '生命值'
      },],
      uniqueCategoryNeck: [{
        name: '十字旅团降魔项链',
        des: '',
        iconSrc: './icons/U_neck01.png',
        entry: [{
          'valCoefficient': 0.7,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }, {
          'valCoefficient': 0.8,
          'value': '11',
          'showVal': '+11',
          type: 'HP',
          'name': '生命值'
        }, {
          'valCoefficient': 0.9,
          'value': '11',
          'showVal': '+11',
          type: 'DEF',
          'name': '防御力'
        }]
      }, {
        name: '进阶黑暗龙王项链',
        des: '',
        iconSrc: './icons/U_neck02.png',
        entry: [{
          'valCoefficient': 1.0,
          'value': '11',
          'showVal': '+11',
          type: 'CRITDMG',
          'name': '暴击伤害'
        }, {
          'valCoefficient': 0.5,
          'value': '11',
          'showVal': '+11',
          type: 'CRIT',
          'name': '暴击率'
        }, {
          'valCoefficient': 0.8,
          'value': '11',
          'showVal': '+11',
          type: 'HP',
          'name': '生命值'
        }]
      }, {
        name: '伟大单身成员的项链',
        des: '真棒，真帅。有了这条帅气的项链，一辈子单身都不会孤独',
        iconSrc: './icons/U_neck03.png',
        entry: [{
          'valCoefficient': 1.0,
          'value': '11',
          'showVal': '+11',
          type: 'CRITDMG',
          'name': '暴击伤害'
        }, {
          'valCoefficient': 1.2,
          'value': '11',
          'showVal': '+11',
          type: 'BLOC',
          'name': '格挡'
        }, {
          'valCoefficient': 0.7,
          'value': '11',
          'showVal': '+11',
          type: 'HP',
          'name': '生命值'
        }]
      }, {
        name: '魔族之翼展',
        des: '你能看到什么呢',
        iconSrc: './icons/U_neck04.png',
        entry: [{
          'valCoefficient': 1.6,
          'value': '11',
          'showVal': '+11',
          type: 'CRITDMG',
          'name': '暴击伤害'
        }, {
          'valCoefficient': 1.6,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        },]
      }, {
        name: '伊帕娅之项链',
        des: '',
        iconSrc: './icons/U_neck05.png',
        entry: [{
          'valCoefficient': 0.9,
          'value': '11',
          'showVal': '+11',
          type: 'BLOC',
          'name': '格挡'
        }, {
          'valCoefficient': 0.9,
          'value': '11',
          'showVal': '+11',
          type: 'DEF',
          'name': '防御力'
        }, {
          'valCoefficient': 1.3,
          'value': '11',
          'showVal': '+11',
          type: 'HP',
          'name': '生命值'
        }]
      }],
      categoryNeck: [
        {
          name: '十字军项链',
          des: '十字军佩戴的项链',
          iconSrc: './icons/Ac_1.png',
          entry: [{
            'valCoefficient': 0.9,
            'value': '11',
            'showVal': '+11',
            type: 'DEF',
            'name': '防御力'
          }, {
            'valCoefficient': 0.5,
            'value': '11',
            'showVal': '+11',
            type: 'HP',
            'name': '生命值'
          },{
          'valCoefficient': 0.6,
          'value': '11',
          'showVal': '+11',
          type: 'BLOC',
          'name': '格挡'
        }]
        },
        {
          name: '冰龙凝雪',
          des: '冰龙凝雪',
          iconSrc: './icons/Ac_7.png',
          entry: [{
            'valCoefficient': 0.75,
            'value': '11',
            'showVal': '+11',
            type: 'CRITDMG',
            'name': '暴击伤害'
          }, {
            'valCoefficient': 0.5,
            'value': '11',
            'showVal': '+11',
            type: 'CRIT',
            'name': '暴击率'
          }, {
            'valCoefficient': 0.5,
            'value': '11',
            'showVal': '+11',
            type: 'HP',
            'name': '生命值'
          }]
        },
        {
          name: '银魂之眼',
          des: '银魂之眼',
          iconSrc: './icons/Ac_5.png',
          entry: [{
            'valCoefficient': 1.1,
            'value': '11',
            'showVal': '+11',
            type: 'CRIT',
            'name': '暴击率'
          }, {
            'valCoefficient': 0.5,
            'value': '11',
            'showVal': '+11',
            type: 'HP',
            'name': '生命值'
          }, {
          'valCoefficient': 0.6,
          'value': '11',
          'showVal': '+11',
          type: 'ATK',
          'name': '攻击力'
        }]
        }
      ],
      extraEntryNeck: [{
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
        type: 'BLOC',
        'name': '格挡'
      }]
    }
  },
  methods: {
  }
};