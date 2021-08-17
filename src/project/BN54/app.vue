<template>
  <Main></Main>
</template>

<i18n src="@/lang/BN54.json"></i18n>
<script>
import Main from '@/layout/Main'

export default {
  name: 'BN54',
  components: {
    Main
  },
  data(){
    return{
      gameToken: '',
      gameMode: 'Slot', // 細單模式：老虎機(Slot), 魚機(Fish)....
    }
  },
  methods:{
  },
  created(){
    /** 專案初始化設定 */
    this.$store.commit('SET_GAMETOKEN', this.gameToken);
    this.$store.commit('SET_GAMEMODE', this.gameMode);
  }
}
</script>
<style lang="scss" scoped>

</style>

