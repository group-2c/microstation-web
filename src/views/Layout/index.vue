<style lang="less" scoped>
  @import url("./index.less");
</style>

<template>
  <a-layout class="layoutCustomTrigger">
    <a-layout-header class="layoutHeader">
      <div class="logo">{{ constant.VUE_APP_NAME }}</div>
      <menu-bar />
      <div class="userInfo">
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            {{ userInfo.name }}
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a @click.stop="handleLogout">退出</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout-content class="layoutContent">
      <router-view />
    </a-layout-content>
  </a-layout>
</template> 

<script setup>
  import MenuBar from "./MenuBar.vue"
  import { useStore } from "vuex"
  import { DownOutlined } from "@ant-design/icons-vue"
  import constant from "_constant"

  const store = useStore()
  const userInfo = store.state.auth.userInfo

  const handleLogout = () => {
    store.dispatch("auth/logout")
  }
</script>