/*
 * @author: zzp
 * @date: 2023-08-19 22:30:58
 * @fileName: dictionary.js
 * @filePath: src/utils/dictionary.js
 * @description: 数据字典
 */

export const dict_manufacturers = [
  { key: "1", value: "大连科技公司1" },
  { key: "2", value: "安徽科技公司2" },
  { key: "3", value: "北京科技公司3" }
]

export const dict_deviceStatus = [
  { key: 0, value: "离线" },
  { key: 1, value: "在线" },
  { key: 2, value: "故障" }
]

export const dict_controller_equipment_model = [
  { key: "1", value: "V1.0" },
  { key: "2", value: "V2.0" },
]

export const dict_camera_types = [
  { key: 1, value: "普通" },
  { key: 2, value: "通话" },
  { key: 3, value: "云台" }
]

export const dict_unmanned_equipment = {
  access_control_controller: {
    name: "门禁控制器",
    drawerWidth: 950,
    subKey: "microstation:$microstation_id:accesscontrol:$equipment_id:status",
    controlSubKeys: [
      "microstation:$microstation_id:accesscontrol:$accesscontrol_id:remotecontrol"
    ]
  },
  air_conditioning: {
    name: "空调",
    subKey: "microstation:$microstation_id:airconditioning:$equipment_id:status",
    controlSubKeys: [
      "microstation:$microstation_id:airconditioning:$equipment_id:remotecontrol"
    ]
  },
  camera: {
    name: "摄像机",
    drawerWidth: 550,
    subKey: "microstation:$microstation_id:camera:$equipment_id:online"
  },
  dc_screen: {
    name: "直流屏",
    subKey: "microstation:$microstation_id:dcsreen:$equipment_id:status"
  },
  diesel_engine: {
    name: "柴油发动机",
    drawerWidth: 1200,
    subKey: "microstation:$microstation_id:dieselEngine:$equipment_id:status",
    controlSubKeys: [
      "microstation:$microstation_id:dieselEngine:$equipment_id:remotecontrol"
    ]
  },
  double_power_controller: {
    name: "双电源控制器",
    drawerWidth: 850,
    subKey: "microstation:$microstation_id:doublepowercontroller:$equipment_id:status",
    controlSubKeys: [
      "microstation:$microstation_id:doublepowercontroller:$equipment_id:remotecontrol"
    ]
  },
  dry_temperature_controller: {
    name: "干变温控器",
    drawerWidth: 450,
    subKey: "microstation:$microstation_id:drytemperaturecontroller:$equipment_id:status"
  },
  electricity_meter: {
    name: "多功能电表",
    subKey: "microstation:$microstation_id:electricitymeter:$equipment_id:status",
    controlSubKeys: [
      "microstation:$microstation_id:electricitymeter:$equipment_id:remotecontrol"
    ]
  },
  eps: {
    name: "EPS电源",
    subKey: "microstation:$microstation_id:eps:$equipment_id:status"
  },
  ups: {
    name: "UPS电源",
    drawerWidth: 1400,
    subKey: "microstation:$microstation_id:ups:$equipment_id:status"
  },
  inverter: {
    name: "逆变器",
    drawerWidth: 600,
    subKey: "microstation:$microstation_id:inverter:$equipment_id:status",
    controlSubKeys: [
      "microstation:$microstation_id:inverter:$equipment_id:remotecontrol"
    ]
  },
  line_protective_device: {
    name: "线路保护装置",
    subKey: "microstation:$microstation_id:linepotectivedevice:$equipment_id:status"
  },
  reactive_power_compensator: {
    name: "无功补偿器",
    subKey: "microstation:$microstation_id:reactivepowercompensator:$equipment_id:status"
  },
  rvb: {
    name: "局放监测装置",
    subKey: "microstation:$microstation_id:rvb:$equipment_id:status"
  },
  telemetry_unit: {
    name: "遥信遥测单元",
    drawerWidth: 600,
    subKey: "microstation:$microstation_id:telemetryunit:$equipment_id:status"
  },
  temperature_humidity_equipment: {
    name: "数显温湿度器",
    drawerWidth: 600,
    subKey: "microstation:$microstation_id:temperaturehumidityequipment:$equipment_id:status"
  },
  transformer_protection_device: {
    name: "变压器保护装置",
    subKey: "microstation:$microstation_id:transformerprotectiondevice:$equipment_id:status"
  },
  water_immersion_sensor: {
    name: "水浸传感器",
    drawerWidth: 600,
    subKey: "microstation:$microstation_id:waterimmersionsensor:$equipment_id:status"
  }
}

export const mistakesColors = ["有故障", "故障", "失败", "负载", "异常", "停机失败"]
export const offlineColors = ["常闭", "关", "关机", "关闭"]
export const warnColors = ["警告", "报警", "停机", "超限"]

export const dict_svg_device_types = [
  { key: "electricity_meter", value: "多功能电表" },
  { key: "line_protective_device", value: "线路保护装置" },
  { key: "transformer_protection_device", value: "变压器保护装置" }
]
