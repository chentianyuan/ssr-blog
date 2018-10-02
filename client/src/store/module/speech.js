import api from '../../api'
const GET_SPEECH_LIST = 'GET_SPEECH_LIST'
const SET_SPEECH_LIST = 'SET_SPEECH_LIST'

export const name = 'speech'

export default {
  namespaced: true,
  state: {
    // 言论总列表
    speechList: []
  },
  getters: {
    speechList: state => state.speechList
  },
  mutations: {
    [SET_SPEECH_LIST]: (state, payload) => {
      state.speechList = [ ...state.speechList, ...payload ]
    }
  },
  actions: {
    // actions被触发时只能接受两个参数，一个是全局的$store对象，一个是入参，此处入参携带context对象
    [GET_SPEECH_LIST]: ({ commit }, params) => {
      return api.speech.getSpeechList(params.context, {}).then(res => {
        console.log(res)
        // 获取到数据后触发mutation放入state
        if (!res.hasError) {
          commit(SET_SPEECH_LIST, res.data)
        } else {
          console.log(res, '~~~~~~~~')
        }
      })
    }
  }
}
