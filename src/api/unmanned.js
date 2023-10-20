/*
 * @author: zzp
 * @date: 2023-10-20 15:23:52
 * @fileName: unmanned.js
 * @filePath: src/api/unmanned.js
 * @description: 无人微站接口 
 */
import request from "_utils/request"

class UnmannedApi {

  /**
   * 获取所有设备状态数据
   * @returns 
   */
  queryEquipmentStatistics(id) {
    return new Promise((resolve, reject) => {
      request.get(`/controllers/getDeviceStatusById/${id}`)
        .then(res => {
          resolve(res.data)
        }, err => {
          reject(err)
        })
    })
  }
}

export default new UnmannedApi()
