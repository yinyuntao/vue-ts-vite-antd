import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path'); //需要下载依赖 @types/node、path
const { getThemeVariables } = require('ant-design-vue/dist/theme');
import { generateModifyVars } from './src/style/generateModifyVars';

function pathResolve(dir: string) {
  return path.resolve(__dirname, dir); //__dirname 与 process.cwd()的区别
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      },
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/',
      },
    ],
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: generateModifyVars(), //引用全局变量  可以定义变量覆盖
        javascriptEnabled: true,
      },
    },
  },
});
