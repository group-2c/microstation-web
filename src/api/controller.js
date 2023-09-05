/*
 * @author: zzp
 * @date: 2023-08-27 15:02:56
 * @fileName: controller.js
 * @filePath: src/api/controller.js
 * @description: 微站控制器接口
 */
import CommonRestfulModel from "./CommonRestful.js"
import Lodash from "lodash"

const toSubmitFields = values => {
  return Lodash.pick(values, [
    "id",
    "name",
    "code",
    "ip",
    "longitude",
    "latitude",
    "location",
    "manufacturer",
    "installation_date"
  ])
}

class ControllerApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/controllers",
      toSubmitFields
    })
  }

}

export default new ControllerApi()