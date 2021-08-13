<template>
  <div id="detail">
    detail....{{ gameMode }}....{{ rowData }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Detail',
  props:{
    rowData:{}
  },
  computed: {
    ...mapState({
      gameID: state => state.gameID,
      language: state => state.language,
      gameMode: state => state.gameMode,
    }),
  },
  methods: {

  },
  mounted(){
  },
  created(){
    // console.log('rowData-->', this.rowData)
  }
}
</script>

<style lang="scss">
</style>