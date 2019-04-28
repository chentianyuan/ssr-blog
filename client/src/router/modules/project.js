export default [
  {
    path: '/projectPage',
    name: 'projectPage',
    meta: {
      needAuth: false
    },
    component: () => import('@/views/projectPage/index.vue')
  }
]
