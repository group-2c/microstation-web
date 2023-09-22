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
import Screen from "@/views/operations/Screen/index.vue"
import Inverter from "@/views/operations/Inverter/index.vue"
import DryTemperatureController from "@/views/operations/DryTemperatureController/index.vue"
import DoublePowerController from "@/views/operations/DoublePowerController/index.vue"
import Ups from "@/views/operations/UPS/index.vue"
import Eps from "@/views/operations/EPS/index.vue"

const route = {
  path: "operations",
  name: "Operations",
  redirect: "/app/operations/user",
  meta: { title: "基础数据", index: 6 },
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
    },
    {
      path: "screen",
      name: "Screen",
      component: Screen,
      meta: { title: "直流屏" }
    },
    {
      path: "inverter",
      name: "Inverter",
      component: Inverter,
      meta: { title: "逆变器" }
    },
    {
      path: "dryTemperatureController",
      name: "DryTemperatureController",
      component: DryTemperatureController,
      meta: { title: "干变温控器" }
    },
    {
      path: "doublePowerController",
      name: "DoublePowerController",
      component: DoublePowerController,
      meta: { title: "双电源控制器" }
    },
    {
      path: "ups",
      name: "Ups",
      component: Ups,
      meta: { title: "UPS电源" }
    },
    {
      path: "eps",
      name: "Eps",
      component: Eps,
      meta: { title: "EPS电源" }
    }
  ]
}

export default route
