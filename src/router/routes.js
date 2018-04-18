import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/Home.vue'
import hot from '../components/page/hot.vue'
import find from '../components/page/find.vue'
import article from '../components/page/article.vue'
// const home = () => import('../components/Home.vue')
// const hot = () => import('../components/page/hot.vue')
// const find = () => import('../components/page/find.vue')
// const article = () => import('../components/page/article.vue')
// 懒加载优化
// 异步组件做ssr时无法被获取，因为异步组件的原理是要等到前端路由过去之后才动态加载的

Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {
            // history模式下，只有根节点的path会被匹配到
            path:'/',
            component:home,
            children:[{
                path:'',
                component:hot,
                alias:'hotNews'
            },{
                path:'findNews',
                component:find
            }]
        },{
            name:'article',
            path:'/article/:articleId',
            component:article
        }
    ]
})