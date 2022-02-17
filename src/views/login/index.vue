<template>
  <div :class="prefixCls">
    <p>121515151</p>
    <div :class="`${prefixCls}-container`">
      <div :class="`${prefixCls}-container-left`">
        <div :class="`${prefixCls}-app-logo`">
          <img src="../../assets/images/logo.png" alt="" srcset="" />
          <span>vite admin</span>
        </div>
      </div>
      <div :class="`${prefixCls}-container-right`"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '/@/style/var/class';

  const { prefixCls } = useDesign('login'); //引入默认类的变量
</script>
<style lang="less" scoped>
  //namespace 默认的类变量前缀
  @prefix-cls: ~'@{namespace}-login';

  .@{prefix-cls}{
    width: 100vw;
    height: 100vh;
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
      // height: 100vh;
      margin: 0 auto;
      display: flex;
      @media (min-width: 1200px) {
        max-width: 1200px;
      }
      &-left,&-right {
        width: 50%;
      }
    }


    &-app-logo {
      width: 60%;
      height: 80px;
      display: flex;
      align-items: center;
      img {
        width: 48px;
      }
      span {
        color: #fff;
        font-size: 24px;
        font-weight: bold;
        margin-left: 10px;
      }
    }
  }
</style>
