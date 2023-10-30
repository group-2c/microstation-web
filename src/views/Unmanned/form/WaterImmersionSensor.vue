/*
 * @author: zzp
 * @date: 2023-10-26 17:02:45
 * @fileName: WaterImmersionSensor.vue
 * @filePath: src/views/Unmanned/form/WaterImmersionSensor.vue
 * @description: 水浸传感器实时数据
 */
<style lang="less" scoped>
  @import url("./index.less");
</style> 

<template>
  <div>
    <div class="blockItem">
      <div class="conTitle">输入寄存器</div>
      <div class="retract">
        <x-descriptions :list="labelAndFields1" :record="record" :column="2" :minWidth="80" />
      </div>
    </div>
    <div class="blockItem">
      <div class="conTitle">输出寄存器</div>
      <div class="retract">
        <x-descriptions :list="labelAndFields2" :record="record" :column="2" :minWidth="80" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ record: Object })

const labelAndFields1 = [
  { label: "泄露状态", field: "leak" },
  { label: "断线状态", field: "break" },
  { label: "泄露阻抗", field: "impedance", unit: "kohms" },
  { label: "工作电流", field: "current", unit: "uA" },
  { label: "泄漏电流", field: "leak_current", unit: "uA" }
]

const labelAndFields2 = [
  { label: "工作模式", field: "work_mode" },
  { label: "地 址", field: "address" },
  { label: "波特率", field: "baud_rate" }
]
</script>