<style lang="less" scoped>
  @import url("./index.less");
</style>

<template>
  <div class="menuLayer">
    <a-menu
      class="menu"
      mode="horizontal"
      theme="dark"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
    >
      <a-menu-item key="dashboard">
        <router-link to="/dashboard">
          <HomeOutlined />
          <span>首页</span>
        </router-link>
      </a-menu-item>
      <a-sub-menu class="sub-menu" key="operations">
        <template #icon><AppstoreOutlined /></template>
        <template #title>基础数据</template>
        <a-menu-item key="user">
          <router-link to="/operations/user">
            <span>用户管理</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script setup>
  import { watch, ref } from "vue"
  import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons-vue"
  import { useRoute } from "vue-router"

  const route = useRoute()
  const selectedKeys = ref([])
  const openKeys = ref([])

  const matchNewRouteKey = path => {  
    const routeKey = path.substring(
      path.lastIndexOf("/") + 1
    )
    selectedKeys.value.splice(0, 1, routeKey)
  }
  matchNewRouteKey(route.path)

  watch(() => route.path, matchNewRouteKey)
</script>
