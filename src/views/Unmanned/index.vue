/*
 * @author: zzp
 * @date: 2023-09-05 10:46:04
 * @fileName: index.vue
 * @filePath: src/views/Unmanned/index.vue
 * @description: 无人微站 
 */
<style lang="less" scoped>
  @import url("./index.less");
</style>

<template>
  <div class="unmannedBox">
    <div class="left">1</div>
    <div class="right">
      <div class="top">2</div>
      <div class="containerBody">
        <div class="backdrops">

        </div>
      </div>
    </div>
  </div>
  <layout-footer />
</template>

<script setup>
  import { onMounted, ref } from "vue"
  import LayoutFooter from "_components/LayoutFooter/index.vue"


  onMounted(() => {

  })

</script>