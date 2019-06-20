import createApp from './index.js'

const { app, store, router } = createApp()

if (window.__INITIAL_STATE__) {
  console.log('执行替换', window.__INITIAL_STATE__)
  // 将store替换为context.initialState
  store.replaceState(window.__INITIAL_STATE__.storeState)
}

router.onReady(() => {
  if (window.__INITIAL_STATE__.dataState) {
    const url = location.pathname
    const Components = router.getMatchedComponents(router.match(url))
    Components.map((Component, index) => {
      let data = Component.data ? Component.data.call(this) : {}
      Component._Ctor[0].options.data = function () {
        return Object.assign({}, data, window.__INITIAL_STATE__.dataState[index])
      }
    })
  }

  // 路由已经resolve
  // 组件跳转
  router.beforeResolve((to, from, next) => {
    // 返回目标位置或是当前路由匹配的组件数组,会匹配同个路由下的多个组件
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      // 若根路由被匹配，则diffed为true，所有组件asyncData重新执行
      // 若根路由相等，则继续向下搜寻，直到找到不同的路由组件重新开始获取
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      // 匹配的路由是相同的页面不再执行asyncData
      return next()
    }
    Promise.all(activated.map(Component => {
      // if (Component.asyncData) {
      //   return Component.asyncData({ store, route: to })
      // }
      if (Component.asyncData) {
        let data = Component.data ? Component.data.call(this) : {}
        return Component.asyncData({ store, route: router.currentRoute })
          .then(asyncData => {
            Component.data = function () {
              return Object.assign({}, data, asyncData)
            }
          })
      }
    })).then(() => {
      // 停止加载指示器
      next()
    }).catch(next)
  })
})

// 挂载
app.$mount('#app')
window.gvm = app
