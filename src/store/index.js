import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

import genros from './modules/genros'

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    playlist: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    }
  },
  plugins: [createLogger()],
  modules: {
    genros
  }
})
