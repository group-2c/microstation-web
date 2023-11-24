/*
 * @author: zzp
 * @date: 2023-10-27 17:57:51
 * @fileName: Inverter.vue
 * @filePath: src/views/Unmanned/form/Inverter.vue
 * @description: 逆变器
 */
<style lang="less" scoped>
@import url("./index.less");
</style> 

<template>
  <div class="inverter">
    <div class="blockItem">
      <div class="conTitle">远程控制</div>
      <div class="retract">
        <a-row>
          <div class="operationItem">
            <label>输出方式: </label>
            <div class="content">
              <a-select v-model:value="outputType" popupClassName="modalSelect">
                <a-select-option :value="1">市电主输出</a-select-option>
                <a-select-option :value="2">逆变主输出</a-select-option>
              </a-select>
            </div>
          </div>
          <div class="controlsBtns">
            <a-button @click.stop="accessControlOutput">设置</a-button>
          </div>
        </a-row>
        <a-row style="margin-top: 20px;">
          <div class="operationItem">
            <label>远程开关机设置: </label>
            <div class="content">
              <a-select v-model:value="powerType" popupClassName="modalSelect">
                <a-select-option :value="1">开机</a-select-option>
                <a-select-option :value="2">关机</a-select-option>
              </a-select>
            </div>
          </div>
          <div class="controlsBtns">
            <a-button @click.stop="accessControlPower">设置</a-button>
          </div>
        </a-row>
      </div>
    </div>
    <div class="blockItem">
      <div class="conTitle">实时数据</div>
      <div class="retract">
        <a-row :gutter="30">
          <a-col :span="12">
            <bit-data-tidy ref="bitRef" :binaryChs="binaryChs" :spanNum="24" />
          </a-col>
          <a-col :span="12">
            <x-descriptions :list="labelAndFields" :record="record" :column="1" :minWidth="200" />
          </a-col>
        </a-row>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import BitDataTidy from "./BitDataTidy.vue"

const props = defineProps({
  record: Object,
  publish: Function
})

const outputType = ref(1)
const powerType = ref(1)

const labelAndFields = [
  { label: "直流电压", field: "dc_voltage", unit: "V" },
  { label: "市电电压", field: "mains_voltage", unit: "V" },
  { label: "市电频率", field: "mains_frequency", unit: "Hz" },
  { label: "工作频率", field: "working_frequency", unit: "Hz" },
  { label: "输出电压", field: "output_voltage", unit: "V" },
  { label: "输出电流", field: "output_current", unit: "A" },
  { label: "温度", field: "temperature", unit: "°" },
  { label: "设备地址", field: "device_address" },
  { label: "软件版本信息", field: "software_version_information" }
]

const bitRef = ref()
const binaryChs = ref([
  {
    filed: "status_information_1",
    values: [
      "输入异常报警信息",
      "输入过压报警信息",
      "输入欠压报警信息",
      "市电异常报警信息",
      "市电过压报警信息",
      "市电欠压报警信息",
      "-",
      "-",
      "过温告警信息",
      "过载告警信息",
      "逆变异常信息",
      {"0": "逆变", "1": "市电"},
      {"0": "开机", "1": "关机"},
      "输出短路信息",
      "-",
      "-"
    ]
  }
])

watch(() => props.record, () => {
  bitRef.value.bitDataTidy(props.record)
})

const accessControlOutput = () => {
  props.publish({ cmd: outputType.value, cmd_type: 0 }, 0)
}

const accessControlPower = () => {
  props.publish({ cmd: powerType.value, cmd_type: 1 }, 0)
}
</script>