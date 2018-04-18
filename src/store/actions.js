import { fetchText,fetchSSR,fetchNews } from './api'

export default {
    fetchTextAction({commit}){
        return fetchText().then(text=>{
            commit('setText',{text})
        })
    },
    fetchSSRAction({commit}){
        return fetchSSR().then(text=>{
            commit('setMake',{text})
        })
    },
    fetchSSRNews({commit}){
        return fetchNews().then(res=>{
            commit('setNews',{res})
        })
    }
}