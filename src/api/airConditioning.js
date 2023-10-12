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
    "slave_id",
    "baud_rate",
    "data_bit",
    "stop_bit",
    "parity",
    "controller_id",
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