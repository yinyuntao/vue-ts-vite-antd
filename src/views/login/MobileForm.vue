<!-- 手机登录 -->
<template>
  <LoginFormTitle v-show="getShow" />
  <a-form
    v-if="getShow"
    :model="mobileForm"
    class="w-1/2"
    :class="`${prefixCls}-form`"
    ref="mobileRef"
    :rules="getFormRules"
  >
    <a-form-item label="" name="mobile">
      <a-input :placeholder="t('sys.login.mobile')" v-model:value="mobileForm.mobile"></a-input>
    </a-form-item>
    <a-form-item label="" name="sms">
      <CountDownInput v-model:value="mobileForm.sms" :placeholder="t('sys.login.smsCode')" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" block size="large" @click="handleLogin">{{
        t('sys.login.loginButton')
      }}</a-button>
    </a-form-item>
    <a-form-item>
      <a-button size="large" block @click="handleBackLogin">{{
        t('sys.login.backSignIn')
      }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import LoginFormTitle from './loginFormTitle.vue';
  import { computed, unref, reactive, ref } from 'vue';
  import { useLoginState, LoginStateEnum, useFormValid, useFormRules } from './useLogin';
  import { useDesign } from '/@/style/var/class';
  import { useI18n } from '/@/hooks/web/useI18n';
  import CountDownInput from './CountDownInput.vue';

  const { getLoginState, handleBackLogin } = useLoginState();
  const mobileForm = reactive({
    mobile: '',
    sms: '',
  });
  const mobileRef = ref();

  const { validForm } = useFormValid(mobileRef);
  const { getFormRules } = useFormRules();
  const { prefixCls } = useDesign('mobile');
  const { t } = useI18n();
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE);

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    console.log(data);
  }
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-mobile-form';

  .@{prefix-cls} {
    :deep(.ant-form-item) {
      .ant-input-group-addon {
        border: none;
        background: transparent;
        padding: 0 0 0 11px;
      }
    }
  }
</style>
