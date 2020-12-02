import cookieparser from 'cookieparser'
import Cookies from 'js-cookie'
export const state = () => ({
  counter: 0,
  userData: {},
  logined: false
})
export const userData = () => ({})
export const getters = {
  getUserData (state) {
    return state.userData
  }
}
export const mutations = {
  setUserData (state, payload) {
    state.logined = payload.logined
    state.userData = payload.userData
  }
}
export const actions = {
  async nuxtServerInit ({ dispatch }, { req }) {
    try {
      const cookie = cookieparser.parse(req.headers.cookie ? req.headers.cookie : '')
      if (cookie['user-token']) {
        await dispatch('fetchUserData', cookie['user-token'])
      }
    } catch (e) {
      console.log(e)
    }
  },
  async fetchUserData ({ commit }) {
    const token = Cookies.get('user-token')
    console.log(token)
    try {
      const { data } = await this.$axios.get('http://private-anon-08f825e2f2-interview10.apiary-mock.com/me', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      if (token) {
        commit('setUserData', { userData: data, logined: true })
      } else {
        commit('setUserData', { userData: data, logined: false })
      }
    } catch (e) {
      console.log(e)
    }
  }
}
