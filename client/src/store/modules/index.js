// 模块通用组装函数
// 负责state Getter和Mutations的自动生成

import global from './globalModule'
import leaveMessage from './leaveMessageModule'
import postModules from './postModule'

let allTheModule = new Set([
  { global },
  { leaveMessage },
  { postModules }
])

// 组装
export default [...allTheModule].reduce((previous, current, currentIndex, arr) => {
  let name = Object.getOwnPropertyNames(current)[0]
  let Module = current[name]
  !Module.getters && (Module.getters = {})
  !Module.mutations && (Module.mutations = {})
  for (let key of Object.keys(Module.state)) {
    Module.getters['get' + key] = state => state[key]
    Module.mutations[key.toLocaleUpperCase()] = (state, newVal) => (state[key] = newVal)
  }
  return Object.assign(previous, current)
}, Object.create(null))
