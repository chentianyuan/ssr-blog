import api from '@/api'

const GET_YIYAN_TXT = 'GET_YIYAN_TXT'
const SET_YIYAN_TXT = 'SET_YIYAN_TXT'

export const name = 'user'

export default {
  // 为了使模块具有更高的封装度和复用性
  // 添加 namespaced: true 的方式使其成为带命名空间的模块
  // 否则每个模块依然属于全局命名空间下的模块，多个模块可以对同一个mutation或action作出相应
  namespaced: true,
  state: {
    yiyan: '天天向上'
  },
  getters: {
    yiyan: state => state.yiyan
  },
  mutations: {
    [SET_YIYAN_TXT]: (state, payload) => {
      state.yiyan = payload
    }
  },
  actions: {
    // action被分发时第一个得到的参数是vuex的context上下文，其上包含了
    [GET_YIYAN_TXT]: ({ dispatch, commit, getters, rootGetters }, params) => {
      return api.user.getYiYan(params.context, {}).then(res => {
        if (!res.hasError) {
          commit(SET_YIYAN_TXT, res.data)
        } else {
          // 可以做错误处理处罚全局的mutation，从而触发弹窗
          console.log(res)
        }
      })
    }
  }
}
