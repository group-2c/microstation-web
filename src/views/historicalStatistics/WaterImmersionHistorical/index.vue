/*
 * @author: zzp
 * @date: 2023-12-26 13:20:00
 * @fileName: index.vue
 * @filePath: src/views/historicalStatistics/WaterImmersionHistorical/index.vue
 * @description: 水浸传感器历史数据统计
 */
<template>
  <layout-list 
    deviceLabel="水浸设备"
    :columns="columns"
    :deviceOApi="waterImmersionSensorApi"
    :oApi="waterImmersionHistoricalApi"
    :chart1Colors="['#ebc039', '#bb2d0f']"
    :chart2Colors="['#23f0f8']"
    :chartDataProcess="chartDataProcess"
    :tableDataProcess="tableDataProcess"
  />
</template>
 
<script setup>
import { ref } from "vue"
import { dict_deviceStatus } from "_utils/dictionary"
import { waterImmersionHistoricalApi } from "_api/historicalStatistics"
import waterImmersionSensorApi from "_api/waterImmersionSensor"
import LayoutList from "../components/LayoutList.vue"

const columns = ref([
  { title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1, fixed: "left" },
  { title: "设备名称", dataIndex: "deviceName", width: 120, ellipsis: true },
  { title: "设备状态", dataIndex: "status", width: 100, ellipsis: true },
  { title: "工作电流", dataIndex: "workCurrent", width: 100, align: "center", ellipsis: true },
  { title: "泄漏电流", dataIndex: "leakCurrent", width: 100, align: "center", ellipsis: true },
  { title: "泄漏阻抗", dataIndex: "leakImpedance", width: 100, align: "center", ellipsis: true },
  { title: "采集时间", dataIndex: "time", width: 180, ellipsis: true }
])

const chartDataProcess = (data, callback) => {
  callback(
    [
      { name: "工作电流", data: data.map(x => x.workCurrent) },
      { name: "泄漏电流", data: data.map(x => x.leakCurrent) }
    ],
    [{ name: "泄漏阻抗", data: data.map(x => x.leakImpedance) }]
  )
}

const tableDataProcess = (data, callback) => {
  callback(data.map(item => {
    item.statusName = dict_deviceStatus.find(x => x.key === item.status)?.value
    return item
  }))
}
</script>