import { PATHS, request } from '@/api'

const leaveMessageModule = {
  name: 'leaveMessage',
  state: {
    messageItems: []
  },
  actions: {
    getLeaveMessageList ({ commit }, headerParams) {
      return request.get(PATHS.comment.getLeaveMessageList, {
        context: headerParams.context
      }).then(res => {
        res && commit('MESSAGEITEMS', res.data.reverse())
      })
    }
  }
}

export default leaveMessageModule
