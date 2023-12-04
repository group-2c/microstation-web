/*
 * @author: zzp
 * @date: 2023-12-04 13:57:26
 * @fileName: files.js
 * @filePath: src/api/files.js
 * @description: 文件处理接口
 */
import request from "_utils/request"

class FileApi {
  /**
   * 上传文件
   * @returns 
   */
  fileUpload(data) {
    return new Promise((resolve, reject) => {
      request.post("/circuitDiagram/upload", data)
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
  fileDownload(data, responseType = {}) {
    return new Promise((resolve, reject) => {
      request.post("circuitDiagram/download", data, responseType)
        .then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
    })
  }

  /**
   * 预览文件
   * @returns 
   */
  filePreview(data) {
    return new Promise((resolve, reject) => {
      request.post("circuitDiagram/preview", data)
        .then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
    })
  }
}

export default new FileApi()