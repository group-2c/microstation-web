/*
 * @author: zzp
 * @date: 2023-08-25 15:01:01
 * @fileName: auth.js
 * @filePath: src/api/auth.js
 * @description: 登录接口
 */
import request from "_utils/request"

class AuthApi  {

  /**
   * 登录
   * @param {*} values 
   * @returns 
   */
  login(values) {
    return new Promise((resolve, reject) => {
      request.post("/auth/login", values)
        .then(res => {
          resolve(res.data)
        }, err => {
          reject(err)
        })
    })
  }

  /**
   * 心跳
   * @param {*} values 
   * @returns 
   */
  heartBeat() {
    return new Promise((resolve, reject) => {
      request.get("/loginInfo/heartBeat")
        .then(res => {
          resolve(res.data)
        }, err => {
          reject(err)
        })
    })
  }
}

export default new AuthApi()