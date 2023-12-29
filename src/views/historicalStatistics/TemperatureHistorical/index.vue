/*
 * @author: zzp
 * @date: 2023-12-26 10:56:10
 * @fileName: index.vue
 * @filePath: src/views/historicalStatistics/TemperatureHistorical/index.vue
 * @description: 温湿度历史数据统计
 */
<template>
  <layout-list 
    deviceLabel="温湿度设备"
    :columns="columns"
    :deviceOApi="temperatureEquipmentApi"
    :oApi="temperatureHumidityHistoricalApi"
    :chartDataProcess="chartDataProcess"
  />
</template>
 
<script setup>
import { ref } from "vue"
import { temperatureHumidityHistoricalApi } from "_api/historicalStatistics"
import temperatureEquipmentApi from "_api/temperatureEquipment"
import LayoutList from "../components/LayoutList.vue"

const columns = ref([
  { title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1, fixed: "left" },
  { title: "设备名称", dataIndex: "deviceName", width: 150 },
  { title: "温度", dataIndex: "temperature" },
  { title: "湿度", dataIndex: "humidity" },
  { title: "采集时间", dataIndex: "time" }
])

const chartDataProcess = (data, callback) => {
  callback(
    [{ name: "温度", data: data.map(x => x.temperature) }],
    [{ name: "湿度", data: data.map(x => x.humidity) }]
  )
}
</script>