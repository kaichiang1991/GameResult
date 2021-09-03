import { decodeBase64 } from './common'

/** 設定基本初始值 */
export function baseInfo() {
  let gameCode, gameLanguage, apiURL, contentView, gameToken, openMode;

  const params = new URLSearchParams(document.location.search.substring(1));
  const server = params.get("s"); // 若URL帶s參數（api server）則表示由外部平台開啟細單

  if(!server){
    if(process.env.NODE_ENV === 'development'){
      // 本地開發
      apiURL = process.env.VUE_APP_BASE_API // 指定api路徑
      gameCode = window.location.pathname.split('/')[1].split('.html')[0] // 設定遊戲ID
      gameLanguage = 'zh-cn' // 預設語系
      gameToken = null
    }else{
      // 遊戲內開啟細單
      apiURL = parent.Entry.getDetail.betQuery // 從遊戲取得api路徑
      gameCode = parent.Entry.getDetail.gameCode
      gameLanguage = parent.Entry.getDetail.gameLanguage
      gameToken = parent.Entry.getDetail.gameToken
    }
    contentView = 'List' // 預設顯示列表
    openMode = 'game'
  }else{
    // 外部平台開啟細單
    apiURL = `https://${decodeBase64(server)}` // 從外部平台開啟的URL取得api server
    contentView = 'Detail' // 直接顯示細單內容
    gameLanguage = params.get('language')
    gameToken = params.get("token")
    openMode = 'platform'
  }
  return { gameCode, gameLanguage, apiURL, contentView, gameToken, openMode }
}
