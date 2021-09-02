<template>
  <div class="screen">
    <ul v-for="(row,idx_r) in symbolResult" :key="`row_${idx_r}`">
      <li v-for="(symbol,idx_s) in row" :key="`symbol_${idx_s}`">
        <img class="symbol" :src="require(`@img/${gameID}/${symbol}.png`)" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'screen',
  props:{
    symbolResult: {}
  },
  data(){
    return{
    }
  },
  computed: {
    ...mapState({
      gameID: state => state.gameID,
    }),
  },
  methods: {
  },
  mounted(){
  },
  created(){
  }
}
</script>

<style lang="scss">
.screen{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  .symbol{
    width: 70px;
    height: auto;
    display: block;
    border: 1px solid #999;
  }
}
</style>