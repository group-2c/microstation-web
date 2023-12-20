/*
 * @author: zzp
 * @date: 2023-09-21 15:29:25
 * @fileName: EquipmentStatus.vue
 * @filePath: src/views/Dashboard/components/EquipmentStatus.vue
 * @description: 设备状态
 */
 <style lang="less" scoped>
 @import url("./index.less");
</style>

<template>
  <div class="equipmentStatus">
    <div class="highLevelTitleBar">
      <i class="dynamoIcon" />
      <span class="chTitle">设备状态</span>
    </div>
    <div class="contentBar">
      <div class="progressList">
        <div class="progressItem" v-for="key, index in Object.keys(record)" :key="index" >
          <a-progress 
            type="dashboard" 
            :stroke-width="10" 
            :percent="record[key].scale" 
            :size="[100, 88]" 
            :strokeColor="progressTypes[key].color" 
            trailColor="#1f86ba80"
          >
            <template #format="percent">
              <div class="percentInfo">
                <div class="scale" :style="`color: ${progressTypes[key].color};`">{{ percent }}%</div>
                <div class="label">{{ record[key].number }}<span>台</span></div>
              </div>
            </template>
          </a-progress>
          <div 
            :class="['itemTitle', equipmentType === key ? 'active' : '']" 
            :style="{'--percent-active-color': progressTypes[key].color}"
            @click.stop="equipmentTypeClick(key)"
          >{{ progressTypes[key].title }}</div>
        </div>
      </div>
      <div class="equipmentList">
        <a-table 
          row-key="id"
          class="smallTable"
          :data-source="tableList" 
          :pagination="false"
        >
          <a-table-column title="设备名称" data-index="name" align="left" :ellipsis="true" />
          <a-table-column title="状态" data-index="status" align="right">
            <template v-slot="obj">
              <div :class="['status', `status-${obj.record.status}`]">
                {{ obj.record.statusName }}
              </div>
            </template>
          </a-table-column>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const progressTypes = {
  online: { title: "在线设备", color: "#78E0FB" },
  alarm: { title: "报警设备", color: "#4684F1" },
  offline: { title: "离线设备", color: "#8ED49E" }
}

const record = ref({
  online: {
    scale: 89,
    number: 287
  },
  alarm: {
    scale: 56,
    number: 87
  },
  offline: {
    scale: 89,
    number: 23
  }
})
const equipmentType = ref("online")
const tableList = ref([
  { id: 1, name: "设备11111", status: 0, statusName: "在线" },
  { id: 2, name: "设备11111", status: 1, statusName: "在线" },
  { id: 3, name: "设备11111", status: 2, statusName: "在线" },
])


const equipmentTypeClick = key => {
  equipmentType.value = key
}
</script>