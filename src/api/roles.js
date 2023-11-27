/*
 * @author: zzp
 * @date: 2023-11-27 09:45:43
 * @fileName: roles.js
 * @filePath: src/api/roles.js
 * @description: 角色
 */
import CommonRestfulModel from "./CommonRestful"
import Lodash from "lodash"

const toSubmitFields = values => {
  return Lodash.pick(values, [
    "id",
    "name",
    "owns"
  ])
}

class roleApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/roles",
      toSubmitFields
    })
  }

}

export default new roleApi()