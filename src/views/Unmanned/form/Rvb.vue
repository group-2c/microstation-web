/*
 * @author: zzp
 * @date: 2023-10-27 15:06:11
 * @fileName: Rvb.vue
 * @filePath: src/views/Unmanned/form/Rvb.vue
 * @description: 局放监测装置
 */
<style lang="less" scoped>
  @import url("./index.less");
</style> 

<template>
  <div class="blockItem">
    <div class="conTitle">实时数据</div>
    <div class="retract">
      <x-descriptions :list="labelAndFields" :record="record" :minWidth="160" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ record: Object })

const labelAndFields = [
  { label: "A相局部放电概率强度", field: "a_phase_partial_discharge_probability_intensity", unit: "pC" },
  { label: "A相局部放电平均强度", field: "a_phase_partial_discharge_average_intensity", unit: "pC" },
  { label: "A相局部放电频度", field: "a_phase_partial_discharge_frequency", unit: "次" },
  { label: "B相局部放电概率强度", field: "b_phase_partial_discharge_probability_intensity", unit: "pC" },
  { label: "B相局部放电平均强度", field: "b_phase_partial_discharge_average_intensity", unit: "pC" },
  { label: "B相局部放电频度", field: "b_phase_partial_discharge_frequency", unit: "次" },
  { label: "C相局部放电概率强度", field: "c_phase_partial_discharge_probability_intensity", unit: "pC" },
  { label: "C相局部放电平均强度", field: "c_phase_partial_discharge_average_intensity", unit: "pC" },
  { label: "C相局部放电频度", field: "c_phase_partial_discharge_frequency", unit: "次" },
  { label: "综合局部放电概率强度", field: "comprehensive_partial_discharge_probability_intensity", unit: "pC" },
  { label: "综合局部放电平均强度", field: "comprehensive_partial_discharge_average_intensity", unit: "pC" },
  { label: "综合局部放电频度", field: "comprehensive_partial_discharge_frequency", unit: "次" },
  { label: "A相温度", field: "a_phase_temperature", unit: "℃" },
  { label: "B相温度", field: "b_phase_temperature", unit: "℃" },
  { label: "C相温度", field: "c_phase_temperature", unit: "℃" },
  { label: "局放噪声", field: "partial_discharge_noise", unit: "pC" },
  { label: "总温度", field: "total_temperature", unit: "℃" },
  { label: "局放报警", field: "partial_discharge_alarm" },
  { label: "A相温度报警", field: "a_phase_temperature_alarm" },
  { label: "B相温度报警", field: "b_phase_temperature_alarm" },
  { label: "C相温度报警", field: "c_phase_temperature_alarm" },
  { label: "A相短路故障", field: "a_phase_short_circuit_fault" },
  { label: "B相短路故障", field: "b_phase_short_circuit_fault" },
  { label: "C相短路故障", field: "c_phase_short_circuit_fault" },
  { label: "接地故障", field: "ground_fault" },
  { label: "带电指示闭锁状态", field: "live_indication_locking_status" },
  { label: "总温度报警", field: "total_temperature_alarm", unit: "°" }
]
</script>