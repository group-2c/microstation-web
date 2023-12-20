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