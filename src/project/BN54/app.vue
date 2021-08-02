<template>
  <Main></Main>
</template>

<i18n src="@lang/BN54.json"></i18n>
<script>
import { Main } from '@layout'

export default {
  name: 'BN54',
  components: {
    Main
  },
  data(){
    return{
      view: 'slot' // 設定專案模式
    }
  },
  created(){
    this.$store.commit('SET_VIEW', this.view);
  }
}
</script>
<style lang="scss" scoped>

</style>

