const { getThemeVariables } = require('ant-design-vue/dist/theme');
import { resolve } from 'path';

export function generateModifyVars(dark = false) {
  const modifyVars = getThemeVariables({ dark });

  return {
    ...modifyVars,
    hack: `${modifyVars.hack} @import (reference) "${resolve('src/style/index.less')}";`,
  };
}
