<template>
  <div id="detail">
    <div class="header">
      <h1>{{ $t('DetailTitle')}}</h1>
      <h2>{{ $t('Game') }}：{{ info.gameName }}</h2>
      <table class="table-style">
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
            <td :data-label="$t('RoundID')">{{ info.roundId }}</td>
            <td :data-label="$t('UserAccount')">{{ info.account }}</td>
            <td :data-label="$t('Denom')">{{ info.denom }}</td>
            <td :data-label="$t('Currency')">{{ info.currency }}</td>
          </tr>
        </tbody>
      </table>
      <h2>{{ $t('RoundDetail') }}</h2>
      <table class="table-style">
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
            <td :data-label="$t('time')">{{ info.betTime }}</td>
            <td :data-label="$t('conduct')">{{ $t('BetTotal') }}</td>
            <td :data-label="$t('amount')">{{ info.amount }}</td>
            <td></td>
          </tr>
          <tr>
            <td :data-label="$t('time')">{{ info.endTime }}</td>
            <td :data-label="$t('conduct')">{{ $t('WinTotal') }}</td>
            <td :data-label="$t('amount')">{{ info.winAmount }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="content">
      <Content></Content>
    </div>
  </div>
</template>

<i18n src="@/lang/detail.json"></i18n>

<script>
import store from '@/store'
import { mapState } from 'vuex'
import { game_detail, platform_detail } from '@/api/detail'
import { exchangeDenom, currencyName } from '@/utils/common'

export default {
  name: 'Detail',
  components: {
    Content: async() => import('@/layout/'+ store.getters.gameMode +'.vue')
  },
  props:{
    infoData:{
      typeof: Object,
      default: null
    },
    rowData: {
      typeof: Object,
      default: null
    }
  },
  data(){
    return{
      /** 遊戲資訊 */
      info: {
        roundId: null,        // 單號
        account: null,        // 玩家帳號
        denom: null,          // 投注比例
        currency: null,       // 幣別
        betTime: null,        // 投注時間
        endTime: null,        // 結束時間
        amount: null,         // 投注額
        winAmount: null,      // 贏分
      },
      /** 結果盤面 */
      screen: {},
    }
  },
  computed: {
    ...mapState({
      gameToken: state => state.gameToken,
      gameID: state => state.gameID,
      contentView: state => state.contentView,
    }),
  },
  methods: {
    /** 遊戲內部開啟細單 */
    async getGameDetail(){
      // const params = {
      //   token : this.gameToken,
      //   round_code: this.rowData.round_code,
      // }

      // const data = await game_detail(params)

      // // info
      // const { currency_id, user_name, spin_summary: { round_code, denom } } = data
      // this.info = {
      //   gameName: this.gameName || getGameName(this.gameID),
      //   roundId: round_code,
      //   account: user_name,
      //   denom: denom,
      //   currency: currency_id,
      // }

      // // release
      // this.release = data

      // // screen
      // this.gameScreen = {}
      // // console.log('data--->', data)
    },
    /** 外部平台開啟細單 */
    async getPlatformDetail(){
      
    },
  },
  mounted(){
  },
  created(){
    if(this.rowData){
      const { round_code, denom, bet_time, end_time, bet, win } = this.rowData
      const { userName, currency, gameName } = this.infoData
      this.info = {
        roundId: round_code,
        account: userName,
        denom: exchangeDenom(denom),
        currency: currencyName(currency),
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
	.table-style{
    th,td{
      &:empty{
        display: none;
      }
    }
  }
}
</style>