<template>
  <div :class="prefixCls">
    <a-input-password v-bind="$attrs" :value="state"></a-input-password>
    <div :class="`${prefixCls}-bar`">
      <div :class="`${prefixCls}-bar--fill`" :data-score="getPasswordStrength"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { useDesign } from '/@/style/var/class';
  import { computed, defineComponent, unref } from 'vue';
  import { useRuleFormItem } from '/@/hooks/component/userFormItem';
  import { zxcvbn } from '@zxcvbn-ts/core';

  export default defineComponent({
    name: 'StrengthMeter',
    inheritAttrs: false,
    props: {
      value: String,
    },
    setup(props) {
      const { prefixCls } = useDesign('strength-meter');
      const [state] = useRuleFormItem(props);

      const getPasswordStrength = computed(() => {
        const val = unref(state);
        // 验证密码强度的插件
        const score = val ? zxcvbn(val)?.score : -1;
        return score;
      });

      return {
        prefixCls,
        state,
        getPasswordStrength,
      };
    },
  });
</script>

<style scoped lang="less">
  @prefix-cls:~ '@{namespace}-strength-meter';

  .@{prefix-cls} {
    &-bar {
      position: relative;
      height: 6px;
      margin: 10px auto 6px;
      background-color: @disabled-color;
      border-radius: 6px;
      &::before,
      &::after {
        position: absolute;
        z-index: 10;
        display: block;
        width: 20%;
        height: inherit;
        background-color: transparent;
        border-color: @white;
        border-style: solid;
        border-width: 0 5px;
        content: '';
      }
      &::before {
        left: 20%;
      }

      &::after {
        right: 20%;
      }
      &--fill {
        position: absolute;
        width: 0;
        height: inherit;
        background-color: transparent;
        border-radius: inherit;
        transition: width 0.5s ease-in-out, background 0.25s;

        &[data-score='0'] {
          width: 20%;
          background-color: darken(@error-color, 10%);
        }

        &[data-score='1'] {
          width: 40%;
          background-color: @error-color;
        }

        &[data-score='2'] {
          width: 60%;
          background-color: @warning-color;
        }

        &[data-score='3'] {
          width: 80%;
          background-color: fade(@success-color, 50%);
        }

        &[data-score='4'] {
          width: 100%;
          background-color: @success-color;
        }
      }
    }
  }
</style>
