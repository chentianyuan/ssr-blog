export default [
  {
    path: '/aboutPage',
    name: 'aboutPage',
    meta: {
      needAuth: false
    },
    component: () => import('@/views/aboutPage/index.vue')
  }
]
