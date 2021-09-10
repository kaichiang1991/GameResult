<template>
  <div class="screen">
    <ul v-for="(row,idx_r) in symbolResult" :key="`row_${idx_r}`">
      <li v-for="(symbol,idx_s) in row" :key="`symbol_${idx_s}`">
        <img class="symbol" :src="require(`@img/${gameID}/${symbol}.png`)" alt="">
        <img v-if="symbol==21" class="symbol cover" :src="require(`@img/${gameID}/21-cover.png`)" alt="">
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
  li{
    position: relative;
    background: #fff;
  }
  .symbol{
    width: 70px;
    height: auto;
    display: block;
    border: 1px solid #999;
  }
  .cover{
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-top: -2px;
    border: none;
    background: transparent;
  }
}
</style>