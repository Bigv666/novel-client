import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'
import router from '@/router'
// 创建一个axios
// 请求拦截
export const service = axios.create({
  timeout: 20 * 1000,
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true
})
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('client_token')
    console.log(token)
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)
// 响应拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data
    console.log(res)
    const code = res.code ? res.code : 200
    if (code !== 200) {
      if (res.code === 401) {
        // Message({
        //   message: res.message || '登录信息失效，请重新登录',
        //   type: 'error',
        //   duration: 5 * 1000
        // })
        // router.push('/login')
      } else if (res.code === 403) {
        Message({
          message: res.message || '用户权限不足',
          type: 'error',
          duration: 5 * 1000
        })
        router.push({
          path: '/login'
        })
      } else if (res.code === 500) {
        Message({
          message: res.message || 'error',
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        Message({
          message: res.message || 'error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return false
    }
    console.log(res)
    return res
  },
  (error) => {
    console.log(error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
const encodedParams = (params) => qs.stringify(params)

export const GET = (url, params = {}) => new Promise((resolve, reject) => {
  service
    .get(`${url}`, { params })
    .then((res) => {
      console.log(res)
      resolve(res.data)
    })
    .catch((err) => {
      reject(err.data)
    })
})

export const POST = (url, params = {}) => new Promise((resolve, reject) => {
  service
    .post(`${url}`, encodedParams(params))
    .then((res) => {
      if (res.code === 200) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
    .catch((err) => {
      reject(err)
    })
})
export const POST_RES = (url, params = {}) => new Promise((resolve, reject) => {
  service
    .post(`${url}`, encodedParams(params))
    .then((res) => {
      if (res.code === 200) {
        resolve(res.data)
      } else {
        resolve(false)
      }
    })
    .catch((err) => {
      reject(err)
    })
})
