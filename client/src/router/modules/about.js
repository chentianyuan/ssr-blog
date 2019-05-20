export default [
  {
    path: '/aboutPage',
    name: 'aboutPage',
    meta: {
      needAuth: false
    },
    component: () => import('@/views/aboutPage/index.vue')
  },
  {
    path: '/firendsPage',
    name: 'firendsPage',
    alias: '/firends',
    meta: {
      needAuth: false
    },
    // 固定chunkName，但是这种容易命名冲突，难以维护
    // webpack.nameChunkPlugin 固定moduleId之后，根据chunk所依赖的moduleId数组来固定chunkIdname
    component: () => import(/* webpackChunkName: "friend" */'@/views/friends/index.vue')
  }
]
