import commonApi from './common-api'

export const PATHS = {
  article: {
    getAllarticles: '/post/list',
    getOnearticle: '/post/onepost',
    getArticleByPagination: '/post/pagination',
    getArticleByPaginationWithTag: '/post/pagination/withtag'
  },
  tag: {
    getAlltags: '/tag/list'
  }
}

let commonFn = function (path, params = {}) {
  console.log(params)
  return commonApi[this.method](path, params).then(res => {
    let data = res.data
    console.log('源头', res)
    if (res.status === 200 && data && !data.hasError) {
      return data
    } else {
      throw JSON.stringify(data.msg || '接口异常')
    }
  }).catch(alert)
}

export const request = {
  get: commonFn.bind({ method: 'get' }),
  post: commonFn.bind({ method: 'post' })
}
