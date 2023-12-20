/*
 * @author: zzp
 * @date: 2023-09-05 10:22:53
 * @fileName: operations.js
 * @filePath: src/router/modules/operations.js
 * @description: 基础数据路由
 */
import User from "@/views/operations/User/index.vue"
import Role from "@/views/operations/Role/index.vue"
import Organization from "@/views/operations/Organization/index.vue"
import CircuitManage from "@/views/operations/CircuitManage/index.vue"
import ProjectManage from "@/views/operations/ProjectManage/index.vue"
import PowerMonitoringModel from "@/views/operations/PowerMonitoringModel/index.vue"
import TunnelStations from "@/views/operations/TunnelStations/index.vue"
import Tunnels from "@/views/operations/Tunnels/index.vue"

const route = {
  path: "operations",
  name: "Operations",
  redirect: "/app/operations/user",
  meta: { title: "基础数据", index: 8 },
  children: [
    {
      path: "user",
      name: "User",
      component: User,
      meta: { title: "用户管理" }
    },
    {
      path: "role",
      name: "Role",
      component: Role,
      meta: { title: "角色管理" }
    },
    {
      path: "organization",
      name: "Organization",
      component: Organization,
      meta: { title: "组织机构管理" }
    },
    {
      path: "circuitManage",
      name: "CircuitManage",
      component: CircuitManage,
      meta: { title: "配电图管理" }
    },
    {
      path: "projectManage",
      name: "ProjectManage",
      component: ProjectManage,
      meta: { title: "项目管理" }
    },
    {
      path: "tunnelStations",
      name: "TunnelStations",
      component: TunnelStations,
      meta: { title: "隧管站管理" }
    },
    {
      path: "tunnels",
      name: "Tunnels",
      component: Tunnels,
      meta: { title: "隧道管理" }
    },
    {
      path: "powerMonitoringModel",
      name: "PowerMonitoringModel",
      component: PowerMonitoringModel,
      meta: { title: "变电微站模型" }
    }
  ]
}

export default route
