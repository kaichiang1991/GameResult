import request from './index'

export function getList(data) {
  return request({
    url: '/slot/betsummarys',
    method: 'post',
    data,
  })
}