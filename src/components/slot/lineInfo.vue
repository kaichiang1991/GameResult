<template>
  <ol class="lineInfo" v-if="lines.length > 0">
    <li class="list" v-for="(list,no) in lines" :key="`line_${no}`">
      <table>
        <tr>
          <th>{{ $t('LineImage') }}</th>
          <th v-if="list.line_no && list.symbol_count">{{ $t('LineCount') }}</th>
          <th>{{ $t('Symbol') }}</th>
          <th>{{ $t('Multiplier') }}</th>
          <th>{{ $t('Payout') }}</th>
        </tr>
        <tr>
          <td>
              <span>{{ list.line_no }}</span>
              <paylines :winPosition="list.win_position" :screen="screens.symbol_result" :lineNo="list.line_no"></paylines>
          </td>
          <td v-if="list.line_no && list.symbol_count">{{ list.symbol_count }}</td>
          <td><img class="symbol" :src="require(`@img/${gameID}/${list.symbol_id}.png`)" alt=""></td>
          <td>{{ list.multiplier }}</td>
          <td>{{ list.cash }}</td>
        </tr>
      </table>
    </li>
  </ol>
</template>

<i18n src="@/lang/detail.json"></i18n>

<script>
import { mapState } from 'vuex'
import paylines from '@/components/slot/paylines'

export default {
  name: 'LineInfo',
  components: {
    paylines
  },
  props: {
    lines:{
      typeof: Array,
      default: null
    },
    screens: [],
  },
  data(){
    return{
    }
  },
  computed: {
    ...mapState({
      gameID: state => state.gameID,
    }),
  },
  methods: {
  },
  mounted(){
  },
  created(){
  }
}
</script>

<style lang="scss">
.lineInfo{
  background: #090909;
  padding: 20px;
  border-top: 1px solid #333;
  .list{
    >table{
      width: 100%;
      text-align: center;
      background: #fff;
      th,td{
        padding: .75em .5em;
        vertical-align: middle;
      }
      th{
        font-size: medium;
        border-top: 1px solid #333;
        border-bottom: 1px solid #333;
        color: $color-primary;
        background: #111111;
        background: -moz-linear-gradient(top,  #111111 0%, #171717 2%, #1a1a1a 4%, #212121 89%, #212121 96%, #1d1d1d 98%, #161616 100%);
        background: -webkit-linear-gradient(top,  #111111 0%,#171717 2%,#1a1a1a 4%,#212121 89%,#212121 96%,#1d1d1d 98%,#161616 100%);
        background: linear-gradient(to bottom,  #111111 0%,#171717 2%,#1a1a1a 4%,#212121 89%,#212121 96%,#1d1d1d 98%,#161616 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#111111', endColorstr='#161616',GradientType=0 );
      }
      td{
        color: #097c25;
        font-family: Arial,sans-serif;
        font-weight: bold;
        font-size: 20px;
      }
      .symbol{
        width: 55px;
        height: auto;
      }
    }
  }
}
@media only screen and (min-width: 1001px){
  .lineInfo{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    .list{
      width: 48%;
      margin: 1%;
    }
  }
}
</style>