/*
 * @author: zzp
 * @date: 2023-10-27 15:52:20
 * @fileName: AirConditioning.vue
 * @filePath: src/views/Unmanned/form/AirConditioning.vue
 * @description: 空调
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
            <a-button @click.stop="accessControl">{{ record?.system_on_off == "0" ? "开机" : "关机" }}</a-button>
          </div>
        </a-row>
      </div>
    </div>
    <div class="blockItem">
      <div class="conTitle">实时数据</div>
      <div class="retract">
        <x-descriptions :list="labelAndFields" :record="record" />
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
  { label: "柜内温湿度传感器故障", field: "cabinet_temperature_and_humidity_sensor_failure", dictionary: ["无故障", "有故障"] },
  { label: "高湿告警", field: "high_humidity_alarm", dictionary: ["无故障", "有故障"] },
  { label: "低湿告警", field: "low_humidity_alarm", dictionary: ["无故障", "有故障"] },
  { label: "高温告警", field: "high_temperature_alarm", dictionary: ["无故障", "有故障"] },
  { label: "低温告警", field: "low_temperature_alarm", dictionary: ["无故障", "有故障"] },
  { label: "压缩机高/低压报警", field: "compressor_high_low_pressure_alarm", dictionary: ["无故障", "有故障"] },
  { label: "水流报警", field: "water_flow_alarm", dictionary: ["无故障", "有故障"] },
  { label: "压缩机继电器", field: "compressor_relay", dictionary: ["关", "开"] },
  { label: "加热继电器", field: "heating_relay", dictionary: ["关", "开"] },
  { label: "报警继电器", field: "alarm_relay", dictionary: ["关", "开"] },
  { label: "柜内温度", field: "cabinet_temperature", unit: "°C" },
  { label: "柜内湿度", field: "cabinet_humidity", unit: "%RH" },
  { label: "制冷停止温度设定值", field: "cooling_stop_temperature_setting_value", unit: "°C" },
  { label: "制冷回差设定", field: "cooling_return_difference_setting", unit: "°C" },
  { label: "加热停止温度设定值", field: "heating_stop_temperature_setting_value", unit: "°C" },
  { label: "加热回差设定", field: "heating_return_difference_setting", unit: "°C" },
  { label: "除湿停止设定值", field: "dehumidification_stop_setting_value", unit: "%" },
  { label: "除湿回差设定", field: "dehumidification_return_difference_setting", unit: "%" },
  { label: "压缩机最短停机时间", field: "minimum_compressor_shutdown_time", unit: "分钟" },
  { label: "高温报警设定", field: "high_temperature_alarm_setting" },
  { label: "低温报警设定", field: "low_temperature_alarm_setting" },
  { label: "高湿报警设定", field: "high_humidity_alarm_setting" },
  { label: "低湿报警设定", field: "low_humidity_alarm_setting" },
  { label: "高/低压开关输入常开常闭", field: "high_low_voltage_switch_input_normally_open_and_closed", dictionary: ["常闭", "常开"] },
  { label: "水流开关输入常开常闭", field: "water_flow_switch_input_normally_open_and_closed", dictionary: ["常闭", "常开"] },
  { label: "显示方式", field: "display_mode" },
  { label: "摄氏、华氏温度", field: "celsius_fahrenheit_temperature", dictionary: ["摄氏", "华氏"] },
  { label: "最大除湿允许时间", field: "maximum_allowed_dehumidification_time" },
  { label: "RS485 波特率设定", field: "baud_rate" },
  { label: "监控网络串行地址", field: "monitoring_network_serial_address" },
  { label: "除霜设置上限", field: "defrost_setting_upper_limit", unit: "%" },
  { label: "除霜设置下限", field: "defrost_setting_lower_limit", unit: "%" },
  { label: "系统密码", field: "system_password" },
  { label: "恢复出厂设置", field: "restore_factory_settings", dictionary: ["", "恢复出厂设置"] },
  { label: "系统开关机状态", field: "system_on_off", dictionary: ["关机", "开机"] },
]

const accessControl = () => {
  props.publish({ cmd: props.record?.system_on_off == 0 ? 1 : 0 }, 0)
}
</script>