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
  <a-layout-footer>
    <div class="left" :style="`width: ${footerWidth}px`" />
    <div class="center">
      <div class="copyright">版权信息: {{ Constant.appCopyright }}</div>
    </div>
    <div class="right" :style="`width: ${footerWidth}px`" />
  </a-layout-footer>
</template>

<script setup>
  import { onMounted, ref, inject } from "vue"
  import Constant from "_constant"

  const footerWidth = ref(0)

  const _computeEdgeScale = () => {
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