<template>
  <!-- 登录页面表单 -->
  <LoginFormTitle v-show="getShow" />
  <a-form v-if="getShow" :model="form" class="w-1/2" :class="`${prefixCls}-form`">
    <a-form-item label="">
      <a-input v-model:value="form.account"></a-input>
    </a-form-item>
    <a-form-item label="">
      <a-input-password v-model:value="form.password"></a-input-password>
    </a-form-item>
    <div class="flex justify-between">
      <a-checkbox v-model:checked="rememberVal">记住我</a-checkbox>
      <a href="#" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">忘记密码？</a>
    </div>
    <a-button block type="primary" size="large" class="my-10">登录</a-button>
    <a-row class="flex justify-between my-10">
      <a-col :md="8" :xs="24">
        <a-button block @click="setLoginState(LoginStateEnum.MOBILE)">手机登录</a-button>
      </a-col>
      <a-col :md="8" :xs="24">
        <a-button block @click="setLoginState(LoginStateEnum.QR_CODE)">二维码登录</a-button>
      </a-col>
      <a-col :md="7" :xs="24">
        <a-button block @click="setLoginState(LoginStateEnum.REGISTER)">注册</a-button>
      </a-col>
    </a-row>
    <a-divider :class="`${prefixCls}-form-way`">其他登录方式</a-divider>

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
  import { useLoginState, LoginStateEnum } from './useLogin';

  const { prefixCls } = useDesign('login'); //引入默认类的变量

  const form = reactive({
    account: 'vite-project',
    password: '123456',
  });

  const rememberVal = ref(false);

  const { setLoginState, getLoginState } = useLoginState();

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN); //当前是否显示登录页面
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
