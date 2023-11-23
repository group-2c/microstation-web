/*
 * @author: zzp
 * @date: 2023-10-30 09:28:09
 * @fileName: TelemetryUnit.vue
 * @filePath: src/views/Unmanned/form/TelemetryUnit.vue
 * @description: 遥信遥测单元
 */
<style lang="less" scoped>
  @import url("./index.less");
</style> 

<template>
  <div class="telemetryUnit">
    <div class="blockItem">
      <div class="conTitle">输入状态</div>
      <div class="retract">
        <a-row>
          <a-col v-for="item, index in record.input" :key="index" :span="2">
            <div :class="['inItem', item == '0' ? 'close' : 'open']">
              <div class="left">{{ index + 1 }}路</div>
              <div class="right">{{ item == '0' ? "关" : "开" }}</div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="blockItem">
      <div class="conTitle">实时数据</div>
      <div class="retract">
        <x-descriptions :list="labelAndFields" :record="record" :column="2" :minWidth="100" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ record: Object })

const labelAndFields = [
  { label: "仪表识别码", field: "meter_identification_code" },
  { label: "版本号", field: "version_no" },
  { label: "地址", field: "address" },
  { label: "波特率", field: "baud_rate" },
  { label: "校验模式", field: "parity_mode" },
  { label: "第1路继电器", field: "relay_1" },
  { label: "第2路继电器", field: "relay_2" }
]
</script>