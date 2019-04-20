export default [
  {
    path: '/articlePage',
    name: 'articlePage',
    meta: {},
    component: () => import('@/views/articlePage/index.vue')
  },
  {
    path: '/article/:id',
    name: 'article',
    meta: {},
    component: () => import('@/views/article/index.vue')
  }
]
