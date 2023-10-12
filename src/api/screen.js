/*
 * @author: zzp
 * @date: 2023-09-05 15:01:11
 * @fileName: screen.js
 * @filePath: src/api/screen.js
 * @description: 直流屏接口
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

class screenApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/screens",
      toSubmitFields
    })
  }

}

export default new screenApi()