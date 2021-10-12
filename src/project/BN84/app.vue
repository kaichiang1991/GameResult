<template>
  <Main></Main>
</template>

<script>
import { mapState } from 'vuex'
import Main from '@/layout/Main'

export default {
  name: 'BN84',
  components: {
    Main
  },
  data(){
    return{
      gameToken: '1607f4ef46c54368be59c6d3752d7481', // 本地端開發token
    }
  },
  computed: {
    ...mapState({
      openMode: state => state.openMode,
    }),
  },
  created(){
    /** 專案初始化設定 */
    if(this.openMode === 'game' && process.env.NODE_ENV === 'development'){
      this.$store.commit('APP_TOKEN', this.gameToken);
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

