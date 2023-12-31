/*
 * @author: zzp
 * @date: 2023-09-05 10:25:25
 * @fileName: others.js
 * @filePath: src/router/modules/others.js
 * @description: 其他路由
 */
import RealTimeVideo from "@/views/RealTimeVideo/index.vue"
import Unmanned from "@/views/Unmanned/index.vue"
import AlarmManagement from "@/views/AlarmManagement/index.vue"

const route = [
  { 
    path: "unmanned", 
    name: "Unmanned",
    component: Unmanned,
    meta: { title: "无人微站", index: 1, disableBreadcrumb: true },
  },
  { 
    path: "realTimeVideo", 
    name: "RealTimeVideo",
    component: RealTimeVideo,
    meta: { title: "实时视频", index: 4 },
  },
  { 
    path: "alarmManagement", 
    name: "AlarmManagement",
    component: AlarmManagement,
    meta: { title: "报警管理", index: 5 },
  },
]

export default route