import { Decimal } from 'decimal.js'
import { screenInfo, lineInfo } from '@/components/slot'
import { gameState } from '@/utils/common'

export default {
  components: {
    screenInfo,
    lineInfo
  },
  props: {
    spinData:{
      typeof: Object,
      default: {}
    },
    summary:{
      typeof: Object,
      default: {}
    }
  },
  data(){
    return{
      renderData: null
    }
  },
  methods: {
    /** 整理各局資料 */
    infoData(data){
      const { times, game_state_type , info: { win_line_infos }, win } = data;
      return {
        type: game_state_type, // 遊戲狀態(code:number)
        state: gameState(game_state_type), // 遊戲狀態(name:string)
        times: times, // 回和數
        bet: this.summary.bet_multiple, // 壓注乘數
        win: Number(Decimal.div(win, this.summary.money_fraction_multiple)), // 派彩
        totalWinLines: win_line_infos.length, // 總連線數
      }
    },
    /** 整理盤面資料 */
    screenData(data){
      const { screen_org, symbol_result, screen_output } = data
      return {
        screen_org,     // 原始盤面
        screen_output,  // 盤面輸出資訊
        symbol_result,  // 結果盤面
      }
    },
    /** 整理線獎資料 */
    lineData(data){
      return data.map(winline=>{
        return{
          cash: Number(Decimal.mul(Decimal.div(winline.win, this.summary.money_fraction_multiple), winline.multiplier)),
          ...winline
        }
      })
    },
    /** 篩選盤面 */
    // filterScreen(screen){
    //   return screen.filter(row=>{
    //     return row.filter(symbol=>symbol>0)
    //   })
    // },
    /** 詳細頁資料整理 */
    initData(){
      let times = null, gtype = 0;
      this.renderData = this.spinData.map(data=>{
        data.game_state_type === gtype ? times++ : times=1
        gtype = data.game_state_type
        return {
          times,
          infos: this.infoData(data),
          screens: this.screenData(data.info),
          lines: this.lineData(data.info.win_line_infos),
        }
      })
    },
  },
  created(){
    this.initData(); // 本局資料初始化
  }
}