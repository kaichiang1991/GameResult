<template>
  <div id="spinDetails">
    <h2>{{ $t('GameScreen') }}</h2>
    <section v-for="(list,idx) in renderData" :key="idx">
      <screen-info :infos="list.infos">
        <!-- custom screen for BN54 screen & lines -->
        <template v-slot:info>
          <ul class="info">
            <li class="gametype">{{ $t(list.infos.state) }}<span v-if="list.infos.type > 0">：＃{{ list.infos.times }}</span></li>
            <li v-if="list.infos.type == 0">{{ $t('BetLevel') }}：{{ list.infos.betMultiple }}</li>
            <li>{{ $t('Payout') }}：{{ list.infos.win }}</li>
            <li v-if="list.infos.type < 2">{{ $t('TotalWinLines') }}：{{ list.infos.totalWinLines }}</li>
          </ul>
        </template>
        <template v-slot:screen>
          <screen :symbolResult="list.screens.screen_org"></screen>
          <template v-if="changeScreen(list.screens.screen_org)">
            <i class="arrow el-icon-bottom"></i>
            <screen :symbolResult="list.screens.symbol_result"></screen>
          </template>
        </template>
      </screen-info>
      <line-info :lines="list.lines" :screens="list.screens"></line-info>
    </section>
  </div>
</template>

<i18n src="@/lang/detail.json"></i18n>

<script>
// import store from '@/store'
import { Decimal } from 'decimal.js'
import slot from '@/mixin/slot'
import screen from './screen.vue'
import lineInfo from './lineInfo.vue'
import { gameState } from '@/utils/common'

export default {
  name: 'spinDetails',
  mixins: [slot], // Slot預設基本函式(客製化時可使用相同函式名稱覆蓋)
  components:{
    screen,
    lineInfo
  },
  methods: {
    changeScreen(screen){
      return screen.flat().includes(61)
    },
    // 客製化函式以相同名稱取代
    /** 整理各局資料 */
    infoData(data){
      const { times, game_state_type, game_state , info: { win_line_infos }, win } = data;
      const gtype = game_state_type == 1 && game_state == 52 ? 2 : game_state_type
      return {
        type: gtype, // 遊戲狀態(code:number)
        state: gameState(gtype), // 遊戲狀態(name:string)
        times, // 回和次數
        betMultiple: this.summary.bet_multiple, // 押注乘數
        win: Number(Decimal.div(win, this.summary.money_fraction_multiple)), // 派彩
        totalWinLines: win_line_infos.length, // 總連線數
      }
    },
    // 客製化函式以相同名稱取代
    /** 詳細頁資料整理 */
    initData(){
      let times_fg = 1, times_bg = 1;
      this.renderData = this.spinData.map((data)=>{
        // 回合計算
        if(data.game_state_type == 1 && data.game_state === 50){
          times_bg = 1
          data.times = times_fg
          times_fg++;
        }else{
          data.times = times_bg
          times_bg++;
        }
        return {
          infos: this.infoData(data),
          screens: this.screenData(data.info),
          lines: this.lineData(data.info.win_line_infos),
        }
      })
    },
  }
}
</script>

<style lang="scss">
@import '@css/slotSpin.scss';
</style>