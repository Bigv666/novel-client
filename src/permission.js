import router from './router'
import store from './store'

router.beforeEach(async (to, from, next) => {
  store.commit('app/SET_LOADING', true)
  setTimeout(() => {
    next()
  }, 500)
})
router.afterEach(() => {
  store.commit('app/SET_LOADING', false)
})
