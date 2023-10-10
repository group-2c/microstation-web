<style lang="less" scoped>
  @import url("./index.less");
</style>

<template>
  <a-layout :class="['layoutCustomTrigger', `${!route.meta.disableBreadcrumb ? 'allAround' : ''}`]">
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
      <div class="layoutContentContainer">
        <a-breadcrumb v-if="!route.meta.disableBreadcrumb" class="breadcrumb" :routes="matchedRoutes">
          <template #itemRender="{ route, routes }">
            <span v-if="routes.indexOf(route) === routes.length - 1">{{ route.meta.title }}</span>
            <router-link v-else :to="{ name: route.name }">{{ route.meta.title }}</router-link>
          </template>
        </a-breadcrumb>
        <div class="layoutContentBody">
          <router-view />
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template> 

<script setup>
  import { onMounted, ref, computed } from "vue"
  import { useStore } from "vuex"
  import { useRoute } from "vue-router"
  import { UserOutlined, DownOutlined } from "@ant-design/icons-vue"
  import { getThreeNameParents } from "@/function/formatting"
  import Lodash from "lodash"
  import MenuBar from "./MenuBar.vue"
  import constant from "_constant"

  const route = useRoute()
  const store = useStore()
  const userInfo = store.state.auth.userInfo

  const topCenterAutoWidth = ref(0)
  const footerWidth = ref(0)

  const matchedRoutes = computed(() => {
    const array = route.path.split("/").pop()
    const name = Lodash.upperFirst(array)
    const list = route.matched.find(x => x.name === "App").children
    return getThreeNameParents(list, name)
  })

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