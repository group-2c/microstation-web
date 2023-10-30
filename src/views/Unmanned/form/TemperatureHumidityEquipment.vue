/*
 * @author: zzp
 * @date: 2023-10-30 09:30:49
 * @fileName: TemperatureHumidityEquipment.vue
 * @filePath: src/views/Unmanned/form/TemperatureHumidityEquipment.vue
 * @description: 数显温湿度器
 */
<style lang="less" scoped>
  @import url("./index.less");
</style> 

<template>
  <div class="blockItem">
    <div class="conTitle">实时数据</div>
    <div class="retract">
      <x-descriptions :list="labelAndFields" :record="record" :column="2" :minWidth="100" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ record: Object })

const labelAndFields = [
  { label: "工作模式", field: "work_mode" },
  { label: "显示模式", field: "display_mode" },
  { label: "第1路设定值", field: "set_value_1" },
  { label: "第2路设定值", field: "set_value_2" },
  { label: "回 差", field: "return_difference" },
  { label: "第1路修正值", field: "corrected_value_1" },
  { label: "第2路修正值", field: "corrected_value_2" },
  { label: "温度测量值", field: "temperature", factor: 0.1 },
  { label: "湿度测量值", field: "humidity", factor: 0.1 },
]
</script>