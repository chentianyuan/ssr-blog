export default [
  {
    path: '/',
    name: 'Home',
    meta: {
      needAuth: false
    },
    component: () => import('@/views/homePage/index.vue')
  }
]
