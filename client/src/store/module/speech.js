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
      state.speechList = [ state.speechList, ...payload ]
    }
  },
  actions: {
    [GET_SPEECH_LIST]: ({ commit }, payload) => {
      return api.speech.getSpeechList().then(res => {
        // 获取到数据后触发mutation放入state
        // commit(SET_SPEECH_LIST, res.data)
        if (!res.hasError) {
          commit(SET_SPEECH_LIST, payload)
        } else {
          console.log(res, '~~~~~~~~')
        }
      })
      // console.log(api)
      // setTimeout(() => {
      //   commit(SET_SPEECH_LIST, [
      //     ...payload
      //   ])
      //   resolve()
      // }, 1000)
    }
  }
}
