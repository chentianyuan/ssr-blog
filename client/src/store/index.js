import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const { Store } = Vuex

export default function createStore () {
  return new Store({
    modules: {},
    // 对于模块内部的mutation和getter
    // 接收的第一个参数是模块的局部状态state对象
    // 第二个参数是模块的store对象
    // 第三个参数是根节点状态state对象
    // 若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。
    // 若需要在带命名空间的模块注册全局 action，你可添加 root: true，并将这个 action 的定义放在函数 handler 中
    state: {}
  })
}
