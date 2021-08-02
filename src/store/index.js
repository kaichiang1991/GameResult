import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import getters from './getter'
import * as actions from './action'

Vue.use( Vuex );

// 設定基本初始值
let gameCode, gameLanguage;
const baseInfo = ()=>{
  if(!parent.Entry){
    gameCode = window.location.pathname.split('/')[1].split('.html')[0]
    gameLanguage = 'zh-cn'
  }else{
    gameCode = parent.Entry.getDetail.gameCode
    gameLanguage = parent.Entry.getDetail.gameLanguage
  }
}
baseInfo()

//state
export const state = {
  view: null,
  gameID: gameCode,
  language: gameLanguage,
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
});