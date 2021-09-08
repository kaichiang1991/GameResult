<template>
  <div class="pagination">
    <el-button icon="el-icon-arrow-left" class="gary" :disabled="pagination.currPage == 1" @click="$emit('prevPage')"></el-button>
    <select @change="$emit('changePage')" v-model="pagination.currPage">
      <option v-for="(item,index) in pagination.listTotal" :value="index+1" :key="index">{{ index+1 }}</option>
    </select>
    <span class="total">{{ pagination.listTotal }}</span>
    <el-button icon="el-icon-arrow-right" class="gary" :disabled="pagination.currPage == pagination.listTotal" @click="$emit('nextPage')"></el-button>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props:{
    pagination:{},
  },
}
</script>

<style lang="scss">
.pagination{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
  height: 45px;
  padding: 0 .5em;
  font-size: 15px;
  .el-button{
    line-height: normal;
    padding: 0;
    width: 25px;
    height: 25px;
    margin: 0 .5em;
    &.is-disabled{
      opacity: .5;
    }
  }
  select{
    min-width: 3em;
    height: 25px;
    border: none;
    border-radius: 4px;
    margin: 0 .5em;
    text-align: center;
    &:focus{ 
      outline: none;
    }
  }
  .total{
    display: inline-block;
    font-weight: bold;
    &::before{
      content: '/';
      margin: 0 .5em 0 .25em;
      vertical-align: top;
    }
  }
}
</style>