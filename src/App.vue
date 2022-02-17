<template>
  <img alt="Vue logo" src="./assets/logo.png" />

  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />

  <a-button type="primary">primary</a-button>
  <router-view></router-view>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import HelloWorld from '/@/components/HelloWorld.vue';

  export default defineComponent({
    components: {
      HelloWorld,
    },
    setup() {
      return {};
    },
  });
</script>
<style></style>
