<template>
  <a-config-provider :locale="locale" :theme="{ token: mapToken }">
    <a-layout>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-config-provider>
</template>

<script setup>
  import { ref } from "vue"
  import { theme } from "ant-design-vue"
  import "dayjs/locale/zh-cn"
  import zhCN from "ant-design-vue/es/locale/zh_CN"
  const locale = ref(zhCN)

  const { darkAlgorithm, defaultSeed } = theme
  
  const mapToken = {
    ...darkAlgorithm(defaultSeed),
    colorBgBase: "#09182b",
    colorSuccess: "#9ae68f",
    colorText: "#dff6ff",
    colorTextSecondary: "#dff6ff",
    colorTextTertiary: "#dff6ff",
    colorTextQuaternary: "#dff6ff",
    colorFill: "rgba(255, 255, 255, 0.18)",
    colorTextBase: "#dff6ff",
    colorPrimaryTextActive: "#176c8f",
    colorPrimaryBg: "#474747",
    colorPrimaryText: "#199cd1",
    colorPrimaryTextHover: "#3aa6ca",
    colorPrimaryActive: "#176c8f",
    colorPrimaryHover: "#3aa6ca",
    colorInfoActive: "#1554ad",
    colorInfoTextHover: "#3c89e8",
    colorInfoTextActive: "#1554ad",
    colorInfoText: "#dff6ff",
    colorInfo: "#1888b5",
    borderRadius: 2,
    colorPrimary: "#199cd1"
  }
</script>


