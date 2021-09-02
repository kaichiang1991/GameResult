import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import getters from './getter'
import * as actions from './action'
import { baseInfo } from '@/utils/baseInfo'

Vue.use( Vuex );

const { gameCode, gameLanguage, apiURL, contentView } = baseInfo(); // 取得基本初始值

export const state = {
  gameID: gameCode,
  gameToken: null,
  language: gameLanguage,
  loading: false,
  apiURL: apiURL,
  gameMode: 'Slot', // 細單模式：slot(預設)、fish...
  contentView: contentView, // 顯示模式：列表(List)、詳細頁(Detail)
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
});