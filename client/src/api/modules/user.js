import api from '../setup'

// 用户登录
export const getLogin = query => {
  return api.post('/auth/admin', {
    ...query
  }).then(res => {
    let { data } = res
    return data
  })
}

// 一言api
export const getYiYan = (context, query) => {
  return api.post('/yiyan', { ...query }, {
    context
  }).then(res => {
    let { data } = res
    return data
  })
}
