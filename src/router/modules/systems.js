/*
 * @author: zzp
 * @date: 2023-11-24 15:34:06
 * @fileName: systems.js
 * @filePath: src/router/modules/systems.js
 * @description: 系统运行
 */
import OperationLog from "@/views/system/OperationLog/index.vue"
import ControlLog from "@/views/system/ControlLog/index.vue"
import UserMonitoring from "@/views/system/UserMonitoring/index.vue"

const route = {
  path: "system",
  name: "System",
  redirect: "/app/operations/operationLog",
  meta: { title: "系统运行", index: 8 },
  children: [
    {
      path: "operationLog",
      name: "OperationLog",
      component: OperationLog,
      meta: { title: "操作日志" }
    },
    {
      path: "controlLog",
      name: "ControlLog",
      component: ControlLog,
      meta: { title: "控制日志" }
    },
    {
      path: "userMonitoring",
      name: "UserMonitoring",
      component: UserMonitoring,
      meta: { title: "用户在线监测" }
    },
  ]
}

export default route
