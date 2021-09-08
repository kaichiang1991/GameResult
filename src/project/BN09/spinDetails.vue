<template>
  <div id="spinDetails">
    <h2>{{ $t('GameScreen') }}</h2>
    <section>
      <screen-info :infos="renderData[pagination.currPage-1].infos">
        <template v-slot:screen>
          <screen :symbolResult="renderData[pagination.currPage-1].screens.symbol_result"></screen>
          <pagination :pagination.sync="pagination" @prevPage="prevPage" @nextPage="nextPage"></pagination>
        </template>
      </screen-info>
      <line-info :lines="renderData[pagination.currPage-1].lines" :screens="renderData[pagination.currPage-1].screens" ></line-info>
    </section>
  </div>
</template>

<script>
// import store from '@/store'
import slot from '@/mixin/slot'
import screen from '@/components/slot/screen'
import pagination from '@/components/pagination.vue'

export default {
  name: 'spinDetails',
  mixins: [slot], // Slot預設基本函式(客製化時可使用相同函式名稱覆蓋)
  components:{
    screen,
    pagination,
  },
  data(){
    return{
      pagination:{
        currPage: 1, // 當前頁數
        listTotal: 0, // 總頁數
      },
    }
  },
  methods: {
    prevPage() {
      this.pagination.currPage -=1
    },
    nextPage() {
      this.pagination.currPage +=1
    },
  },
  created(){
    this.pagination.listTotal = this.renderData.length
  }
}
</script>

<style lang="scss">
@import '@css/slotSpin.scss';
.screenInfo{
  .pagination{
    justify-content: center;
    margin-top: 10px;
    .el-button{
      border-radius: 100%;
    }
  }
}
</style>