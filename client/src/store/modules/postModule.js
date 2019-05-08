import { PATHS, request } from '@/api'

const leaveMessageModule = {
  name: 'post',
  state: {
    hotArticles: []
  },
  actions: {
    getHotPosts ({ commit }, headerParams) {
      return request.get(PATHS.article.getHotPosts, {
        ...headerParams
      }).then(res => {
        res && commit('HOTARTICLES', res.data)
      })
    }
  }
}

export default leaveMessageModule
