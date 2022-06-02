<template>
  <template v-if="getShow">
    <loginFormTitle />
    <a-form
      class="w-1/2"
      :model="forgetForm"
      :class="`${prefixCls}-form`"
      :rules="getFormRules"
      ref="forgetRef"
    >
      <a-form-item name="account">
        <a-input
          v-model:value="forgetForm.account"
          :placeholder="t('sys.login.userName')"
        ></a-input>
      </a-form-item>
      <a-form-item name="mobile">
        <a-input v-model:value="forgetForm.mobile" :placeholder="t('sys.login.mobile')"></a-input>
      </a-form-item>
      <a-form-item name="sms">
        <CountDownInput v-model:value="forgetForm.sms" :placeholder="t('sys.login.smsCode')" />
      </a-form-item>
      <a-button block type="primary" @click="handleReset">{{ t('common.resetText') }}</a-button>
      <a-button block class="my-10" @click="handleBackLogin">{{
        t('sys.login.backSignIn')
      }}</a-button>
    </a-form>
  </template>
</template>

<script setup lang="ts">
  import { computed, reactive, unref, ref } from 'vue';
  import loginFormTitle from './loginFormTitle.vue';
  import { useLoginState, useFormRules, LoginStateEnum, useFormValid } from './useLogin';
  import { useI18n } from '/@/hooks/web/useI18n';
  import CountDownInput from './CountDownInput.vue';
  import { useDesign } from '/@/style/var/class';

  const { handleBackLogin, getLoginState } = useLoginState();
  const forgetForm = reactive({
    account: '',
    sms: '',
    mobile: '',
  });
  const { t } = useI18n();
  const forgetRef = ref();

  const { prefixCls } = useDesign('forget');
  const { getFormRules } = useFormRules();
  const { validForm } = useFormValid(forgetRef);
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);

  async function handleReset() {
    const data = await validForm();
    if (!data) return;
    console.log(data);
  }
</script>

<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-forget-form';

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
