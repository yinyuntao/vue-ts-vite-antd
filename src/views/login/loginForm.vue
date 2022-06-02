<template>
  <!-- 登录页面表单 -->
  <LoginFormTitle v-show="getShow" />
  <a-form
    v-if="getShow"
    :model="form"
    class="w-1/2"
    :class="`${prefixCls}-form`"
    ref="loginRef"
    :rules="getFormRules"
  >
    <a-form-item label="" name="account">
      <a-input v-model:value="form.account" :placeholder="t('sys.login.userName')"></a-input>
    </a-form-item>
    <a-form-item label="" name="password">
      <a-input-password
        v-model:value="form.password"
        :placeholder="t('sys.login.password')"
      ></a-input-password>
    </a-form-item>
    <div class="flex justify-between">
      <a-checkbox class="lh-32" v-model:checked="rememberVal">{{
        t('sys.login.rememberMe')
      }}</a-checkbox>
      <a-button class="p-0" type="link" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">{{
        t('sys.login.forgetPassword')
      }}</a-button>
    </div>
    <a-button block type="primary" size="large" class="my-10" @click="handleLogin">{{
      t('sys.login.loginButton')
    }}</a-button>
    <a-row class="flex justify-between my-10">
      <a-col :md="8" :xs="24">
        <a-button block @click="setLoginState(LoginStateEnum.MOBILE)">{{
          t('sys.login.mobileSignInFormTitle')
        }}</a-button>
      </a-col>
      <a-col :md="8" :xs="24">
        <a-button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}</a-button
        >
      </a-col>
      <a-col :md="7" :xs="24">
        <a-button block @click="setLoginState(LoginStateEnum.REGISTER)">{{
          t('sys.login.registerButton')
        }}</a-button>
      </a-col>
    </a-row>
    <a-divider :class="`${prefixCls}-form-way`">{{ t('sys.login.otherSignIn') }}</a-divider>

    <a-row class="flex justify-around" :class="`${prefixCls}-form-sign-in-way`">
      <GithubOutlined />
      <WechatOutlined />
      <AlipayCircleOutlined />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </a-row>
  </a-form>
</template>

<script lang="ts" setup>
  import LoginFormTitle from './loginFormTitle.vue';
  import { reactive, ref, computed, unref } from 'vue';
  import { useDesign } from '/@/style/var/class';
  import {
    AlipayCircleOutlined,
    GithubOutlined,
    WechatOutlined,
    GoogleCircleFilled,
    TwitterCircleFilled,
  } from '@ant-design/icons-vue';
  import { useLoginState, LoginStateEnum, useFormRules, useFormValid } from './useLogin';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { prefixCls } = useDesign('login'); //引入默认类的变量

  const form = reactive({
    account: 'vite-project',
    password: '123456',
  });
  const loginRef = ref();
  const { t } = useI18n();
  const rememberVal = ref(false);
  const { getFormRules } = useFormRules();
  const { validForm } = useFormValid(loginRef);

  const { setLoginState, getLoginState } = useLoginState();

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN); //当前是否显示登录页面

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    console.log(data);
  }
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-login-form';

  .@{prefix-cls} {
    &-way {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.45);
    }

    &-sign-in-way {
      font-size: 24px;
      color: #888;
      cursor: pointer;
      // ::v-deep 已经废弃了 现在用:deep()
      :deep(.anticon-github:hover) {
        color: @primary-color;
      }
      :deep(.anticon-wechat:hover) {
        color: @primary-color;
      }
      :deep(.anticon-alipay-circle:hover) {
        color: @primary-color;
      }
      :deep(.anticon-google-circle:hover) {
        color: @primary-color;
      }
      :deep(.anticon-twitter-circle:hover) {
        color: @primary-color;
      }
    }
  }
</style>
