import { decodeBase64 } from './common'

/**
 * 設定基本初始值
 */
export function baseInfo() {
  let gameCode, gameLanguage, apiURL, contentView;

  const params = new URLSearchParams(document.location.search.substring(1));
  const server = params.get("s");

  if(!server){
    if(process.env.NODE_ENV === 'development'){
      // 本地開發
      apiURL = process.env.VUE_APP_BASE_API // 指定api路徑
      gameCode = window.location.pathname.split('/')[1].split('.html')[0] // 設定遊戲ID
      gameLanguage = 'zh-cn' // 預設語系
    }else{
      // 遊戲內開啟細單
      apiURL = parent.Entry.getDetail.betQuery // 從遊戲取得api路徑
      gameCode = parent.Entry.getDetail.gameCode
      gameLanguage = parent.Entry.getDetail.gameLanguage
    }
    contentView = 'List' // 預設顯示列表
  }else{
    // 外部平台開啟細單
    apiURL = `${location.protocol}//${decodeBase64(server)}`
    contentView = 'Detail' // 直接顯示細單內容
  }
  return { gameCode, gameLanguage, apiURL, contentView }
}
