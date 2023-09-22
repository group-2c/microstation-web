/*
 * @author: zzp
 * @date: 2023-08-29 14:34:44
 * @fileName: EquipmentSearch.vue
 * @filePath: src/views/Dashboard/components/EquipmentSearch.vue
 * @description: 设备查询
 */
<style lang="less" scoped>
 @import url("./index.less");
</style>

<template>
  <div class="equipmentSearch">
    <div class="highLevelTitleBar">
      <i class="searchIcon" />
      <span class="chTitle">设备查询</span>
    </div>
    <div class="contentBar">
      <div class="searchBox">
        <a-input v-model:value="keyword" />
        <div class="searchBtn" @click="searchEquipment">查询设备</div>
      </div>
      <a-table 
        row-key="id"
        class="smallTable"
        :data-source="tableList" 
        :showHeader="false"
        :pagination="false"
      >
        <a-table-column title="" data-index="name" align="left">
          <template v-slot="obj">
            <div :class="`customRow customRow-${obj.record.status}`">
              <div class="icon" />
              <div class="rowBody">
                <div class="eqIcon" />
                <div class="name">{{ obj.record.name }}</div>
                <div class="status">{{ obj.record.status_name }}</div>
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
  // import { dict_deviceStatus } from "_utils/dictionary"
  import Lodash from "lodash"

  const deviceList = ref([])
  const tableList = ref([])
  const keyword = ref("")

  const _getTableList = async () => {
    deviceList.value = [
      {
        name: "设备1",
        status: 1,
        status_name: "在线"
      },
      {
        name: "设备2",
        status: 0,
        status_name: "离线"
      },
      {
        name: "设备3",
        status: 2,
        status_name: "故障"
      }
    ]
    tableList.value = Lodash.cloneDeep(deviceList.value)
  }

  const searchEquipment = () => {
    tableList.value = Lodash.cloneDeep(deviceList.value).filter(x => !keyword.value || x.name.includes(keyword.value))
  }

  onMounted(() => {
    _getTableList()
  })
</script>

