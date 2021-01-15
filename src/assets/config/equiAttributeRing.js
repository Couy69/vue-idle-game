/**
 * 戒指属性配置文件
 * @author couy
 */

export const equiAttributeRing = {
  data(){
    return{
      quality: [{
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
      uniqueCategory: [{
        name: '真·毛毛指环',
        des: '',
        iconSrc: './icons/U_ring02.png',
        entry: [{
            'valCoefficient': 1.2,
            'value': '11',
            'showVal': '+11',
            type: 'CRITDMG',
            'name': '暴击伤害'
          },{
            'valCoefficient': 0.5,
            'value': '11',
            'showVal': '+11',
            type: 'CRIT',
            'name': '暴击率'
          },{
            'valCoefficient': 0.7,
            'value': '11',
            'showVal': '+11',
            type: 'ATK',
            'name': '攻击力'
          },]
      },{
        name: '死神名片戒指',
        des: '',
        iconSrc: './icons/U_ring01.png',
        entry: [{
            'valCoefficient': 1.0,
            'value': '11',
            'showVal': '+11',
            type: 'CRITDMG',
            'name': '暴击伤害'
          },{
            'valCoefficient': 0.5,
            'value': '11',
            'showVal': '+11',
            type: 'CRIT',
            'name': '暴击率'
          },{
            'valCoefficient': 0.8,
            'value': '11',
            'showVal': '+11',
            type: 'HP',
            'name': '生命值'
          }]
      },{
        name: '先驱者戒指',
        des: '',
        iconSrc: './icons/U_ring03.png',
        entry: [{
            'valCoefficient': 1.0,
            'value': '11',
            'showVal': '+11',
            type: 'CRITDMG',
            'name': '暴击伤害'
          },{
            'valCoefficient': 0.5,
            'value': '11',
            'showVal': '+11',
            type: 'CRIT',
            'name': '暴击率'
          },{
            'valCoefficient': 0.7,
            'value': '11',
            'showVal': '+11',
            type: 'HP',
            'name': '生命值'
          }]
      },{
        name: '素盏呜尊的意志',
        des: '',
        iconSrc: './icons/U_ring04.png',
        entry: [{
            'valCoefficient': 1.6,
            'value': '11',
            'showVal': '+11',
            type: 'CRITDMG',
            'name': '暴击伤害'
          },{
            'valCoefficient': 1.1,
            'value': '11',
            'showVal': '+11',
            type: 'ATK',
            'name': '攻击力'
          },]
      },{
        name: '月夜见尊的意志',
        des: '',
        iconSrc: './icons/U_ring05.png',
        entry: [{
            'valCoefficient': 1.5,
            'value': '11',
            'showVal': '+11',
            type: 'CRITDMG',
            'name': '暴击伤害'
          },{
            'valCoefficient': 1.2,
            'value': '11',
            'showVal': '+11',
            type: 'HP',
            'name': '生命值'
          }]
      },],
      category: [
        {
          name: '生命指环',
          des: '据说拥有增强佩戴者体质的神秘功效',
          iconSrc: './icons/Ac_9.png',
          entry: [{
            'valCoefficient': 1.1,
            'value': '11',
            'showVal': '+11',
            type: 'HP',
            'name': '生命值'
          }]
        },
        {
          name: '毛毛指环',
          des: '喵喵戒指，上面有没有摸到毛毛jio的怨念',
          iconSrc: './icons/Ac_11.png',
          entry: [{
            'valCoefficient': 0.9,
            'value': '11',
            'showVal': '+11',
            type: 'HP',
            'name': '生命值'
          },{
            'valCoefficient': 0.3,
            'value': '11',
            'showVal': '+11',
            type: 'ATK',
            'name': '攻击力'
          },{
            'valCoefficient': 0.8,
            'value': '11',
            'showVal': '+11',
            type: 'CRIT',
            'name': '暴击率'
          },]
        },
        {
          name: '御魂之戒',
          des: '出来吧，卡赞！吸纳所有彷徨的灵魂！   ——鬼剑士约翰',
          iconSrc: './icons/Ac_10.png',
          entry: [{
            'valCoefficient': 0.7,
            'value': '11',
            'showVal': '+11',
            type: 'HP',
            'name': '生命值'
          },{
            'valCoefficient': 0.5,
            'value': '11',
            'showVal': '+11',
            type: 'ATK',
            'name': '攻击力'
          },]
        },
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
      }]
    }
  },
  methods: {
  }
};