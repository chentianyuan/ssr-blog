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
  },
  comment: {
    insertLeaveMessage: '/comment/insertComment',
    getLeaveMessageList: '/comment/getleaveComment'
  }
}

/**
 * 公有请求方法
 * @param {*} path url地址
 * @param {*} params 请求参数
 */
let commonFn = function (path, params = {}, headerParams = {}) {
  // axios.get {url, {headers, params, context}}
  // axios.post {url, {params}, {headers}}
  return commonApi[this.method](path, params, headerParams).then(res => {
    let data = res.data
    if (res.status === 200 && data && !data.hasError) {
      return data
    } else {
      throw JSON.stringify(data.msg || '接口异常')
    }
  }).catch(Log)
}

// TODO: 扩展打点方便错误排查
function Log (params) {
  console.log(params)
}

export const request = {
  get: commonFn.bind({ method: 'get' }),
  post: commonFn.bind({ method: 'post' })
}
