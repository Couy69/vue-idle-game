<template>
  <div class="main" @contextmenu.prevent="contextmenu($event)">
    <div class="user-status">

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
              <img src="../assets/icons/S_Sword06.png" alt="">
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
              <img src="../assets/icons/icon_11.png" alt="">
              <div class="value">
                {{attribute.DEF.value}} <span style="font-size:.14rem;">({{Math.round((1-attribute.REDUCDMG)*100)}}%)</span>
              </div>
            </div>
          </template>
          <template v-slot:tip>
            <p class="info">* 角色防御力以及计算后的减伤比例</p>
            <p class="info">* 减伤比例采用非线性计算，护甲越高收益越低</p>
          </template>
        </cTooltip>

        <cTooltip placement="bottom">
          <template v-slot:content>
            <div class="item">
              <img src="../assets/icons/icon_78.png" alt="">
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
              <img src="../assets/icons/S_Sword01.png" alt="">
              <div class="value">
                {{attribute.CRITDMG.value}}%
              </div>
            </div>
          </template>
          <template v-slot:tip>
            <p class="info">* 暴击伤害初始为150%</p>
          </template>
        </cTooltip>

      </div>
    </div>
    <div class="user-item">
      <div class="uii">
        <cTooltip placement="bottom">
          <template v-slot:content>
            <div class="gold" v-if="attribute.DPS">DPS: <span>{{(attribute.DPS).toFixed(2)}}</span></div>
          </template>
          <template v-slot:tip>
            <p class="info">* DPS:角色每秒伤害</p>
            <p class="info">* 这个只是伤害数据，并没有统计防御属性，所以只是作为战斗力评估的一个依据</p>
          </template>
        </cTooltip>
        <cTooltip placement="bottom">
          <template v-slot:content>
            <div class="gold">金币: <span>{{userGold}}</span></div>
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
      <div class="acc" @mouseover="showItemInfo($event,'acc',playerAcc,false)" @mouseleave="closeItemInfo">
        <div class="title" v-if="playerAcc">
          <div class='icon' :style="{'box-shadow':'inset 0 0 7px 2px '+playerAcc.quality.color}">
            <img :src="playerAcc.type.iconSrc" alt="">
          </div>
          <div class='name' :style="{color:playerAcc.quality.color}">{{playerAcc.type.name}} {{playerAcc.enchantlvl?'(+'+playerAcc.enchantlvl+')':''}}</div>
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
        <i class="dungeons-close" @click="closeDungeonsInfo"></i>
        <div class="dungeons-title">{{dungeons.name}}</div>
        <div class="jjj">
          <div class="dungeons-dps" v-if="dungeons.type=='endless'">推荐DPS：???</div>
          <div class="dungeons-dps" v-else>推荐DPS：{{dungeons.needDPS}}</div>
          <div class="dungeons-lv" v-if="dungeons.type=='endless'">无尽层数:{{dungeons.lv}}</div>
          <div class="dungeons-lv" v-else>副本等级:{{dungeons.lv}}</div>
        </div>
        <div class="dese"> -{{dungeons.name}}:{{dungeons.desc||'副本介绍'}}</div>
        <!-- <div class="dese"> -{{dungeons.name}}:{{'副本介绍'}}</div> -->
        <!-- <div class="dungeons-lv"> </div> -->
        <div class="handle">
          <div v-if="dungeons.type!='endless'">
            <input type="checkbox" name="" v-model="reChallenge"> 重复挑战
          </div>
          <div class="dungeons-btn" @click="eventBegin()">开始挑战</div>
        </div>

      </div>
      <div class="event-icon low-level" @click="showDungeonsInfo(0)" v-show='!inDungeons' style="    top: 48%;left: 10%;">
        <span>lv1</span>
      </div>
      <div class="event-icon low-level" @click="showDungeonsInfo(1)" v-show='!inDungeons' style="top: 38%;left: 17%;"><span>lv5</span></div>
      <div class="event-icon low-level" @click="showDungeonsInfo(2)" v-show='!inDungeons' style="top: 54%;left: 30%;"><span>lv10</span></div>
      <div class="event-icon low-level" @click="showDungeonsInfo(3)" v-show='!inDungeons' style="top: 28%;left: 43%;"><span>lv15</span></div>
      <div class="event-icon low-level" @click="showDungeonsInfo(4)" v-show='!inDungeons' style="top: 39%;left: 48%;"><span>lv20</span></div>
      <div class="event-icon m-level" @click="showDungeonsInfo(5)" v-show='!inDungeons' style="top: 9%;left: 61%;"><span>lv25</span></div>
      <div class="event-icon m-level" @click="showDungeonsInfo(6)" v-show='!inDungeons' style="top: 10%;left: 71%;"><span>lv30</span></div>
      <div class="event-icon m-level" @click="showDungeonsInfo(7)" v-show='!inDungeons' style="top: 21%;left: 88%;"><span>lv35</span></div>
      <div class="event-icon m-level" @click="showDungeonsInfo(8)" v-show='!inDungeons' style="top: 32%;left: 78%;"><span>lv40</span></div>
      <div class="event-icon m-level" @click="showDungeonsInfo(9)" v-show='!inDungeons' style="top: 42%;left: 88%;"><span>lv45</span></div>
      <div class="event-icon m-level" @click="showDungeonsInfo(10)" v-show='!inDungeons' style="top: 56%;left: 80%;"><span>lv50</span></div>
      <div class="event-icon h-level" @click="showDungeonsInfo(11)" v-show='!inDungeons' style="top: 79%;left: 73%;"><span>lv55</span></div>
      <div class="event-icon h-level" @click="showDungeonsInfo(12)" v-show='!inDungeons' style="top: 85%;left: 61%;"><span>lv60</span></div>
      <div class="event-icon h-level" @click="showDungeonsInfo(13)" v-show='!inDungeons' style="top: 71%;left: 40%;"><span>lv70</span></div>
      <div class="event-icon h-level" @click="showDungeonsInfo(14)" v-show='!inDungeons' style="top: 75%;left: 20%;"><span>lv80</span></div>
      <div class="event-icon boss" @click="showDungeonsInfo(15)" v-show='!inDungeons' style="top: 56%;left: 51%;"><span>lv90</span></div>
      <div class="event-icon boss" @click="showDungeonsInfo(16)" v-show='!inDungeons' style="top: 90%;left: 88%;"><span>lv100</span></div>
      <div class="event-icon endless" v-if="endlessLv" @click="showDungeonsInfo(17)" v-show='!inDungeons' style="top: 10%;left: 18%;"><span>无尽</span></div>
    </div>
    <div class="menu">
      <div class="Backpack" @click="openMenuPanel('backpack')">
        <img src="../assets/icons/menu/quest_icon_02.png" alt="">
        <span>背 包</span>
      </div>
      <div class="Backpack" @click="openMenuPanel('shop')">
        <img src="../assets/icons/menu/quest_icon_03.png" alt="">
        <span>商 店</span>
      </div>
      <!-- <div class="Backpack" @click="openMenuPanel('backpack')">
        <img src="../assets/icons/menu/icon_80.png" alt="">
        <span>装备强化</span>
      </div> -->
      <div class="Backpack" @click="saveGame">
        <img src="../assets/icons/menu/icon_85.png" alt="">
        <span>保 存</span>
      </div>
      <div class="Backpack" @click="exportSavedata">
        <img src="../assets/icons/menu/icon-export.png" alt="">
        <span class="compact">导出</span>
      </div>
      <div class="Backpack" @click="importSaveDataPanelOpened =true">
        <img src="../assets/icons/menu/icon-import.png" alt="">
        <span class="compact">导入</span>
      </div>
      <div class="Backpack" @click="GMOpened = true">
        <img src="../assets/icons/menu/icon_85.png" alt="">
        <span>GM</span>
      </div>
    </div>
    <div class="dialog" :style='itemDialogStyle'>
      <weaponPanel :item="weapon" v-show="weaponShow"></weaponPanel>
      <weaponPanel :item="playerWeapon" v-show="weaponShow&&needComparison"></weaponPanel>
      <armorPanel :item="armor" v-show="armorShow"></armorPanel>
      <armorPanel :item="playerArmor" v-show="armorShow&&needComparison"></armorPanel>
      <accPanel :item="acc" v-show="accShow"></accPanel>
      <accPanel :item="playerAcc" v-show="accShow&&needComparison"></accPanel>
      <div class="item-close" @click="closeItemInfo" v-if="(armorShow||accShow||weaponShow)&&needComparison&&operatorSchemaIsMobile">
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
        lv:<input v-model="GMEquipLv" type="text" placeholder="随机生成一套输入等级的装备">
        稀有度：<input v-model="GMEquipQu" type="text" placeholder="装备质量">
        <div class="button" @click="createGMEquip">确定</div>
      </div>
    </div>
    <a class="github" target="_blank" @click="navToGithub" title="源码" src="https://github.com/Couy69/vue-idle-game"></a>
  </div>
