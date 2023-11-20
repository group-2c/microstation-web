/*
 * @author: zzp
 * @date: 2023-10-27 18:07:31
 * @fileName: LineProtectiveDevice.vue
 * @filePath: src/views/Unmanned/form/LineProtectiveDevice.vue
 * @description: 线路保护装置
 */
<style lang="less" scoped>
  @import url("./index.less");
</style> 

<template>
  <div>
    <div class="blockItem">
      <div class="conTitle">实时数据</div>
      <div class="retract">
        <x-descriptions :list="labelAndFields" :record="record" :minWidth="100" />
      </div>
    </div>
    <div class="blockItem">
      <bit-data-tidy ref="bitRef" :binaryChs="binaryChs" />
    </div>
    <div class="blockItem">
      <div class="conTitle">SOE事件</div>
      <div class="contentContainer">
        <a-table 
          row-key="id" 
          :columns="columns" 
          :data-source="record.soe_event" 
          :pagination="false"
          :scroll="{ y: 'calc(100vh - 670px)' }" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import BitDataTidy from "./BitDataTidy.vue"

const props = defineProps({ 
  record: {
    type: Object,
    default: {
      soe_event: []
    }
  } 
})

const labelAndFields = [
  { label: "频率", field: "frequency", unit: "Hz" },
  { label: "UA相电压", field: "ua_voltage", unit: "V" },
  { label: "UB相电压", field: "ub_voltage", unit: "V" },
  { label: "UC相电压", field: "uc_voltage", unit: "V" },
  { label: "U0电压", field: "u0_voltage", unit: "V" },
  { label: "I0电流", field: "i0_current", unit: "A" },
  { label: "Ia电流", field: "ia_current", unit: "A" },
  { label: "Ib电流", field: "ib_current", unit: "A" },
  { label: "Ic电流", field: "ic_current", unit: "A" },
  { label: "Uab线电压", field: "uab_voltage", unit: "V" },
  { label: "Ubc线电压", field: "ubc_voltage", unit: "V" },
  { label: "Uca线电压", field: "uca_voltage", unit: "V" },
  { label: "有功功率", field: "active_power", unit: "kW" },
  { label: "无功功率", field: "reactive_power", unit: "kW" },
  { label: "功率因数", field: "power_factor" },
  { label: "U1正序电压", field: "u1_positive_sequence_voltage", unit: "V" },
  { label: "U2负序电压", field: "u2_negative_sequence_voltage", unit: "V" },
  { label: "I2负序电流", field: "i2_negative_sequence_a_current", unit: "V" },
  { label: "SOE总数", field: "soe_total" },
  { label: "SOE指针", field: "soe_pointer" },
  { label: "有功电度低", field: "active_energy_low", unit: "kW" },
  { label: "有功电度高", field: "active_energy_high", unit: "kW" },
  { label: "无功电度低", field: "reactive_energy_low" },
  { label: "无功电度高", field: "reactive_energy_high" },
]

const columns = [  
  { title: "事件含义", dataIndex: "event_meaning", align: "left", ellipsis: true },    
  { title: "事件相关值", dataIndex: "event_value", align: "left", width: 250, ellipsis: true },
  { title: "时 间", dataIndex: "time", align: "left", width: 250, ellipsis: true },
]

const bitRef = ref()
const binaryChs = ref([
  {
    sequence: "40020",
    filed: "status_word_one",
    values: [
      "装置告警",
      "过流I段",
      "过流II段",
      "过流III段",
      "过流加速",
      "零序过流I段",
      "零序过流II段",
      "零序加速",
      "重合闸",
      "PT断线",
      "控回断线",
      "A项接地",
      "B项接地",
      "C项接地",
      "过负荷",
      "定值错"
    ]
  },
  {
    sequence: "40021",
    filed: "status_word_Two",
    values: [
      "装置参数错",
      "精度系数错",
      "FLASH错",
      "低电压",
      "过电压",
      "零序过压",
      "非电量1",
      "失压",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-"
    ]
  },
  {
    sequence: "40022",
    filed: "status_word_Three",
    values: [
      "合位(33)",
      "分位(34)",
      "弹簧未储能(35)",
      "开入4(36)",
      "闭锁重合(37)",
      "开入6(38)",
      "远方控制(39)",
      "手跳(40)",
      "开入9(41)",
      "接地刀/开入10(42)",
      "手车试验位置/开入11/下隔离刀(序号)",
      "手车工作位置/开入12/上隔离刀(序号)",
      "-",
      "-",
      "-",
      "-"
    ]
  }
])

watch(() => props.record, () => {
  bitRef.value.bitDataTidy(props.record)
})
</script>