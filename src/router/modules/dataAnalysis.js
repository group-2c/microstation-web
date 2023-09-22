/*
 * @author: zzp
 * @date: 2023-09-05 10:24:12
 * @fileName: dataAnalysis.js
 * @filePath: src/router/modules/dataAnalysis.js
 * @description: 数据分析路由
 */
import TemperatureEquipmentValue from "@/views/dataAnalysis/TemperatureEquipmentValue/index.vue"
import WaterImmersionSensorValue from "@/views/dataAnalysis/WaterImmersionSensorValue/index.vue"

const route = {
  path: "dataAnalysis",
  name: "DataAnalysis",
  redirect: "/app/dataAnalysis/temperatureEquipmentValue",
  meta: { title: "数据分析", index: 4 },
  children: [
    {
      path: "temperatureEquipmentValue",
      name: "TemperatureEquipmentValue",
      component: TemperatureEquipmentValue,
      meta: { title: "数显温湿度设备数据" },
    },
    {
      path: "waterImmersionSensorValue",
      name: "WaterImmersionSensorValue",
      component: WaterImmersionSensorValue,
      meta: { title: "水浸传感器数据" },
    },
  ]
}

export default route
