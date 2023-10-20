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
          v-if="!route.children || !route.children.filter(item => !item.meta.hidden).length || isHiddenSub(route)"
          :key="route.name"
          class="menuItem"
        >
          <span>{{ route.meta.title }}</span>
        </a-menu-item>

        <a-sub-menu
          v-else
          :key="route.name"
          class="menuItem"
          :popupClassName="`subMenu ${route.children.length > 10 ? 'liInlineBlock' : ''}`"
        >
          <template #title>
            <span>{{ route.meta.title }} </span>
          </template>
          <a-menu-item v-for="subRoute in route.children" :key="subRoute.name">
            {{ subRoute.meta.title }}
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script setup>
  import { onMounted, computed, ref, inject } from "vue"
  import { getStorageItem, setStorageItem } from "_utils/storage"
  import { MENU_OPEN_KYES, MENU_SELECTED_KEYS } from "@/store/mutation-types"
  import { onBeforeRouteUpdate } from "vue-router"
  import { routes } from "@/router/index.js"

  const routeJump = inject("$routeJump")

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
    return route.meta?.hiddenSub
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
    // const storageOpenKeys = getStorageItem({ key: MENU_OPEN_KYES })
    const storageSelectedKeys = getStorageItem({ key: MENU_SELECTED_KEYS })

    // if(storageOpenKeys) {
    //   openKeys.value = storageOpenKeys
    // }
    if(storageSelectedKeys) {
      selectedKeys.value = storageSelectedKeys
    }
  })
</script>
