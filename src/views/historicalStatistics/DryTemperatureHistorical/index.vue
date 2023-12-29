/*
 * @author: zzp
 * @date: 2023-12-27 09:57:51
 * @fileName: index.vue
 * @filePath: src/views/historicalStatistics/DryTemperatureHistorical/index.vue
 * @description: 干变温控器历史数据统计
 */
<template>
  <layout-list 
    deviceLabel="干变温控器"
    :columns="columns"
    :deviceOApi="dryTemperatureControllerApi"
    :oApi="dryTemperatureApi"
    :chartDataProcess="chartDataProcess"
    :tableDataProcess="tableDataProcess"
    :chartNumber="1"
    :chartGrid="chartGrid"
    :chart1Colors="['#ebc039', '#bb2d0f', '#23f0f8']"
    yAxisName1="°C"
  />
</template>
 
<script setup>
import { ref } from "vue"
import { dict_deviceStatus } from "_utils/dictionary"
import { dryTemperatureApi } from "_api/historicalStatistics"
import dryTemperatureControllerApi from "_api/dryTemperatureController"
import LayoutList from "../components/LayoutList.vue"
import dayjs from "dayjs"

const columns = ref([
  { title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1, fixed: "left" },
  { title: "采集时间", dataIndex: "time", width: 110, ellipsis: true },
  { title: "A相温度(°C)", dataIndex: "a", align: "center", width: 110, ellipsis: true },
  { title: "B相温度(°C)", dataIndex: "b", align: "center", width: 110, ellipsis: true },
  { title: "C相温度(°C)", dataIndex: "c", align: "center", width: 110, ellipsis: true },
  { title: "状态", dataIndex: "statusName", width: 90, ellipsis: true }
])

const chartGrid = {
  top: "12%",
  left: "2%",
  right: "3%",
  bottom: "3%",
  containLabel: true
}

const chartDataProcess = (data, callback) => {
  callback(
    [
      { name: "A相温度", data: data.map(x => x.a) }, 
      { name: "B相温度", data: data.map(x => x.b) },
      { name: "C相温度", data: data.map(x => x.c) }
    ]
  )
}

const tableDataProcess = (data, callback) => {
  callback(data.map(item => {
    item.time = dayjs(item.time).format("MM-DD HH:mm")
    item.statusName = dict_deviceStatus.find(x => x.key === item.status)?.value
    return item
  }))
}
</script>