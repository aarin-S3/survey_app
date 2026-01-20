import { RouteRecordRaw } from 'vue-router'
import admin from './admin'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/pages/auth/login_page/login.vue'),
    name: 'loginPage'
  },
  // {
  //   path: '/landingpage',
  //   component: () => import('src/pages/landingpage/Index.vue'),
  //   name: 'landingPage'
  // },
  admin,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/error_not_found.vue')
  }
]

export default routes
