/*
 * @author: zzp
 * @date: 2023-12-26 13:52:39
 * @fileName: historical.js
 * @filePath: src/router/modules/historical.js
 * @description: 历史数据分析
 */
import TemperatureHistorical from "@/views/historicalStatistics/TemperatureHistorical/index.vue"
import WaterImmersionHistorical from "@/views/historicalStatistics/WaterImmersionHistorical/index.vue"
import DryTemperatureHistorical from "@/views/historicalStatistics/DryTemperatureHistorical/index.vue"
import ScreenHistorical from "@/views/historicalStatistics/ScreenHistorical/index.vue"

const route = {
  path: "historicalAnalysis",
  name: "HistoricalAnalysis",
  redirect: "/app/historicalAnalysis/steadyCurve",
  meta: { title: "历史分析", index: 7 },
  children: [
    {
      path: "temperatureHistorical",
      name: "TemperatureHistorical",
      component: TemperatureHistorical,
      meta: { title: "温湿度数据" },
    },
    {
      path: "waterImmersionHistorical",
      name: "WaterImmersionHistorical",
      component: WaterImmersionHistorical,
      meta: { title: "水浸传感器数据" },
    },
    {
      path: "dryTemperatureHistorical",
      name: "DryTemperatureHistorical",
      component: DryTemperatureHistorical,
      meta: { title: "干变温控器数据" },
    },
    {
      path: "screenHistorical",
      name: "ScreenHistorical",
      component: ScreenHistorical,
      meta: { title: "直流屏数据" },
    },
  ]
}

export default route
