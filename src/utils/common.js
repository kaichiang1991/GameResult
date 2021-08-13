import moment from 'moment'

/**
 * base-64解碼
 * @param {string} encodeStr
 */
export function decodeBase64(encodeStr) {
  let val = window.atob(decodeURIComponent(encodeStr))
  return val;
}


/**
 * 時間格式化
 * @param {string} ary
 * * @param {string} multiple
 */
export function dateFormat(ary, multiple) {
  const data = ary
  data.map(v=>{
    v.bet_time = moment((v.bet_time)*1000).utcOffset(-240).format()
    v.bet = v.bet / multiple
    v.win = v.win / multiple
  })
  return data
}