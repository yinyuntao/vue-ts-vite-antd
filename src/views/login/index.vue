<template>
  <div :class="prefixCls" class="w-screen h-screen overflow-y-hidden">
    <div class="flex justify-end p-10">
      <Language
        :dropMenuList="localList"
        @handleMenuEvent="handleMenuEvent"
        :selectedKeys="selectedKeys"
      />
    </div>

    <div :class="`${prefixCls}-container`" class="h-screen flex">
      <div :class="`${prefixCls}-container-left`" class="w-1/2 flex-col flex relative">
        <div :class="`${prefixCls}-app-logo`" class="flex item-center absolute">
          <img src="../../assets/images/logo.png" alt="" srcset="" />
          <span class="text-white font-bold">Vite Admin</span>
        </div>
        <div :class="`${prefixCls}-app-content`">
          <img class="w-1/2" src="../../assets/svg/login-box-bg.svg" alt="" srcset="" />
          <p class="content text-white font-bold">{{ t('sys.login.signInTitle') }}</p>
          <p class="detail text-white text-sm">{{ t('sys.login.signInDesc') }}</p>
        </div>
      </div>
      <div :class="`${prefixCls}-container-right`" class="w-1/2">
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '/@/style/var/class';
  import LoginForm from './loginForm.vue';
  import Language from './language.vue';
  // import { useLocaleStore } from '/@/store/modules/locale';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { localList } from '/@/settings/localeSetting';
  import { unref, ref } from 'vue';
  import { useLocale } from '/@/locales/useLocale';
  import { LocaleType } from '/#/config';

  const props = defineProps({
    reload: { type: Boolean },
  });
  const { prefixCls } = useDesign('login'); //引入默认类的变量
  const { getLocale, changeLocale } = useLocale();
  // const localeStore = useLocaleStore();
  const { t } = useI18n();
  const selectedKeys = ref<string[]>([]);
  function handleMenuEvent(menu) {
    if (unref(getLocale) === menu.event) return;
    toggleLocale(menu.event as string);
  }

  async function toggleLocale(lang: LocaleType | string) {
    await changeLocale(lang as LocaleType);
    selectedKeys.value = [lang as string];
    props.reload && location.reload();
  }
</script>
<style lang="less" scoped>
  //namespace 默认的类变量前缀
  @prefix-cls: ~'@{namespace}-login';

  .@{prefix-cls}{
    &::before {
      background-image: url(/@/assets/svg/login-bg.svg);
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      margin-left: -48%;
      background-position: 100%;
      background-size: auto 100%;
      content:'';
      z-index: -1;
    }

    &-container {
      margin: 0 auto;
      @media (min-width: 1200px) {
        max-width: 1520px;
      }
    }


    &-app-logo {
      width: 60%;
      height: 80px;
      top: 12px;
      left: 0;
      img {
        width: 48px;
      }
      span {
        font-size: 30px;
        margin-left: 10px;
      }
    }
    &-app-content {
      margin-top: auto;
      margin-bottom: auto;
      .content {
        font-size: 20px;
        margin-top: 20px;
      }
    }

  }
</style>
