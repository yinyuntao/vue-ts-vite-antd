import { createApp } from 'vue';
import App from './App.vue';

//全局引入组件样式样式
//antd 3.0版本按需引入组件需要使用vite 可以使用 unPlugin-vue-components  按需加载,但是无法处理非组件模块
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';

import { setupStore } from '/@/store/index';
import { setupRouter } from '/@/router/index';

function initConfig() {
  const app = createApp(App);
  app.use(Antd);

  setupStore(app); //全局配置状态管理

  setupRouter(app); //初始化路由

  app.mount('#app');
}

initConfig();
