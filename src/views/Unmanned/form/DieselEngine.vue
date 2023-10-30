/*
 * @author: zzp
 * @date: 2023-10-27 16:43:59
 * @fileName: DieselEngine.vue
 * @filePath: src/views/Unmanned/form/DieselEngine.vue
 * @description: 柴油发动机
 */
<style lang="less" scoped>
  @import url("./index.less");
</style> 

<template>
  <div class="dieselEngine">
    <div class="blockItem">
      <div class="conTitle">远程控制</div>
      <div class="retract">
        <a-row>
          <div class="operationItem">
            <label>选择命令: </label>
            <div class="content">
              <a-select v-model:value="currentValue" popupClassName="modalSelect">
                <a-select-option v-for="item, index in commandOptions" :key="index" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </div>
          </div>
          <div class="controlsBtns">
            <a-button @click.stop="accessControl(0)">否</a-button>
            <a-button @click.stop="accessControl(1)">是</a-button>
          </div>
        </a-row>
      </div>
    </div>
    <div class="blockItem">
      <div class="conTitle">实时数据</div>
      <div class="retract">
        <x-descriptions :list="labelAndFields" :record="record" :minWidth="200" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({ 
  record: Object,
  publish: Function
})

const currentValue = ref(1)

const commandOptions = [
  { label: "遥控油机处于开机状态", value: 1 },
  { label: "遥控油机处于停机状态", value: 2 },
  { label: "遥控油机处于试机状态", value: 3 },
  { label: "遥控油机处于自动状态", value: 4 },
  { label: "遥控油机处于手动状态", value: 5 },
  { label: "遥控油机发电合/分闸", value: 6 },
  { label: "遥控油机市电合/分闸", value: 7 },
  { label: "遥控油机发电分闸", value: 8 },
  { label: "遥控油机发电合闸", value: 9 }
]

