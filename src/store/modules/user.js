import user from '@/api/user'
// import config from '@/config';

const state = {
  userInfo: null,
  avatar: '',
  nickname: '',
  money: null,
  isLogin: false,
  $domain: process.env.VUE_APP_API_URL,
  test: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, data) => {
    state.userInfo = data
  },
  SET_LOGINSTATUS: (state, data) => {
    state.isLogin = data
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_MONEY: (state, money) => {
    state.money = money
  },
  SET_TEST: (state, d) => {
    console.log(state.test.includes(d))
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      user
        .login({
          account,
          password
        })
        .then((res) => {
          if (res) {
            commit('SET_TOKEN', res.token)
            localStorage.setItem('client_token', res.token)
            resolve(true)
          } else {
            resolve(false)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  // user login
  loginByPhone ({ commit }, userInfo) {
    const { phone, code } = userInfo
    return new Promise((resolve, reject) => {
      user
        .LoginByPhone(phone, code)
        .then((res) => {
          if (res.code === 200) {
            commit('SET_TOKEN', res.token)
            resolve(true)
          } else {
            resolve(false)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  // register
  register ({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      user
        .register({ account, password })
        .then((res) => {
          if (res) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  // getUserInfo
  getUserInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      user
        .getCurrentUser()
        .then((res) => {
          console.log(res)
          if (res) {
            console.log('登录成功')
            commit('SET_NICKNAME', res.nickname)
            commit('SET_AVATAR', res.avatar)
            commit('SET_LOGINSTATUS', true)
            commit('SET_MONEY', res.money)
            // commit('SET_MONTH_TICKET', data.monthTicket);
            // commit('SET_RECOMMEND_TICKET', data.recommendTicket);
            resolve(true)
          } else {
            resolve(false)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  // logout
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      user
        .logout()
        .then((res) => {
          if (res) {
            commit('SET_USERINFO', null)
            commit('SET_LOGINSTATUS', false)
            commit('SET_AVATAR', '')
            commit('SET_MONEY', null)
            commit('SET_MONTH_TICKET', null)
            commit('SET_RECOMMEND_TICKET', null)
            localStorage.removeItem('client_token')
            resolve(true)
          } else {
            resolve(false)
          }
        })
        .catch((err) => {
          reject(err)
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
