export default [
  {
    path: '/',
    name: 'Home',
    meta: {
      needAuth: false,
      disableCache: true
    },
    component: () => import('@/views/homePage/index.vue')
  }
]
