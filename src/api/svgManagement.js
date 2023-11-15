/*
 * @author: zzp
 * @date: 2023-11-13 09:20:38
 * @fileName: svgManagement.js
 * @filePath: src/api/svgManagement.js
 * @description: SVG配电图管理
 */
import CommonRestfulModel from "./CommonRestful"
import Lodash from "lodash"
import request from "_utils/request"

const toSubmitFields = values => {
  return Lodash.pick(values, [
    "id",
    "name",
    "controllerId",
    "fileName",
    "nodeList",
  ])
}

class svgManagementApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/circuitDiagram",
      toSubmitFields
    })
  }

  /**
   * 上传配电图SVG
   * @returns 
   */
  svgFileUpload(data) {
    return new Promise((resolve, reject) => {
      request.post(`${this._sourceURL}/upload`, data)
        .then(res => {
          resolve(res.data)
        }, err => {
          reject(err)
        })
    })
  }

  /**
   * 下载配电图SVG
   * @returns 
   */
  svgFileDownload(fileName) {
    return new Promise((resolve, reject) => {
      request.get(`${this._sourceURL}/download?fileName=${fileName}`)
        .then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
    })
  }

  /**
   * 预览配电图SVG
   * @returns 
   */
  svgFilePreview(data) {
    return new Promise((resolve, reject) => {
      request.post(`${this._sourceURL}/preview`, data)
        .then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
    })
  }

}

export default new svgManagementApi()