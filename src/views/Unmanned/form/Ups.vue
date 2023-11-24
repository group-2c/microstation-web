/*
 * @author: zzp
 * @date: 2023-10-27 17:17:05
 * @fileName: Ups.vue
 * @filePath: src/views/Unmanned/form/Ups.vue
 * @description: UPS
 */
<style lang="less" scoped>
@import url("./index.less");
</style> 

<template>
  <div class="blockItem">
    <div class="conTitle">状态量</div>
    <div class="retract">
      <x-descriptions :list="labelAndFields1" :record="record" :column="4" />
    </div>
  </div>
  <div class="blockItem">
    <div class="conTitle">告警量</div>
    <div class="retract">
      <x-descriptions :list="labelAndFields2" :record="record" :column="4" />
    </div>
  </div>
  <div class="blockItem">
    <div class="conTitle">模拟量</div>
    <div class="retract">
      <x-descriptions :list="labelAndFields3" :record="record" :column="4" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ record: Object })

const labelAndFields1 = [
  { label: "主电路电压", field: "main_circuit_voltage_normal", dictionary: ["正常", "异常"] },
  { label: "旁路电压", field: "bypass_voltage_normal", dictionary: ["正常", "异常"] },
  { label: "整流器", field: "rectifier_operation", dictionary: ["关闭", "正在工作"] },
  { label: "逆变器", field: "inverter_operation", dictionary: ["关闭", "正在工作"] },
  { label: "逆变器带载", field: "inverter_loaded", dictionary: ["否", "是"] },
  { label: "旁路带载", field: "bypass_load", dictionary: ["否", "是"] },
  { label: "逆变与旁路同步", field: "inverter_and_bypass_synchronization", dictionary: ["同步", "不同步"] },
  { label: "操作模式", field: "mode", dictionary: ["旁路供电", "逆变供电"] },
  { label: "声音报警", field: "audible_alarm", dictionary: ["蜂鸣器正常", "蜂鸣器静音"] },
  { label: "电池状态", field: "battery_status", dictionary: ["充电", "放电"] },
  { label: "UPS在线状态", field: "ups_online_status", dictionary: ["主路逆变供电", "电池逆变供电"] },
]

const labelAndFields2 = [
  { label: "主路输入电压", field: "main_circuit_input_voltage_low", dictionary: ["正常", "交流输入电压低"] },
  { label: "母线过电压", field: "bus_over_voltage", dictionary: ["正常", "母线过压"] },
  { label: "电池低压报警", field: "battery_low_voltage_alarm", dictionary: ["正常", "电池电压低"] },
  { label: "电池接入状态", field: "battery_not_connected", dictionary: ["正常", "无电池"] },
  { label: "逆变器状态", field: "inverter_fault", dictionary: ["正常", "故障"] },
  { label: "逆变器过电流", field: "inverter_over_current", dictionary: ["正常", "逆变器过流"] },
  { label: "逆变器输出电压变化过大", field: "inverter_output_voltage_change", dictionary: ["正常", "逆变输出电压异常"] },
  { label: "风扇状态", field: "fan_failure", dictionary: ["正常", "故障"] },
  { label: "电池更换提示", field: "battery_replacement_prompt", dictionary: ["正常", "电池需更换"] },
  { label: "整流器状态", field: "rectifier_over_temperature", dictionary: ["正常", "整流器过温"] },
  { label: "逆变器状态", field: "inverter_over_temperature", dictionary: ["正常", "逆变器过温"] }
]

const labelAndFields3 = [
  { label: "输入线电压(AB)", field: "input_line_voltage_ab", unit: "V" },
  { label: "输入线电压(BC)", field: "input_line_voltage_bc", unit: "V" },
  { label: "输入线电压(CA)", field: "input_line_voltage_ca", unit: "V" },
  { label: "旁路相电压(A)", field: "bypass_phase_voltage_a", unit: "V" },
  { label: "旁路相电压(B)", field: "bypass_phase_voltage_b", unit: "V" },
  { label: "旁路相电压(C)", field: "bypass_phase_voltage_c", unit: "V" },
  { label: "主路输入电流(A)", field: "main_input_current_a", unit: "A" },
  { label: "主路输入电流(B)", field: "main_input_current_b", unit: "A" },
  { label: "主路输入电流(C)", field: "main_input_current_c", unit: "A" },
  { label: "主路输入频率", field: "main_input_frequency", unit: "Hz" },
  { label: "输出相电压(A)", field: "output_phase_voltage_a", unit: "V" },
  { label: "输出相电压(B)", field: "output_phase_voltage_b", unit: "V" },
  { label: "输出相电压(C)", field: "output_phase_voltage_c", unit: "V" },
  { label: "输出频率", field: "output_frequency", unit: "Hz" },
  { label: "输出电流(A)", field: "output_current_a", unit: "V" },
  { label: "输出电流(B)", field: "output_current_b", unit: "V" },
  { label: "输出电流(C)", field: "output_current_c", unit: "V" },
  { label: "输出有功功率(A)", field: "output_active_power_a", unit: "kW" },
  { label: "输出有功功率(B)", field: "output_active_power_b", unit: "kW" },
  { label: "输出有功功率(C)", field: "output_active_power_c", unit: "kW" },
  { label: "输出视在功率(A)", field: "output_apparent_power_a", unit: "VA" },
  { label: "输出视在功率(B)", field: "output_apparent_power_b", unit: "VA" },
  { label: "输出视在功率(C)", field: "output_apparent_power_c", unit: "VA" },
  { label: "输出负载率(A)", field: "output_load_rate_a", unit: "%" },
  { label: "输出负载率(B)", field: "output_load_rate_b", unit: "%" },
  { label: "输出负载率(C)", field: "output_load_rate_c", unit: "%" },
  { label: "历史记录条数", field: "history_records_number", unit: "条" },
  { label: "电池电压", field: "battery_voltage", unit: "V" },
  { label: "电池容量", field: "battery_capacity", unit: "AH" },
  { label: "电池组数", field: "battery_packs_number", unit: "组" },
  { label: "BUS电压", field: "bus_voltage", unit: "V" },
  { label: "电池电流", field: "battery_current", unit: "A" },
  { label: "电池后备时间", field: "battery_backup_time", unit: "分钟" },
]

</script>