/*
 * @author: zzp
 * @date: 2023-11-27 14:13:19
 * @fileName: controlLogs.js
 * @filePath: src/api/controlLogs.js
 * @description: 控制记录
 */
import CommonRestfulModel from "./CommonRestful"

class controlLogsApi extends CommonRestfulModel {
  constructor() {
    super({
      sourceURL: "/controlLogs"
    })
  }
}

export default new controlLogsApi()