/*
 * @author: zzp
 * @date: 2023-10-27 16:36:21
 * @fileName: DcScreen.vue
 * @filePath: src/views/Unmanned/form/DcScreen.vue
 * @description: 直流屏
 */
<style lang="less" scoped>
  @import url("./index.less");
</style> 

<template>
  <div class="blockItem">
    <div class="conTitle">实时数据</div>
    <div class="retract">
      <x-descriptions :list="labelAndFields" :record="record" :column="2" :minWidth="60" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ record: Object })

const labelAndFields = [
  { label: "电池电压", field: "battery_voltage", unit: "V" },
  { label: "控母电压", field: "busbar_voltage", unit: "V" },
  { label: "电池电流", field: "battery_current", unit: "A" },
  { label: "负载电流", field: "load_current", unit: "A" },
  { label: "正地电阻", field: "positive_ground_resistance", unit: "K" },
  { label: "负地电阻", field: "negative_ground_resistance", unit: "K" },
  { label: "正地电压", field: "positive_ground_voltage", unit: "V" },
  { label: "负地电压", field: "negative_ground_voltage", unit: "V" },
  { label: "环境温度", field: "ambient_temperature", unit: "°C" },
  { label: "硅链温度", field: "silicon_temperature", unit: "°C" }
]
</script>