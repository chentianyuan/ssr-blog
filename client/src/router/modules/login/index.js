
export default [
  {
    path: '/user/login',
    name: 'login',
    meta: {
      needAuth: false
    },
    component: () => import('@/view/login/index.vue')
  }
]
