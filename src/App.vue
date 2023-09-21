<template>
  <a-config-provider :locale="locale">
    <a-layout>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-config-provider>
</template>

<script setup>
  import { ref } from "vue"
  import "dayjs/locale/zh-cn"
  import zhCN from "ant-design-vue/es/locale/zh_CN"
  const locale = ref(zhCN)
</script>


