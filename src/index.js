import Vue from 'vue'
import App from './App'
import router from './router/routes'

new Vue({
    el:'#app',
    router,
    render: createElement => createElement(App),
    mounted(){
        console.log('加载成功')
    }
})