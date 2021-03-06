import request from '@/utils/request'

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function signIn(data) {
  return request({
    url: '/api/users/signIn',
    method: 'post',
    data
  })
}

export function importUser(data) {
  return request({
    url: '/api/users/importUser',
    method: 'post',
    data
  })
}

export function exit() {
  return request({
    url: '/api/users/exit',
    method: 'get'
  })
}

export function getUserInfo() {
  return request({
    url: '/api/users/getUser',
    method: 'get'
  })
}

export function getUserList(data) {
  return request({
    url: '/api/users/getUserList',
    method: 'post',
    data
  })
}
export function delUser(data) {
  return request({
    url: '/api/users/delUser',
    method: 'post',
    data
  })
}
