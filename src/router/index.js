import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/layout/Main.vue'
import Index from '@/views/Index/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index,
        meta: {
          title: '首页'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
