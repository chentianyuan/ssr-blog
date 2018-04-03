import Vue from 'vue'
import App from './App'
import router from './router/routes'
import axios from 'axios'

Vue.prototype.$http = axios

new Vue({
    el:'#app',
    data(){
        return{
            timer:null
        }
    },
    router,
    render: createElement => createElement(App),
    mounted(){
        this.$nextTick(()=>{
            this.remSet()
            window.onresize = () => {
                if(!this.timer){
                    this.timer = setTimeout(() => {
                        this.remSet()
                        this.timer = null
                    }, 220);
                }
            }
        })
    },
    methods:{
        remSet(){
            document.getElementsByTagName('html')[0].style.fontSize = 100 * window.innerWidth / 375 + 'px';
        }
    }
})