const labelAndFields = [
  { label: "公共报警", field: "common_alarm", dictionary: ["否", "报警"] },
  { label: "公共警告报警", field: "public_warning_alarm", dictionary: ["否", "报警"] },
  { label: "公共停机报警", field: "public_shutdown_alarm", dictionary: ["否", "报警"] },
  { label: "远程模式", field: "remote_mode", dictionary: ["否", "是"] },
  { label: "市电带负载", field: "mains_load", dictionary: ["否", "负载"] },
  { label: "发电带负载", field: "power_generation_load", dictionary: ["否", "负载"] },
  { label: "紧急停机", field: "emergency_stop", dictionary: ["否", "停机"] },
  { label: "超速报警停机", field: "over_speed_alarm_shutdown", dictionary: ["否", "停机"] },
  { label: "欠速报警停机", field: "under_speed_alarm_shutdown", dictionary: ["否", "停机"] },
  { label: "速度信号丢失停机", field: "speed_signal_loss_shutdown", dictionary: ["否", "停机"] },
  { label: "超频报警停机", field: "over_frequency_alarm_shutdown", dictionary: ["否", "停机"] },
  { label: "欠频报警停机", field: "under_frequency_alarm_shutdown", dictionary: ["否", "停机"] },
  { label: "过压报警停机", field: "over_voltage_alarm_shutdown", dictionary: ["否", "停机"] },
  { label: "欠压报警停机", field: "under_voltage_alarm_shutdown", dictionary: ["否", "停机"] },
  { label: "发电过流停机", field: "power_generation_over_current_shutdown", dictionary: ["否", "停机"] },
  { label: "起动失败", field: "fail_start", dictionary: ["否", "失败"] },
  { label: "水温高报警停机", field: "high_water_temperature_alarm_shutdown", dictionary: ["否", "停机"] },
  { label: "油压低报警停机", field: "low_oil_pressure_alarm_shutdown", dictionary: ["否", "停机"] },
  { label: "频率丢失报警", field: "frequency_loss_alarm", dictionary: ["否", "报警"] },
  { label: "输入口停机报警", field: "input_port_shutdown_alarm", dictionary: ["否", "报警"] },
  { label: "燃油位低停机报警", field: "low_fuel_level_shutdown_alarm", dictionary: ["否", "报警"] },
  { label: "冷却液低停机报警", field: "low_coolant_shutdown_alarm", dictionary: ["否", "报警"] },
  { label: "水温高警告报警", field: "high_water_temperature_warning_alarm", dictionary: ["否", "报警"] },
  { label: "油压低警告报警", field: "low_oil_pressure_warning_alarm", dictionary: ["否", "报警"] },
  { label: "发电过流警告报警", field: "power_generation_over_current_warning_alarm", dictionary: ["否", "报警"] },
  { label: "停机失败警告报警", field: "shutdown_failure_warning_alarm", dictionary: ["否", "报警"] },
  { label: "油位低警告", field: "low_oil_level_warning", dictionary: ["否", "警告"] },
  { label: "充电失败警告", field: "charging_failure_warning", dictionary: ["否", "警告"] },
  { label: "电池电压过低警告报警", field: "low_battery_voltage_warning_alarm", dictionary: ["否", "警告"] },
  { label: "电池电压过高警告报警", field: "high_battery_voltage_warning_alarm", dictionary: ["否", "警告"] },
  { label: "输入口警告报警", field: "input_port_warning_alarm", dictionary: ["否", "警告"] },
  { label: "速度信号丢失警告", field: "speed_signal_loss_warning", dictionary: ["否", "警告"] },
  { label: "冷却液低警告", field: "low_coolant_warning", dictionary: ["否", "警告"] },
  { label: "温度传感器开路警告", field: "temperature_sensor_open_circuit_warning", dictionary: ["否", "警告"] },
  { label: "油压传感器开路警告", field: "oil_pressure_sensor_open_circuit_warning", dictionary: ["否", "警告"] },
  { label: "维护时间到警告", field: "maintenance_time_warning", dictionary: ["否", "警告"] },
  { label: "充电器充电失败警告", field: "charger_charging_failure_warning", dictionary: ["否", "警告"] },
  { label: "过功率警告", field: "over_power_warning", dictionary: ["否", "警告"] },
  { label: "系统在测试模式", field: "system_testing_mode", dictionary: ["否", "是"] },
  { label: "系统在自动模式", field: "system_automatic_mode", dictionary: ["否", "是"] },
  { label: "系统在手动模式", field: "system_manual_mode", dictionary: ["否", "是"] },
  { label: "系统在停机模式", field: "system_shutdown_mode", dictionary: ["否", "是"] },
  { label: "温度传感器器开路停机", field: "temperature_sensor_open_circuit_shutdown", dictionary: ["否", "停机"] },
  { label: "油压传感器开路停机", field: "oil_pressure_sensor_open_circuit_shutdown", dictionary: ["否", "停机"] },
  { label: "维护时间到停机报警", field: "maintenance_time_shutdown_alarm", dictionary: ["否", "报警"] },
  { label: "过功率停机报警", field: "over_power_shutdown_alarm", dictionary: ["否", "报警"] },
  { label: "紧急停机输入", field: "emergency_stop_input", dictionary: ["否", "是"] },
  { label: "可编程输入口1", field: "programmable_input_port_1", dictionary: ["否", "是"] },
  { label: "可编程输入口2", field: "programmable_input_port_2", dictionary: ["否", "是"] },
  { label: "可编程输入口3", field: "programmable_input_port_3", dictionary: ["否", "是"] },
  { label: "可编程输入口4", field: "programmable_input_port_4", dictionary: ["否", "是"] },
  { label: "可编程输入口5", field: "programmable_input_port_5", dictionary: ["否", "是"] },
  { label: "起动继电器输出", field: "start_relay_output", dictionary: ["否", "是"] },
  { label: "燃油继电器输出", field: "fuel_relay_output", dictionary: ["否", "是"] },
  { label: "可编程输出口1", field: "programmable_output_port_1", dictionary: ["否", "是"] },
  { label: "可编程输出口2", field: "programmable_output_port_2", dictionary: ["否", "是"] },
  { label: "可编程输出口3", field: "programmable_output_port_3", dictionary: ["否", "是"] },
  { label: "可编程输出口4", field: "programmable_output_port_4", dictionary: ["否", "是"] },
  { label: "市电故障", field: "mains_power_failure", dictionary: ["否", "故障"] },
  { label: "市电正常", field: "mains_power_normal", dictionary: ["否", "是"] },
  { label: "市电过压", field: "mains_over_voltage", dictionary: ["否", "是"] },
  { label: "市电欠压", field: "under_voltage_mains_supply", dictionary: ["否", "是"] },
  { label: "市电缺相", field: "mains_phase_failure", dictionary: ["否", "是"] },
  { label: "发电正常", field: "power_generation_normal", dictionary: ["否", "是"] },
  { label: "发电过压", field: "power_generation_over_voltage", dictionary: ["否", "是"] },
  { label: "发电欠压", field: "under_voltage_power_generation", dictionary: ["否", "是"] },
  { label: "发电过频", field: "over_frequency_power_generation", dictionary: ["否", "是"] },
  { label: "发电欠频", field: "under_frequency_power_generation", dictionary: ["否", "是"] },
  { label: "发电过流警告", field: "power_generation_over_current_warning", dictionary: ["否", "警告"] },
  { label: "定时不开机时间内", field: "within_timed_off_time", dictionary: ["否", "是"] },
  { label: "ECU 警告", field: "ecu_warning", dictionary: ["否", "警告"] },
  { label: "ECU 停机报警", field: "ecu_shutdown_alarm", dictionary: ["否", "报警"] },
  { label: "ECU 通信失败报警", field: "ecu_communication_failure_alarm", dictionary: ["否", "报警"] },
  { label: "市电 UA", field: "commercial_power_ua" },
  { label: "市电 UB", field: "commercial_power_ub" },
  { label: "市电 UC", field: "commercial_power_uc" },
  { label: "市电 UAB", field: "commercial_power_uab" },
  { label: "市电 UBC", field: "commercial_power_ubc" },
  { label: "市电 UCA", field: "commercial_power_uca" },
  { label: "市电频率", field: "commercial_power_frequency", factor: 10 },
  { label: "发电 UA", field: "power_generation_ua" },
  { label: "发电 UB", field: "power_generation_ub" },
  { label: "发电 UC", field: "power_generation_uc" },
  { label: "发电 UAB", field: "power_generation_uab" },
  { label: "发电 UBC", field: "power_generation_ubc" },
  { label: "发电 UCA", field: "power_generation_uca" },
  { label: "发电频率", field: "power_generation_frequency", factor: 10 },
  { label: "A 相电流", field: "a_phase_current" },
  { label: "B 相电流", field: "b_phase_current" },
  { label: "C 相电流", field: "c_phase_current" },
  { label: "水温温度值", field: "water_temperature_value" },
  { label: "水温电阻值", field: "water_temperature_resistance_value" },
  { label: "油压值", field: "oil_pressure_value" },
  { label: "油压电阻值", field: "oil_pressure_resistance_value" },
  { label: "液位值", field: "liquid_level_value" },
  { label: "液位电阻值", field: "liquid_level_resistance_value" },
  { label: "转速", field: "speed" },
  { label: "电池电压", field: "battery_voltage", factor: 10 },
  { label: "D+电压", field: "d_voltage", factor: 10 },
  { label: "有功功率", field: "active_power" },
  { label: "无功功率", field: "reactive_power" },
  { label: "视在功率", field: "apparent_power" },
  { label: "功率因数", field: "power_factor", factor: 100 },
  { label: "维护倒计时小时", field: "maintenance_countdown_hours" },
  { label: "维护倒计时分", field: "maintain_countdown_minutes" },
  { label: "控制器运行状态", field: "controller_operation_status", dictionary: ["待机", "预热", "燃油输出", "起动", "起动间隔", "安全延时", "开机怠速", "高速暖机", "等待帯载", "正常运行", "高速散热", "停机怠速", "得电停机", "等待停稳", "停机失败"] },
  { label: "控制器运行延时", field: "delay_1" },
  { label: "自动运行状态", field: "automatic_operation_status", dictionary: ["开机", "停机", "无延时"] },
  { label: "自动运行延时", field: "delay_2" },
  { label: "ATS运行状态", field: "ats_operation_status", dictionary: ["无延时", "转换间隔"] },
  { label: "ATS运行延时", field: "delay_3" },
  { label: "市电状态", field: "mains_status", dictionary: ["正常", "异常", "无延时"] },
  { label: "市电延时", field: "delay_4" },
  { label: "油机运行累计计时(小时) 高位", field: "oil_engine_operation_accumulated_timing_high" },
  { label: "油机运行累计计时(小时) 低位", field: "oil_engine_operation_accumulated_timing_low" },
  { label: "油机运行累计计时(分钟)", field: "oil_engine_operation_accumulated_minute" },
  { label: "油机运行累计计时(秒种)", field: "oil_engine_operation_accumulated_second" },
  { label: "累计开机次数 高位", field: "accumulated_startup_times_high" },
  { label: "累计开机次数 低位", field: "accumulated_startup_times_low" },
  { label: "累计电能 高位", field: "accumulated_electrical_energy_high" },
  { label: "累计电能 低位", field: "accumulated_electrical_energy_low" },
  { label: "软件版本", field: "software_version", factor: 10 },
  { label: "A相有功功率", field: "a_phase_active_power" },
  { label: "B相有功功率", field: "b_phase_active_power" },
  { label: "C相有功功率", field: "c_phase_active_power" },
  { label: "负载输出百分比", field: "load_output_percentage" },
  { label: "冷却液位", field: "cooling_level" },
  { label: "机油温度", field: "oil_temperature" },
  { label: "冷却液压力", field: "coolant_pressure" },
  { label: "燃油压力", field: "fuel_pressure" },
  { label: "燃油温度", field: "fuel_temperature" },
  { label: "进气口温度", field: "air_inlet_temperature" },
  { label: "排气口温度", field: "exhaust_port_temperature" },
  { label: "涡轮压力", field: "turbine_pressure" },
  { label: "燃油消耗", field: "fuel_consumption" },
  { label: "累计燃油消耗", field: "accumulated_fuel_consumption" },
  { label: "单片机内部温度", field: "microcontroller_internal_temperature" },
  { label: "控制器型号", field: "controller_model" },
  { label: "控制器时间", field: "controller_time" },
  { label: "发布日期", field: "release_date" }
]

const accessControl = type => {
  props.publish({
    cmd: currentValue.value, 
    cmd_type: type
  }, 0)
}
</script>