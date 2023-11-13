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
import ElectricityMeter from "@/views/operations/ElectricityMeter/index.vue"
import AccessControlController from "@/views/operations/AccessControlController/index.vue"
import AirConditioning from "@/views/operations/AirConditioning/index.vue"
import Camera from "@/views/operations/Camera/index.vue"
import DieselEngine from "@/views/operations/DieselEngine/index.vue"
import FourInOneDevice from "@/views/operations/FourInOneDevice/index.vue"
import LineProtectiveDevice from "@/views/operations/LineProtectiveDevice/index.vue"
import ReactivePowerCompensator from "@/views/operations/ReactivePowerCompensator/index.vue"
import TelemetryUnit from "@/views/operations/TelemetryUnit/index.vue"
import TransformerProtectionDevice from "@/views/operations/TransformerProtectionDevice/index.vue"
import SvgManagement from "@/views/operations/SvgManagement/index.vue"

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
    },
    {
      path: "electricityMeter",
      name: "ElectricityMeter",
      component: ElectricityMeter,
      meta: { title: "多功能电表" }
    },
    {
      path: "telemetryUnit",
      name: "TelemetryUnit",
      component: TelemetryUnit,
      meta: { title: "遥信遥测单元" }
    },
    {
      path: "transformerProtectionDevice",
      name: "TransformerProtectionDevice",
      component: TransformerProtectionDevice,
      meta: { title: "变压器保护装置" }
    },
    {
      path: "lineProtectiveDevice",
      name: "LineProtectiveDevice",
      component: LineProtectiveDevice,
      meta: { title: "线路保护装置" }
    },
    {
      path: "fourInOneDevice",
      name: "FourInOneDevice",
      component: FourInOneDevice,
      meta: { title: "局方监测装置" }
    },
    {
      path: "dieselEngine",
      name: "DieselEngine",
      component: DieselEngine,
      meta: { title: "柴油发动机" }
    },
    {
      path: "reactivePowerCompensator",
      name: "ReactivePowerCompensator",
      component: ReactivePowerCompensator,
      meta: { title: "无功补偿器" }
    },
    {
      path: "camera",
      name: "Camera",
      component: Camera,
      meta: { title: "摄像机" }
    },
    {
      path: "accessControlController",
      name: "AccessControlController",
      component: AccessControlController,
      meta: { title: "门禁控制器" }
    },
    {
      path: "airConditioning",
      name: "AirConditioning",
      component: AirConditioning,
      meta: { title: "空调" }
    },
    {
      path: "svgManagement",
      name: "SvgManagement",
      component: SvgManagement,
      meta: { title: "配电图管理" }
    }
  ]
}

export default route
