/*
 * @author: zzp
 * @date: 2023-11-18 19:20:55
 * @fileName: drawing.js
 * @filePath: src/api/drawing.js
 * @description: 图纸管理
 */
import CommonRestfulModel from "./CommonRestful"

const toSubmitFields = values => {
  return values
}

class drawingApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/drawing",
      toSubmitFields
    })
  }

}

export default new drawingApi()