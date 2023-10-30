/*
 * @author: zzp
 * @date: 2023-10-27 14:27:30
 * @fileName: DryTemperatureController.vue
 * @filePath: src/views/Unmanned/form/DryTemperatureController.vue
 * @description: 干变温控器 
 */
<style lang="less" scoped>
  @import url("./index.less");
</style> 

<template>
  <div class="dryTemperatureController">
    <div class="blockItem">
      <div class="conTitle">状 态 字</div>
      <div class="retract">
        <div :class="['statusItem', item.status == 0 ? 'fault' : '']" v-for="item, index in record.status_words" :key="index">
          <i></i>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="blockItem">
      <div class="conTitle">实时数据</div>
      <div class="retract">
        <a-row :gutter="40">
          <a-col :span="12">
            <div class="recordItem">
              <label>A相温度: </label> <div class="content">{{ record.temperature_a || 0 }}<span>°C</span></div>
            </div>
          </a-col>
          <a-col :span="12">
            <div class="recordItem">
              <label>B相温度: </label> <div class="content">{{ record.temperature_b || 0 }}<span>°C</span></div>
            </div>
          </a-col>
          <a-col :span="24">
            <div class="recordItem">
              <label>C相温度: </label> <div class="content">{{ record.temperature_c || 0 }}<span>°C</span></div>
            </div>
          </a-col>
          <a-col :span="24">
            <div class="recordItem">
              <label style="margin-left: -18px;">定时开风机: </label> <div class="content">{{ record.timing ? "是" : "否" }}</div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  deviceItem: {
    type: Object,
    default: {}
  },
  record: {
    type: Object,
    default: {}
  }
})
</script>