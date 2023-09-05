/*
 * @author: zzp
 * @date: 2023-08-25 15:46:56
 * @fileName: user.js
 * @filePath: src/api/user.js
 * @description: 用户接口 
 */
import CommonRestfulModel from "./CommonRestful"
import Lodash from "lodash"

const toSubmitFields = values => {
  return Lodash.pick(values, [
    "id",
    "realname",
    "password",
    "telephone",
    "username",
    "department",
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