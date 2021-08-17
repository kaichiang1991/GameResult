import axios from 'axios'
import moment from 'moment'
import { Decimal } from 'decimal.js'

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

/**
 * 錢轉分數的匯率 (單位 1/100)
 * @param {int} num
 */
export function exchangeDenom(num) {
  return Number(Decimal.mul(num || 0, 0.01))
}

/**
 * 幣種名稱
 * @param {string} currency
 */
export function currencyName(currency) {
  const currencyList = {
    1: 'CNY', // 人民幣
    2: 'VND', // 越南盾
    3: 'MYR', // 馬來西亞令吉
    4: 'THB', // 泰銖
    5: 'TWD', // 新台幣
    6: 'VNDK', // 越南盾(K)
    7: 'OTHER', //泰銖
    8: 'IDR', //印尼盾
    9: 'KRW', //韓元
  }

  return currencyList[currency]
}

/**
 * 轉換時間格式(Timestamp To UTC)
 * @param {number} time
 */
export function timeFormat(time) {
  return moment((time)*1000).utcOffset(-240).format()
}

/**
 * 取得遊戲名稱
 * @param {string} gameID
 */
export function getGameName(gameID, lang) {
  const url = process.env.NODE_ENV === 'development' ? process.env.VUE_APP_GAME_LIST : `${window.location.origin}${process.env.VUE_APP_GAME_LIST}`
  return axios.get(url).then(({ data }) => {
    const obj = data.GameNames.find(item => item.ID == Number(gameID.split('BN')[1])).Names
    const name = obj.find(item=> item.lang == lang).Name
    return name
  }).catch(error => {
    console.log(error)
  })
}