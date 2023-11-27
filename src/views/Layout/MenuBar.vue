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
      @openChange="setOpenKeys"
      @click="toRoute" 
    >
      <template v-for="route in menuRoutes" :key="route.name">
        <a-menu-item
          v-if="isHiddenMenuItem(route)"
          :key="route.name"
          class="menuItem"
        >
          <span>{{ route.meta.title }}</span>
        </a-menu-item>

        <a-sub-menu
          v-if="isHiddenSub(route)"
          :key="route.name"
          class="menuItem"
          :popupClassName="`subMenu ${(route?.children || []).filter(x => owns.find(_a => _a.name === x.name)).length > 10 ? 'liInlineBlock' : ''}`"
        >
          <template #title>
            <span>{{ route.meta.title }}</span>
          </template>
          <template v-for="subRoute in route.children" :key="subRoute.name">
            <a-menu-item v-if="owns.find(x => x.name === subRoute.name)" :key="subRoute.name">
              {{ subRoute.meta.title }} 
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script setup>
  import { onMounted, computed, ref, inject } from "vue"
  import { useStore } from "vuex"
  import { getStorageItem, setStorageItem } from "_utils/storage"
  import { MENU_OPEN_KYES, MENU_SELECTED_KEYS } from "@/store/mutation-types"
  import { onBeforeRouteUpdate } from "vue-router"
  import { routes } from "@/router/index.js"

  const routeJump = inject("$routeJump")
  const store = useStore()
  const owns = store.state.auth.owns

  const selectedKeys = ref([])
  const openKeys = ref([])

  const menuRoutes = computed(() => {
    const array = routes.find(x => x.name === "App")?.children
    const list = array.sort((a, b) => a.meta.index - b.meta.index)
    return list.filter(route => route.meta && !route.meta.hidden)
  })
  
  onBeforeRouteUpdate(to => {
    selectedKeys.value = [to.name]
    setStorageItem({ key: MENU_SELECTED_KEYS, value: [to.name] })
  })

  const isHiddenSub = route => {
    if(!route.children || route.children.length === 0) {
      return false
    }

    if(route.children) {
      if(route.children.filter(x => owns.find(_a => _a.name === x.name)).length === 0) {
        return false
      }
    }

    return true
  }

  const isHiddenMenuItem = route => {
    if(!route.children && !owns.find(x => x.name === route.name)) {
      return false
    }
    return !route.children || !route.children.filter(item => !item.meta.hidden).length
  }

  const setOpenKeys = e => {
    openKeys.value = e
    setStorageItem({ key: MENU_OPEN_KYES, value: e })
  }

  const toRoute = ({ key }) => {
    selectedKeys.value = [key]
    routeJump({ name: key })
  }

  onMounted(() => {
    const storageSelectedKeys = getStorageItem({ key: MENU_SELECTED_KEYS })

    if(storageSelectedKeys) {
      selectedKeys.value = storageSelectedKeys
    }
  })
</script>
