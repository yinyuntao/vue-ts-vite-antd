import type { App } from 'vue'
//pinia 与Vue-X相同的全局状态管理
import { createPinia } from 'pinia'

const store = createPinia()

export function setupStore(app: App<Element>) {
  app.use(store)
}

export {store}