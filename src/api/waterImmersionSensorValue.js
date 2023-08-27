/*
 * @author: zzp
 * @date: 2023-08-27 15:59:54
 * @fileName: waterImmersionSensorValue.js
 * @filePath: src/api/waterImmersionSensorValue.js
 * @description: 水浸传感器数据接口
 */
import CommonRestfulModel from "./CommonRestful"
import Lodash from "lodash"

class waterImmersionSensorValueApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/waterImmersionSensorValue",
    })
  }
}

export default new waterImmersionSensorValueApi()