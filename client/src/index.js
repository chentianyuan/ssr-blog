import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import createStore from './store/index'
import customPlugin from './plugins/index'
import { createRouter } from './router/route'
import Cookies from 'js-cookie'
import mixins from './mixins'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

import swimData from '~/data/swim.json'

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
        document.addEventListener('click', this.learnStrongCountry, false)
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
      },
      learnStrongCountry (e) {
        let timer = null
        let locX = e.clientX + 'px'
        let locY = e.clientY + 'px'
        let span = document.createElement('span')
        span.setAttribute('class', 'swim-text')
        for (let [key, val] of Object.entries(this.initialStyle(locX, locY))) {
          span.style[key] = val
        }
        span.innerText = swimData.list[0]
        swimData.list.push(swimData.list.splice(0, 1))
        document.body.appendChild(span)
        timer = setTimeout(() => {
          document.body.removeChild(span)
          clearTimeout(timer)
          timer = null
        }, 2000)
      },
      initialStyle (left, top) {
        return {
          position: 'absolute',
          zIndex: '999',
          color: 'red',
          fontSize: '20px',
          fontWeight: 'bold',
          left,
          top
        }
      }
    }
  })

  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: 'https://ef5cec38578442bc9ed4bebac9fc2112@sentry.io/1245962',
      integrations: [
        new Integrations.Vue({
          Vue,
          attachProps: true
        })
      ]
    })
  }

  return { app, store, router }
}
