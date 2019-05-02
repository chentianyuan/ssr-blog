import Vue from 'vue'
import App from './App'
import createStore from './store/index'
import customPlugin from './plugins/index'
import { createRouter } from './router/route'
import Cookies from 'js-cookie'
import mixins from './mixins'

const isServer = process.env.VUE_ENV === 'server'

export default function createApp (context) {
  // 为了避免单例模式，每次服务端渲染都创建一个新的实例
  const store = createStore()
  const router = createRouter(context)

  Vue.use(customPlugin, { router })

  Vue.mixin(mixins)
  // 设置路由前置钩子
  router.beforeEach((to, from, next) => {
    if (isServer) {
      next()
      // TODO: 服务端执行时重定向
    } else {
      let url = '/user/login'
      if (to.path === url) {
        next()
        return
      }
      if (to.meta.needAuth && !Cookies.get('_blogSid_')) {
        let target = encodeURIComponent(to.fullPath)
        router.push({ path: `${url}?target=${target}` })
      } else {
        next()
      }
    }
  })

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
