/*
 * @author: zzp
 * @date: 2023-09-05 10:24:12
 * @fileName: dataAnalysis.js
 * @filePath: src/router/modules/dataAnalysis.js
 * @description: 数据分析路由
 */
import SteadyCurve from "@/views/dataAnalysis/SteadyCurve/index.vue"
import HarmonicCurve from "@/views/dataAnalysis/HarmonicCurve/index.vue"
import LoadCurve from "@/views/dataAnalysis/LoadCurve/index.vue"
import SoeEvent from "@/views/dataAnalysis/SoeEvent/index.vue"
import PowerQuality from "@/views/dataAnalysis/PowerQuality/index.vue"
import MicrositeEnergy from "@/views/dataAnalysis/MicrositeEnergy/index.vue"
import MicrositeEnergyCompare from "@/views/dataAnalysis/MicrositeEnergyCompare/index.vue"
import MicrositeEnergyRing from "@/views/dataAnalysis/MicrositeEnergyRing/index.vue"
import ElectricityCollection from "@/views/dataAnalysis/ElectricityCollection/index.vue"
import TemperatureMonitoring from "@/views/dataAnalysis/TemperatureMonitoring/index.vue"

const route = {
  path: "dataAnalysis",
  name: "DataAnalysis",
  redirect: "/app/dataAnalysis/steadyCurve",
  meta: { title: "数据分析", index: 6 },
  children: [
    {
      path: "steadyCurve",
      name: "SteadyCurve",
      component: SteadyCurve,
      meta: { title: "稳态曲线" },
    },
    {
      path: "harmonicCurve",
      name: "HarmonicCurve",
      component: HarmonicCurve,
      meta: { title: "谐波曲线" },
    },
    {
      path: "loadCurve",
      name: "LoadCurve",
      component: LoadCurve,
      meta: { title: "负荷曲线" },
    },
    {
      path: "soeEvent",
      name: "SoeEvent",
      component: SoeEvent,
      meta: { title: "SOE事件" },
    },
    {
      path: "powerQuality",
      name: "PowerQuality",
      component: PowerQuality,
      meta: { title: "电能质量" },
    },
    {
      path: "micrositeEnergy",
      name: "MicrositeEnergy",
      component: MicrositeEnergy,
      meta: { title: "微站能耗" },
    },
    {
      path: "micrositeEnergyCompare",
      name: "MicrositeEnergyCompare",
      component: MicrositeEnergyCompare,
      meta: { title: "微站能耗同比" },
    },
    {
      path: "micrositeEnergyRing",
      name: "MicrositeEnergyRing",
      component: MicrositeEnergyRing,
      meta: { title: "微站能耗环比" },
    },
    {
      path: "electricityCollection",
      name: "ElectricityCollection",
      component: ElectricityCollection,
      meta: { title: "用电集抄" },
    },
    {
      path: "temperatureMonitoring",
      name: "TemperatureMonitoring",
      component: TemperatureMonitoring,
      meta: { title: "温湿度监测分析" },
    },
  ]
}

export default route
