<template>
  <Main></Main>
</template>

<script>
import { mapState } from 'vuex'
import Main from '@/layout/Main'

export default {
  name: 'BN54',
  components: {
    Main
  },
  data(){
    return{
      gameToken: 'a1c28bf3a339409dabd69cc9adb4a5a4', // 本地端開發token
      multiple: 0.5 // 押注乘數基分
    }
  },
  computed: {
    ...mapState({
      openMode: state => state.openMode,
    }),
  },
  created(){
    /** 專案初始化設定 */
    if(this.openMode === 'game'){
      // 遊戲內部開啟細單
      this.$store.commit('APP_TOKEN', this.gameToken);
    }
    this.$store.commit('SET_MULTIPLE', this.multiple);
  }
}
</script>
<style lang="scss" scoped>
</style>

