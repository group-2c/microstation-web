/*
 * @author: zzp
 * @date: 2023-09-05 10:22:53
 * @fileName: operations.js
 * @filePath: src/router/modules/operations.js
 * @description: 基础数据路由
 */
import User from "@/views/operations/User/index.vue"
import Controller from "@/views/operations/Controller/index.vue"
import TemperatureEquipment from "@/views/operations/TemperatureEquipment/index.vue"
import WaterImmersionSensor from "@/views/operations/WaterImmersionSensor/index.vue"

const route = {
  path: "operations",
  name: "Operations",
  redirect: "/app/operations/user",
  meta: { title: "基础数据", icon: "AppstoreOutlined", index: 6 },
  children: [
    {
      path: "user",
      name: "User",
      component: User,
      meta: { title: "用户管理" }
    },
    {
      path: "controller",
      name: "Controller",
      component: Controller,
      meta: { title: "微站控制器" }
    },
    {
      path: "temperatureEquipment",
      name: "TemperatureEquipment",
      component: TemperatureEquipment,
      meta: { title: "数显温湿度设备" }
    },
    {
      path: "waterImmersionSensor",
      name: "WaterImmersionSensor",
      component: WaterImmersionSensor,
      meta: { title: "水浸传感器" }
    }
  ]
}

export default route
