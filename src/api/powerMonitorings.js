/*
 * @author: zzp
 * @date: 2023-12-04 13:54:30
 * @fileName: powerMonitorings.js
 * @filePath: src/api/powerMonitorings.js
 * @description: 电力监控接口
 */
import CommonRestfulModel from "./CommonRestful"
import Lodash from "lodash"

const toSubmitFields = values => {
  return Lodash.pick(values, [
    "id",
    "name",
    "controllerId",
    "fileName",
    "nodeList"
  ])
}

class PowerMonitoringApi extends CommonRestfulModel {
  constructor() {
    super({
      sourceURL: "/powerMonitorings",
      toSubmitFields
    })
  }
}

export default new PowerMonitoringApi()