/*
 * @author: zzp
 * @date: 2023-11-27 13:40:14
 * @fileName: organizations.js
 * @filePath: src/api/organizations.js
 * @description: 组织机构接口
 */
import CommonRestfulModel from "./CommonRestful"
import Lodash from "lodash"

const toSubmitFields = values => {
  return Lodash.pick(values, [
    "id",
    "name"
  ])
}

class organizationApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/organizations",
      toSubmitFields
    })
  }

}

export default new organizationApi()