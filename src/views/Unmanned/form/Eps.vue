/*
 * @author: zzp
 * @date: 2023-10-27 17:13:03
 * @fileName: Eps.vue
 * @filePath: src/views/Unmanned/form/Eps.vue
 * @description: EPS
 */
<style lang="less" scoped>
  @import url("./index.less");
</style> 

<template>
  <div class="blockItem">
    <div class="conTitle">实时数据</div>
    <div class="retract">
      <x-descriptions :list="labelAndFields" :record="record" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ record: Object })

const labelAndFields = [
  { label: "充电输入线电压AB", field: "charging_input_line_voltage_ab" },
  { label: "充电输入线电压BC", field: "charging_input_line_voltage_bc" },
  { label: "充电输入线电压CA", field: "charging_input_line_voltage_ca" },
  { label: "交流输出相电压A", field: "ac_output_phase_voltage_a" },
  { label: "交流输出相电压B", field: "ac_output_phase_voltage_b" },
  { label: "交流输出相电压C", field: "ac_output_phase_voltage_c" },
  { label: "交流输出电流A", field: "ac_output_current_a" },
  { label: "交流输出电流B", field: "ac_output_current_b" },
  { label: "交流输出电流C", field: "ac_output_current_c" },
  { label: "直流输入电压(电池电压)", field: "input_voltage" },
  { label: "输出频率(三相一致)", field: "frequency" },
  {
    label: "供电方式", field: "power_supply_mode", dictionary: {
      "01H": "逆变供电",
      "02H": "市电供电",
      "E9H": "均不供电",
    }
  },
  {
    label: "电池自检中", field: "battery_self_checking", dictionary: {
      "E0H": "自检中",
      "E1H": "没在自检",
    }
  },
  {
    label: "均充/浮充(正组)", field: "equalization_float_charging", dictionary: {
      "E0H": "浮充",
      "E1H": "均充",
      "E2H": "非充电"
    }
  },
  {
    label: "开机/关机", field: "turn_on_off", dictionary: {
      "E0H": "关机",
      "E1H": "开机"
    }
  },
  {
    label: "逆变供电", field: "inverter_power_supply", dictionary: {
      "E0H": "充电器逆变供电",
      "E1H": "电池逆变供电",
      "E2H": "联合逆变供电",
      "E3H": "市电电池均不供电"
    }
  },
  {
    label: "发电机接入", field: "generator_connection", dictionary: {
      "E0H": "已接入",
      "E1H": "没接入",
    }
  },
  {
    label: "充电开关状态", field: "charging_switch_status", dictionary: {
      "E0H": "断开",
      "E1H": "闭合",
    }
  },
  {
    label: "维修开关状态", field: "maintenance_switch_status", dictionary: {
      "E0H": "断开",
      "E1H": "闭合",
    }
  },
  {
    label: "市电开关状态", field: "mains_switch_status", dictionary: {
      "E0H": "断开",
      "E1H": "闭合",
    }
  },
  {
    label: "输出开关状态", field: "output_switch_status", dictionary: {
      "E0H": "断开",
      "E1H": "闭合",
    }
  },
  {
    label: "旋转开关状态", field: "rotary_switch_status", dictionary: {
      "E0H": "关闭",
      "E1H": "测试",
      "E2H": "正常",
      "E3H": "市电",
      "E4H": "维修"
    }
  },
  {
    label: "滤波器状态", field: "filter_status", dictionary: {
      "E0H": "未接入",
      "E1H": "已接入",
    }
  },
  {
    label: "逆变器同步/不同步", field: "inverter_synchronous_or_asynchronous", dictionary: {
      "00H": "正常",
      "03H": "不同步",
    }
  },
  {
    label: "充电器电压", field: "charger_voltage", dictionary: {
      "00H": "正常",
      "F0H": "异常",
    }
  },
  {
    label: "充电器封锁", field: "charger_voltage_charger_blocked", dictionary: {
      "00H": "正常",
      "F0H": "故障",
    }
  },
  {
    label: "逆变输出电压", field: "inverter_output_voltage", dictionary: {
      "00H": "正常",
      "F0H": "异常",
    }
  },
  {
    label: "市电情况(电压或频率)", field: "electricity_situation", dictionary: {
      "00H": "正常",
      "E0H": "超限",
    }
  },
  {
    label: "蓄电池总电压状态", field: "battery_total_voltage_status", dictionary: {
      "00H": "正常",
      "01H": "低于下限(关机点)",
      "02H": "高于上限(电压过高)",
      "F0H": "电池无",
      "E1H": "预告警",
      "E2H": "电池接反"
    }
  },
  { label: "标示电池数量m", field: "indicate_number_of_batteries" },
  { label: "用户自定义告警数量为56", field: "user_defined_number_of_alarms" },
  {
    label: "充电输入频率异常", field: "charging_input_frequency", dictionary: {
      "00H": "正常",
      "E0H": "超限",
    }
  },
  {
    label: "充电器熔丝", field: "charger_fuse_broken", dictionary: {
      "00H": "正常",
      "F0H": "断",
    }
  },
  {
    label: "单机过载超时", field: "single_machine_overload_timeout", dictionary: {
      "00H": "正常"
    }
  },
  {
    label: "市电异常关机", field: "abnormal_shutdown_of_mains_power", dictionary: {
      "00H": "正常",
      "F0H": "异常",
    }
  },
  {
    label: "交流输出过压", field: "ac_output_over_voltage", dictionary: {
      "00H": "正常",
      "F0H": "故障",
    }
  },
  {
    label: "逆变器过流", field: "inverter_over_current", dictionary: {
      "00H": "正常",
      "F0H": "故障",
    }
  },
  {
    label: "市电相序反", field: "reverse_phase_sequence_of_mains_supply", dictionary: {
      "00H": "正常",
      "F0H": "故障",
    }
  },
]
</script>