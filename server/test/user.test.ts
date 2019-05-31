import * as assert from 'assert'
import axios from 'axios'

const baseURL = 'http://localhost:8088/api'
const commonAPI = axios.create({
  baseURL
})

describe('src/controller/UserController#getLoginInfo', () => {
  it('登录接口失败校验', async () => {
    let result = await commonAPI.post('/user/verify', {
      username: 'test',
      password: 'xxxx'
    })
    assert.equal(result.data.msg, '登录失败')
  })

  it('登录接口成功校验', async () => {
    let result = await commonAPI.post('/user/verify', {
      username: 'cookie',
      password: '971226'
    })
    assert.equal(result.data.msg, '登录成功')
  })

})

describe('src/controller/PostController#getPaginationPost', () => {
  it('获取分页的文章数量', async () => {
    let result = await commonAPI.post('/post/pagination', {
      pageSize: 3,
      pageIndex: 1
    })
    assert.equal(result.data.data.postList.length, 3)
  })
})