import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import {basicRoutes} from '/@/router/routes/index'

import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as RouteRecordRaw[],
  strict: true,
  scrollBehavior:() => ({ left:0, top: 0})//路由跳转滚动一直在头部
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}