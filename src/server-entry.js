import Vue from 'vue'
import App from './App.vue'
import createStore from './store'
import createApp from './index'

export default function (context){
    return new Promise((resolve,reject)=>{
        const { app, router, store } = createApp()
        // 传入当前执行上下文中的url
        router.push(context.url)
        console.log(context.url)
        // 该方法把一个回调排队，在路由完成初始导航时调用，这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件。
        router.onReady(()=>{
            // 返回目标位置或是当前路由匹配的组件数组（是数组的定义/构造类，不是实例）
            // 这里匹配了所有路由位置
            const matchedComponents = router.getMatchedComponents()
            if(!matchedComponents.length){
                return reject({code:404})
            }

            // 对所有匹配的路由组建调用asyncData()
            Promise.all(matchedComponents.map((Component)=>{
                if(Component.asyncData){
                    return Component.asyncData({store,route:router.currentRoute})
                }
            })).then(()=>{
                // 此时的store才是真正需要注入的store，已经不是最初的store
                context.state = store.state
                resolve(app)
            }).catch(reject)
        },reject) // 此处是onReady的reject
    })
    // context为服务端的执行上下文
    // entry-server在服务端执行，入口理应为一个函数
    
}