import createApp from './index.js'

const { app, store, router } = createApp()

if (window.__INITIAL_STATE__) {
  console.log('执行替换', window.__INITIAL_STATE__)
  // 将store替换为context.initialState
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  // 路由已经resolve
  // 组件跳转
  console.log('onReady每次服务端渲染完成后执行一次')
  router.beforeResolve((to, from, next) => {
    console.log('beforeResolve页面跳转时执行')
    // 返回目标位置或是当前路由匹配的组件数组,会匹配同个路由下的多个组件
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    // 此时渲染的肯定不是首屏的路由了,如果有些组件已经渲染且数据预取过
    let diffed = false
    const activated = matched.filter((c, i) => {
      // 返回未被匹配的组件
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      // 匹配的路由是相同的页面不再执行asyncData
      return next()
    }
    Promise.all(activated.map(component => {
      if (component.asyncData) {
        return component.asyncData({ store, route: to })
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
