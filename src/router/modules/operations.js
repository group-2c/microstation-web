/*
 * @author: zzp
 * @date: 2023-09-05 10:22:53
 * @fileName: operations.js
 * @filePath: src/router/modules/operations.js
 * @description: 基础数据路由
 */
import User from "@/views/operations/User/index.vue"
import CircuitManage from "@/views/operations/CircuitManage/index.vue"
import ProjectManage from "@/views/operations/ProjectManage/index.vue"

const route = {
  path: "operations",
  name: "Operations",
  redirect: "/app/operations/user",
  meta: { title: "基础数据", index: 7 },
  children: [
    {
      path: "user",
      name: "User",
      component: User,
      meta: { title: "用户管理" }
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
    }
  ]
}

export default route
