/*
 * @author: zzp
 * @date: 2023-08-19 10:24:52
 * @fileName: user.js
 * @filePath: src/api/user.js
 * @description: 用户接口
 */
import CommonRestfulModel from "./CommonRestful"
import Lodash from "lodash"

const toSubmitFields = values => {
  return Lodash.pick(values, [
    "id",
    "name",
    "password",
    "mobile",
    "username",
    "department_id",
  ])
}

class UserApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/users",
      toSubmitFields
    })
  }

}

export default new UserApi()