<template>
  <div id="main">
    <a id="close" @click.prevent="close()"><img src="~@img/close.png" alt=""></a>
    <keep-alive include="List">
      <component :is="contentView" :infoData="infoData" :rowData="rowData" @changeView="changeView"></component>
    </keep-alive>
    <div v-if="loading" id="loader"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import List from '@/layout/List'
import Detail from '@/layout/Detail'


export default {
  name: 'Main',
  components: {
    List,
    Detail
  },
  data(){
    return{
      infoData: null,
      rowData: null,
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      contentView: state => state.contentView,
    }),
  },
  methods: {
    /** 設定顯示模式 */
    changeView(obj){
      this.infoData = obj.info
      this.rowData = obj.row
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