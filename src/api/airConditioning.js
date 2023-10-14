/*
 * @author: zzp
 * @date: 2023-09-05 15:19:30
 * @fileName: ups.js
 * @filePath: src/api/airConditioning.js
 * @description: 空调
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

class airConditioningApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/airConditioning",
      toSubmitFields
    })
  }

}

export default new airConditioningApi()