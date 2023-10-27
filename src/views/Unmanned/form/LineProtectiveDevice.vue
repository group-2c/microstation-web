/*
 * @author: zzp
 * @date: 2023-10-27 18:07:31
 * @fileName: LineProtectiveDevice.vue
 * @filePath: src/views/Unmanned/form/LineProtectiveDevice.vue
 * @description: 线路保护装置
 */
<style lang="less" scoped>
  @import url("./index.less");
</style> 

<template>
  <div class="blockItem">
    <div class="conTitle">实时数据</div>
    <div class="retract">
      <x-descriptions :list="labelAndFields" :record="record" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ record: Object })

const labelAndFields = [

]
</script>