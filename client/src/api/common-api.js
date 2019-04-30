import axios from 'axios'
// 有其他包依赖了http包，所以虽然没有主动去下载这里也可以拿到
import http from 'http'
import config from '~/config'

const $http = axios
const isServer = process.env.VUE_ENV === 'server'
let options = {
  baseURL: isServer ? `${config.RESTfulprefix}/api` : '/api',
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    // 'referer': isServer ? 'serverRequset' : document.referer referer不给带
  },
  responseType: 'json',
  httpAgent: new http.Agent({ keepAlive: true })
}

// TODO: http长连接？

// __VUE_SSR_CONTEXT__是服务端渲染时自动注入的，其上挂载了context对象
// 主动将鉴权的cookie放入请求头，注意插入格式
// 也可以用透传的方式传至api中
// 这种方式需要改善，当runInNewContext设置为false时，每个用户共用同一个global上下文，会共用同一个cookie
// options.headers['Cookie'] = '_blogSid_=' + global.__VUE_SSR_CONTEXT__.req.cookies._blogSid_ || ''

const commonAPI = $http.create(options)

// 请求拦截
commonAPI.interceptors.request.use(config => {
  if (isServer && !config.context) {
    throw new Error('服务端请求必须传入context参数，用于鉴权')
  }

  // 服务端请求options预设
  if (isServer) {
    config.headers['Cookie'] = '_blogSid_=' + config.context.cookies._blogSid_ || ''
  }
  // 重定向应当发生在请求接口之前
  return config
}, err => Promise.reject(err))

// 响应拦截
commonAPI.interceptors.response.use(config => {
  return config
}, err => Promise.reject(err))

export default commonAPI
