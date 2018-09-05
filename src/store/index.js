import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
// import getters from './getters'

Vue.use(Vuex)
const { store } = Vuex
export default function createStore () {
	return new store({
		state: {
			userInfo: {}
		},
		// getters,
		mutations,
		actions
	})
}