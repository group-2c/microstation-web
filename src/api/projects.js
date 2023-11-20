/*
 * @author: zzp
 * @date: 2023-11-18 18:49:23
 * @fileName: projects.js
 * @filePath: src/api/projects.js
 * @description: 项目接口
 */
import CommonRestfulModel from "./CommonRestful"
import Lodash from "lodash"

const toSubmitFields = values => {
  return Lodash.pick(values, [
    "id",
    "name",
    "description",
    "startDate",
    "endDate",
    "leader",
    "company",
    "telephone",
  ])
}

class projectsApi extends CommonRestfulModel {

  constructor() {
    super({
      sourceURL: "/projects",
      toSubmitFields
    })
  }
}

export default new projectsApi()