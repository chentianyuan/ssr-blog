import commonAPI from '../setup'

export const getPostList = function () {
  return commonAPI.post('/post/list').then(res => {
    console.log(res, 'post.js')
    return res
  })
}