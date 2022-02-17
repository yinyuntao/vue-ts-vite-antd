import type { AppRouteRecordRaw } from '/@/router/types';

import { PAGE_NOT_FOUND_NAME } from '/@/router/constant';
//404页面路由
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  // component:
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
    },
  ],
};
