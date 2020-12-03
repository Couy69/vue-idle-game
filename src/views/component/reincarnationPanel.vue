<template>
  <div class="reincarnation">
    <!-- <a class="github" target="_blank" @click="navToGithub" title="源码" src="https://github.com/Couy69/vue-idle-game"></a> -->
    <div class="title">
      <p>现在转生可以获得130转生点数</p>
      <div class="info">
        <p>- 转生后会失去金币与装备</p>
        <p>- 转生会获得转生点数</p>
      </div>
      <div class='btn-div'>
        <div class="button">确认转生</div>
      </div>
    </div>
    <div class="content">
      <div class="info">
        <p>当前转生次数：{{reincarnationData.count}}次</p>
        <p>剩余转生点数：{{reincarnationData.point}}</p>
      </div>
      <div class="panel">
        <div class="item" v-for="(v,k) in attr" :key="k">
          <p>
            <img :src="v.img"><span>{{v.showName}}：+{{v.currentValue.toFixed(2)}}{{v.unity}}</span>
          </p>
          <div class="group">
            <div class="button" @click="subtract(v,$event)">-</div>
            <input type="number" min="0" disabled v-model="v.point">
            <div class="button" v-on:click="add(v,$event)">+</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { assist } from '../../assets/js/assist';
export default {
  name: "reincarnation",
  mixins: [assist],
  data() {
    return {
      reincarnationPoint: 100,
      attr: [
        {
          name: 'HP',
          showName: '生命值',
          img: require('../../assets/icons/S_Holy01.png'),
          oldValue: 0,
          point: 0,
          unity: '',
          currentValue: 0,
          maxPoint: null,
        }, {
          name: 'ATK',
          showName: '攻击力',
          img: require('../../assets/icons/ATK.png'),
          oldValue: 0,
          point: 0,
          unity: '',
          currentValue: 0,
          maxPoint: null,
        }, {
          name: 'CRIT',
          showName: '暴击率',
          img: require('../../assets/icons/CRIT.png'),
          oldValue: 0,
          point: 0,
          unity: '%',
          currentValue: 0,
          maxPoint: 500,
        }, {
          name: 'CRITDMG',
          showName: '暴击伤害',
          img: require('../../assets/icons/CRITDMG.png'),
          oldValue: 0,
          point: 0,
          unity: '%',
          currentValue: 0,
          maxPoint: null,
        }, {
          name: 'DEF',
          showName: '护甲',
          img: require('../../assets/icons/icon_11.png'),
          oldValue: 0,
          point: 0,
          unity: '',
          currentValue: 0,
          maxPoint: null,
        }, {
          name: 'BLOC',
          showName: '格挡',
          img: require('../../assets/icons/S_BLOC.png'),
          oldValue: 0,
          point: 0, unity: '',
          currentValue: 0,
          maxPoint: null,
        },
        {
          name: 'MOVESPEED',
          showName: '副本行进速度',
          img: require('../../assets/icons/S_EVA.png'),
          oldValue: 0,
          point: 0, unity: 'X',
          currentValue: 0,
          maxPoint: 500,
        },
        {
          name: 'BATTLESPEED',
          showName: '副本战斗速度',
          img: require('../../assets/icons/S_EVA.png'),
          oldValue: 0,
          point: 0, unity: 'X',
          currentValue: 0,
          maxPoint: 500,
        },
      ]
    };
  },
  mounted() {
    for (let i in this.reincarnationAttribute) {
      let item = this.reincarnationAttribute[i]
      switch (i) {
        case 'HP':
          var p  = this.attr.filter(({ name }) => name == 'HP')[0];
          p.oldValue = p.currentValue =item
          p.hasPoint =item/10
          console.log(p)
          break;
        case 'ATK':
          var p  = this.attr.filter(({ name }) => name == 'ATK')[0];
          p.oldValue = p.currentValue =item
          p.hasPoint =item/5
          break;
        case 'CRIT':
          var p  = this.attr.filter(({ name }) => name == 'CRIT')[0];
          p.oldValue = p.currentValue =item
          p.hasPoint =item/0.1
          break;
        case 'CRITDMG':
          var p  = this.attr.filter(({ name }) => name == 'CRITDMG')[0];
          p.oldValue = p.currentValue =item
          p.hasPoint =item/1
          break;
        case 'DEF':
          var p  = this.attr.filter(({ name }) => name == 'DEF')[0];
          p.oldValue = p.currentValue =item
          p.hasPoint =item/3
          break;
        case 'BLOC':
          var p  = this.attr.filter(({ name }) => name == 'BLOC')[0];
          p.oldValue = p.currentValue =item
          p.hasPoint =item/3
          break;
        case 'MOVESPEED':
          var p  = this.attr.filter(({ name }) => name == 'MOVESPEED')[0];
          p.oldValue = p.currentValue = Number((-(item/ 0.06 * 0.01)).toFixed(2))  
          p.hasPoint =-(item / 0.06)
          // item.currentValue = Number((item.point * 0.01).toFixed(2))
          // data.MOVESPEED = -(item.point * 0.06)
          break;
        case 'BATTLESPEED':
          var p  = this.attr.filter(({ name }) => name == 'BATTLESPEED')[0];
          p.oldValue = p.currentValue = Number((-(item/ 3 * 0.01)).toFixed(2)) 
          p.hasPoint =-(item / 3)
          // item.currentValue = Number((item.point * 0.01).toFixed(2))
          // data.BATTLESPEED = -(item.point * 3)
          break;
        default:
          break;
      }
    }
  },
  computed: {
    reincarnationData() { return this.$store.state.reincarnation },
    reincarnationAttribute() { return this.$store.state.reincarnationAttribute },
  },
  methods: {
    subtract(v, e) {
      let num = 1
      if (e.shiftKey) {
        num = 10
      }
      if (v.point >= num) {
        v.point = v.point - num
        this.reincarnationPoint = this.reincarnationPoint + num
      }
      this.$store.commit('set_player_rein', {
        count:this.reinCount,
        point:this.reincarnationPoint
      })
      this.caculateAttr()
    },
    add(v, e) {
      let num = 1
      if (e.shiftKey) {
        num = 10
      }
      if (this.reincarnationPoint >= num) {
        v.point = v.point + num
        this.reincarnationPoint = this.reincarnationPoint - num
      }
      this.$store.commit('set_player_rein', {
        count:this.reinCount,
        point:this.reincarnationPoint
      })
      this.caculateAttr()
    },
    caculateAttr() {
      var data = {
        'HP': 0,
        'ATK': 0,
        'CRIT': 0,
        'CRITDMG': 0,
        'DEF': 0,
        'BLOC': 0,
        'MOVESPEED': 0,
        'BATTLESPEED': 0,
      }
      this.attr.map(item => {
        switch (item.name) {
          case 'HP':
            item.currentValue = item.point * 10+item.oldValue
            data.HP = item.currentValue
            break;
          case 'ATK':
            item.currentValue = item.point * 5+item.oldValue
            data.ATK = item.currentValue
            break;
          case 'CRIT':
            item.currentValue = Number((item.point * 0.1).toFixed(1))+item.oldValue
            data.CRIT = item.currentValue
            break;
          case 'CRITDMG':
            item.currentValue = item.point * 1+item.oldValue
            data.CRITDMG = item.currentValue
            break;
          case 'DEF':
            item.currentValue = item.point * 3+item.oldValue
            data.DEF = item.currentValue
            break;
          case 'BLOC':
            item.currentValue = item.point * 3+item.oldValue
            data.BLOC = item.currentValue
            break;
          case 'MOVESPEED':
            item.currentValue = Number((item.point * 0.01).toFixed(2))+item.oldValue
            data.MOVESPEED = -((item.point+item.hasPoint) * 0.06)
            break;
          case 'BATTLESPEED':
            item.currentValue = Number((item.point * 0.01).toFixed(2))+item.oldValue
            data.BATTLESPEED = -((item.point+item.hasPoint) * 3)
            break;
          default:
            break;
        }
      })
      this.$store.commit('set_player_rein_attribute', data)
    },

  }
};


