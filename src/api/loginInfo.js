/*
 * @author: zzp
 * @date: 2023-11-27 14:20:55
 * @fileName: loginInfo.js
 * @filePath: src/api/loginInfo.js
 * @description: 用户登录信息
 */
import CommonRestfulModel from "./CommonRestful"

class loginInfoApi extends CommonRestfulModel {
  constructor() {
    super({
      sourceURL: "/loginInfo"
    })
  }
}

export default new loginInfoApi()