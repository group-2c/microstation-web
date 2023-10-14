/*
 * @author: zzp
 * @date: 2023-09-05 15:19:30
 * @fileName: ups.js
 * @filePath: src/api/electricityMeter.js
 * @description: 多功能电表
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

class electricityMeterApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/electricityMeters",
      toSubmitFields
    })
  }

}

export default new electricityMeterApi()