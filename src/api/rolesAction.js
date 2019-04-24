import request from '@/utils/request'

export function getRoleList() {
  return request({
    url: '/api/role/getRoleList',
    method: 'get',
  })
}

export function addRole(data) {
  return request({
    url: '/api/role/addRole',
    method: 'post',
    data
  })
}

export function editRole(data) {
  return request({
    url: '/api/role/editRole',
    method: 'post',
    data
  })
}

export function delRole(data) {
  return request({
    url: '/api/role/delRole',
    method: 'post',
    data
  })
}
