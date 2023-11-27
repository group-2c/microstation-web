/*
 * @author: zzp
 * @date: 2023-11-27 14:07:49
 * @fileName: operateLogs.js
 * @filePath: src/api/operateLogs.js
 * @description: 操作日志
 */
import CommonRestfulModel from "./CommonRestful"

class operateLogsApi extends CommonRestfulModel {
  constructor() {
    super({
      sourceURL: "/operateLogs"
    })
  }
}

export default new operateLogsApi()