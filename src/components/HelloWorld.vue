<template>
  <h1 class="header">{{ msg }}</h1>
</template>
<script lang="ts">
  import { ref, defineComponent } from 'vue';

  export default defineComponent({
    name: 'HelloWord',
    setup() {
      const msg = ref('1214');
      return {
        msg,
      };
    },
  });
</script>
<style lang="less" scoped>
  .header {
    color: @primary-color;
  }
</style>
