import Vue from 'vue'
import App from './App'
import createStore from './store/index'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import customPlugin from './plugins/index'
import { createRouter } from './router/route'

Vue.use(element)

export default function createApp (context) {
  // 为了避免单例模式，每次服务端渲染都创建一个新的实例
  const store = createStore()
  const router = createRouter(context)

  Vue.use(customPlugin, { router })

  const app = new Vue({
    data () {
      return {
        timer: null
      }
    },
    router,
    store,
    render: h => h(App),
    mounted () {
      this.$nextTick(() => {
        this.remSet()
        window.onresize = () => {
          if (!this.timer) {
            this.timer = setTimeout(() => {
              this.remSet()
              this.timer = null
            }, 220)
          }
        }
      })
    },
    methods: {
      remSet () {
        document.getElementsByTagName('html')[0].style.fontSize = 100 * window.innerWidth / 375 + 'px'
      }
    }
  })
  return { app, store, router }
}
