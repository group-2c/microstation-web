/*
 * @author: zzp
 * @date: 2023-10-27 16:35:22
 * @fileName: Camera.vue
 * @filePath: src/views/Unmanned/form/Camera.vue
 * @description: 摄像机
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
  { label: "摄像机状态", field: "cabinet_temperature_and_humidity_sensor_failure", dictionary: ["无故障", "有故障"] },
]
</script>