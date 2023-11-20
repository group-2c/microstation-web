/*
 * @author: zzp
 * @date: 2023-11-13 09:20:38
 * @fileName: circuitManage.js
 * @filePath: src/api/circuitManage.js
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

class circuitManageApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/circuitDiagram",
      toSubmitFields
    })
  }

  /**
   * 上传文件
   * @returns 
   */
  fileUpload(data) {
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
   * 下载文件
   * @returns 
   */
  fileDownload(data) {
    return new Promise((resolve, reject) => {
      request.post(`${this._sourceURL}/download`, data, {
        responseType: "blob"
      })
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

  /**
   * 根据controller_id分类获取配电图信息
   * @returns 
   */
  getCircuitDiagramByID() {
    return new Promise((resolve, reject) => {
      request.get(`${this._sourceURL}/getCircuitDiagramByID`)
        .then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
    })
  }

  /**
   * 根据配电图id获取nodeList
   * @returns 
   */
  getNodeList(id) {
    return new Promise((resolve, reject) => {
      request.get(`${this._sourceURL}/getNodeList/${id}`)
        .then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
    })
  }  
}

export default new circuitManageApi()