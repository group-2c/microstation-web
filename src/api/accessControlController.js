/*
 * @author: zzp
 * @date: 2023-09-05 15:19:30
 * @fileName: ups.js
 * @filePath: src/api/accessControlController.js
 * @description: 门禁控制器
 */
import CommonRestfulModel from "./CommonRestful"
import Lodash from "lodash"

const toSubmitFields = values => {
  return Lodash.pick(values, [
    "id",
    "name",
    "ip",
    "controllerId",
    "manufacturer"
  ])
}

class accessControlControllerApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/accessControlControllers",
      toSubmitFields
    })
  }

}

export default new accessControlControllerApi()