</template>
<script>
import weaponPanel from './component/weaponPanel'
import armorPanel from './component/armorPanel'
import accPanel from './component/accPanel'
import backpackPanel from './component/backpackPanel'
import shopPanel from './component/shopPanel'
import strengthenEquipment from './component/strengthenEquipment'
import dungeons from './component/dungeons'
import cTooltip from './uiComponent/tooltip'
import { assist } from '../assets/js/assist';
import { Base64 } from 'js-base64';
import '../assets/js/handle';
export default {
  name: "index",
  mixins: [assist],
  data() {
    return {
      time: '00:00:00',
      sysInfo: {},
      weaponShow: false,
      armorShow: false,
      accShow: false,
      equiShow: false,
      autoHealthRecovery: '',
      weapon: {},
      inDungeons: false,  //是否在副本进程中
      reChallenge: false,
      dungeons: '',
      acc: {},
      armor: {},
      backpackPanelOpened: false,
      shopPanelOpened: false,
      importSaveDataPanelOpened: false,
      exportSaveDataPanelOpened: false,
      strengthenEquipmentPanelOpened: false,
      itemDialogStyle: {},
      GMEquipLv: 1,
      GMEquipQu: 2,
      GMOpened: false,
      needComparison: true,
      saveData: {},
      saveDateString: '',
      debounceTime: {},  //防抖计时器
    };
  },
  components: { weaponPanel, armorPanel, accPanel, dungeons, backpackPanel, shopPanel, cTooltip,strengthenEquipment },
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

    var sd = localStorage.getItem('_sd')
    try {
      if (sd) {
        this.saveData = JSON.parse(Base64.decode(Base64.decode(sd)))
        this.$store.commit('set_player_weapon', this.$deepCopy(this.saveData.playerEquipment.playerWeapon))
        this.$store.commit('set_player_armor', this.$deepCopy(this.saveData.playerEquipment.playerArmor))
        this.$store.commit('set_player_acc', this.$deepCopy(this.saveData.playerEquipment.playerAcc))
        this.$store.commit('reset_player_gold', parseInt(this.saveData.gold) || 0)
        this.$store.commit('set_endless_lv', parseInt(this.saveData.endlessLv) || 0)
      }
      else {
        this.$store.commit('set_player_weapon', this.$deepCopy(this.playerWeapon))
        this.$store.commit('set_player_armor', this.$deepCopy(this.playerArmor))
        this.$store.commit('set_player_acc', this.$deepCopy(this.playerAcc))
      }

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
    this.acc = this.playerAcc

    //TODO:重新装备一次来解决不显示装备对比信息不显示的bug，不是最好但是是最快的
    {
      this.$store.commit('set_player_weapon', this.$deepCopy(this.playerWeapon))
      this.$store.commit('set_player_armor', this.$deepCopy(this.playerArmor))
      this.$store.commit('set_player_acc', this.$deepCopy(this.playerAcc))
    }
  },
  computed: {
    attribute() { return this.$store.state.playerAttribute.attribute },
    healthRecoverySpeed() { return this.$store.state.playerAttribute.healthRecoverySpeed },
    userGold() { return this.$store.state.playerAttribute.GOLD },
    playerWeapon() { return this.$store.state.playerAttribute.weapon },
    playerArmor() { return this.$store.state.playerAttribute.armor },
    playerAcc() { return this.$store.state.playerAttribute.acc },
    endlessLv() { return this.$store.state.playerAttribute.endlessLv },
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

  },
  methods: {
    navToGithub() {
      window.open('https://github.com/Couy69/vue-idle-game', '_blank');
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
          playerAcc: this.$store.state.playerAttribute.acc,
        },
        backpackEquipment: backpackPanel.grid,
        gold: this.$store.state.playerAttribute.GOLD,
        endlessLv: this.$store.state.playerAttribute.endlessLv,
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
      try {
        this.saveData = JSON.parse(Base64.decode(Base64.decode(this.saveDateString)))
        this.$store.commit('set_player_weapon', this.$deepCopy(this.saveData.playerEquipment.playerWeapon))
        this.$store.commit('set_player_armor', this.$deepCopy(this.saveData.playerEquipment.playerArmor))
        this.$store.commit('set_player_acc', this.$deepCopy(this.saveData.playerEquipment.playerAcc))

        this.$store.commit('reset_player_gold', parseInt(this.saveData.gold) || 0)
        this.$store.commit('set_endless_lv', parseInt(this.saveData.endlessLv) || 0)
        var backpackPanel = this.findComponentDownward(this, 'backpackPanel')
        backpackPanel.grid = this.saveData.backpackEquipment
        this.$store.commit("set_sys_info", {
          msg: `
                存档成功导入了
              `,
          type: 'win'
        });
        this.closePanel()
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
    windowVisibilitychange() {
      if (!this.inDungeons) {
        return
      }
      if (document.hidden) {
        clearInterval(this.autoHealthRecovery)
      } else {
        this.autoHealthRecovery = setInterval(() => {
          this.$store.commit('set_player_curhp', this.healthRecoverySpeed * (this.attribute.MAXHP.value / 50))
        }, 1000)
      }
    },
    async saveGame() {
      var data = {}
      var backpackPanel = this.findComponentDownward(
        this,
        "backpackPanel",
      );
      data = {
        playerEquipment: {
          playerWeapon: this.$store.state.playerAttribute.weapon,
          playerArmor: this.$store.state.playerAttribute.armor,
          playerAcc: this.$store.state.playerAttribute.acc,
        },
        backpackEquipment: backpackPanel.grid,
        gold: this.$store.state.playerAttribute.GOLD,
        endlessLv: this.$store.state.playerAttribute.endlessLv,
      }
      var saveData = Base64.encode(Base64.encode(JSON.stringify(data)))
      localStorage.setItem('_sd', saveData)

      this.$store.commit("set_sys_info", {
        msg: `
              游戏进度已经保存了。
            `,
        type: 'win'
      });

        // try {
        //   let data = await this.$api.post(
        //     "v1/userInfo/add",
        //     {
        //       name:'couy',
        //       password:'123456',
        //       endlessLv:'2',
        //       playtime:'12分11秒',
        //       saveData:saveData,
        //     }
        //   );
        //   console.log(data)
        //   if (data.status == 200) {

        //   }
        // } catch (error) {
        //   console.log(error);
        // }
    },
    clearSysInfo() {
      this.$store.commit('clear_sys_info')
    },
    createGMEquip() {
      var b = this.findComponentDownward(this, "weaponPanel");
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
      var b = this.findComponentDownward(this, "accPanel");
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
      var b = this.findComponentDownward(this, 'dungeons')
      this.dungeons = b.dungeonsArr[k]
      if (this.dungeons.type == 'endless') {
        this.reChallenge = false
        this.dungeons.lv = this.$store.state.playerAttribute.endlessLv
      }
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
        default:
          break;
      }

    },
    closePanel() {
      this.backpackPanelOpened = this.shopPanelOpened = this.importSaveDataPanelOpened = this.exportSaveDataPanelOpened = this.strengthenEquipmentPanelOpened = false
      this.GMOpened = false
      this.saveDateString = ''
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
        case 'acc':
          this.acc = item
          this.accShow = true
          break;
        default:
          break;
      }
    },
    closeItemInfo() {
      this.needComparison = true;
      this.weaponShow = this.armorShow = this.accShow = false
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
@font-face {
  font-family: "Lato-Regular";
  src: url(../assets/fonts/Lato-Regular.ttf);
}
* {
  box-sizing: border-box;
  user-select: none;
}
a {
  cursor: pointer;
}
.main {
  background: #111;
  font-family: Lato-Regular, "Noto Sans SC", "Noto Sans", "Source Sans Pro",
    "Avenir", Helvetica, Arial, sans-serif !important;
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
    padding: 0.2rem;
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
    .other {
      img {
        width: 0.4rem;
        height: 0.4rem;
      }
      display: flex;
      flex: 1;
      padding: 0.2rem;
      border: 2px solid #ccc;
      margin-top: 0.2rem;
      flex-wrap: wrap;
      & > div,
      .item {
        cursor: pointer;
        width: 50%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 0.2rem;
        .value {
          margin-left: 0.1rem;
          font-size: 0.24rem;
          font-weight: normal;
          flex: 1;
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
    padding: 0.4rem 0;
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
      padding: 0.1rem;
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
        font-size: 0.22rem;
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
      height: 0.55rem;
      background-image: url(../assets/icons/icon_81.png);
      border-radius: 50%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background-repeat: no-repeat;
      background-position: center;
      background-color: rgba(245, 54, 54, 0.7);
      box-shadow: 0 0 4px 4px rgba(184, 171, 255, 70%);
      span {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        text-shadow: 1px 1px 3px rgb(0, 0, 0);
        white-space: nowrap;
      }
    }
    .low-level {
      background-color: rgba(100, 255, 36, 0.7);
    }
    .m-level {
      background-color: rgba(0, 159, 245, 0.7);
    }
    .h-level {
      background-color: rgba(245, 241, 0, 0.7);
    }
    .boss {
      background-image: url(../assets/icons/icon_83.png);
    }
    .endless {
      background-image: url(../assets/icons/endless.png);
      background-color: rgba(245, 69, 0, 0.7);
      ox-shadow: 0 0 4px 4px #ffabab;
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
.accShow {
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
  width: 3rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  border: 2px solid #ccc;
  height: 4rem;
  padding: 0.1rem;
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
  .dungeons-title {
    margin-top: 0.1rem;
    font-size: 0.2rem;
  }
  .handle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
    font-size: 0.14rem;
    & > div {
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
  .jjj {
    font-size: 0.14rem;
    width: 100%;
    justify-content: space-around;
    display: flex;
    padding: 0.15rem;
    align-items: center;
    .dungeons-dps {
      color: #f90202;
      text-shadow: 0px 0px 2px rgba(245, 54, 54, 0.7);
    }
  }
  .dese {
    width: 100%;
    height: 2rem;
    font-size: 0.14rem;
    border-top: 1px solid #ccc;
    padding: 0.2rem;
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
.github {
  position: fixed;
  width: 0.35rem;
  height: 0.35rem;
  background: url(../assets/icons/github.svg);
  display: flex;
  bottom: 0.2rem;
  right: 0.2rem;
}
</style>
