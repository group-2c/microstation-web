/*
 * @author: zzp
 * @date: 2023-09-05 15:19:30
 * @fileName: ups.js
 * @filePath: src/api/lineProtectiveDevice.js
 * @description: 线路保护装置
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

class lineProtectiveDeviceApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/lineProtectiveDevice",
      toSubmitFields
    })
  }

}

export default new lineProtectiveDeviceApi()