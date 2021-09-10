<template>
  <div id="spinDetails">
    <h2>{{ $t('GameScreen') }}</h2>
    <section v-for="(list,idx) in renderData" :key="idx">
      <screen-info :infos="list.infos" :screens="list.screens">
        <template v-slot:screen>
          <screen :symbolResult="list.screens.symbol_result"></screen>
        </template>
      </screen-info>
      <line-info :lines="list.lines" :screens="list.screens" ></line-info>
    </section>
  </div>
</template>

<script>
// import store from '@/store'
import slot from '@/mixin/slot'
import screen from './screen.vue'

export default {
  name: 'spinDetails',
  mixins: [slot], // Slot預設基本函式(客製化時可使用相同函式名稱覆蓋)
  components:{
    screen,
  },
  methods: {
    
  },
  created(){
  }
}
</script>

<style lang="scss">
@import '@css/slotSpin.scss';
</style>