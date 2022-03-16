import type { LocaleType } from '/#/config';
import { useLocaleStoreWithOut } from '/@/store/modules/locale';
import { computed, unref } from 'vue';
import { i18n } from './setupI18n';
import { loadLocalePool, setHtmlPageLang } from './helper';

interface LangModule {
  message: Recordable;
  dateLocale: Recordable;
  dateLocaleName: string;
}

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut();

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }

  localeStore.setLocaleInfo({ locale }); //全局状态管理   以及  localeStorage 设置
  setHtmlPageLang(locale);
}

export function useLocale() {
  const localeStore = useLocaleStoreWithOut();

  const getLocale = computed(() => localeStore.getLocale);
  const getShowLocalePicker = computed(() => localeStore.getShowPicker);

  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale); //unref 识别是否是ref unref(val)?val.value:val
    if (currentLocale === locale) return locale;

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale);
      return locale;
    }
    const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule;
    const { message } = langModule;
    globalI18n.setLocaleMessage(locale, message); //动态修改语言包
    loadLocalePool.push(locale);

    setI18nLanguage(locale);
    return locale;
  }

  return {
    getLocale,
    getShowLocalePicker,
    changeLocale,
  };
}
