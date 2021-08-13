<template>
  <Main></Main>
</template>

<script>
import Main from '@/layout/Main'

export default {
  name: 'BN65',
  components: {
    Main
  },
  data(){
    return{
      gameMode: 'fish' // 設定專案模式
    }
  },
  created(){
    this.$store.commit('SET_GAMEMODE', this.gameMode);
  }
}
</script>
<style lang="scss" scoped>

</style>

