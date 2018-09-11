import Vue from 'vue'
import Router from 'vue-router'
import routerModules from './modules'
// 懒加载优化
// 异步组件做ssr时无法被获取，因为异步组件的原理是要等到前端路由过去之后才动态加载的

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...routerModules
  ]
})
