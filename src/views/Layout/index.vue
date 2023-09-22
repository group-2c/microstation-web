<style lang="less" scoped>
  @import url("./index.less");
</style>

<template>
  <a-layout class="layoutCustomTrigger">
    <a-layout-header class="layoutHeader">
      <div class="adaptiveBackground">
        <div class="left" />
        <div class="centerAuto" :style="`width: ${topCenterAutoWidth}px`"/>
        <div class="right" />
      </div>
      <div class="containerBody">
        <div class="title">{{ constant.VUE_APP_NAME }}</div>
        <menu-bar />
        <div class="userInfo">
          <UserOutlined class="userIcon" />
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
      </div>
    </a-layout-header>
    <a-layout-content class="layoutContent">
      <router-view />
    </a-layout-content>
    <a-layout-footer class="layoutFooter">
      <div class="left" :style="`width: ${footerWidth}px`" />
      <div class="center">
        <div class="copyright">版权信息: {{ constant.VUE_APP_COPYRIGHT }}</div>
      </div>
      <div class="right" :style="`width: ${footerWidth}px`" />
    </a-layout-footer>
  </a-layout>
</template> 

<script setup>
  import { onMounted, ref } from "vue"
  import { useStore } from "vuex"
  import MenuBar from "./MenuBar.vue"
  import { UserOutlined, DownOutlined } from "@ant-design/icons-vue"
  import constant from "_constant"

  const store = useStore()
  const userInfo = store.state.auth.userInfo

  const topCenterAutoWidth = ref(0)
  const footerWidth = ref(0)

  const handleLogout = () => {
    store.dispatch("auth/logout")
  }

  const _computeEdgeScale = () => {
    const edgeBox = document.querySelector(".adaptiveBackground")
    const leftArea = edgeBox.querySelector(".left")
    const rightArea = edgeBox.querySelector(".right")
    const immWidth = leftArea.clientWidth + rightArea.clientWidth
    const width = document.body.clientWidth - immWidth
    topCenterAutoWidth.value = width

    const centerWidth = document.body.clientWidth - 660
    footerWidth.value = centerWidth / 2
  }

  onMounted(() => {
    _computeEdgeScale()

    window.addEventListener("resize", () => {
      _computeEdgeScale()
    })
  })
</script>