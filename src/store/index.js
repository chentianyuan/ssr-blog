import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
// import getters from './getters'

Vue.use(Vuex)
export default function createStore(){
    return new Vuex.Store({
        state: {
            testText:'啊楼哈',
            makeSSR:'yes'
        },
        // getters,
        mutations,
        actions
    })
}