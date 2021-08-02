<template>
  <div id="slot">
    <keep-alive>
      <component :is="comp"></component>
    </keep-alive>
  </div>
</template>

<script>
import { List, Detail } from '@components'
// import { mapState } from 'vuex'

export default {
  name: 'SlottGame',
  components: {
    List,
    Detail
  },
  data(){
    return{
      comp: 'Detail' // List, Detail
    }
  },
  computed: {
    // ...mapState({
    //   gameID: state => state.gameID,
    //   language: state => state.language,
    // }),
  },
  methods: {
    close(){
      // parent.EventHandler.dispatch(parent.eEventName.closeWindow)
    },
    change(goto){
      this.comp = goto
    }
  },
  mounted(){
  },
  created(){
  }
}
</script>

<style lang="scss">
</style>