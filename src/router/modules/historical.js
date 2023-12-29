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
import InverterHistorical from "@/views/historicalStatistics/InverterHistorical/index.vue"
import RvbHistorical from "@/views/historicalStatistics/RvbHistorical/index.vue"
import UpsHistorical from "@/views/historicalStatistics/UpsHistorical/index.vue"
import AirHistorical from "@/views/historicalStatistics/AirHistorical/index.vue"
import EpsHistorical from "@/views/historicalStatistics/EpsHistorical/index.vue"
import ReactiveHistorical from "@/views/historicalStatistics/ReactiveHistorical/index.vue"
import TransformerHistorical from "@/views/historicalStatistics/TransformerHistorical/index.vue"
import LineHistorical from "@/views/historicalStatistics/LineHistorical/index.vue"

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
      meta: { title: "温湿度数据", effects: [] },
    },
    {
      path: "waterImmersionHistorical",
      name: "WaterImmersionHistorical",
      component: WaterImmersionHistorical,
      meta: { title: "水浸传感器数据", effects: [] },
    },
    {
      path: "dryTemperatureHistorical",
      name: "DryTemperatureHistorical",
      component: DryTemperatureHistorical,
      meta: { title: "干变温控器数据", effects: [] },
    },
    {
      path: "screenHistorical",
      name: "ScreenHistorical",
      component: ScreenHistorical,
      meta: { title: "直流屏数据", effects: [] },
    },
    {
      path: "inverterHistorical",
      name: "InverterHistorical",
      component: InverterHistorical,
      meta: { title: "逆变器数据", effects: [] },
    },
    {
      path: "rvbHistorical",
      name: "RvbHistorical",
      component: RvbHistorical,
      meta: { title: "RVB数据", effects: [] },
    },
    {
      path: "upsHistorical",
      name: "UpsHistorical",
      component: UpsHistorical,
      meta: { title: "UPS数据", effects: [] },
    },
    {
      path: "airHistorical",
      name: "AirHistorical",
      component: AirHistorical,
      meta: { title: "空调数据", effects: [] },
    },
    {
      path: "epsHistorical",
      name: "EpsHistorical",
      component: EpsHistorical,
      meta: { title: "EPS数据", effects: [] },
    },
    {
      path: "reactiveHistorical",
      name: "ReactiveHistorical",
      component: ReactiveHistorical,
      meta: { title: "无功补偿器数据", effects: [] },
    },
    {
      path: "transformerHistorical",
      name: "TransformerHistorical",
      component: TransformerHistorical,
      meta: { title: "变压保护装置数据", effects: [] },
    },
    {
      path: "lineHistorical",
      name: "LineHistorical",
      component: LineHistorical,
      meta: { title: "线路保护装置数据", effects: [] },
    },
  ]
}

export default route

