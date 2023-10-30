/*
 * @author: zzp
 * @date: 2023-10-30 09:13:12
 * @fileName: ReactivePowerCompensator.vue
 * @filePath: src/views/Unmanned/form/ReactivePowerCompensator.vue
 * @description: 无功补偿器
 */
<style lang="less" scoped>
  @import url("./index.less");
</style> 
 
<template>
  <div>
    <div class="blockItem">
      <div class="conTitle">实时数据</div>
      <div class="retract">
        <x-descriptions :list="labelAndFields1" :record="record" />
      </div>
    </div>
    <div class="blockItem">
      <div class="conTitle">电容状态</div>
      <div class="contentContainer">
        <x-descriptions :list="labelAndFields2" :record="record?.capacitive_state || {}" :minWidth="100" />
      </div>
    </div>
  </div>
</template>
 
<script setup>
const props = defineProps({ record: Object })

const labelAndFields1 = [
  { label: "A相电压数据", field: "a_phase_voltage", unit: "V" },
  { label: "B相电压数据", field: "b_phase_voltage", unit: "V" },
  { label: "C相电压数据", field: "c_phase_voltage", unit: "V" },
  { label: "A相电流数据", field: "a_phase_current", unit: "A" },
  { label: "B相电流数据", field: "b_phase_current", unit: "A" },
  { label: "C相电流数据", field: "c_phase_current", unit: "A" },
  { label: "A相功率因数数据", field: "a_phase_power_factor", unit: "kW" },
  { label: "B相功率因数数据", field: "b_phase_power_factor", unit: "kW" },
  { label: "C相功率因数数据", field: "c_phase_power_factor", unit: "kW" },
  { label: "A相有功功率数据", field: "a_phase_active_power", unit: "kW" },
  { label: "B相有功功率数据", field: "b_phase_active_power", unit: "kW" },
  { label: "C相有功功率数据", field: "c_phase_active_power", unit: "kW" },
  { label: "A相无功功率数据", field: "a_phase_reactive_power", unit: "kW" },
  { label: "B相无功功率数据", field: "b_phase_reactive_power", unit: "kW" },
  { label: "C相无功功率数据", field: "c_phase_reactive_power", unit: "kW" },
  { label: "变比", field: "transformation_ratio" },
  { label: "过压", field: "over_voltage" },
  { label: "功率因数下限", field: "power_factor_low" },
  { label: "投入延时", field: "input_delay" }
]

const labelAndFields2 = new Array(32).fill("-").map((item, x) => ({
  label: `电容${x+1}`, field: `capacitance_${x+1}`
}))
</script>