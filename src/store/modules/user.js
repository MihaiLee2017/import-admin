// import { login, logout, getInfo } from '@/api/user'
import { resetRouter } from '@/router'
import { signIn, getUserInfo, exit } from '@/api/userAction'
const state = {
  name: '',
  avatar: '',
  userInfo: {}
}

const mutations = {
  SET_INFO: (state, info) => {
    state.userInfo = info
  }
}

const actions = {
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      exit().then(() => {
        commit("SET_INFO", {})
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  signIn({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      signIn(userInfo).then(response => {
        const { data } = response
        commit('SET_INFO', data.user)
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        const { data } = response
        commit('SET_INFO', data.user)
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

