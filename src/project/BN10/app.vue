<template>
  <Main></Main>
</template>

<script>
import { mapState } from 'vuex'
import Main from '@/layout/Main'

export default {
  name: 'BN10',
  components: {
    Main
  },
  data(){
    return{
      gameToken: '60816a9a6ff0430aa0af959c5bb35adf', // 本地端開發token
    }
  },
  computed: {
    ...mapState({
      openMode: state => state.openMode,
    }),
  },
  created(){
    /** 專案初始化設定(開發環境) */
    if(this.openMode === 'game'){
      this.$store.commit('APP_TOKEN', this.gameToken);
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

