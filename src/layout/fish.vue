<template>
  <div id="fish">
    Fish....
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FishGame',
  computed: {
    ...mapState({
      gameID: state => state.gameID,
      language: state => state.language,
    }),
  },
  methods: {
    close(){
      parent.EventHandler.dispatch(parent.eEventName.closeWindow)
    },
  },
  mounted(){
  },
  created(){
  }
}
</script>

<style lang="scss">
</style>