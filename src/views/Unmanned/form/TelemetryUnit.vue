/*
 * @author: zzp
 * @date: 2023-10-30 09:28:09
 * @fileName: TelemetryUnit.vue
 * @filePath: src/views/Unmanned/form/TelemetryUnit.vue
 * @description: 遥信遥测单元
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
  { label: "输入", field: "input" },
  { label: "仪表识别码", field: "meter_identification_code" },
  { label: "版本号", field: "version_no" },
  { label: "地址", field: "address" },
  { label: "波特率", field: "baud_rate" },
  { label: "校验模式", field: "parity_mode" },
  { label: "16 路开入", field: "di" },
  { label: "第1路继电器", field: "relay_1" },
]
</script>