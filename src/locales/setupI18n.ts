import type { App } from 'vue';

import type { I18n, I18nOptions } from 'vue-i18n';
import { createI18n } from 'vue-i18n';
import { setHtmlPageLang, setLoadLocalePool } from './helper';
import { localeSetting } from '/@/settings/localeSetting';
import { useLocaleStoreWithOut } from '/@/store/modules/locale';

const { fallback, availableLocales } = localeSetting;

export let i18n: ReturnType<typeof createI18n>;

async function createI18nOptions(): Promise<I18nOptions> {
  const localeStore = useLocaleStoreWithOut();
  const locale = localeStore.getLocale; //获取当前的中英文
  const defaultLocal = await import(`./lang/${locale}.ts`); //动态导入
  const message = defaultLocal.default?.message ?? {};

  setHtmlPageLang(locale); //设置html页面属性为中文或者英文

  setLoadLocalePool((loadLocalePool) => {
    //设置
    loadLocalePool.push(locale);
  });

  return {
    legacy: false, //Composition API
    locale, //当前语言环境
    fallbackLocale: fallback, //默认的语言环境
    messages: {
      [locale]: message,
    },
    availableLocales: availableLocales, //以词法顺序排列的 messages 中的可用语言环境列表。
    sync: true,
    silentFallbackWarn: true,
    missingWarn: false,
    silentTranslationWarn: true,
  };
}

export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  console.error(options);
  i18n = createI18n(options) as I18n;

  app.use(i18n);
}
