/*
 * @author: zzp
 * @date: 2023-09-05 15:15:56
 * @fileName: doublePowerController.js
 * @filePath: src/api/doublePowerController.js
 * @description: 双电源控制器接口 
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

class doublePowerControllerApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/doublePowerControllers",
      toSubmitFields
    })
  }

}

export default new doublePowerControllerApi()