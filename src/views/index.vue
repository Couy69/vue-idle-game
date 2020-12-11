<template>
  <div class="main" @contextmenu.prevent="contextmenu($event)">
    <div class="user-status">

      <cTooltip placement="bottom">
        <template v-slot:content>
          <div class="lv">
            <div class="value">
              <span>lv {{playerLv}}</span>
              <span style="font-size:0.16rem">转生次数：{{$store.state.reincarnation.count}}</span>
            </div>
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 玩家当前等级与转生次数</p>
          <p class="info">* 成功挑战首领时会提升等级</p>
          <p class="info">* 超过30级时可以转生获取更强力的初始属性</p>
        </template>

      </cTooltip>

      <cTooltip placement="bottom">
        <template v-slot:content>
          <div class="hp">
            <img src="../assets/icons/S_Holy01.png" alt="">
            <div class="value">
              {{attribute.CURHP.value}}/{{attribute.MAXHP.value}}
            </div>
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 当前生命值/最大生命值</p>
          <p class="info">* 每秒会回复2%的最大生命值</p>
        </template>

      </cTooltip>

      <!-- <cTooltip placement="bottom">
        <template v-slot:content>
        </template>
        <template v-slot:tip>
          <p class="info">* </p>
        </template>
      </cTooltip> -->

      <div class="other">
        <cTooltip placement="bottom">
          <template v-slot:content>
            <div class="item" title="攻击力">
              <img src="../assets/icons/ATK.png" alt="">
              <div class="value">
                {{attribute.ATK.value}}
              </div>
            </div>
          </template>
          <template v-slot:tip>
            <p class="info">* 角色攻击力</p>
          </template>
        </cTooltip>

        <cTooltip placement="bottom">
          <template v-slot:content>
            <div class="item">
              <img src="../assets/icons/CRIT.png" alt="">
              <div class="value">
                {{attribute.CRIT.value}}%
              </div>
            </div>
          </template>
          <template v-slot:tip>
            <p class="info">* 角色当前的暴击率</p>
          </template>
        </cTooltip>

        <cTooltip placement="bottom">
          <template v-slot:content>
            <div class="item">
              <img src="../assets/icons/CRITDMG.png" alt="">
              <div class="value">
                {{attribute.CRITDMG.value}}%
              </div>
            </div>
          </template>
          <template v-slot:tip>
            <p class="info">* 暴击伤害初始为150%</p>
          </template>
        </cTooltip>

        <cTooltip placement="bottom">
          <template v-slot:content>
            <div class="item">
              <img src="../assets/icons/icon_11.png" alt="">
              <div class="value">
                {{attribute.DEF.value}} <span style="font-size:.12rem;">({{((1-attribute.REDUCDMG)*100).toFixed(2)}}%)</span>
              </div>
            </div>
          </template>
          <template v-slot:tip>
            <p class="info">* 角色防御力以及计算后的减伤比例</p>
            <p class="info">* 减伤比例采用非线性计算，护甲越高收益越低</p>
            <p class="info">* 显示为近似值，实际上永远不会到达100%减伤</p>
          </template>
        </cTooltip>

        <!-- <cTooltip placement="bottom">
          <template v-slot:content>
            <div class="item">
              <img src="../assets/icons/S_EVA.png" alt="">
              <div class="value">
                {{attribute.EVA.showValue}}
              </div>
            </div>
          </template>
          <template v-slot:tip>
            <p class="info">* 角色闪避几率</p>
            <p class="info">* 闪避几率采用非线性计算</p>
            <p class="info">* 多个闪避来源自身乘法叠加</p>
          </template>
        </cTooltip> -->

        <cTooltip placement="bottom">
          <template v-slot:content>
            <div class="item">
              <img src="../assets/icons/S_BLOC.png" alt="">
              <div class="value">
                {{attribute.BLOC.value}}
              </div>
            </div>
          </template>
          <template v-slot:tip>
            <p class="info">* 角色格挡伤害</p>
            <p class="info">* 计算护甲后再计算格挡伤害就是最终受到的伤害</p>
          </template>
        </cTooltip>

      </div>
    </div>
    <div class="user-item">
      <div class="uii">
        <cTooltip placement="bottom">
          <template v-slot:content>
            <div class="gold" v-if="attribute.DPS" :style="{fontSize:attribute.DPS>=10000?'.18rem':'.22rem'}">DPS:
              <span :style="{fontSize:attribute.DPS>=10000?'.18rem':'.22rem'}">{{(attribute.DPS).toFixed(2)}}</span>
            </div>
          </template>
          <template v-slot:tip>
            <p class="info">* DPS:角色每秒伤害</p>
            <p class="info">* 这个只是伤害数据，并没有统计防御属性，所以只是作为战斗力评估的一个依据</p>
          </template>
        </cTooltip>
        <cTooltip placement="bottom">
          <template v-slot:content>
            <div class="gold" :style="{fontSize:userGold>=1000000?'.18rem':'.22rem'}">金币: <span :style="{fontSize:userGold>=1000000?'.14rem':'.16rem'}">{{(userGold || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}}</span></div>
          </template>
          <template v-slot:tip>
            <p class="info">* 你拥有的金币数量</p>
            <p class="info">* 在这里，钱就是万能的</p>
          </template>
        </cTooltip>

      </div>

      <div class="weapon" @mouseover="showItemInfo($event,'weapon',playerWeapon,false)" @mouseleave="closeItemInfo">
        <div class="title" v-if="playerWeapon">
          <div class='icon' :class="{unique:playerWeapon.quality.name=='独特'}" :style="{'box-shadow':'inset 0 0 7px 2px '+playerWeapon.quality.color}">
            <img :src="playerWeapon.type.iconSrc" alt="">
          </div>
          <div class='name' :style="{color:playerWeapon.quality.color}">{{playerWeapon.type.name}} {{playerWeapon.enchantlvl?'(+'+playerWeapon.enchantlvl+')':''}}</div>
        </div>
      </div>
      <div class="armor" @mouseover="showItemInfo($event,'armor',playerArmor,false)" @mouseleave="closeItemInfo">
        <div class="title" v-if="playerArmor">
          <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px  '+playerArmor.quality.color}">
            <img :src="playerArmor.type.iconSrc" alt="">
          </div>
          <div class='name' :style="{color:playerArmor.quality.color}">{{playerArmor.type.name}} {{playerArmor.enchantlvl?'(+'+playerArmor.enchantlvl+')':''}}</div>
        </div>
      </div>
      <div class="neck" @mouseover="showItemInfo($event,'neck',playerNeck,false)" @mouseleave="closeItemInfo">
        <div class="title" v-if="playerNeck">
          <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px '+playerNeck.quality.color}">
            <img :src="playerNeck.type.iconSrc" alt="">
          </div>
          <div class='name' :style="{color:playerNeck.quality.color}">{{playerNeck.type.name}} {{playerNeck.enchantlvl?'(+'+playerNeck.enchantlvl+')':''}}</div>
        </div>
      </div>
      <div class="ring" @mouseover="showItemInfo($event,'ring',playerRing,false)" @mouseleave="closeItemInfo">
        <div class="title" v-if="playerRing">
          <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px '+playerRing.quality.color}">
            <img :src="playerRing.type.iconSrc" alt="">
          </div>
          <div class='name' :style="{color:playerRing.quality.color}">{{playerRing.type.name}} {{playerRing.enchantlvl?'(+'+playerRing.enchantlvl+')':''}}</div>
        </div>
      </div>
    </div>
    <div class="sys-info">
      <div class="clear" @click="clearSysInfo">清除信息</div>
      <div id='sysInfo'>
        <div class="info warning" :class="{warning:v.type=='warning',battle:v.type=='battle',win:v.type=='win',trophy:v.type=='trophy',}" v-for="(v,k) in sysInfo" :key="k">系统<i style="font-size:.12rem" v-if="v.time">({{v.time}})</i>：
          <span>{{v.msg}}</span>
          <a v-if="v.equip" v-for="(o,p) in v.equip" :key="p" :style="{color:o.quality.color}" @mouseover="showItemInfo($event,o.itemType,o)" @mouseleave="closeItemInfo"><span v-if="o.quality.name=='独特'">稀有掉落：</span>{{o.type.name}}</a>
        </div>
      </div>
    </div>
    <div class="map">
      <div class="plan" v-show='inDungeons'>
        <dungeons></dungeons>
        <div class="eventEnd button" @click='eventEnd'>结束挑战</div>
      </div>
      <div class="dungeons-Info" v-if="dungeons&&!inDungeons">
        <i class="dungeons-re" v-if="dungeons.type=='endless'" @click="resetEndlessLv"></i>
        <i class="dungeons-close" @click="closeDungeonsInfo"></i>
        <div class="dungeons-title" v-if="dungeons.type=='endless'">当前副本：无尽</div>
        <div class="dungeons-title" v-else>当前副本：lv{{dungeons.lv}}_{{dungeons.difficultyName}}</div>
        <div class="jjj">
          <div class="dungeons-dps" v-if="dungeons.type=='endless'">推荐DPS：???</div>
          <div class="dungeons-dps" v-else>推荐DPS：{{dungeons.needDPS}}</div>
          <div class="dungeons-lv" v-if="dungeons.type=='endless'">无尽层数:{{dungeons.lv}}</div>
          <div class="dungeons-lv" v-else>副本等级:{{dungeons.lv}}</div>
        </div>
        <div class="jjj">
          <div class="dungeons-difficulty">当前副本难度等级：{{dungeons.difficultyName}}</div>
        </div>
        <div class="info" v-if="dungeons.type=='endless'">
          <p>- 无尽难度大致为层数*5的极难副本难度</p>
          <p>- 无尽模式下仅能获得金币，将不会有装备</p>
          <p>- 无尽模式挑战成功会回满血</p>
        </div>
        <div class="info" v-else>
          <p>- 副本难度等级分为：普通，困难，极难</p>
          <p>- 难度越高装备爆率也相应提升</p>
          <p>- 困难，极难仅能挑战一次</p>
          <p>- 困难，极难下有几率出现套装装备(下个版本加入)</p>
        </div>
        <div class="handle">
          <div v-if="dungeons.type!='endless'">
            <p v-if="dungeons.difficulty==1"><input type="checkbox" name="" v-model="reChallenge"> 重复挑战</p>
          </div>
          <div class="handle-column" style="display:flex;flex-direction:column" v-else>
            <p><input type="checkbox" name="" v-model="upEChallenge"> 向上挑战</p>
            <p><input type="checkbox" name="" v-model="reEChallenge"> 重复挑战</p>
          </div>
          <div class="dungeons-btn" @click="eventBegin()">开始挑战</div>
        </div>
      </div>
      <div class="event-icon" :class="{'low-level':v.difficulty==1,'h-level':v.difficulty==2,'boss':v.difficulty==3}" v-for="(v,k) in dungeonsArr" :key="k" @click="showDungeonsInfo(k)" v-show='!inDungeons' :style="{top: v.top,left: v.left}">
        <i class="icon-image"></i>
        <span>lv{{v.lv}}</span>
      </div>
      <div class="event-icon endless" v-if="endlessLv&&playerLv>=10" @click="showEndlessDungeonsInfo()" v-show='!inDungeons' style="top: 6%;left: 16%;"><i class="icon-image"></i><span>无尽</span></div>
    </div>
    <div class="menu">

      <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="Backpack" @click="openMenuPanel('backpack')">
            <img src="../assets/icons/menu/quest_icon_02.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 背包</p>
        </template>
      </cTooltip>

      <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="Backpack" @click="openMenuPanel('shop')">
            <img src="../assets/icons/menu/quest_icon_03.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 商 店</p>
        </template>
      </cTooltip>

      <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="Backpack" @click="createdDungeons()">
            <img src="../assets/icons/menu/refresh_de.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 刷新当前世界副本</p>
          <p class="info">* 刷新有30秒钟的间隔</p>
          <p class="info">* 刷新时有较低概率同时刷新出高难度副本</p>
          <p class="info">* 刷新规则[lv-5,lv+6]</p>
        </template>
      </cTooltip>

      <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="Backpack" @click="openMenuPanel('rein')">
            <img src="../assets/icons/menu/quest_icon_00.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 角色转生菜单</p>
          <p class="info">* 淦不过了？尝试转生来提升基础属性</p>
        </template>
      </cTooltip>

      <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="Backpack" @click="saveGame">
            <img src="../assets/icons/menu/icon_save.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 保存游戏</p>
        </template>
      </cTooltip>

      <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="Backpack" @click="exportSavedata">
            <img src="../assets/icons/menu/icon-export.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 导出游戏存档</p>
        </template>
      </cTooltip>

      <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="Backpack" @click="importSaveDataPanelOpened =true">
            <img src="../assets/icons/menu/icon-import.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* 导入游戏存档</p>
        </template>
      </cTooltip>

      <cTooltip :placement="'top'">
        <template v-slot:content>
          <div class="Backpack" v-if="GMmodel" @click="GMOpened = true">
            <img src="../assets/icons/menu/icon_85.png" alt="">
          </div>
        </template>
        <template v-slot:tip>
          <p class="info">* GM模式</p>
        </template>
      </cTooltip>

    </div>
    <div class="dialog" :style='itemDialogStyle'>
      <weaponPanel :item="weapon" v-show="weaponShow"></weaponPanel>
      <weaponPanel :item="playerWeapon" v-show="weaponShow&&needComparison"></weaponPanel>
      <armorPanel :item="armor" v-show="armorShow"></armorPanel>
      <armorPanel :item="playerArmor" v-show="armorShow&&needComparison"></armorPanel>
      <ringPanel :item="ring" v-show="ringShow"></ringPanel>
      <ringPanel :item="playerRing" v-show="ringShow&&needComparison"></ringPanel>
      <neckPanel :item="neck" v-show="neckShow"></neckPanel>
      <neckPanel :item="playerNeck" v-show="neckShow&&needComparison"></neckPanel>
      <div class="item-close" @click="closeItemInfo" v-if="(armorShow||ringShow||weaponShow||neckShow)&&needComparison&&operatorSchemaIsMobile">
        关闭对比
      </div>
    </div>
    <div class="dialog-backpackPanel" v-show="backpackPanelOpened">
      <div class="title">
        <span>背包</span>
        <i class="close" @click="closePanel"></i>
      </div>
      <backpackPanel></backpackPanel>
    </div>
    <div class="dialog-backpackPanel" v-show="shopPanelOpened">
      <div class="title">
        <span>装备商店</span>
        <i class="close" @click="closePanel"></i>
      </div>
      <shopPanel></shopPanel>
    </div>
    <div class="dialog-backpackPanel" v-if="reinPanelOpened">
      <div class="title">
        <span>角色转生</span>
        <i class="close" @click="closePanel"></i>
      </div>
      <reinPanel></reinPanel>
    </div>
    <div class="dialog-backpackPanel" v-show="strengthenEquipmentPanelOpened">
      <div class="title">
        <span>强化装备</span>
        <i class="close" @click="closePanel"></i>
      </div>
      <strengthenEquipment></strengthenEquipment>
    </div>
    <div class="dialog-backpackPanel" v-show="exportSaveDataPanelOpened">
      <div class="title">
        <span>导出存档</span>
        <i class="close" @click="closePanel"></i>
      </div>
      <div class="body"><textarea id="imSavedata" class="savedata-textarea" v-model="saveDateString"></textarea></div>

      <div class="footer">
        <div class="button" @click="copySavaData">复制文本到剪贴板</div>
      </div>
    </div>
    <div class="dialog-backpackPanel" v-show="importSaveDataPanelOpened">
      <div class="title">
        <span>导入存档</span>
        <i class="close" @click="closePanel"></i>
      </div>
      <div class="body">
        <span class="prompt-message">* 手机用户长按没有粘贴请尝试使用输入法剪贴板功能</span>
        <textarea id="exSavadata" class="savedata-textarea" @focus="saveDateString = ''" v-model="saveDateString" placeholder="清先输入存档数据"></textarea></div>
      <div class="footer">
        <div class="button" @click="importSaveData">导入</div>
      </div>
    </div>
    <div class="dialog-backpackPanel gm-panel" v-if="GMOpened">
      <div class="title">
        <span>GM面板</span>
        <i class="close" @click="closePanel"></i>
      </div>
      <div class="content">
        <div class="body">
          <span class="prompt-message">* 随机生成一套指定等级与质量的装备</span>
          lv:<input v-model="GMEquipLv" type="number" placeholder="装备等级1~110">
          稀有度：<input v-model="GMEquipQu" type="number" placeholder="装备质量0~4">
          增加金币：<input v-model="GMGold" type="number" placeholder="增加金币">
          玩家等级：<input v-model="GMPlayerLv" type="number" placeholder="玩家等级：">
          <div class="button" @click="createGMEquip">确定</div>
        </div>
      </div>
    </div>
    <extras></extras>
    <qa></qa>
    <setting></setting>
  </div>
</template>
<script>
import weaponPanel from './component/weaponPanel'
import armorPanel from './component/armorPanel'
import ringPanel from './component/ringPanel'
import neckPanel from './component/neckPanel'
import backpackPanel from './component/backpackPanel'
import shopPanel from './component/shopPanel'
import reinPanel from './component/reincarnationPanel'
import strengthenEquipment from './component/strengthenEquipment'
import dungeons from './component/dungeons'
import extras from './component/extras'
import setting from './component/setting'
import qa from './component/qa'
import cTooltip from './uiComponent/tooltip'
import { assist } from '../assets/js/assist';
import { Base64 } from 'js-base64';
import handle from '../assets/js/handle'
export default {
  name: "index",
  mixins: [assist],
  data() {
    return {
      GMmodel: false,
      time: '00:00:00',
      sysInfo: {},
      weaponShow: false,
      armorShow: false,
      ringShow: false,
      neckShow: false,
      equiShow: false,
      autoHealthRecovery: '',
      weapon: {},
      inDungeons: false,  //是否在副本进程中
      reChallenge: false,
      upEChallenge: false,
      reEChallenge: false,
      dungeons: '',
      dungeonsArr: [],
      dungeonsTime: '', //刷新副本计时器
      dungeonsTimeO: 30, //刷新副本时间间隔 单位：S
      ring: {},
      neck: {},
      armor: {},
      backpackPanelOpened: false,
      reinPanelOpened: false,
      shopPanelOpened: false,
      importSaveDataPanelOpened: false,
      exportSaveDataPanelOpened: false,
      strengthenEquipmentPanelOpened: false,
      itemDialogStyle: {},
      GMEquipLv: 110,
      GMEquipQu: 4,
      GMGold: 10000000,
      GMPlayerLv: 1,
      GMOpened: false,
      needComparison: true,
      saveData: {},
      saveDateString: '',
      debounceTime: {},  //防抖计时器
    };
  },
  components: { weaponPanel, armorPanel, ringPanel, neckPanel, dungeons, backpackPanel, shopPanel, cTooltip, strengthenEquipment, extras, qa, setting, reinPanel },
  created() {
    // 窗口自适应
    window.onresize = () => {
      if (this.debounceTime) {
        clearTimeout(this.debounceTime);
      }
      this.debounceTime = setTimeout(() => {
        this.debounceTime = null;
        this.initial()
      }, 200);

    };
    this.initial()

    // 监听当前窗口是否处于后台状态
    document.addEventListener("visibilitychange", e => {
      this.windowVisibilitychange()
    });

  },
  mounted() {
    // 自动回血
    this.autoHealthRecovery = setInterval(() => {
      this.$store.commit('set_player_curhp', this.healthRecoverySpeed * (this.attribute.MAXHP.value / 50))
    }, 1000)


    // 自动保存
    setInterval(() => {
      this.saveGame()
    }, 5 * 60 * 1000)

    this.sysInfo = this.$store.state.sysInfo
    this.weapon = this.playerWeapon
    this.armor = this.playerArmor
    this.ring = this.playerRing
    this.neck = this.playerNeck

    //TODO:重新装备一次来解决不显示装备对比信息不显示的bug，不是最好但是是最快的
    {
      this.$store.commit('set_player_ring', this.$deepCopy(this.playerRing))
      this.$store.commit('set_player_weapon', this.$deepCopy(this.playerWeapon))
      this.$store.commit('set_player_armor', this.$deepCopy(this.playerArmor))
      this.$store.commit('set_player_neck', this.$deepCopy(this.playerNeck))
    }
    var sd = localStorage.getItem('_sd')
    this.loadGame(sd)
    //生成随机副本
    this.createdDungeons()
  },
  computed: {
    attribute() { return this.$store.state.playerAttribute.attribute },
    healthRecoverySpeed() { return this.$store.state.playerAttribute.healthRecoverySpeed },
    userGold() { return this.$store.state.playerAttribute.GOLD },
    playerWeapon() { return this.$store.state.playerAttribute.weapon },
    playerArmor() { return this.$store.state.playerAttribute.armor },
    playerRing() { return this.$store.state.playerAttribute.ring },
    playerNeck() { return this.$store.state.playerAttribute.neck },
    endlessLv() { return this.$store.state.playerAttribute.endlessLv },
    playerLv() { return this.$store.state.playerAttribute.lv },
    operatorSchemaIsMobile() { return this.$store.state.operatorSchemaIsMobile }
  },
  watch: {
    sysInfo() {
      var element = document.getElementById('sysInfo')
      //渲染完成后滚至最下端
      this.$nextTick(() => {
        element.scrollTop = element.scrollHeight + 20
      })
    },
    upEChallenge() {
      this.reEChallenge = !this.upEChallenge
    },
    reEChallenge() {
      this.upEChallenge = !this.reEChallenge
    },
    GMEquipLv() {
      this.GMEquipLv = this.GMEquipLv > 210 ? 210 : this.GMEquipLv
      this.GMEquipLv = this.GMEquipLv < 1 ? 1 : this.GMEquipLv
    },
    GMEquipQu() {
      this.GMEquipQu = this.GMEquipQu > 4 ? 4 : this.GMEquipQu
      this.GMEquipQu = this.GMEquipQu < 0 ? 0 : this.GMEquipQu
    }
  },
  methods: {
    navToGithub() {
      window.open('https://github.com/Couy69/vue-idle-game', '_blank');
    },
    /**
     * constraint 强制刷新
     */
    createdDungeons(constraint) {
      if (!constraint) {
        if (this.dungeonsTime) {
          this.$store.commit("set_sys_info", {
            msg: `
                    刚刚才刷新过了，需要等待${this.dungeonsTimeO}秒才能刷新哦。
                  `,
            type: 'wrning'
          });
          return
        }
        this.dungeonsTime = setInterval(() => {
          this.dungeonsTimeO--
          if (this.dungeonsTimeO <= 0) {
            clearInterval(this.dungeonsTime)
            this.dungeonsTime = ''
            this.dungeonsTimeO = 30
          }
        }, 1000)
      }

      this.dungeonsArr = []
      let Co = [0.85, 0.1, 0.05]
      for (let i = this.playerLv - 1; i > this.playerLv - 5; i--) {
        if (i < 1) {
          break
        }
        let difficulty = 1, r = Math.random()
        // 生成普通副本时有几率刷新高难度副本
        if (r <= Co[0]) {
          difficulty = 1
        } else if (r < Co[1] + Co[0] && r >= Co[0]) {
          difficulty = 2
        } else {
          difficulty = 3
        }
        if (i > 100) {
          var lv = Math.floor(this.playerLv * (100 - (this.playerLv - i)) / 100)
        } else {
          var lv = i
        }
        this.dungeonsArr.push(handle.createRandomDungeons(lv, 1))
        if (difficulty != 1) {
          this.dungeonsArr.push(handle.createRandomDungeons(i, difficulty))
        }
      }
      for (let i = this.playerLv; i < this.playerLv + 6; i++) {
        let difficulty = 1, r = Math.random()
        // 生成普通副本时有几率刷新高难度副本
        if (r <= Co[0]) {
          difficulty = 1
        } else if (r < Co[1] + Co[0] && r >= Co[0]) {
          difficulty = 2
        } else {
          difficulty = 3
        }
        if (i > 100) {
          var lv = Math.floor(this.playerLv * (100 + (i - this.playerLv)) / 100)
        } else {
          var lv = i
        }
        this.dungeonsArr.push(handle.createRandomDungeons(lv, 1))
        if (difficulty != 1) {
          this.dungeonsArr.push(handle.createRandomDungeons(lv, difficulty))
        }
      }
    },
    copySavaData() {
      var imSavadataTextArea = document.getElementById("imSavedata");
      imSavadataTextArea.select(); // 选中文本
      document.execCommand("copy"); // 执行浏览器复制命令
      this.$store.commit("set_sys_info", {
        msg: `
                已经复制存档了，建议保存到备忘录
              `,
        type: 'win'
      });
      this.closePanel()
    },
    pasteSaveData() {

    },
    exportSavedata() {
      let backpackPanel = this.findComponentDownward(
        this,
        "backpackPanel",
      );
      this.exportSaveDataPanelOpened = true
      var data = {
        playerEquipment: {
          playerWeapon: this.$store.state.playerAttribute.weapon,
          playerArmor: this.$store.state.playerAttribute.armor,
          playerRing: this.$store.state.playerAttribute.ring,
          playerNeck: this.$store.state.playerAttribute.neck,
        },
        lv: this.$store.state.playerAttribute.lv,
        backpackEquipment: backpackPanel.grid,
        gold: this.$store.state.playerAttribute.GOLD,
        endlessLv: this.$store.state.playerAttribute.endlessLv,
        rA: this.$store.state.reincarnationAttribute,
        r: {
          count: this.$store.state.reincarnation.count,
          point: this.$store.state.reincarnation.point,
        }
      }
      this.saveDateString = Base64.encode(Base64.encode(JSON.stringify(data)))
    },
    importSaveData() {
      if (!this.saveDateString) {
        this.$store.commit("set_sys_info", {
          msg: `
                清先输入存档数据！
              `,
          type: 'warning'
        });
      }
      this.loadGame(this.saveDateString)
      this.closePanel()
    },
    windowVisibilitychange() {
      if (!this.inDungeons) {
        if (!this.autoHealthRecovery) {
          this.autoHealthRecovery = setInterval(() => {
            this.$store.commit('set_player_curhp', this.healthRecoverySpeed * (this.attribute.MAXHP.value / 50))
          }, 1000)
        }
        return
      }
      if (document.hidden) {
        clearInterval(this.autoHealthRecovery)
        this.autoHealthRecovery = ''
      } else {
        this.autoHealthRecovery = setInterval(() => {
          this.$store.commit('set_player_curhp', this.healthRecoverySpeed * (this.attribute.MAXHP.value / 50))
        }, 1000)
      }
    },
    async saveGame(needInfo) {
      var data = {}
      var backpackPanel = this.findComponentDownward(
        this,
        "backpackPanel",
      );
      data = {
        playerEquipment: {
          playerWeapon: this.$store.state.playerAttribute.weapon,
          playerArmor: this.$store.state.playerAttribute.armor,
          playerRing: this.$store.state.playerAttribute.ring,
          playerNeck: this.$store.state.playerAttribute.neck,
        },
        backpackEquipment: backpackPanel.grid,
        lv: this.$store.state.playerAttribute.lv,
        gold: this.$store.state.playerAttribute.GOLD,
        endlessLv: this.$store.state.playerAttribute.endlessLv,
        rA: this.$store.state.reincarnationAttribute,
        r: {
          count: this.$store.state.reincarnation.count,
          point: this.$store.state.reincarnation.point,
        }
      }
      var saveData = Base64.encode(Base64.encode(JSON.stringify(data)))
      localStorage.setItem('_sd', saveData)

      needInfo && this.$store.commit("set_sys_info", {
        msg: `
              游戏进度已经保存了。
            `,
        type: 'win'
      });
    },
    loadGame(sd) {
      try {
        if (sd) {
          //兼容存档
          var saveDataStr = Base64.decode(Base64.decode(sd))
          saveDataStr = saveDataStr.replace(/playerAcc/gi, 'playerRing')
          saveDataStr = saveDataStr.replace(/acc/gi, "ring")
          this.saveData = JSON.parse(saveDataStr)
          if (!this.saveData.r) {
            this.saveData.r = {
              count: 0,
              point: 0,
            }
          }
          if (!this.saveData.ra) {
            this.saveData.ra = {
              'HP': 0,
              'ATK': 0,
              'CRIT': 0,
              'CRITDMG': 0,
              'DEF': 0,
              'BLOC': 0,
              'MOVESPEED': 0,
              'BATTLESPEED': 0,
            }
          }
          this.saveData.lv = this.saveData.lv ? this.saveData.lv : 1
          var backpackPanel = this.findComponentDownward(
            this,
            "backpackPanel",
          );
          if (JSON.stringify(this.saveData) != '{}') {
            backpackPanel.grid = this.saveData.backpackEquipment
          }
          if (!this.saveData.playerEquipment.playerNeck) {
            this.saveData.playerEquipment.playerNeck = {
              "lv": 1,
              itemType: 'neck',
              "quality": {
                name: '破旧',
                qualityCoefficient: 0.7,
                probability: '0.25',
                color: '#a1a1a1',
                extraEntryNum: 1,
              },
              "type": {
                "name": "新手项坠",
                "des": "一个普通的指环",
                "iconSrc": "./icons/Ac_3.png",
                "entry": [{
                  "valCoefficient": 0.9,
                  "value": 20,
                  "showVal": "+20",
                  "type": "HP",
                  "name": "生命值"
                }]
              },
              "extraEntry": [{
                "type": "CRIT",
                "value": 10,
                "showVal": "+10%",
                "name": "暴击率"
              }]
            }
          }
          this.$store.commit('set_player_ring', this.$deepCopy(this.saveData.playerEquipment.playerRing))
          this.$store.commit('set_player_weapon', this.$deepCopy(this.saveData.playerEquipment.playerWeapon))
          this.$store.commit('set_player_armor', this.$deepCopy(this.saveData.playerEquipment.playerArmor))
          this.$store.commit('set_player_neck', this.$deepCopy(this.saveData.playerEquipment.playerNeck))
          if (this.saveData.rA) {
            this.saveData.rA && this.$store.commit('set_player_rein_attribute', this.$deepCopy(this.saveData.rA))
          }
          if (this.saveData.r) {
            this.saveData.r && this.$store.commit('set_player_rein', this.$deepCopy(this.saveData.r))
          }
          this.$store.commit('reset_player_gold', parseInt(this.saveData.gold) || 0)
          this.$store.commit('set_endless_lv', parseInt(this.saveData.endlessLv) || 0)
          this.$store.commit('set_player_lv', parseInt(this.saveData.lv) || 0)
        }
        else {
          this.$store.commit('set_player_ring', this.$deepCopy(this.playerRing))
          this.$store.commit('set_player_weapon', this.$deepCopy(this.playerWeapon))
          this.$store.commit('set_player_armor', this.$deepCopy(this.playerArmor))
          this.$store.commit('set_player_neck', this.$deepCopy(this.playerNeck))
        }

        this.$store.commit("set_sys_info", {
          msg: `
                读取存档成功
              `,
          type: 'win'
        });
      } catch (error) {
        console.log(error)
        this.$store.commit("set_sys_info", {
          msg: `
              糟糕，存档坏了！
            `,
          type: 'warning'
        });
      }
    },
    clearSysInfo() {
      this.$store.commit('clear_sys_info')
    },
    createGMEquip() {
      this.$store.commit("set_player_gold", parseInt(this.GMGold));
      var b = this.findComponentDownward(this, "weaponPanel");
      var item = b.createNewItem(this.GMEquipQu, this.GMEquipLv);
      item = JSON.parse(item);
      this.$store.commit('set_player_lv', this.GMPlayerLv)
      var backpackPanel = this.findComponentDownward(
        this,
        "backpackPanel",
      );
      for (let i = 0; i < backpackPanel.grid.length; i++) {
        if (JSON.stringify(backpackPanel.grid[i]).length < 3) {
          this.$set(backpackPanel.grid, i, item);
          break;
        }
      }
      var b = this.findComponentDownward(this, "armorPanel");
      var item = b.createNewItem(this.GMEquipQu, this.GMEquipLv);
      item = JSON.parse(item);
      var backpackPanel = this.findComponentDownward(
        this,
        "backpackPanel",
      );
      for (let i = 0; i < backpackPanel.grid.length; i++) {
        if (JSON.stringify(backpackPanel.grid[i]).length < 3) {
          this.$set(backpackPanel.grid, i, item);
          break;
        }
      }
      var b = this.findComponentDownward(this, "ringPanel");
      var item = b.createNewItem(this.GMEquipQu, this.GMEquipLv);
      item = JSON.parse(item);
      var backpackPanel = this.findComponentDownward(
        this,
        "backpackPanel",
      );
      for (let i = 0; i < backpackPanel.grid.length; i++) {
        if (JSON.stringify(backpackPanel.grid[i]).length < 3) {
          this.$set(backpackPanel.grid, i, item);
          break;
        }
      }

      var b = this.findComponentDownward(this, "neckPanel");
      var item = b.createNewItem(this.GMEquipQu, this.GMEquipLv);
      item = JSON.parse(item);
      var backpackPanel = this.findComponentDownward(
        this,
        "backpackPanel",
      );
      for (let i = 0; i < backpackPanel.grid.length; i++) {
        if (JSON.stringify(backpackPanel.grid[i]).length < 3) {
          this.$set(backpackPanel.grid, i, item);
          break;
        }
      }
      this.backpackPanelOpened = true
      this.GMOpened = false
    },
    showDungeonsInfo(k) {
      // var b = this.findComponentDownward(this, 'dungeons')
      this.dungeons = this.dungeonsArr[k]
      if (this.dungeons.difficulty != 1) {
        this.reChallenge = false
      }
    },
    showEndlessDungeonsInfo() {
      this.reChallenge = false
      this.dungeons = handle.createRandomDungeons(this.$store.state.playerAttribute.endlessLv * 5, 3)
      this.dungeons.lv = this.$store.state.playerAttribute.endlessLv
      this.dungeons.type = 'endless'
    },
    closeDungeonsInfo() {
      this.dungeons = ''
    },
    eventBegin() {
      var b = this.findComponentDownward(this, 'dungeons')
      b.dungeons = this.dungeons
      b.evenHandle()
      // this.dungeons = ''
      this.inDungeons = true
    },
    eventEnd() {
      this.inDungeons = false;
      this.dungeons = ''

      var b = this.findComponentDownward(this, 'dungeons')
      b.forcedToStopEvent()

      this.$store.commit("set_sys_info", {
        msg: `
              手动中断了挑战
            `,
        type: 'warning'
      });
      setTimeout(() => {

      })
    },
    resetEndlessLv() {
      this.$message({
        message: '这将重置你的无尽等级，确认操作吗？',
        title: '提示',
        confirmBtnText: '重置',
        onClose: () => {
          this.$store.commit("set_endless_lv", 1);
          this.closeDungeonsInfo()
          this.$store.commit("set_sys_info", {
            msg: `
              无尽挑战层数重置到了1级。
            `,
            type: 'win'
          });
        }
      })
    },
    openMenuPanel(type) {
      this.backpackPanelOpened = this.shopPanelOpened = false
      switch (type) {
        case 'backpack':
          this.backpackPanelOpened = !this.backpackPanelOpened
          break;
        case 'shop':
          this.shopPanelOpened = !this.shopPanelOpened
          break;
        case 'rein':
          this.reinPanelOpened = !this.reinPanelOpened
          break;
        default:
          break;
      }

    },
    closePanel() {
      this.backpackPanelOpened = this.shopPanelOpened = this.importSaveDataPanelOpened = this.exportSaveDataPanelOpened = this.strengthenEquipmentPanelOpened = this.reinPanelOpened = false
      this.GMOpened = false
      this.saveDateString = ''

      let equimentPanel = this.findComponentDownward(
        this,
        "equimentPanel",
      );
      equimentPanel.stopAutoStreng()
    },
    initial() {
      let html = document.documentElement;
      let wW = html.clientHeight;
      let designSize = 1000; //设计高度
      if (!this.fullScreen) {
        wW = html.clientHeight;
      }
      let rem = (wW * 100) / designSize;
      document.documentElement.style.fontSize = rem + "px";

      if (document.documentElement.clientWidth < 768) {
        this.$store.commit('set_operator_schema', true)
      } else {
        this.$store.commit('set_operator_schema', false)
      }
    },
    contextmenu(e) {
      // 鼠标右键
    },
    showItemInfo(e, type, item, needComparison) {
      if (needComparison === false) {
        this.needComparison = false
      } else {
        this.needComparison = true
      }
      let x = e.pageX, y = e.pageY, maxH = window.innerHeight
      if (y < window.innerHeight / 2) {
        this.itemDialogStyle = {
          display: 'flex',
          'top': y + 20 + 'px',
          'left': x + 20 + 'px',
        }
      } else {
        this.itemDialogStyle = {
          display: 'flex',
          'bottom': maxH - y + 20 + 'px',
          'left': x + 20 + 'px',
        }
      }
      switch (type) {
        case 'weapon':
          this.weapon = item
          this.weaponShow = true
          break;
        case 'armor':
          this.armor = item
          this.armorShow = true
          break;
        case 'ring':
          this.ring = item
          this.ringShow = true
          break;
        case 'neck':
          this.neck = item
          this.neckShow = true
          break;
        default:
          break;
      }
    },
    closeItemInfo() {
      this.needComparison = true;
      this.weaponShow = this.armorShow = this.ringShow = this.neckShow = false
    },
    setSysInfo() {
      this.$store.commit("set_sys_info", {
        msg: `
              副本探索成功！
            `,
        type: 'win'
      });
    }
  }
};


</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
  user-select: none;
}
a {
  cursor: pointer;
}
.main {
  background: #111;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: #eee;
  height: 100%;
  .user-status {
    position: absolute;
    top: 0.1rem;
    left: 0.1rem;
    border: 2px solid #ccc;
    height: 4rem;
    width: 4rem;
    padding: 0.1rem;
    display: flex;
    flex-direction: column;
    .hp {
      cursor: pointer;
      height: 0.7rem;
      width: 100%;
      display: flex;
      border: 2px solid #ccc;
      align-items: center;
      padding-left: 0.2rem;
      margin-bottom: 0.1rem;
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
      .value {
        font-size: 0.26rem;
        font-weight: bold;
        text-align: center;
        flex: 1;
      }
    }
    .lv {
      cursor: pointer;
      height: 0.7rem;
      width: 100%;
      display: flex;
      border: 2px solid #ccc;
      align-items: center;
      padding-left: 0.2rem;
      margin-bottom: 0.1rem;
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
      .value {
        display: flex;
        justify-content: space-around;
        font-size: 0.26rem;
        font-weight: bold;
        text-align: center;
        flex: 1;
        align-items: center;
      }
    }
    .other {
      img {
        width: 0.35rem !important;
        height: 0.35rem !important;
      }
      display: flex;
      flex: 1;
      padding: 0.1rem;
      border: 2px solid #ccc;
      flex-wrap: wrap;
      & > div,
      .item {
        cursor: pointer;
        width: 33.3%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-top: 0.05rem;
        flex-direction: column;
        .value {
          margin-top: 0.06rem;
          font-size: 0.23rem;
          font-weight: normal;
          flex: 1;
          display: flex;
          align-items: center;
          flex-direction: column;
        }
      }
      .item {
        width: 100%;
      }
    }
  }
  .user-item {
    position: absolute;
    top: 0.1rem;
    left: 4.2rem;
    border: 2px solid #ccc;
    height: 4rem;
    width: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 0.2rem 0;
    padding-top: 0.1rem;
    cursor: pointer;
    & > div {
      background: rgba(0, 0, 0, 0.7);
      width: calc(100% - 0.4rem);
      margin: 0 20rem;
    }
    .uii {
      display: flex;
      width: calc(100% -0.4rem);
    }
    .gold {
      cursor: pointer;
      height: 0.7rem;
      margin: 0.1rem;
      margin-top: 0.08rem;
      width: calc(100%);
      display: flex;
      align-items: center;
      padding-left: 0.1rem;
      font-size: 0.22rem;
      span {
        font-size: 0.2rem;
        font-weight: bold;
        text-align: right;
        flex: 1;
        padding: 0.1rem 0.08rem;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
      }
    }
    .title {
      display: flex;
      padding: 0.05rem;
      width: 100%;
      .icon {
        width: 0.56rem;
        height: 0.56rem;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.04rem;
      }
      .name {
        font-size: 0.2rem;
        height: 0.46rem;
        margin-left: 0.2rem;
        line-height: 0.46rem;
      }
    }
  }
  .sys-info {
    position: absolute;
    border: 2px solid #ccc;
    height: calc(100% - 4.4rem);
    width: 8.1rem;
    bottom: 0.1rem;
    left: 0.1rem;

    transition: 0.2s;
    padding: 0.2rem;
    .clear {
      position: absolute;
      top: 0.2rem;
      right: 0.2rem;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    #sysInfo {
      overflow-y: auto;
      transition: 0.2s;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
    .info {
      margin: 0.03rem 0;
    }
    a {
      cursor: pointer;
      text-decoration: underline;
      margin-left: 0.05rem;
    }
    .warning > span {
      color: #f90202;
    }
    .battle > span {
      color: #de8618;
    }
    .win > span {
      color: #24c4de;
    }
    .trophy > span {
      color: #2fe20f;
    }
  }
  .map {
    position: absolute;
    right: 0.1rem;
    left: 8.3rem;
    top: 0.1rem;
    bottom: 0.1rem;
    border: 2px solid #ccc;
    background-image: url(../assets/img/map.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .plan {
      position: absolute;
      top: 0.1rem;
      width: calc(100% - 0.3rem);
      left: 0.15rem;
      height: 1rem;
      background: rgba(54, 121, 176, 0.68);
      text-align: center;
      font-size: 0.4rem;
      line-height: 1rem;
    }
    .eventEnd {
      position: absolute;
      top: 1.1rem;
      right: 0rem;
      height: 0.4rem;
      font-size: 0.16rem;
      line-height: initial;
    }
    .event-icon {
      position: absolute;
      cursor: pointer;
      width: 0.55rem;
      height: 0.75rem;
      border: 1px solid #111;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      box-shadow: 0 0 4px 4px rgba(100, 255, 36, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // transform: translate(-50%, -50%);
      // background-image: url(../assets/icons/icon_81.png);
      // background-repeat: no-repeat;
      // background-position: top center;
      // background-color: rgba(245, 54, 54, 0.7);
      // background-size: 30px 29px;
      .icon-image {
        width: 0.45rem;
        height: 0.45rem;
        border-radius: 50%;
        background-image: url(../assets/icons/menu/d1.png);
        background-color: rgba(100, 255, 36, 0.6);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 30px 29px;
      }
      span {
        // position: absolute;
        // top: 100%;
        // left: 50%;
        // transform: translateX(-50%);
        text-shadow: 1px 1px 3px rgb(0, 0, 0);
        white-space: nowrap;
        width: 100%;
        text-align: center;
        border-top: 1px solid rgba(100, 255, 36, 0.6);
        margin-top: 0.03rem;
        font-size: 0.14rem;
      }
    }
    .low-level {
      // background-image: url(../assets/icons/menu/d1.png);
      // background-color: rgba(100, 255, 36, 0.7);
    }
    .h-level {
      box-shadow: 0 0 4px 4px rgba(245, 241, 0, 0.5);
      .icon-image {
        background-image: url(../assets/icons/menu/d2.png);
        background-color: rgba(245, 241, 0, 0.6);
      }
      span {
        border-top: 1px solid rgba(245, 241, 0, 0.6);
      }
      // background-image: url(../assets/icons/menu/d2.png);
      // background-color: rgba(245, 241, 0, 0.7);
    }
    .boss {
      box-shadow: 0 0 4px 4px rgba(245, 54, 54, 0.5);
      .icon-image {
        background-image: url(../assets/icons/menu/d3.png);
        background-color: rgba(245, 54, 54, 0.6);
      }
      span {
        border-top: 1px solid rgba(245, 54, 54, 0.6);
      }
      // background-image: url(../assets/icons/menu/d3.png);
    }
    .endless {
      box-shadow: 0 0 4px 4px rgba(245, 69, 0, 0.5);
      .icon-image {
        background-image: url(../assets/icons/endless.png);
        background-color: rgba(245, 69, 0, 0.6);
      }
      span {
        border-top: 1px solid rgba(245, 69, 0, 0.6);
      }
    }
  }
}
.dialog {
  position: absolute;
  display: none;
  z-index: 10;
  & > div {
    margin: 0.1rem;
  }
  display: flex;
  justify-content: space-between;
}
.weaponShow {
  top: 0.67rem;
  left: 7.98rem;
  display: flex;
}
.armorShow {
  top: 1.77rem;
  left: 7.98rem;
  display: flex;
}
.ringShow {
  top: 2.77rem;
  left: 7.98rem;
  display: flex;
}
.menu {
  position: absolute;
  bottom: 0.15rem;
  background: rgba($color: #000000, $alpha: 0.4);
  left: 8.33rem;
  padding: 0.1rem;
  border-top-right-radius: 0.1rem;
  display: flex;
  & > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    margin: 0 0.2rem;
    justify-content: space-between;
    span {
      color: #fff;
      font-size: 0.3rem;
      line-height: 0.3rem;
      padding: 0.1rem 0;
      font-weight: bold;
      text-shadow: 1px 1px 3px rgb(0, 0, 0);
    }
  }
}
.dialog-backpackPanel {
  position: absolute;
  z-index: 9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #fff;
  border-radius: 6px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.7);
  background: rgba(0, 0, 0, 0.7);
  .title {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    padding: 0.1rem;
    height: 0.6rem;
    border-bottom: 1px solid #ccc;
    .close {
      cursor: pointer;
      position: absolute;
      top: 0.13rem;
      right: 0.15rem;
      display: block;
      width: 0.3rem;
      height: 0.3rem;
      background-image: url(../assets/icons/close.png);
      background-size: cover;
    }
  }
  .body {
    padding: 0.1rem;
    display: flex;
    flex-direction: column;
    .prompt-message {
      font-size: 0.12rem;
      margin: 0.04rem 0;
    }
  }
  .savedata-textarea {
    width: 300px;
    height: 180px;
    user-select: text;
    padding: 2px;
    background: rgba($color: #ffffff, $alpha: 0.8);
  }
  .footer {
    border-top: 1px solid #ccc;
    padding: 0.06rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.item-close {
  display: none;
  position: absolute;
  top: -0.52rem;
  right: 50%;
  transform: translateX(68%);
  background: #000;
  padding: 0.04rem 0.1rem;
  border-radius: 0.06rem;
  border: 1px solid #fff;
}
.close {
  cursor: pointer;
  display: block;
  width: 0.25rem;
  height: 0.25rem;
  background-image: url(../assets/icons/close.png);
  background-size: cover;
}
.gm-panel {
  width: 5rem;
  height: 3rem;
  .content {
    input {
      padding: 0.05rem 0.1rem;
      width: 1.4rem;
    }
    flex-direction: column;
    display: flex;
    justify-content: center;
    padding: 0.1rem;
    align-items: center;
    justify-content: center;
  }
}
.dungeons-Info {
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3.5rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  border: 2px solid #ccc;
  height: 3.5rem;
  padding: 0.1rem;
  .info {
    padding: 0.1rem 0.2rem;
    font-size: 0.12rem;
    color: #999;
  }
  .dungeons-close {
    cursor: pointer;
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
    display: block;
    width: 0.23rem;
    height: 0.23rem;
    background-image: url(../assets/icons/close.png);
    background-size: cover;
  }
  .dungeons-re {
    cursor: pointer;
    position: absolute;
    top: 0.1rem;
    right: 0.5rem;
    display: block;
    width: 0.23rem;
    height: 0.23rem;
    background-image: url(../assets/icons/re.png);
    background-size: cover;
  }
  .dungeons-title {
    margin-top: 0.1rem;
    font-size: 0.22rem;
    margin-bottom: 0.2rem;
  }
  .handle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
    font-size: 0.14rem;
    margin-top: 0.1rem;
    & > div {
      display: flex;
      align-items: center;
    }
    p {
      display: flex;
      align-items: center;
    }
    input {
      width: 0.2rem;
      height: 0.2rem;
      min-height: 15px;
      min-width: 15px;
      margin-right: 0.05rem;
    }
  }
  .handle-column {
    display: flex;
    flex-direction: column;
    p {
      display: flex;
      align-items: center;
    }
  }
  .jjj {
    font-size: 0.16rem;
    width: 100%;
    justify-content: space-between;
    display: flex;
    padding: 0.15rem 0.25rem;
    align-items: center;
    .dungeons-dps {
      color: #f90202;
      text-shadow: 0px 0px 2px rgba(245, 54, 54, 0.7);
    }
    .dungeons-difficulty {
      text-align: right;
    }
  }
  .desc {
    width: 100%;
    height: 1.5rem;
    font-size: 0.14rem;
    border-top: 1px solid #ccc;
    padding: 0.1rem;
    color: #999;
  }
  .dungeons-btn {
    margin: 0.2rem 0.3rem;
    padding: 0.1rem 0.3rem;
    cursor: pointer;
    color: #fff;
    background: #000;
    border: 1px solid #fff;
    white-space: nowrap;
  }
}
</style>
