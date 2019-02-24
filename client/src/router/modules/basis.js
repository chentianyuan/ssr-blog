export default [
  {
    path: '/',
    name: 'Home',
    meta: {
      needAuth: false
    },
    component: () => import('@/views/home/index.vue')
  }
]
