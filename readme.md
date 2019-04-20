### 预渲染升级成服务端渲染
回顾预渲染 是基于 `prerender-spa-plugin` 在项目构建时，通过无头浏览器模拟浏览器请求，将得到的数据插入给出的模板中，从而生成已经包含数据的html（**这里其实有个天坑，最初尝试预渲染时为了方便，使用webpack-dev-server的proxy选项做了一次代理请求三方接口，然后预渲染并没有渲染出这些动态的数据。原因是因为预渲染的无头浏览器并不会走dev-server的代理，必须在客户端再配一层nginx代理，才能将请求转发，从而拿到动态数据插入模板**）。
### SSR升级相比预渲染得到了什么
1. 更快的构建速度，SSR是动态插入数据，并不会在构建时就去预加载数据，而是输入url后在服务端请求，拿到返回的数据插入模板后再返回给客户端。
2. 嵌套路由下的个性化页面加载速度，个性化页面无法进行预渲染，ssr却可以解决。
3. 更好的SEO。
4. 更快的首屏加载速度。( 请求业务数据，和将数据转为html片段都在服务端进行了，浏览器负责加载资源，请求CDN资源，css渲染。到达时间缩短。之后走的依旧是前端路由，然后前端预取数据，所以这里仅仅首屏 )。

### 官方流程图
![ssr流程](https://upload-images.jianshu.io/upload_images/6870041-e473305275cf3b25.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 官方demo
[HackerNews Demo](https://github.com/vuejs/vue-hackernews-2.0/)
### 升级要做哪些处理
##### 一，使用SSR，后端掌握权应在自己手里，具体如何实现热更新，是后面的事。server.js做了什么。
**服务端数据必须与客户端数据保持一致，引入Vuex**
1. express生成一个服务器实例。
2. 客户端使用打包好的index.html，因为之后还是要走前端路由，这个由`html-webpack-plugin`生成好的注入了前端打包好的脚本的html需要作为renderer的模板。
3. 服务端entry-server.js打包好的入口传入createBundleRenderer，这里产出的是首屏html的主体部分。
4. 通过2，3`vue-server-renderer`会将它们拼合成一个整体，再传至前端。
##### 二，打包
**打包分为客户端文件的打包和服务端文件的打包。将公用的部分分离到`webpack.base.config.js`。合并可以通过webpack-merge或者简单地通过Object.assign组合两种config。**
1. 客户端打包文件与正常SPA的打包文件没有什么区别，入口为entry-client.js。
2. 服务端打包文件注意指定执行环境为node，打包使用commonjs规范，因为之后要在服务端跑的呀，入口为entry-server.js。
3. `webpack.base.config`也没什么，默认entry为entry-client.js。webpack4以上记得指定打包模式。
##### 三，入口`entry-server.js&&entry-client.js`
1. 服务端入口通过app.vue导出的createApp生成一个新的实例。
2. 传入执行上下文中的url，以此匹配对应的所有组件，循环执行所有匹配到组件中的asyncData()即所需获取的异步数据。获取的数据存储在store.state中。
3. 执行完毕后，将store.state注入context（之后客户端入口可以通过window.__INITIAL_STATE__）获取到这个已经全部获取过的store.state，以此保持服务端与客户端数据的一致性。**此处若出错会导致混合失败，服务端数据被覆盖。浏览器用客户端的数据重新渲染**
4. 客户端入口通过app.vue导出的createApp生成一个新的实例。
5. 将window.__INITIAL_STATE__注入store。
6. 之后走前端路由，asyncData()中预取的操作在服务端已不再执行，所以此时前端预取。通过`router.beforeResolve((to, from, next)=>{})`匹配路由并预取数据。（注意，在同一嵌套路由下的组件的数据不要再重新获取了，diff实现）。
7. 预取完毕后，将该实例挂载到根组件。
##### 四，前端入口文件src/index.js
从以上也可以看出，index.js必须作为一个工厂函数，导出一个生成vue实例的函数，并且包含store，router这些在入口中使用到的实例。
##### 五，热更新做了什么？
**setup-dev-server.js导出一个接收express实例和处理index.html和server-bundle.js的函数。**
1. 开发模式下，依赖`webpack-dev-middleware`执行代码监听并热更新打包，依赖`webpack-hot-middleware`执行页面热更新。
2. 导出内存中的打包好的index.html和server-bundle.js。***在server.js入口，通过vue-server-renderer整合模板和服务端入口。***
### 官方文档，很多地方值得深究和细细推究，写了个小demo便于学习吧。
> 如果你依赖由组件生命周期钩子函数填充的上下文数据，则不建议使用流式传输模式。
##### 直接renderToString [带注释demo](https://github.com/chentianyuan/prerender)
