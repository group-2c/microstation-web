/*
 * @author: zzp
 * @date: 2023-10-27 17:10:18
 * @fileName: ElectricityMeter.vue
 * @filePath: src/views/Unmanned/form/ElectricityMeter.vue
 * @description: 多功能电表
 */
<style lang="less" scoped>
  @import url("./index.less");
</style> 

<template>
  <div>
    <div class="blockItem">
      <div class="conTitle">远程控制</div>
      <div class="retract">
        <a-row>
          <div class="controlsBtns">
            <a-button @click.stop="accessControl(0)">闭合</a-button>
            <a-button @click.stop="accessControl(1)">断开</a-button>
          </div>
        </a-row>
      </div>
    </div>
    <div class="blockItem">
      <div class="conTitle">实时数据</div>
      <div class="retract">
        <x-descriptions :list="labelAndFields" :record="record" :minWidth="160" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ 
  record: Object,
  publish: Function
})

const labelAndFields = [
  { label: "A 相电压", field: "a_voltage", factor: 0.001, unit: "V" },
  { label: "B 相电压", field: "b_voltage", factor: 0.001, unit: "V" },
  { label: "C 相电压", field: "c_voltage", factor: 0.001, unit: "V" },
  { label: "AB 线电压", field: "ab_voltage", factor: 0.001, unit: "V" },
  { label: "BC 线电压", field: "bc_voltage", factor: 0.001, unit: "V" },
  { label: "CA 线电压", field: "ca_voltage", factor: 0.001, unit: "V" },
  { label: "A 相电流", field: "a_current", factor: 0.001, unit: "A" },
  { label: "B 相电流", field: "b_current", factor: 0.001, unit: "A" },
  { label: "C 相电流", field: "c_current", factor: 0.001, unit: "A" },
  { label: "零线电流", field: "n_current", factor: 0.001, unit: "A" },
  { label: "有功总功率", field: "active_power", factor: 0.0001, unit: "kW" },
  { label: "A 相有功总功率", field: "a_active_power", factor: 0.0001, unit: "kW" },
  { label: "B 相有功总功率", field: "b_active_power", factor: 0.0001, unit: "kW" },
  { label: "C 相有功总功率", field: "c_active_power", factor: 0.0001, unit: "kW" },
  { label: "无功总功率", field: "reactive_power", factor: 0.0001, unit: "kvar" },
  { label: "A 相无功总功率", field: "a_reactive_power", factor: 0.0001, unit: "kvar" },
  { label: "B 相无功总功率", field: "b_reactive_power", factor: 0.0001, unit: "kvar" },
  { label: "C 相无功总功率", field: "c_reactive_power", factor: 0.0001, unit: "kvar" },
  { label: "总视在功率", field: "apparent_power", factor: 0.0001, unit: "kVA" },
  { label: "A 相视在功率", field: "a_apparent_power", factor: 0.0001, unit: "kVA" },
  { label: "B 相视在功率", field: "b_apparent_power", factor: 0.0001, unit: "kVA" },
  { label: "C 相视在功率", field: "c_apparent_power", factor: 0.0001, unit: "kVA" },
  { label: "总功率因数", field: "power_factor", factor: 0.001 },
  { label: "A 相功率因数", field: "a_power_factor", factor: 0.001 },
  { label: "B 相功率因数", field: "b_power_factor", factor: 0.001 },
  { label: "C 相功率因数", field: "c_power_factor", factor: 0.001 },
  { label: "A 相电压与电流夹角", field: "a_voltage_current", factor: 0.01, unit: "°" },
  { label: "B 相电压与电流夹角", field: "b_voltage_current", factor: 0.01, unit: "°" },
  { label: "C 相电压与电流夹角", field: "c_voltage_current", factor: 0.01, unit: "°" },
  { label: "A 相电压夹角", field: "a_voltage_angle", factor: 0.01, unit: "°" },
  { label: "B 相电压夹角", field: "b_voltage_angle", factor: 0.01, unit: "°" },
  { label: "C 相电压夹角", field: "c_voltage_angle", factor: 0.01, unit: "°" },
  { label: "A 相电流夹角", field: "a_current_angle", factor: 0.01, unit: "°" },
  { label: "B 相电流夹角", field: "b_current_angle", factor: 0.01, unit: "°" },
  { label: "C 相电流夹角", field: "c_current_angle", factor: 0.01, unit: "°" },
  { label: "电网频率", field: "power_frequency", factor: 0.01, unit: "Hz" },
  { label: "电压不平衡率", field: "voltage_unbalance_factor", factor: 0.01, unit: "%" },
  { label: "电流不平衡率", field: "current_unbalance_factor", factor: 0.01, unit: "%" },
  { label: "负载特性", field: "load_characteristic" }
]

const accessControl = type => {
  props.publish({ cmd: type }, 0)
}
</script>