<template>
  <template v-if="getShow">
    <LoginFormTitle />
    <div class="w-1\/2">
      <QrCode class="my-10" />
      <Divider>{{ t('sys.login.scanSign') }}</Divider>
      <a-button class="my-10" block @click="handleBackLogin">{{
        t('sys.login.backSignIn')
      }}</a-button>
    </div>
  </template>
</template>

<script setup lang="ts">
  import LoginFormTitle from './loginFormTitle.vue';
  import QrCode from '/@/components/QrCode/index.vue';
  import { useLoginState, LoginStateEnum } from './useLogin';
  import { computed, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { handleBackLogin, getLoginState } = useLoginState();
  const { t } = useI18n();
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.QR_CODE);
</script>

<style lang="scss" scoped></style>
