import createApp from './index.js'

export default function (context) {
  return new Promise((resolve, reject) => {
    console.log('entry-server')
    const { app, router, store } = createApp(context)
    // 该方法把一个回调排队，在路由完成初始导航时调用，这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件。
    router.onReady(() => {
      let { url } = context
      // 返回目标位置或是当前路由匹配的组件数组（是数组的定义/构造类，不是实例）
      // 这里匹配了所有路由位置
      const matchedComponents = router.getMatchedComponents(router.match(url))
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // 服务端首屏对所有匹配的路由组件调用asyncData()
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          let data = Component.data ? Component.data.call(this) : {}
          return Component.asyncData({ store, route: router.currentRoute, context })
            .then(asyncData => {
              // 必须替换组件的_Ctor属性上的data才是真实的data，需要深入探索
              Component._Ctor[0].options.data = function () {
                return Object.assign({}, data, asyncData)
              }
              return asyncData
            })
        }
      })).then(asyncDataList => {
        // 此时的store才是真正需要注入的store，已经不是最初的store
        context.state = {}
        context.state.storeState = store.state
        context.state.dataState = asyncDataList
        resolve(app)
      }).catch(reject)
    }, reject) // 此处是onReady的reject

    // 传入当前执行上下文中的url
    router.push(context.url)
  })
  // context为服务端的执行上下文
  // entry-server在服务端执行，入口理应为一个函数
}
