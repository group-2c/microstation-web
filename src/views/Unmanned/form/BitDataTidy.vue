/*
 * @author: zzp
 * @date: 2023-11-20 13:54:05
 * @fileName: BitDataTidy.vue
 * @filePath: src/views/Unmanned/form/BitDataTidy.vue
 * @description: 状态字表格
 */
<template>
  <div class="contentContainer">
    <a-row :gutter="30">
      <template v-for="item, index in binaryChs">
        <a-col :span="props.spanNum">
          <div class="conTitle" v-if=" item.sequence">寄存器号{{ item.sequence }}</div>
          <a-table 
            row-key="id" 
            :columns="statusColumns" 
            :data-source="binaryData[index]" 
            :pagination="false"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'statusName'">
                <div :class="['sequenceStatus', !record.noColor ? `sequence-${record.status}` : '']">
                  {{ record.statusName }}
                </div>
              </template>
            </template>
          </a-table>
        </a-col>
      </template>
    </a-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const props = defineProps({
  spanNum: {
    type: Number,
    default: 8
  },
  binaryChs: Array
})

const binaryData = ref([])

const statusColumns = ref([
  { title: "序列", dataIndex: "bit", align: "left", width: 80 },
  { title: "状态", dataIndex: "statusName", align: "left" },
])

const bitDataTidy = record => {
  props.binaryChs.forEach((item, num) => {
    if(record[item.filed]) {
      const array = []
      Object.values(record[item.filed].split("")).forEach((value, index) => {
        const _isObj = Object.prototype.toString.call(item.values[index]) === '[object Object]'
        array.push({
          bit: `Bit${index}`,
          status: Number(value),
          noColor: _isObj,
          statusName: _isObj ? item.values[index][value] : item.values[index]
        })
      })
      binaryData.value[num] = array
    }
  })
}

onMounted(() => {
  Array(props.binaryChs.length).fill(0).forEach(() => {
    binaryData.value.push([])
  })
})

defineExpose({ bitDataTidy })
</script>

<style lang="less" scoped>
.conTitle {
  color: #DFF6FE;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
}
.sequenceStatus {
  &.sequence-1 {
    color: red;
  }
}
</style>