import { _ } from '../src/util/get-param'
import assert from 'assert'

describe('src/util#_', () => {
  // 一个it就是一个测试用例
  it('模拟loadsh_.get函数获取对象属性', () => {
    const result = _.get({
      people: {
        name: 'zw'
      }
    }, 'people.name', 'xxx')
    assert.equal(result, 'zw')
  })
  it('模拟loadsh_.get函数获取默认值', () => {
    const result = _.get({
      people: {
        name: 'zw'
      }
    }, 'people.age', 23)
    assert.equal(result, 23)
  })
})


