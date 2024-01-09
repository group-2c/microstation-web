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
      <x-descriptions :list="labelAndFields" :record="record" :column="5" :minWidth="50" />
    </div>
  </div>
  <div class="blockItem">
    <div class="conTitle">单体电池电压</div>
    <div class="retract">
      <x-descriptions :list="singleBatteryVoltage" :record="singleRecord" :column="5" :minWidth="50" />
    </div>
  </div>
  <div class="blockItem">
    <bit-data-tidy ref="bitRef" :binaryChs="binaryChs" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import BitDataTidy from "./BitDataTidy.vue"

const props = defineProps({ 
  record: Object,
  deviceItem: Object,
  publish: Function
})
const singleBatteryVoltage = ref([])
const singleRecord = ref({})

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

const bitRef = ref()
const binaryChs = ref([
  {
    filed: "switch_input",
    values: [
      "开关量输入S0",
      "开关量输入S1",
      "开关量输入S2",
      "开关量输入S3"
    ]
  },
  {
    filed: "device_status",
    values: [
      "电池组过压",
      "电池组欠压",
      "控母过压",
      "控母欠压",
      "绝缘异常",
      "环境过温",
      "硅链过温",
      "单体电池异常",
      "电池组充电状态",
    ]
  },
  {
    filed: "charging_module_status",
    values: [
      "0#充电模块通信",
      "1#充电模块通信",
      "2#充电模块通信",
      "通信模块通信",
      "电池巡检通信",
      "0#支路检测通信",
      "1#支路检测通信",
      "-",
      "0#充电模块故障",
      "1#充电模块故障",
      "2#充电模块故障"
    ]
  }
])

watch(() => props.record, () => {
  singleBatteryVoltage.value = []
  singleRecord.value = {}

  if(props.record.single_battery_voltage) {
    props.record?.single_battery_voltage.forEach((item, index) => {
      singleRecord.value[`si_${index}`] = item / 100
      singleBatteryVoltage.value.push({ label: `电池${index+1}`, field: `si_${index}`, unit: "V" })
    })
  }

  bitRef.value.bitDataTidy(props.record)
})
</script>