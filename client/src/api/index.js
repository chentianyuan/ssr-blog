import commonApi from './common-api'

export const PATHS = {
  article: {
    getAllarticles: '/post/list'
  }
}

let commonFn = function (path, params = {}) {
  return commonApi[this.method](path, params).then(res => {
    let data = res.data
    if (res.status === 200 && data && !data.hasError) {
      return data
    } else {
      throw JSON.stringify(new Error(data ? data : '接口异常'))
    }
  }).catch(alert)
}

export const request = {
  get: commonFn.bind({ method: 'get' }),
  post: commonFn.bind({ method: 'post' })
}
