import Vue from 'vue';
export default {
    setText(state,{text}){
        Vue.set(state,'testText',text)
    },
    setMake(state,{text}){
        Vue.set(state,'makeSSR',text)
    }
}