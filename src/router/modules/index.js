import loginRoute from './login'
import homeRoute from './home/index'
import Login from '@/view/login/index.vue'
export default [
  ...loginRoute,
  ...homeRoute,
  {
    path: '/login',
    name: 'login',
    meta: {},
    component: Login
  }
]