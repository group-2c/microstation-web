/*
 * @author: zzp
 * @date: 2023-08-17 15:45:26
 * @fileName: index.vue
 * @filePath: src/views/Dashboard/index.vue
 * @description: 首页
 */
<style lang="less" scoped>
  @import url("./index.less");
</style>

<template>
  <div class="dashboardBox"> 
    <div id="map"></div>
  </div>
</template>

<script setup>
  import { onMounted } from "vue"

  let map = null

  const _initMap = () => {
    map = new T.Map("map", {
      projection: "EPSG:4326",
    })
    map.centerAndZoom(new T.LngLat(118.46489, 39.49825), 13)
    map.setStyle("indigo")
  }

  onMounted(() => {
    _initMap()
  })
</script>