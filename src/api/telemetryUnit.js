/*
 * @author: zzp
 * @date: 2023-09-05 15:19:30
 * @fileName: ups.js
 * @filePath: src/api/telemetryUnit.js
 * @description: 遥信遥测单元
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

class telemetryUnitApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/telemetryUnits",
      toSubmitFields
    })
  }

}

export default new telemetryUnitApi()