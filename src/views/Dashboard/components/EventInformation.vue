/*
 * @author: zzp
 * @date: 2023-09-21 09:36:42
 * @fileName: EventInformation.vue
 * @filePath: src/views/Dashboard/components/EventInformation.vue
 * @description: 报警信息
 */
<style lang="less" scoped>
 @import url("./index.less");
</style>

<template>
  <div class="eventInformation">
    <div class="highLevelTitleBar">
      <i class="informationIcon" />
      <span class="chTitle">报警信息</span>
    </div>
    <div class="contentBar">
      <a-table 
        row-key="id"
        class="eventTable"
        :data-source="tableList" 
        :showHeader="false"
        :pagination="false"
      >
        <a-table-column title="" data-index="name" align="left">
          <template v-slot="obj">
            <div :class="`customRow customRow-${obj.record.status}`">
              <div class="icon" />
              <div class="rowBody">
                <div class="title">{{ obj.record.description }}</div>
                <div class="lineFeed">
                  <div class="name">{{ obj.record.deviceName }}</div>
                  <div class="time">{{ obj.record.time }}</div>
                </div>
              </div>
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
        deviceName: "微站1",
        status: 1,
        time: "2023-09-08 13:02:01"
      },
      {
        id: 2,
        description: "事件2",
        deviceName: "微站2",
        status: 2,
        time: "2023-09-08 13:02:01"
      },
      {
        id: 3,
        description: "事件3",
        deviceName: "微站3",
        status: 3,
        time: "2023-09-08 13:02:01"
      },
      {
        id: 4,
        description: "事件4",
        deviceName: "微站4",
        status: 1,
        time: "2023-09-08 13:02:01"
      },
      {
        id: 5,
        description: "事件5",
        deviceName: "微站5",
        status: 3,
        time: "2023-09-08 13:02:01"
      },
    ]
  }
  onMounted(() => {
    _getTableList()
  })
</script>



