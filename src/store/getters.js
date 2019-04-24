const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userInfo: state => state.user.userInfo,
  roles: state => state.user.roles,
  permission: state => state.user.permission,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  roleList: state => state.user.roleList
}
export default getters
