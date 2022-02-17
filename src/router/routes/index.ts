import type { AppRouteRecordRaw } from '/@/router/types'
import {PageEnum} from '/@/enums/pageEnum'

//登录路由
export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/login/index.vue'),
  meta: {
    title:'login'
  }
}

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect:PageEnum.BASE_HOME,
  meta: {
    title:'Root'
  }
}

export const basicRoutes = [
  LoginRoute,
  RootRoute
]