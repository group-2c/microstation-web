<style lang="less" scoped>
  @import url("./index.less");
</style>

<template>
  <div class="menuLayer">
    <a-menu
      mode="inline"
      theme="dark"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
    >
      <a-menu-item key="overview">
        <router-link to="/challengeGame/overview">
          <template #icon><FileExcelOutlined /></template>
          <span>11111</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup>
  import { watch, ref } from "vue"
  import { FileExcelOutlined } from "@ant-design/icons-vue"
  import { useRoute } from "vue-router"

  const route = useRoute()

  const selectedKeys = ref([])
  const openKeys = ref([])

  const matchNewRouteKey = path => {
    const routeKey = path.substring(
      path.lastIndexOf('/') + 1
    )
    selectedKeys.value.splice(0, 1, routeKey)
  }

  matchNewRouteKey(route.path)

  watch(() => route.path, matchNewRouteKey)
</script>
