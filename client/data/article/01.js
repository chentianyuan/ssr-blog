/* eslint-disable comma-dangle, no-unused-vars */
const md = `
# prerender
###  原始项目
在没有ajax之前，我们访问所有的网站，每个页面都是独立的，数据只能通过与html同步返回的方式来加载，所以每次跳转，其实都新请求了一个新的html文件，造成跳转等待时间长，资源浪费等等问题。
### SPA
ajax的出现，可以让web应用在不刷新的状态下显示不同页面的内容，路由跳转时，页面并不刷新，而是更具访问的url来匹配对应的路由脚本，并且发送ajax请求获取跳转到的页面的所需数据，然后再动态渲染到页面上。spa优化了用户体验，且复用的代码减轻了开发者的压力，但是与此同时带来了许多问题，如SEO不友好(因为一个单页应用往往只有一个html文件，爬虫爬到这个文件之后并不会向后爬取，不利于被搜索引擎收录)，首屏加载时间长(入口体积大，加载时间长)。于是诞生了SSR和预渲染。
### 区别
1. 客户端渲染：用户访问 url，请求 html 文件，前端根据路由动态渲染页面内容。关键链路较长，有一定的白屏时间；
2. 服务端渲染：用户访问 url，服务端根据访问路径请求所需数据，拼接成 html 字符串，返回给前端。前端接收到 html 时已有部分内容；
3. 预渲染：构建阶段生成匹配预渲染路径的 html 文件（注意：每个需要预渲染的路由都有一个对应的 html）。构建出来的 html 文件已有部分内容。
非预渲染需要加载到1，2，3，4，用户才能看到页面
![image.png](https://upload-images.jianshu.io/upload_images/6870041-062131dc9db62c3b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
使用预渲染后，只需加载index.html和app.css即可看到页面的部分形式。
### 实践
未使用预渲染前![预渲染前(无ajax请求).png](https://upload-images.jianshu.io/upload_images/6870041-a0af0e4021b34e5e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
现在的大部分spa页面的都是采用虚拟dom由js构建完毕后再渲染，一旦节点及层级过多，渲染时间会更长，而若还使用了诸如mint-ui，element-ui等ui库，还需要等待第三方库的加载完成，造成渲染时间++。
预渲染开启后
![预渲染后(无ajax).png](https://upload-images.jianshu.io/upload_images/6870041-c34999735606af1f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
首页渲染时间缩减至110ms，直接返回html浏览器开始渲染。bundle是后来做了路由懒加载所以分包了，对静态的首页渲染没有影响，因为是先渲染再加载bundle.js的。
### 其他
预渲染构建生成的html每个都是单页应用，不影响跳转不重新加载页面的特性。并且在这些吐出的html中，可以任意添加元信息，利于SEO。
### 缺憾
1. 在需要请求动态数据的页面中，~~预渲染只能保证静态部分不更改~~，且在请求动态数据之前，展示旧的预渲染好的html页面，请求过程中，展示静态不变的页面内容，基本没有白屏时间。二图的197ms和407ms是有topNav的，但是尽管这样，对用户的体验也不太好。
**这里有个天坑  被代理过后的请求的动态数据无法被预渲染，我换了一个无需代理的请求，生成的html中就有动态请求的数据了。翻了下prerender的源码，它还依赖@prerenderer/renderer-puppeteer，模拟无头浏览器请求了一次数据，这次模拟请求的端口不是热更新的端口，没有走代理，需，无法请求dev-Server代理过后的接口，，如果要被代理，需要本地配置nginx，再做一层代理，若不做，这次请求模拟的是未代理前的路径，返回的为空，所以之前没有预渲染动态的数据。**
2. 大大增加了构建时间，在需要使用热更新时，开发者必须等待重新构建，增加了开发成本。
![预渲染前(有ajax请求).png](https://upload-images.jianshu.io/upload_images/6870041-a20e65ee63d00be4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![预渲染后(有ajax).png](https://upload-images.jianshu.io/upload_images/6870041-383a91fe40af8022.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 最佳实践
预渲染的最佳时间莫过于预渲染骨架屏了。静态的骨架屏预渲染后保存在本地，基本永久使用，只要骨架屏返回并渲染了，用户是看不到白屏的(诸如以上只有topNav的那种)，而骨架屏作为布局简单，样式普通的一个小组件，构建后返回的html在浏览器渲染当然速度也是极快的，用户体验++
### 总结
prerender-spa-plugin升级到了3.x版本，2.x很多语法有修改，详情见其npm包。
下方第一个链接讲解比较详细，但是使用的是2.0版本，json包中很多依赖也都被deprecated了，你可以尝试新的(例子)[https://github.com/chentianyuan/prerender]
### 参考链接
[优化向：单页应用多路由预渲染指南](https://juejin.im/post/59d49d976fb9a00a571d651d)
[Vue.js教程: 构建一个预渲染SEO友好的应用示例 [译]](https://jeneser.github.io/blog/2017/08/07/vue-seo-demo/)
[Prerender SPA Plugin](https://www.npmjs.com/package/prerender-spa-plugin)
`

export default md