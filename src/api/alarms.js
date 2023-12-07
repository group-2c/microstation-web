/*
 * @author: zzp
 * @date: 2023-12-07 09:16:18
 * @fileName: alarms.js
 * @filePath: src/api/alarms.js
 * @description: 报警管理
 */
import CommonRestfulModel from "./CommonRestful"
import request from "_utils/request"
import Lodash from "lodash"

const toSubmitFields = values => {
  return Lodash.pick(values, [
    "id",
    "status",
    "alarmLevel",
    "alarmType",
    "controllerName",
    "description",
    "deviceName",
    "eventType"
  ])
}

class alarmsApi extends CommonRestfulModel {
  constructor() {
    super({
      sourceURL: "/alarms",
      toSubmitFields
    })
  }

  /**
   * 根据处理状态获取报警统计数据
   * @param {*} data 
   * @returns 
   */
  getAlarmByStatus(data) {
    return new Promise((resolve, reject) => {
      request.post(`${this._sourceURL}/getAlarmByStatus`, data)
        .then(res => {
          resolve(res.data)
        }, err => {
          reject(err)
        })
    })
  }
}

export default new alarmsApi()