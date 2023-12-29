/*
 * @author: zzp
 * @date: 2023-12-04 13:37:12
 * @fileName: siteMonitoring.js
 * @filePath: src/router/modules/siteMonitoring.js
 * @description: 微站监控
 */
import DistributionMonitoring from "@/views/siteMonitoring/DistributionMonitoring/index.vue"
import PowerMonitoring from "@/views/siteMonitoring/PowerMonitoring/index.vue"

const route = {
  path: "siteMonitoring",
  name: "SiteMonitoring",
  redirect: "/app/siteMonitoring/distributionMonitoring",
  meta: { title: "微站监控", index: 3 },
  children: [
    { 
      path: "distributionMonitoring", 
      name: "DistributionMonitoring",
      component: DistributionMonitoring,
      meta: { title: "配电监控", effects: [] },
    },
    {
      path: "powerMonitoring",
      name: "PowerMonitoring",
      component: PowerMonitoring,
      meta: { title: "电力监控", effects: [] },
    },
  ]
}

export default route
