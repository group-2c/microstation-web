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
          <dynamic-icon :name="route.meta.icon" />
          <span>{{ route.meta.title }}</span>
        </a-menu-item>

        <a-sub-menu
          v-else
          :key="route.name"
          class="menuItem"
          popupClassName="subMenu"
        >
          <template #icon v-if="route.meta.icon">
            <dynamic-icon :name="route.meta.icon" />
          </template>
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
  import { onMounted, computed, ref } from "vue"
  import DynamicIcon from "./DynamicIcon.vue"
  import { getStorageItem, setStorageItem } from "_utils/storage"
  import { MENU_OPEN_KYES, MENU_SELECTED_KEYS } from "@/store/mutation-types"
  import { useRouter, onBeforeRouteUpdate } from "vue-router"
  import { routes } from "@/router/index.js"

  const router = useRouter()

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
    setStorageItem({ key: MENU_SELECTED_KEYS, value: [key] })
    router.push({ name: key })
  }

  const _getCurrentPath = () => {
    const currentURL = window.location.pathname
    const lastSegment = currentURL.substring(currentURL.lastIndexOf("/") + 1)
    const formattedSegment = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
    let parentName = null

    for (const item of routes) {
      if (item.name === formattedSegment) {
        parentName = item.name || null
        break
      }
      if (item.children) {
        for (const childRoute of item.children) {
          if (childRoute.name === formattedSegment) {
            parentName = item.name || null
            break
          }
        }
      }
    }

    return {
      name: formattedSegment,
      parentName
    }
  }

  onMounted(() => {
    const storageOpenKeys = getStorageItem({ key: MENU_OPEN_KYES })
    const storageSelectedKeys = getStorageItem({ key: MENU_SELECTED_KEYS })

    if(storageOpenKeys) {
      openKeys.value = storageOpenKeys
    }
    if(storageSelectedKeys) {
      selectedKeys.value = storageSelectedKeys
    }

    const data = _getCurrentPath()
    if(data.name && data.parentName) {
      openKeys.value = [data.parentName]
      selectedKeys.value = [data.name]
      setStorageItem({ key: MENU_OPEN_KYES, value: data.parentName })
      setStorageItem({ key: MENU_SELECTED_KEYS, value: [data.name] })
    }
  })
</script>
