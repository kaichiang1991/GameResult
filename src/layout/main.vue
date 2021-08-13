<template>
  <div id="main">
    <a id="close" @click.prevent="close()"><img src="~@img/close.png" alt=""></a>
    <keep-alive>
      <component :is="contentView" :rowData="rowData" @changeView="changeView"></component>
    </keep-alive>
    <div v-if="loading" id="loader"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import List from '@/layout/List'
import Detail from '@/layout/Detail'
// import store from '@/store'

export default {
  name: 'Main',
  components: {
    List,
    Detail
  },
  data(){
    return{
      rowData: {},
      currencyList: {
        1: 'CNY', // 人民幣
        2: 'VND', // 越南盾
        3: 'MYR', // 馬來西亞令吉
        4: 'THB', // 泰銖
        5: 'TWD', // 新台幣
        6: 'VNDK', // 越南盾(K)
        7: 'OTHER', //泰銖
        8: 'IDR', //印尼盾
        9: 'KRW', //韓元
      },
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      contentView: state => state.contentView,
    }),
  },
  methods: {
    changeView(obj){
      this.rowData = obj.data
      this.$store.commit('SET_CONTENT_VIEW', obj.view);
    },
    /** 關閉按鈕 */
    close(){
      if(this.contentView == 'List'){
        if(parent.EventHandler){
          parent.EventHandler.dispatch(parent.eEventName.closeWindow)
        }
      }else{
        this.$store.commit('SET_CONTENT_VIEW', 'List');
      }
    },
  },
  created(){
  }
}
</script>

<style lang="scss">
@import "~@css/base.scss";
</style>