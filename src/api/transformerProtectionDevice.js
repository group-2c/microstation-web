/*
 * @author: zzp
 * @date: 2023-09-05 15:19:30
 * @fileName: ups.js
 * @filePath: src/api/transformerProtectionDevice.js
 * @description: 变压器保护装置
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

class transformerProtectionDeviceApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/transformerProtectionDevices",
      toSubmitFields
    })
  }

}

export default new transformerProtectionDeviceApi()