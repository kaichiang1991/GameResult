<template>
  <div id="detail">
    <div class="header">
      <h1>{{ $t('DetailTitle')}}</h1>
      <h2>{{ $t('Game') }}：{{ info.gameName }}</h2>
      <table class="table-style summary">
        <thead>
          <tr>
            <th>{{ $t('RoundID') }}</th>
            <th>{{ $t('UserAccount') }}</th>
            <th>{{ $t('Denom') }}</th>
            <th>{{ $t('Currency') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td :data-label="$t('RoundID')"><span>{{ info.roundId }}</span></td>
            <td :data-label="$t('UserAccount')"><span>{{ info.account }}</span></td>
            <td :data-label="$t('Denom')"><span>{{ info.denom }}</span></td>
            <td :data-label="$t('Currency')"><span>{{ info.currency }}</span></td>
          </tr>
        </tbody>
      </table>
      <h2>{{ $t('RoundDetail') }}</h2>
      <table class="table-style result">
        <thead>
          <tr>
            <th>{{ $t('time') }}</th>
            <th>{{ $t('conduct') }}</th>
            <th>{{ $t('amount') }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td :data-label="$t('time')"><span>{{ info.betTime }}</span></td>
            <td :data-label="$t('conduct')"><span>{{ $t('BetTotal') }}</span></td>
            <td :data-label="$t('amount')"><span>{{ info.amount }}</span></td>
            <td></td>
          </tr>
          <tr>
            <td :data-label="$t('time')"><span>{{ info.endTime }}</span></td>
            <td :data-label="$t('conduct')"><span>{{ $t('WinTotal') }}</span></td>
            <td :data-label="$t('amount')"><span>{{ info.winAmount }}</span></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="content">
      <Content v-if="spinData" :spinData="spinData" :summary="summary"></Content>
    </div>
  </div>
</template>

<i18n src="@/lang/detail.json"></i18n>

<script>
import store from '@/store'
import { mapState } from 'vuex'
import { game_detail, platform_detail } from '@/api/detail'
import { exchangeDenom, getGameName, timeFormat } from '@/utils/common'

export default {
  name: 'Detail',
  components: {
    Content: async() => import('@/project/'+store.getters.gameID+'/spinDetails.vue')
  },
  props:{
    infoData:{
      typeof: Object,
      default: null
    },
    rowData: {
      typeof: Object,
      default: null
    },
  },
  data(){
    return{
      /** 遊戲資訊 */
      info: {
        roundId: null,                // 單號
        account: null,                // 玩家帳號
        denom: null,                  // 投注比例
        currency: null,               // 幣別
        betTime: null,                // 投注時間
        endTime: null,                // 結束時間
        amount: null,                 // 投注額
        winAmount: null,              // 贏分
        gameName: '',                 // 遊戲名稱
      },
      /** 遊戲摘要 */
      summary:{
        money_fraction_multiple: 0,   // 錢小數轉整數時要乘的倍數; 以整數型態保存, 轉為小數需除以此欄位
        bet_multiple: 0,              // 壓注乘數
        bet: 0,                       // 壓注金額
      },
      /** 回合資料 */
      spinData: null,
    }
  },
  computed: {
    ...mapState({
      gameToken: state => state.gameToken,
      gameID: state => state.gameID,
      contentView: state => state.contentView,
      language: state => state.language,
      openMode: state => state.openMode,
    }),
  },
  methods: {
    /** 遊戲內部開啟細單 */
    async getGameDetail(){
      const params = {
        token : this.gameToken,
        round_code: this.rowData.round_code,
      }

      const data = await game_detail(params)
      this.spinData = data.spin_details
      this.info.currency = data.currency_code
      this.summary = {
        money_fraction_multiple: data.money_fraction_multiple,
        bet_multiple: data.spin_summary.bet_multiple,
        bet: data.spin_summary.bet,
      }
    },
    /** 外部平台開啟細單 */
    async getPlatformDetail(){
      const params = {
        token : this.gameToken,
      }

      const data = await platform_detail(params)
      const { currency_code, game_code, user_name, money_fraction_multiple, spin_summary:{ round_code, denom, bet_time, end_time, bet, win, bet_multiple } } = data
      this.$store.commit('SET_GAMEID', game_code);
      this.info = {
        roundId: round_code,
        account: user_name,
        denom: exchangeDenom(denom),
        currency: currency_code,
        betTime: timeFormat(bet_time),
        endTime: timeFormat(end_time),
        amount: bet / money_fraction_multiple,
        winAmount: win / money_fraction_multiple,
        gameName: await getGameName(game_code, this.language)
      }
      this.summary = {
        money_fraction_multiple: money_fraction_multiple,
        bet_multiple: bet_multiple,
        bet: bet,
      }
      this.spinData = data.spin_details

    },
  },
  mounted(){
  },
  created(){
    if(this.openMode === 'game'){
      const { round_code, denom, bet_time, end_time, bet, win } = this.rowData
      const { userName, gameName } = this.infoData
      this.info = {
        roundId: round_code,
        account: userName,
        denom: exchangeDenom(denom),
        betTime: bet_time,
        endTime: end_time,
        amount: bet,
        winAmount: win,
        gameName
      }
      this.getGameDetail()
    }else{
      this.getPlatformDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
/**----- Layout -----*/
#detail{
  padding: 60px 0;
  h1,h2{
    @include gradient-primary;
    font-weight: bold;
    padding: 8px 20px;
  }
  h1{
    font-size: $fz-sub;
  }
  h2{
    font-size: $fz-primary;
  }
  .table-style{
    margin: 10px auto 30px;
  }
}

/**----- UI -----*/
.table-style{
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  font-size: $fz-min;
  font-weight: bold;
  th,td{
    padding: 1em .5em;
    text-align: center;
    vertical-align: middle;
    width: 25%;
  }
  thead{
    color: #fdefce;
    @include gradient-dark-up;
  }
  tbody{
    tr{
      @include gradient-dark-down;
      &:not(:first-child){
        border-top: 1px solid #333;
      }
    }
  }
}
@media screen and (max-width: 1000px){
  #detail{
    padding: 60px 2.5%;
    .table-style.summary{
      thead{
        display: none;
      }
      tbody{
        tr{
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: stretch;
          align-content: stretch;
        }
        td{
          display: block;
          width: 50%;
          padding: 0;
          &::before{
            display: block;
            content: attr(data-label);
            color: #fdefce;
            padding: 1em .5em;
            @include gradient-dark-up;
          }
          span{
            display: block;
            padding: 1em .5em;
            @include gradient-dark-down;
          }
        }
      }
    }
  }
	.table-style{
    th,td{
      &:empty{
        display: none;
      }
    }
    td{
      span{
        font-size: $fz-min;
      }
    }
  }
}
@media screen and (max-width: 420px){
  #detail{
    h1,h2{
      padding: 8px 5px;
    }
    h2{
      font-size: $fz-primary;
    }
  }
	.table-style{
    th{
      font-size: $fz-tiny;
    }
    td{
      span{
        font-size: $fz-tiny;
      }
    }
    &.summary{
      td{
        font-size: $fz-tiny;
      }
    }
  }
}
</style>