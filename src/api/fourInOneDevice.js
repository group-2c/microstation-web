/*
 * @author: zzp
 * @date: 2023-09-05 15:19:30
 * @fileName: ups.js
 * @filePath: src/api/fourInOneDevice.js
 * @description: RVB-8003型四合一装置
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

class fourInOneDeviceApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/rvb",
      toSubmitFields
    })
  }

}

export default new fourInOneDeviceApi()