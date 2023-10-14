/*
 * @author: zzp
 * @date: 2023-08-27 15:25:28
 * @fileName: temperatureEquipment.js
 * @filePath: src/api/temperatureEquipment.js
 * @description: 数显温湿度设备接口
 */
import CommonRestfulModel from "./CommonRestful"
import Lodash from "lodash"

const toSubmitFields = values => {
  return Lodash.pick(values, [
    "id",
    "name",
    "slaveId",
    "baudRate",
    "dataBit",
    "stopBit",
    "parity",
    "controllerId",
    "manufacturer"
  ])
}

class temperatureEquipmentApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/temperatureHumidityEquipments",
      toSubmitFields
    })
  }

}

export default new temperatureEquipmentApi()