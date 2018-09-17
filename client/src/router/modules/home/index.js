
export default [
  {
    path: '/',
    name: '',
    meta: {
      needAuth: true
    },
    component: () => import('@/view/home/index.vue')
  }
]
