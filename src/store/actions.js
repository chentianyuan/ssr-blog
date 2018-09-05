import { getLogin } from './module/login/api'

export default {
	fetchSSRNews ({ commit }) {
		return getLogin().then(res => {
			commit('setNews', { res })
		})
	}
}