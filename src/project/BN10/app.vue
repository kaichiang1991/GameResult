<template>
  <Main></Main>
</template>

<script>
import Main from '@/layout/Main'

export default {
  name: 'BN10',
  components: {
    Main
  },
  data(){
    return{
      gameToken: 'c83e1c510fec45da869b4380d83ddcff',
      gameMode: 'Slot', // 細單模式：老虎機(Slot), 魚機(Fish)....
    }
  },
  methods:{
  },
  created(){
    /** 專案初始化設定 */
    const { gameToken, gameMode } = this
    this.$store.commit('APP_INIT', { gameToken, gameMode });
  }
}
</script>
<style lang="scss" scoped>
</style>