</script>
<style lang="scss" scoped>
.reincarnation {
  padding: 0.1rem;
  width: 5rem;
  .title {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #ccc;
    .info {
      padding-left: 0.2rem;
      p {
        color: #999;
        font-size: 0.12rem;
        margin: 0rem;
      }
    }
    p {
      margin: 0.1rem;
      font-size: 0.16rem;
    }
    .btn-div {
      padding: 0.1rem;
      display: flex;
      justify-content: flex-end;
      padding-right: 0.3rem;
    }
  }
  .content {
    padding: 0.1rem;
    .info {
      padding: 0.04rem;
      display: flex;
      justify-content: space-between;
    }
    .panel {
      padding: 0.05rem 0;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.06rem;
        p {
          display: flex;
          align-items: center;
          img {
            width: 0.25rem;
            height: 0.25rem;
          }
          span {
            margin-left: 0.06rem;
          }
        }
        .group {
          display: flex;
          justify-content: space-between;
          input {
            width: 0.8rem;
          }
          .button {
          }
        }
      }
    }
  }
}

.fb {
  width: 54px;
  height: 50px;
  line-height: 100px;
  border-radius: 10%;
  overflow: hidden;
  position: relative;
  // background: rgba(0, 0, 0, 0.1);
  z-index: 10;
  i {
    color: #ccc;
    font-size: 24px;
    font-weight: bold;
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fb-content {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    position: absolute;
    top: 2px;
    left: 2px;
    background: #061b21;
    border-radius: 8%;
    display: flex;
    z-index: 2;
  }
  &::after {
    content: "";
    position: absolute;
    display: inline-block;
    background-color: #3e94ce;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    animation: bgmove 2s linear infinite;
    @keyframes bgmove {
      0% {
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
      }
      25% {
        top: 0;
        left: 0;
        width: 5px;
        height: 100%;
      }
      50% {
        top: calc(100% - 5px);
        left: 0;
        width: 100%;
        height: 5px;
      }
      75% {
        top: 0px;
        left: calc(100% - 5px);
        width: 5px;
        height: 100%;
      }
      100% {
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
      }
    }
  }
  &::before {
    content: "";
    padding: 50%;
    position: absolute;
    top: -25%;
    left: -25%;
    bottom: -25%;
    right: -25%;
    transform-origin: center center;
    transform: rotate(30deg) scale(2);
    background: conic-gradient(
      #3e94ce,
      #3e94ce8a,
      rgba(0, 0, 0, 0.06),
      rgba(0, 0, 0, 0.06)
    );
    animation: rotate 2s linear infinite;
    @keyframes rotate {
      100% {
        transform: rotate(-330deg) scale(2);
      }
    }
  }
}
</style>
