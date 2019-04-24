// import { login, logout, getInfo } from '@/api/user'
import { resetRouter, adminRoutes } from '@/router'
import { signIn, getUserInfo, exit } from '@/api/userAction'
const state = {
  name: '',
  avatar: '',
  userInfo: {},
  roles: [],
}

const mutations = {
  SET_INFO: (state, info) => {
    state.userInfo = info
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      exit().then(() => {
        commit("SET_INFO", {})
        commit("SET_ROLES", [])
        // resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  signIn({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      signIn(userInfo).then(response => {
        // const { data } = response
        // commit('SET_INFO', data.user)
        // const roles = data.user.roleId.key
        // commit("SET_ROLES", roles)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state, dispatch, rootState }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        const { data } = response
        commit('SET_INFO', data.user)
        const roles = data.user.roleId.key
        commit("SET_ROLES", [roles])
        // dispatch('GenerateRoutes', { roles: state.roles }, { root: true })
        // router.addRoutes(rootState.permission.addRouters)
        resetRouter()
        resolve(data.user)
      }).catch(error => {
        reject({})
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

