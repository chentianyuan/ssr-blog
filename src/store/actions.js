import { fetchText,fetchSSR } from './api'

export default {
    fetchTextAction({commit}){
        console.log(fetchText)
        return fetchText().then(text=>{
            commit('setText',{text})
        })
    },
    fetchSSRAction({commit}){
        return fetchSSR().then(text=>{
            commit('setMake',{text})
        })
    }
}