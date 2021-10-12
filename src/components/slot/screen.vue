<template>
  <div class="screen">
    <ul v-for="(row,idx_r) in symbolResult" :key="`row_${idx_r}`">
      <li v-for="(symbol,idx_s) in row" :key="`symbol_${idx_s}`">
        <template v-if="symbol !== 91">
          <img class="symbol" :src="require(`@img/${gameID}/${symbol}.png`)" alt="">
        </template>
        <template v-else>
          <img class="symbol" :src="require(`@img/${gameID}/21.png`)" alt="">
          <img class="symbol cover" :src="require(`@img/${gameID}/31.png`)" alt="">
        </template>
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
  >ul{
    &:first-child{
      li{
        border-left: 1px solid #999;
      }
    }
    li{
      position: relative;
      border-right: 1px solid #999;
      border-bottom: 1px solid #999;
      background: #fff;
      &:first-child{
        border-top: 1px solid #999;
      }
    }
  }
  .symbol{
    width: 70px;
    height: auto;
    display: block;
  }
  .cover{
    position: absolute;
    width: auto;
    height: 50%;
    right: 0;
    bottom: 0;
    -webkit-filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.4));
    filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.4));
  }
}
</style>