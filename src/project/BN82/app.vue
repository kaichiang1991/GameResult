<template>
  <Main></Main>
</template>

<script>
import { mapState } from 'vuex'
import Main from '@/layout/Main'

export default {
  name: 'BN82',
  components: {
    Main
  },
  data(){
    return{
      gameToken: 'e70bfd1b70c94cf4aed4df44161e6997', // 本地端開發token
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

