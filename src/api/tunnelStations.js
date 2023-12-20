/*
 * @author: zzp
 * @date: 2023-12-20 08:28:57
 * @fileName: tunnelStations.js
 * @filePath: src/api/tunnelStations.js
 * @description: 隧管站接口
 */
import CommonRestfulModel from "./CommonRestful"
import Lodash from "lodash"

const toSubmitFields = values => {
  return Lodash.pick(values, [
    "id",
    "name",
    "code",
    "description",
    "startDate"
  ])
}

class tunnelStationsApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/tunnelStations",
      toSubmitFields
    })
  }

}

export default new tunnelStationsApi()