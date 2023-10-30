/*
 * @author: zzp
 * @date: 2023-10-30 09:36:40
 * @fileName: TransformerProtectionDevice.vue
 * @filePath: src/views/Unmanned/form/TransformerProtectionDevice.vue
 * @description: 变压器保护装置
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
      <div class="conTitle">SOE事件</div>
      <div class="contentContainer">
        <a-table row-key="id" :columns="columns" :data-source="record.soe_event" :pagination="false"
          :scroll="{ y: 'calc(100vh - 680px)' }" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  record: {
    type: Object,
    default: {
      soe_event: []
    }
  }
})

const labelAndFields = [
  { label: "频率", field: "frequency", factor: 50 * 1.2 / 32767, unit: "Hz" },
  { label: "UA相电压", field: "ua_voltage", factor: 100 * 2.4 / 32767, unit: "V" },
  { label: "UB相电压", field: "ub_voltage", factor: 100 * 2.4 / 32767, unit: "V" },
  { label: "UC相电压", field: "uc_voltage", factor: 100 * 2.4 / 32767, unit: "V" },
  { label: "U0电压", field: "u0_voltage", factor: 100 * 2.4 / 32767, unit: "V" },
  { label: "I0电流", field: "i0_current", factor: 5 * 1.2 / 32767, unit: "A" },
  { label: "Ia电流", field: "ia_current", factor: 61 / 32767, unit: "A" },
  { label: "Ib电流", field: "ib_current", factor: 61 / 32767, unit: "A" },
  { label: "Ic电流", field: "ic_current", factor: 61 / 32767, unit: "A" },
  { label: "Uab线电压", field: "uab_voltage", factor: 100 * 2.4 / 32767, unit: "V" },
  { label: "Ubc线电压", field: "ubc_voltage", factor: 100 * 2.4 / 32767, unit: "V" },
  { label: "Uca线电压", field: "uca_voltage", factor: 100 * 2.4 / 32767, unit: "V" },
  { label: "有功功率", field: "active_power", factor: 866 * 1.2 / 32767, unit: "KW" },
  { label: "无功功率", field: "reactive_power", factor: 866 * 1.2 / 32767, unit: "KW" },
  { label: "功率因数", field: "power_factor", factor: 1 / 32767 },
  { label: "U1正序电压", field: "u1_positive_sequence_voltage", factor: 100 * 2.4 / 32767, unit: "V" },
  { label: "U2负序电压", field: "u2_negative_sequence_voltage", factor: 100 * 2.4 / 32767, unit: "V" },
  { label: "I2负序电流", field: "i2_negative_sequence_a_current", factor: 100 / 32767, unit: "A" },
  { label: "SOE总数", field: "soe_total" },
  { label: "SOE指针", field: "soe_pointer" },
  { label: "状态字1", field: "status_word_one" },
  { label: "状态字2", field: "status_word_Two" },
  { label: "状态字3", field: "status_word_Three" },
  { label: "有功电度低", field: "active_energy_low", unit: "KW" },
  { label: "有功电度高", field: "active_energy_high", unit: "KW" },
  { label: "无功电度低", field: "reactive_energy_low" },
  { label: "无功电度高", field: "reactive_energy_high" },
]

const columns = [
  { title: "事件含义", dataIndex: "event_meaning", align: "left", ellipsis: true },
  { title: "事件相关值", dataIndex: "event_value", align: "left", width: 250, ellipsis: true },
  { title: "时间", dataIndex: "time", align: "left", width: 250, ellipsis: true },
]
</script>