/*
 * @author: zzp
 * @date: 2023-09-05 15:12:24
 * @fileName: dryTemperatureController.js
 * @filePath: src/api/dryTemperatureController.js
 * @description: 干变温控器接口
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

class dryTemperatureControllerApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/dry_temperature_controller",
      toSubmitFields
    })
  }

}

export default new dryTemperatureControllerApi()