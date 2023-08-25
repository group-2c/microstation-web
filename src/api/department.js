/*
 * @author: zzp
 * @date: 2023-08-17 13:07:22
 * @fileName: department.js
 * @filePath: src/api/department.js
 * @description: 部门接口
 */
import CommonRestfulModel from "./CommonRestful"
import Lodash from "lodash"

const toSubmitFields = values => {
  return Lodash.pick(values, [
    "id",
    "name"
  ])
}

class DepartmentApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/departments",
      toSubmitFields
    })
  }

}

export default new DepartmentApi()
