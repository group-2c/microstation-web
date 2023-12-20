/*
 * @author: zzp
 * @date: 2023-09-05 15:19:30
 * @fileName: ups.js
 * @filePath: src/api/dieselEngine.js
 * @description: 柴油发动机
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

class dieselEngineApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/dieselEngines",
      toSubmitFields
    })
  }

}

export default new dieselEngineApi()