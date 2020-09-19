import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import api from '@/api'
import '@/theme/element-variables.scss'
import 'element-ui/lib/theme-chalk/display.css'
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css'
import '@/assets/iconfonts/iconfont.css'
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' })
Vue.prototype.$domain = process.env.VUE_APP_API_URL
Vue.prototype.$api = api
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
