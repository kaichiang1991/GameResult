<template>
  <div class="screenInfo" :data-collapse="!open">
    <!-- "slot" 標籤內表示可由外部客製化該區塊 -->
    <div class="wrap">
      <slot name="info">
        <ul class="info">
          <li class="gametype">{{ $t(infos.state) }}<span v-if="infos.type > 0">：＃{{ infos.times }}</span></li>
          <li v-if="infos.type == 0">{{ $t('BetLevel') }}：{{ infos.betMultiple }}</li>
          <li>{{ $t('Payout') }}：{{ infos.win }}</li>
          <li>{{ $t('TotalWinLines') }}：{{ infos.totalWinLines }}</li>
        </ul>
      </slot>
    </div>
    <div class="wrap">
      <slot name="screen">
        <screen :symbolResult="screens.symbol_result"></screen>
      </slot>
    </div>
    <a v-if="infos.totalWinLines > 0" :class="[{ 'el-icon-minus':open },'el-icon-plus collapse']" @click.stop="collapse"></a>
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
  @include bg-gradient-dark;
  .collapse{
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: block;
    position: absolute;
    right: 20px;
    box-shadow: 0px 3px 13.5px 1.5px rgba(0, 0, 0, 0.8);
    border-radius: 3px;
    cursor: pointer;
    color: #000;
    font-weight: bold;
    font-size: 20px;
    @include bg-gradient-primary;
  }
  .info{
    line-height: 2em;
    font-weight: bold;
    font-size: initial;
    .gametype{
      color: $color-primary;
      font-size: $fz-primary;
    }
  }
  &[data-collapse]+.lineInfo{
    display: none !important;
  }
}
@media only screen and (min-width: 1001px){
  .screenInfo{
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    padding: 10px 70px 10px 10px;
    .collapse{
      top: 50%;
      transform: translateY(-50%);
    }
    .wrap{
      flex: 1;
      padding: 20px 10px;
    }
    .info{
      margin: 0 5%;
    }
  }
}
@media only screen and (max-width: 1000px){
  .screenInfo{
    padding: 10px;
    .collapse{
      top: 20px;
    }
    .wrap{
      padding: 10px 0;
    }
  }
}
@media only screen and (max-width: 420px){
  .screenInfo{
    .collapse{
      top: 20px;
      right: 10px;
    }
    .info{
      .gametype{
        font-size: $fz-min;
      }
      li{
        font-size: $fz-tiny;
      }
    }
  }
}
</style>