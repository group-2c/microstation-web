/*
 * @author: zzp
 * @date: 2023-12-26 14:30:44
 * @fileName: historicalStatistics.js
 * @filePath: src/api/historicalStatistics.js
 * @description: 历史数据分析接口
 */
import request from "_utils/request"

// 温湿度监测分析
export const temperatureHumidityHistoricalApi = {
  getStatistics: data => new Promise((resolve, reject) => {
    request.post("/temperatureHumidityEquipmentData/getStatistics", data).then(res => resolve(res.data), err => reject(err))
  }),
  pageBySheet: data => new Promise((resolve, reject) => {
    request.post("/temperatureHumidityEquipmentData/pageBySheet", data).then(res => resolve(res.data), err => reject(err))
  })
}

// 水浸数据分析
export const waterImmersionHistoricalApi = {
  getStatistics: data => new Promise((resolve, reject) => {
    request.post("/waterImmersionSensorData/getStatistics", data).then(res => resolve(res.data), err => reject(err))
  }),
  pageBySheet: data => new Promise((resolve, reject) => {
    request.post("/waterImmersionSensorData/pageBySheet", data).then(res => resolve(res.data), err => reject(err))
  })
}
