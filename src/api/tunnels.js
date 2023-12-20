/*
 * @author: zzp
 * @date: 2023-12-20 08:37:37
 * @fileName: tunnels.js
 * @filePath: src/api/tunnels.js
 * @description: 隧道管理接口
 */
import CommonRestfulModel from "./CommonRestful"
import Lodash from "lodash"

const toSubmitFields = values => {
  return Lodash.pick(values, [
    "id",
    "name",
    "code",
    "description",
    "startDate",
    "tunnelStationId"
  ])
}

class tunnelsApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/tunnels",
      toSubmitFields
    })
  }

}

export default new tunnelsApi()