<template>
  <Main></Main>
</template>

<script>
import { mapState } from 'vuex'
import Main from '@/layout/Main'

export default {
  name: 'BN80',
  components: {
    Main
  },
  data(){
    return{
      gameToken: '79fcfdb73cf54c81966e8a895db3d8e6', // 本地端開發token
      multiple: 0.5 // 押注乘數基本分
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
      // 遊戲內部開啟細單
      this.$store.commit('APP_TOKEN', this.gameToken);
    }
    this.$store.commit('SET_MULTIPLE', this.multiple);
  }
}
</script>
<style lang="scss" scoped>
</style>

