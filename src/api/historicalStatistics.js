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

// 干变温控器分析
export const dryTemperatureApi = {
  getStatistics: data => new Promise((resolve, reject) => {
    request.post("/dryTemperatureControllerData/getStatistics", data).then(res => resolve(res.data), err => reject(err))
  }),
  pageBySheet: data => new Promise((resolve, reject) => {
    request.post("/dryTemperatureControllerData/pageBySheet", data).then(res => resolve(res.data), err => reject(err))
  })
}

// 直流屏分析
export const screenHistoricalApi = {
  getStatistics: data => new Promise((resolve, reject) => {
    request.post("/dcScreenData/getStatistics", data).then(res => resolve(res.data), err => reject(err))
  }),
  pageBySheet: data => new Promise((resolve, reject) => {
    request.post("/dcScreenData/pageBySheet", data).then(res => resolve(res.data), err => reject(err))
  })
}

// 逆变器分析
export const inverterDataApi = {
  getStatistics: data => new Promise((resolve, reject) => {
    request.post("/inverterData/getStatistics", data).then(res => resolve(res.data), err => reject(err))
  }),
  pageBySheet: data => new Promise((resolve, reject) => {
    request.post("/inverterData/pageBySheet", data).then(res => resolve(res.data), err => reject(err))
  })
}

// 逆变器分析
export const rvbDataApi = {
  getStatistics: data => new Promise((resolve, reject) => {
    request.post("/rvbData/getStatistics", data).then(res => resolve(res.data), err => reject(err))
  }),
  pageBySheet: data => new Promise((resolve, reject) => {
    request.post("/rvbData/pageBySheet", data).then(res => resolve(res.data), err => reject(err))
  })
}

// UPS分析
export const upsDataApi = {
  getStatistics: data => new Promise((resolve, reject) => {
    request.post("/upsData/getStatistics", data).then(res => resolve(res.data), err => reject(err))
  }),
  pageBySheet: data => new Promise((resolve, reject) => {
    request.post("/upsData/pageBySheet", data).then(res => resolve(res.data), err => reject(err))
  })
}
