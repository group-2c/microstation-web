/*
 * @author: zzp
 * @date: 2023-09-05 10:24:12
 * @fileName: dataAnalysis.js
 * @filePath: src/router/modules/dataAnalysis.js
 * @description: 数据分析路由
 */
import SteadyCurve from "@/views/dataAnalysis/SteadyCurve/index.vue"

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
    }
  ]
}

export default route
