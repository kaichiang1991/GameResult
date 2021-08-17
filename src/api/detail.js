import request from './index'

export function game_detail(data) {
  return request({
    url: '/slot/betdetail',
    method: 'post',
    data,
  })
}

export function platform_detail(data) {
  return request({
    url: '/slot/betdetail_token',
    method: 'post',
    data,
  })
}

