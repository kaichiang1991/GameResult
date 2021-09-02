<template>
  <div class="paylines">
    <div class="lines">
      <ul v-for="(row,x) in screen" :key="x">
        <li v-for="(symbol,y) in row" :key="y" :class="{ 'pay':drawPayLine(x,y), 'win':drawWinLine(x,y) }"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import paylinesData from '@/utils/paylinesData'

export default {
  name: 'paylines',
  props:{
    winPosition: [],  // 贏分位置的列表
    screen: [],       // 結果盤面
    lineNo: null,     // 贏分線
  },
  data(){
    return{
      lineData: []
    }
  },
  computed: {
    ...mapState({
      gameID: state => state.gameID,
    }),
  },
  methods: {
    /** 畫賠付線 */
    drawPayLine(x,y){
      return this.lineData.find(pos=>pos[0] == x && pos[1] == y)
    },
    /** 畫贏分線 */
    drawWinLine(x,y){
      return this.winPosition.find(pos=>pos[0] == x && pos[1] == y)
    }
  },
  mounted(){
  },
  created(){
    this.lineData = paylinesData(this.gameID)[this.lineNo]
  },
}
</script>

<style lang="scss">
.paylines{
  display: inline-block;
  vertical-align: middle;
  margin: 0 .5em;
  .lines{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
  }
  li{
    width: 10px;
    height: 10px;
    border: 1px solid #fff;
    background: #aaa;
    &.pay{
      background: #f7cb4d;
    }
    &.win{
      background: #ee5257 !important;
    }
  }
}
</style>