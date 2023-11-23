/*
 * @author: zzp
 * @date: 2023-11-18 16:13:24
 * @fileName: equipments.js
 * @filePath: src/router/modules/equipments.js
 * @description: 设备管理路由
 */
import Controller from "@/views/equipments/Controller/index.vue"
import TemperatureEquipment from "@/views/equipments/TemperatureEquipment/index.vue"
import WaterImmersionSensor from "@/views/equipments/WaterImmersionSensor/index.vue"
import Screen from "@/views/equipments/Screen/index.vue"
import Inverter from "@/views/equipments/Inverter/index.vue"
import DryTemperatureController from "@/views/equipments/DryTemperatureController/index.vue"
import DoublePowerController from "@/views/equipments/DoublePowerController/index.vue"
import Ups from "@/views/equipments/UPS/index.vue"
import Eps from "@/views/equipments/EPS/index.vue"
import ElectricityMeter from "@/views/equipments/ElectricityMeter/index.vue"
import AccessControlController from "@/views/equipments/AccessControlController/index.vue"
import AirConditioning from "@/views/equipments/AirConditioning/index.vue"
import Camera from "@/views/equipments/Camera/index.vue"
import DieselEngine from "@/views/equipments/DieselEngine/index.vue"
import FourInOneDevice from "@/views/equipments/FourInOneDevice/index.vue"
import LineProtectiveDevice from "@/views/equipments/LineProtectiveDevice/index.vue"
import ReactivePowerCompensator from "@/views/equipments/ReactivePowerCompensator/index.vue"
import TelemetryUnit from "@/views/equipments/TelemetryUnit/index.vue"
import TransformerProtectionDevice from "@/views/equipments/TransformerProtectionDevice/index.vue"

const route = {
  path: "equipments",
  name: "Equipments",
  redirect: "/app/equipments/controller",
  meta: { title: "设备管理", index: 6 },
  children: [
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
      meta: { title: "局放监测装置" }
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
    }
  ]
}

export default route
