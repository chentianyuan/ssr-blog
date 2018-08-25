import Vue from 'vue';
export default {
    setText(state, {text}){
        Vue.set(state, 'testText', text)
    },
    setMake(state, {text}){
        Vue.set(state, 'makeSSR', text)
    },
    setNews(state, {res}){
        state.dataList = []
        res.data.showapi_res_body.contentlist.forEach(val => {
            state.dataList.push({til:val.title, pngSrc:require('../static/avatar.png'), path:val.type, content:val.text})
        })
    }
}