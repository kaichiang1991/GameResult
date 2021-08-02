<template>
  <div id="list">
    List....
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'List',
  computed: {
    ...mapState({
      gameID: state => state.gameID,
      language: state => state.language,
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
</style>