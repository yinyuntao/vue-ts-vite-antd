import { getMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/en_US';

//在vite不能使用require.content自动导入文件 使用import.meta.globEager导入
const modules = import.meta.globEager('./en/**/*.ts');

export default {
  message: {
    ...getMessage(modules, 'en'),
    antdLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en',
};
