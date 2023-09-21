/*
 * @author: zzp
 * @date: 2023-09-21 09:36:42
 * @fileName: EventInformation.vue
 * @filePath: src/views/Dashboard/components/EventInformation.vue
 * @description: 事件信息
 */
<style lang="less" scoped>
 @import url("./index.less");
</style>

<template>
  <div class="eventInformation">
    <div class="highLevelTitleBar">
      <i class="informationIcon" />
      <span class="chTitle">事件信息</span>
    </div>
    <div class="contentBar">
      <a-table 
        row-key="id"
        class="smallTable"
        :data-source="tableList" 
        :showHeader="false"
        :pagination="false"
      >
        <a-table-column title="" data-index="description" align="left" width="220px" :ellipsis="true">
          <template v-slot="obj">
            <div class="decoration">
              <div class="icon" />
              <span :style="`color: ${obj.record.color}; padding-left: 5px;`">{{ obj.record.description }}</span>
            </div>
            <div class="lineFeed">
              {{ obj.record.device_name }}
            </div>
          </template>
        </a-table-column>
        <a-table-column title="" data-index="time" align="left">
          <template v-slot="obj">
            <div class="independent lineFeed">
              {{ obj.record.time }}
            </div>
          </template>
        </a-table-column>
      </a-table>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue"
  // import { message } from "ant-design-vue"

  const tableList = ref([])

  const _getTableList = async () => {
    tableList.value = [
      {
        id: 1,
        description: "事件1",
        device_name: "微站1",
        time: "2023-09-08 13:02:01"
      },
      {
        id: 2,
        description: "事件2",
        device_name: "微站2",
        time: "2023-09-08 13:02:01"
      }
    ]
  }
  onMounted(() => {
    _getTableList()
  })
</script>



