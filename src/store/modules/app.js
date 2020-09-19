
const state = {
  loading: true
}

const mutations = {
  SET_LOADING: (state, loading) => {
    state.loading = loading
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
