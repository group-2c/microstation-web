/*
 * @author: zzp
 * @date: 2023-08-27 15:52:05
 * @fileName: waterImmersionSensor.js
 * @filePath: src/api/waterImmersionSensor.js
 * @description: 水浸传感器接口
 */
import CommonRestfulModel from "./CommonRestful"
import Lodash from "lodash"

const toSubmitFields = values => {
  return Lodash.pick(values, [
    "id",
    "name",
    "code",
    "slaveId",
    "baudRate",
    "dataBit",
    "stopBit",
    "parity",
    "controllerId",
    "manufacturer"
  ])
}

class waterImmersionSensorApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/waterImmersionSensors",
      toSubmitFields
    })
  }

}

export default new waterImmersionSensorApi()