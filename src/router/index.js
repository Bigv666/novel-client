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
      },
      {
        path: '/male',
        name: 'male',
        component: () => import('@/views/Male/index.vue'),
        meta: {
          title: '男频'
        }
      },
      {
        path: '/female',
        name: 'female',
        component: () => import('@/views/Female/index.vue'),
        meta: {
          title: '女频'
        }
      },
      {
        path: '/stock',
        name: 'stock',
        component: () => import('@/views/Stock/index.vue'),
        meta: {
          title: '书库'
        }
      },
      {
        path: '/rank',
        name: 'rank',
        component: () => import('@/views/Rank/index.vue'),
        meta: {
          title: '排行榜'
        }
      },
      {
        path: '/book/:id',
        name: 'book',
        props: true,
        component: () => import('@/views/Book/index.vue'),
        meta: {
          title: '书籍详情'
        }
      },
      {
        path: '/author/:id',
        name: 'author',
        props: true,
        component: () => import('@/views/Author/index.vue'),
        meta: {
          title: '作者'
        }
      },
      {
        path: '/read',
        name: 'read',
        component: () => import('@/views/Read/index.vue'),
        meta: {
          title: '阅读'
        }
      }
    ]
  }
]
const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
  })

const router = createRouter()

export default router
