<template>
  <a-dropdown :trigger="['click']" v-model:visible="visible">
    <a-button type="primary" @click.prevent>
      <template #icon><MenuOutlined /></template>
    </a-button>
    <template #overlay>
      <a-menu :selectedKeys="selectedKeys">
        <template v-for="item in dropMenuList" :key="item.event">
          <a-menu-item @click="handleClickMenu(item)">
            <span>{{ item.text }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script lang="ts">
  import { defineComponent, ref, PropType } from 'vue';
  import { MenuOutlined } from '@ant-design/icons-vue';
  interface DropMenu {
    text: string;
    event: string;
  }

  export default defineComponent({
    components: {
      MenuOutlined,
    },
    props: {
      dropMenuList: {
        type: Array as PropType<(DropMenu & Recordable)[]>,
        default: () => [],
      },
      selectedKeys: {
        type: Array as PropType<string[]>,
        default: () => [],
      },
    },
    setup(prop, context) {
      const visible = ref(false);

      const handleClickMenu = (item) => {
        visible.value = false;
        context.emit('handle-menu-event', item);
      };
      return {
        visible,
        handleClickMenu,
      };
    },
  });
</script>
