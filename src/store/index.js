import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    user: {
      username: '',
      realName: '',
      password: '',
      phone: '',
      email: '',
      portrait: '',
      introduction: '远赴人间惊鸿宴，一睹佳人盛世',
      uid: 1,
      role: 1
    },
    // 用户令
    token: '',
    // 用户当前所在路由
    activePath: '/userinfo',
    // 外部连接数据
    url: ''
  },
  mutations: {
    // 登录用户信息
    loginUser(state, info) {
      state.user = info.user
      state.token = info.token
      try {
        localStorage.token = info.token
        sessionStorage.role = state.user.role
      } catch (e) { }
    },
    // 更改用户密码
    updatePwd(state, info) {
      state.user = info.user
      state.token = info.token
      try {
        localStorage.token = info.token
      } catch (e) { }
    },
    // 更改用户信息
    updateInfo(state, user) {
      if (state.user.registrationTime) {
        delete state.user.registrationTime
      }
      for (const item in user) {
        if (item === 'token') {
          state.token = user[item]
          continue
        }
        state.user[item] = user[item]
      }
    },
    updateActivePath(state, path) {
      state.activePath = path
    },
    updateUrl(state, url) {
      state.url = url
    }
  }
})
