import axios from 'axios'
// 有其他包依赖了http包，所以虽然没有主动去下载这里也可以拿到
import http from 'http'

const $http = axios
const baseURL = '/api'
const isServer = process.env.VUE_ENV === 'server'

if (isServer) {
  // TODO: http长连接？
}

const api = $http.create({
  baseURL,
  timeout: 2000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    // 'referer': isServer ? 'serverRequset' : document.referer referer不给带
  },
  responseType: 'json',
  httpAgent: new http.Agent({ keepAlive: true })
})

if (process.env.VUE_ENV === 'client') {
  // 请求拦截
  api.interceptors.request.use(config => {
    // 重定向应当发生在请求接口之前
    return config
  }, err => Promise.reject(err))
  // 响应拦截
  api.interceptors.response.use(config => config, err => Promise.reject(err))
} else {
  // server拦截重定向res.redirect
}

export default api
