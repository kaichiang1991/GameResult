<template>
  <Main></Main>
</template>

<script>
import { mapState } from 'vuex'
import Main from '@/layout/Main'

export default {
  name: 'BN09',
  components: {
    Main
  },
  data(){
    return{
      gameToken: 'd4a3f18a58bd4da695cfb5a3277f40ee', // 本地端開發token
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

