/*
 * @author: zzp
 * @date: 2023-08-27 15:44:02
 * @fileName: temperatureEquipmentValue.js
 * @filePath: src/api/temperatureEquipmentValue.js
 * @description: 数显温湿度设备数据接口
 */
import CommonRestfulModel from "./CommonRestful"
import Lodash from "lodash"

class TemperatureEquipmentValueApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/temperatureEquipmentValue"
    })
  }
}

export default new TemperatureEquipmentValueApi()