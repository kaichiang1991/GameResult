export const mutations = {
  /** 設定遊戲ID */
  SET_GAMEID: (state, id) => {
    state.gameID = id
  },
  /** 設定語系 */
  SET_LANGUAGE: (state, lang) => {
    state.language = lang
  },
  /** 設定顯示模式 */
  SET_CONTENT_VIEW: (state, view)=>{
    state.contentView = view
  },
  /** 顯示/隱藏Loading */
  SET_LOADING: (state, visible)=>{
    state.loading = visible
  },
  /** 設定API URL */
  SET_API_URL: (state, url)=>{
    state.apiURL = url
  },
  /** 設定Token */
  APP_TOKEN: (state, token)=>{
    state.gameToken = token
  },
  /** 設定押注乘數基分 */
  SET_MULTIPLE: (state, multiple)=>{
    state.multiple = multiple
  },
}
