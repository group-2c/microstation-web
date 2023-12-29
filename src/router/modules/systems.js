/*
 * @author: zzp
 * @date: 2023-11-24 15:34:06
 * @fileName: systems.js
 * @filePath: src/router/modules/systems.js
 * @description: 系统运行
 */
import OperationLog from "@/views/system/OperationLog/index.vue"
import ControlLog from "@/views/system/ControlLog/index.vue"
import LoginLog from "@/views/system/LoginLog/index.vue"
import UserOnline from "@/views/system/UserOnline/index.vue"

const route = {
  path: "system",
  name: "System",
  redirect: "/app/operations/operationLog",
  meta: { title: "系统运行", index: 9 },
  children: [
    {
      path: "operationLog",
      name: "OperationLog",
      component: OperationLog,
      meta: { title: "操作日志", effects: ["delete", "export"] }
    },
    {
      path: "controlLog",
      name: "ControlLog",
      component: ControlLog,
      meta: { title: "控制日志", effects: ["delete", "export"] }
    },
    {
      path: "loginLog",
      name: "LoginLog",
      component: LoginLog,
      meta: { title: "登录日志", effects: ["delete", "export"] }
    },
    {
      path: "userOnline",
      name: "UserOnline",
      component: UserOnline,
      meta: { title: "用户在线", effects: ["delete", "export"] }
    },
  ]
}

export default route
