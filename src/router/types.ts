import type { RouteRecordRaw, RouteMeta } from 'vue-router';

import { defineComponent } from 'vue';
type Recordable<T = any> = Record<string, T>;
export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: any[]; //不知道如何定义
  props?: Recordable;
  fullPath?: string;
}
