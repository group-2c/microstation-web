/*
 * @author: zzp
 * @date: 2023-10-27 17:04:28
 * @fileName: DoublePowerController.vue
 * @filePath: src/views/Unmanned/form/DoublePowerController.vue
 * @description: 双电源控制器
 */
<style lang="less" scoped>
  @import url("./index.less");
  .controlsBtns {
    margin-top: 3px;
  }
  .minSelect {
    min-width: 120px !important;
  }
</style> 

<template>
  <div>
    <div class="blockItem">
      <div class="conTitle">远程控制</div>
      <div class="retract">
        <a-row>
          <div class="operationItem">
            <label>设置: </label>
            <div class="content">
              <a-select v-model:value="automatic" popupClassName="modalSelect" class="minSelect" style="margin-right: 10px;">
                <a-select-option :value="1">自动</a-select-option>
                <a-select-option :value="2">手动</a-select-option>
                <a-select-option :value="3">切换为手动</a-select-option>
                <a-select-option :value="4">切换为自动</a-select-option>
              </a-select>
            </div>
          </div>
          <div class="operationItem" style="margin-left: 20px;">
            <label>遥测: </label>
            <div class="content">
              <a-select v-model:value="switchType" popupClassName="modalSelect" style="margin-right: 10px;">
                <a-select-option :value="1">自投自复</a-select-option>
                <a-select-option :value="2">自投不自复</a-select-option>
                <a-select-option :value="3">OFF启动</a-select-option>
                <a-select-option :value="4">S1启动</a-select-option>
                <a-select-option :value="5">S2启动</a-select-option>
              </a-select>
            </div>
          </div>
          <div class="controlsBtns" style="margin-left: 20px;">
            <a-button @click.stop="telemetryClick">确定</a-button>
          </div>
        </a-row>
      </div>
    </div>
    <div class="blockItem">
      <div class="conTitle">实时数据</div>
      <div class="retract">
        <x-descriptions :list="labelAndFields" :record="record" :minWidth="130" />
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

const automatic = ref(1)
const switchType = ref(1)

const labelAndFields = [
  { label: "S1开关状态", field: "switch_status_1", dictionary: ["分闸", "合闸"] },
  { label: "S2开关状态", field: "switch_status_2", dictionary: ["分闸", "合闸"] },
  { label: "S3开关状态", field: "switch_status_3", dictionary: ["分闸", "合闸"] },
  { label: "S1故障状态", field: "fault_conditions_1", dictionary: ["正常", "故障"] },
  { label: "S2故障状态", field: "fault_conditions_2", dictionary: ["正常", "故障"] },
  { label: "S3故障状态", field: "fault_conditions_3", dictionary: ["正常", "故障"] },
  { label: "S1远程合闸", field: "remote_closing_1", dictionary: ["正常", "合闸"] },
  { label: "S2远程合闸", field: "remote_closing_2", dictionary: ["正常", "合闸"] },
  { label: "S3远程合闸", field: "remote_closing_3", dictionary: ["正常", "合闸"] },
  { label: "消防状态", field: "fire_status", dictionary: ["正常", "报警"] },
  { label: "新故障标志", field: "new_fault_flag", dictionary: ["无", "有"] },
  { label: "新变位标志", field: "new_displacement_flag", dictionary: ["无", "有"] },
  { label: "S1_UAB", field: "s1_uab", unit: "V" },
  { label: "S1_UBC", field: "s1_ubc", unit: "V" },
  { label: "S1_UCA", field: "s1_uca", unit: "V" },
  { label: "S1F", field: "s1_f", unit: "Hz" },
  { label: "S2_UAB", field: "s2_uab", unit: "V" },
  { label: "S2_UBC", field: "s2_ubc", unit: "V" },
  { label: "S2_UCA", field: "s2_uca", unit: "V" },
  { label: "S2F", field: "s2_f", unit: "Hz" },
  { label: "S3_UAB", field: "s3_uab", unit: "V" },
  { label: "S3_UBC", field: "s3_ubc", unit: "V" },
  { label: "S3_UCA", field: "s3_uca", unit: "V" },
  { label: "S3F", field: "s3_f", unit: "Hz" },
  { label: "短时间并联条件1", field: "parallel_condition_1" },
  { label: "短时间并联条件2", field: "parallel_condition_2" },
  { label: "短时间并联条件3", field: "parallel_condition_3" }
]

const telemetryClick = () => {
  props.publish({ cmd: switchType.value, cmd_type: automatic.value }, 0)
}
</script>