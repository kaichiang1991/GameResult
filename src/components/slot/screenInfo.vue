<template>
  <div class="screenInfo" :data-collapse="!open">
    <div class="wrap">
      <ul class="info">
        <li>{{ $t(infos.state) }}：＃{{ infos.times }}</li>
        <li>{{ $t('BetLevel') }}：{{ infos.bet }}</li>
        <li>{{ $t('Payout') }}：{{ infos.win }}</li>
        <li>{{ $t('TotalWinLines') }}：{{ infos.totalWinLines }}</li>
      </ul>
    </div>
    <!-- "slot" 標籤內表示可由外部客製化該區塊 -->
    <div class="wrap">
      <slot name="screen">
        <screen :symbolResult="screens.symbol_result"></screen>
      </slot>
    </div>
    <a v-if="infos.totalWinLines > 0" :class="[{ 'el-icon-minus':open },'collapse el-icon-plus']" @click.stop="collapse"></a>
  </div>
</template>

<i18n src="@/lang/detail.json"></i18n>
<script>
import screen from '@/components/slot/screen'

export default {
  name: 'ScreenInfo',
  components:{
    screen
  },
  props: {
    infos: {},
    screens: {
      screen_org: {},       // 原始盤面
      screen_output: {},    // 盤面輸出資訊
      symbol_result: {}     // 結果盤面
    },
  },
  data(){
    return{
      open: true
    }
  },
  methods: {
    collapse(){
      this.open = !this.open
    },
  },
  mounted(){
  },
  created(){
  }
}
</script>

<style lang="scss">
.screenInfo{
  position: relative;
  padding: 10px 70px 10px 10px;
  @include bg-gradient-dark;
	display: flex;
	flex-direction: row-reverse;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
  .collapse{
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: block;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: 0px 3px 13.5px 1.5px rgba(0, 0, 0, 0.8);
    border-radius: 3px;
    cursor: pointer;
    color: #000;
    font-weight: bold;
    @include bg-gradient-primary;
  }
  .wrap{
    flex: 1;
    padding: 20px 10px;
  }
  .info{
    margin: 0 5%;
    line-height: 2em;
    font-weight: bold;
    font-size: initial;
  }
  &[data-collapse]+.lineInfo{
    display: none !important;
  }
}
</style>