<template>
  <div id="detail">
    Detail....
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Detail',
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