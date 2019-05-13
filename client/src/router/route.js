import Vue from 'vue'
import Router from 'vue-router'
import routerModules from './modules'
// 懒加载优化

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      ...routerModules,
      {
        path: '*',
        name: 'Not-Found',
        meta: {
          needAuth: false
        },
        component: () => import('@/components/404.vue')
      }
    ]
  })
}
