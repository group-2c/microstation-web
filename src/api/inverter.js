/*
 * @author: zzp
 * @date: 2023-09-05 15:09:59
 * @fileName: inverter.js
 * @filePath: src/api/inverter.js
 * @description: 逆变器接口
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
    "controller_code",
    "manufacturer"
  ])
}

class inverterApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/inverters",
      toSubmitFields
    })
  }

}

export default new inverterApi()