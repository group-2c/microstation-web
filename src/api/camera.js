/*
 * @author: zzp
 * @date: 2023-09-05 15:19:30
 * @fileName: ups.js
 * @filePath: src/api/camera.js
 * @description: 摄像机
 */
import CommonRestfulModel from "./CommonRestful"
import Lodash from "lodash"

const toSubmitFields = values => {
  return Lodash.pick(values, [
    "id",
    "name",
    "ip",
    "controllerId",
    "type",
    "manufacturer"
  ])
}

class cameraApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/cameras",
      toSubmitFields
    })
  }

}

export default new cameraApi()