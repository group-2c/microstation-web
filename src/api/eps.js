/*
 * @author: zzp
 * @date: 2023-09-05 15:22:08
 * @fileName: eps.js
 * @filePath: src/api/eps.js
 * @description: EPS电源
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

class epsApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/eps",
      toSubmitFields
    })
  }

}

export default new epsApi()