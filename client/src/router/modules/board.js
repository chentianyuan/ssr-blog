export default [
  {
    path: '/leaveBoard',
    name: 'leaveBoard',
    meta: {
      needAuth: false
    },
    component: () => import('@/views/messageBoard/index.vue')
  }
]
