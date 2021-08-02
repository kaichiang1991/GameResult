<template>
  <div id="main">
    <a id="close" @click.prevent="close()"><img src="~@img/close.png" alt=""></a>
    <Content></Content>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'Main',
  components: {
    Content: async() => import('@layout/'+ store.getters.view +'.vue')
  },
  data(){
    return{
      
    }
  },
  methods: {
    close(fun){
      fun()
    },
  },
}
</script>

<style lang="scss">
@import "~@css/base.scss";
</style>