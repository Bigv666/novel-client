import list from '@/api/list'
// import config from '/api';
const generateOptions = (data, disableType = '-1', isDiabled = false) => {
  const result = []
  data.map((item) => {
    const obj = {
      label: item.title,
      value: item.title
    }
    console.log(disableType)
    if (item.title === disableType || isDiabled) {
      obj.disabled = true
    }
    if (item.children && item.children.length) {
      obj.children = generateOptions(item.children, disableType, obj.disabled)
    }
    result.push(obj)
  })
  return result
}
const state = {
  kindOptions: null
}

const mutations = {
  SET_KIND_OPTIONS: (state, data) => {
    state.kindOptions = data
  }
}

const actions = {
  getDirectionList: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      list
        .getDictionaryList(param)
        .then((res) => {
          if (res.list) {
            const result = generateOptions(res.list)
            commit('SET_KIND_OPTIONS', result)
            resolve(true)
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
