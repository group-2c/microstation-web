/*
 * @author: zzp
 * @date: 2023-11-27 14:20:55
 * @fileName: loginInfo.js
 * @filePath: src/api/loginInfo.js
 * @description: 用户登录信息
 */
import CommonRestfulModel from "./CommonRestful"
import request from "_utils/request"

class loginInfoApi extends CommonRestfulModel {
  constructor() {
    super({
      sourceURL: "/loginInfo"
    })
  }

  /**
   * 心跳
   * @param {*} values 
   * @returns 
   */
  heartBeat() {
    return new Promise((resolve, reject) => {
      request.get(`${this._sourceURL}/heartBeat`)
        .then(res => {
          resolve(res.data)
        }, err => {
          reject(err)
        })
    })
  } 
  
  /**
   * 在线人数
   * @param {*} params 
   * @returns 
   */
  getOnlineInfo(params) {
    return new Promise((resolve, reject) => {
      request.get(`${this._sourceURL}/getOnlineInfo`, { params })
        .then(res => {
          resolve(res.data)
        }, err => {
          reject(err)
        })
    })
  }    
}

export default new loginInfoApi()


