/*
 * @author: zzp
 * @date: 2023-08-27 15:02:56
 * @fileName: controller.js
 * @filePath: src/api/controller.js
 * @description: 微站控制器接口
 */
import CommonRestfulModel from "./CommonRestful.js"
import request from "_utils/request"
import Lodash from "lodash"

const toSubmitFields = values => {
  return Lodash.pick(values, [
    "id",
    "name",
    "code",
    "ip",
    "model",
    "longitude",
    "latitude",
    "projectId",
    "tunnel",
    "location",
    "manufacturer",
    "installationDate",
    "repairer",
    "telephone"
  ])
}

class ControllerApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/controllers",
      toSubmitFields
    })
  }
  
  /**
   * 根据设备类型和微站ID获取设备
   * @param {*} id 
   * @returns 
   */
  getDeviceByDeviceType(data) {
    return new Promise((resolve, reject) => {
      request.post(`${this._sourceURL}/getDeviceByDeviceType`, data)
        .then(res => {
          resolve(res.data)
        }, err => {
          reject(err)
        })
    })
  }

}

export default new ControllerApi()