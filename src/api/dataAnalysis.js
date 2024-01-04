/*
 * @author: zzp
 * @date: 2023-12-20 15:00:36
 * @fileName: dataAnalysis.js
 * @filePath: src/api/dataAnalysis.js
 * @description: 数据统计相关接口
 */
import request from "_utils/request"

// 稳态曲线
export const steadyCurvesApi = {
  getStatistics: data => new Promise((resolve, reject) => {
    request.post("/steadyCurves/getStatistics", data).then(res => resolve(res.data), err => reject(err))
  }),
  pageBySheet: data => new Promise((resolve, reject) => {
    request.post("/steadyCurves/pageBySheet", data).then(res => resolve(res.data), err => reject(err))
  })
}

// 谐波曲线
export const harmonicCurveApi = {
  getStatistics: data => new Promise((resolve, reject) => {
    request.post("/harmonicCurves/getStatistics", data).then(res => resolve(res.data), err => reject(err))
  }),
  pageBySheet: data => new Promise((resolve, reject) => {
    request.post("/harmonicCurves/pageBySheet", data).then(res => resolve(res.data), err => reject(err))
  })
}

// 负荷曲线
export const loadCurvesApi = {
  realTimeLoad: data => new Promise((resolve, reject) => {
    request.post("/loadCurves/realTimeLoad", data).then(res => resolve(res.data), err => reject(err))
  }),
  dayLoad: data => new Promise((resolve, reject) => {
    request.post("/harmonicCurves/dayLoad", data).then(res => resolve(res.data), err => reject(err))
  })
}

// SOE事件
export const soeEventsApi = {
  pageBySheet: data => new Promise((resolve, reject) => {
    request.post("/soeEvents/pageBySheet", data).then(res => resolve(res.data), err => reject(err))
  })
}

// 微站能耗
export const micrositeEnergyApi = {
  pageBySheet: data => new Promise((resolve, reject) => {
    request.post("/micrositeEnergy/pageBySheet", data).then(res => resolve(res.data), err => reject(err))
  })
}