/*
 * @author: zzp
 * @date: 2023-10-19 14:19:09
 * @fileName: index.vue
 * @filePath: src/components/LayoutFooter/index.vue
 * @description: 底部版权信息
 */
<style lang="less" scoped>
  @import url("./index.less");
</style>

<template>
  <a-layout-footer>
    <div class="left" :style="`width: ${footerWidth}px`" />
    <div class="center">
      <div class="copyright">版权信息: {{ Constant.appCopyright }}</div>
    </div>
    <div class="right" :style="`width: ${footerWidth}px`" />
  </a-layout-footer>
</template>

<script setup>
  import { onMounted, ref } from "vue"
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