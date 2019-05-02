import { PATHS, request } from '@/api'

const leaveMessageModule = {
  name: 'leaveMessage',
  state: {
    messageItems: []
  },
  actions: {
    getLeaveMessageList ({ commit, state }, headerParams) {
      return request.get(PATHS.comment.getLeaveMessageList, {
        context: headerParams.context
      }).then(res => {
        console.log(state.messageItems.concat(res.data))
        commit('MESSAGEITEMS', state.messageItems.concat(res.data))
      })
    }
  }
}

export default leaveMessageModule
