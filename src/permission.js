import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

// permissiom judge function
function hasPermission(roles, permissionRoles) {
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  let userInfo = store.getters.userInfo
  if (!userInfo.username) {
    await store.dispatch('user/getInfo').then(res => {
      userInfo = res
    }).catch(err => {
      userInfo = {}
    })
    // console.log("userInfo:", userInfo, store.getters.roles)
    const roles = store.getters.roles
    if (roles.length > 0) {
      await store.dispatch('GenerateRoutes', { roles }).then(() => {
        // 根据roles权限生成可访问的路由表
        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      })

      console.log("router:", store.getters.addRouters, store.getters.permission_routers)
    }
  }
  // 有用户信息
  if (userInfo.username) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // if () {
      // let roles = store.getters.roles
      // await store.dispatch('GenerateRoutes', { roles }).then(() => {
      //   // 根据roles权限生成可访问的路由表
      //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      //   next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      // })
      // } else {
      if (hasPermission(store.getters.roles, to.meta.roles)) {
        next()
      } else {
        next({
          path: '/401',
          replace: true,
          query: { noGoBack: true }
        })
      }
      // }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
