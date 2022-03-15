import { getMessage } from '../helper';

import antdLocale from 'ant-design-vue/es/locale/zh_CN';

const modules = import.meta.globEager('./zh-CN/**/*.ts');

export default {
  message: {
    ...getMessage(modules, 'zh-CN'),
    antdLocale,
  },
};
