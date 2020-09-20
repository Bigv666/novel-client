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
      },
      {
        path: '/user',
        name: 'user',
        redirect: '/user/index',
        component: () => import('@/views/User/index.vue'),
        meta: {
          title: '个人中心'
        },
        children: [
          {
            path: '/user/index',
            name: 'user',
            component: () => import('@/views/User/children/index.vue')
          },
          {
            path: '/user/stack',
            name: 'userStack',
            component: () => import('@/views/User/children/stack.vue')
          },
          {
            path: '/user/history',
            name: 'userHistory',
            component: () => import('@/views/User/children/history.vue')
          },
          {
            path: '/user/comment',
            name: 'userComment',
            component: () => import('@/views/User/children/comment.vue')
          },
          {
            path: '/user/message',
            name: 'userMessage',
            component: () => import('@/views/User/children/message.vue')
          },
          {
            path: '/user/password',
            name: 'userPassword',
            component: () => import('@/views/User/children/password.vue')
          }
        ]
      },
      {
        path: '/recharge',
        name: 'recharge',
        component: () => import('@/views/Recharge/index.vue'),
        meta: {
          title: '充值'
        }
      },
      {
        path: '/consume',
        name: 'consume',
        component: () => import('@/views/Consume/index.vue'),
        meta: {
          title: '消费'
        }
      },
      {
        path: '/search/:keywords?',
        name: 'search',
        component: () => import('@/views/Search/index.vue'),
        meta: {
          title: '搜索'
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
