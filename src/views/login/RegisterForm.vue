<template>
  <template v-if="getShow">
    <LoginFormTitle />
    <a-form
      class="w-1/2"
      :class="`${prefixCls}-form`"
      :model="registerForm"
      :rules="getFormRules"
      ref="registerRef"
    >
      <a-form-item label="" name="account">
        <a-input
          v-model:value="registerForm.account"
          :placeholder="t('sys.login.userName')"
        ></a-input>
      </a-form-item>
      <a-form-item label="" name="mobile">
        <a-input v-model:value="registerForm.mobile" :placeholder="t('sys.login.mobile')"></a-input>
      </a-form-item>
      <a-form-item label="" name="sms">
        <CountDownInput v-model:value="registerForm.sms" :placeholder="t('sys.login.smsCode')" />
      </a-form-item>
      <a-form-item name="password">
        <StrengthMeter
          v-model:value="registerForm.password"
          :placeholder="t('sys.login.password')"
        />
      </a-form-item>
      <a-form-item name="confirmPassword">
        <a-input-password
          v-model:value="registerForm.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        ></a-input-password>
      </a-form-item>
      <a-form-item name="policy">
        <a-checkbox v-model:checked="registerForm.policy">
          {{ t('sys.login.policy') }}
        </a-checkbox>
      </a-form-item>
      <a-button type="primary" block @click="handleRegister">{{
        t('sys.login.registerButton')
      }}</a-button>
      <a-button class="my-10" block @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </a-button>
    </a-form>
  </template>
</template>

<script setup lang="ts">
  import { computed, unref, reactive, ref } from 'vue';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import StrengthMeter from '/@/components/StrengthMeter/index.vue';
  import LoginFormTitle from './loginFormTitle.vue';
  import CountDownInput from './CountDownInput.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDesign } from '/@/style/var/class';

  const registerForm = reactive({
    account: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    sms: '',
    policy: false,
  });
  const registerRef = ref();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { prefixCls } = useDesign('register');
  const { t } = useI18n();
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);
  const { getFormRules } = useFormRules(registerForm);
  const { validForm } = useFormValid(registerRef);

  async function handleRegister() {
    const data = await validForm();
    if (!data) return;
    console.log(data);
  }
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-register-form';

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
