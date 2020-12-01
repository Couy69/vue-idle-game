/**
 * 配置文件
 * @author couy
 */

export const assist = {
  data(){
    return{
      quality:[{
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
        qualityCoefficient: 2.35,
        probability: '0',
        color: '#ff0000', extraEntryNum: 5,
      }],
    }
  },
  methods: {
  }
};