/**
 * 数据字典
 * 后端没时间做，所以这里处理下
 */

 
export const dic = {
  data(){
    return {
      disabled:[
        {
          value:true,
          type:'已禁用'
        },
        {
          value:false,
          type:'已激活'
        },
      ],
      licensePlateType:[
        {
          value:'COME_IN_LICENSEPLATE',
          type:'识别类型_进'
        },
        {
          value:'GO_OUT_LICENSEPLATE',
          type:'识别类型_出'
        },
      ],
      algo:[
        { type: "PERSON", info: "人" },
        // { type: "FACESNAP", info: "人脸抓拍" },
        {type: "FACE_RECOG",info: "人脸识别",},
        { type: "CAR", info: "车" },
        { type: "CAT", info: "猫" },
        { type: "BIRD", info: "鸟" },
        { type: "DOG", info: "狗" },
        {type: "licensePlate",info: "车牌识别",},
      ],
    }
  },
}
