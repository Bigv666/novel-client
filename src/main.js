import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import api from '@/api'
import './permission'
import '@/theme/element-variables.scss'
import 'element-ui/lib/theme-chalk/display.css'
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css'
import '@/assets/iconfonts/iconfont.css'
import Divider from '@/components/Divider.vue'
import Book from '@/components/Book.vue'
import Author from '@/components/Author.vue'
import UpdateTable from '@/components/UpdateTable.vue'
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' })
Vue.component('Divider', Divider)
Vue.component('Book', Book)
Vue.component('Author', Author)
Vue.component('UpdateTable', UpdateTable)
Vue.prototype.$domain = process.env.VUE_APP_API_URL
Vue.prototype.$api = api
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
