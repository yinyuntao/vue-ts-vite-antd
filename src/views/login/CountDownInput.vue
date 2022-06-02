<template>
  <a-input v-bind="$attrs" :value="state">
    <template #addonAfter>
      <a-button :disabled="isStart" :loading="loading" @click="handleStart">{{
        getButtonText
      }}</a-button>
    </template>
  </a-input>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue';
  import { useCountDown } from './useCountDown';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useRuleFormItem } from '/@/hooks/component/userFormItem';

  const props = {
    value: { type: String },
  };

  export default defineComponent({
    name: 'CountDownInput',
    inheritAttrs: false, //继承性
    props,
    setup(props) {
      const loading = ref(false);
      const { t } = useI18n();
      const { currentCount, isStart, start } = useCountDown();
      const getButtonText = computed(() => {
        return !unref(isStart)
          ? t('component.countdown.normalText')
          : t('component.countdown.sendText', [unref(currentCount)]);
      });

      const handleStart = () => {
        loading.value = true;
        //  调用接口获取验证码
        start();
        loading.value = false;
      };

      const [state] = useRuleFormItem(props);
      return {
        loading,
        getButtonText,
        currentCount,
        isStart,
        handleStart,
        t,
        state,
      };
    },
  });
</script>

<style scoped></style>
