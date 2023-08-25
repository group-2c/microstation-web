import request from "_utils/request"

class CommonRestfulModel {


  /**
   * Creates an instance of CommonRestfulModel.
   *
   * @param {Object} { sourceURL }
   * @memberof CommonRestfulModel
   */
  constructor({ sourceURL, toSubmitFields }) {
    this._sourceURL = sourceURL
    this._toSubmitFields = toSubmitFields
  }


  /**
   * 获取列表
   *
   * @returns {Array} 列表数据
   * @memberof CommonRestfulModel
   */
  getAll() {
    return new Promise((resolve, reject) => {
      request.get(this._sourceURL)
        .then(res => {
          resolve(res.data)
        }, err => {
          reject(err)
        })
    })
  }


  /**
   * 获取分页数据
   *
   * @param {Object} params 分页参数
   * @returns {Array} 分页数据
   * @memberof CommonRestfulModel
   */
  getByPage(params) {
    return new Promise((resolve, reject) => {
      request.get(
        this._sourceURL + "/page",
        { params }
      )
        .then(res => {
          resolve(res.data)
        }, err => {
          reject(err)
        })
    })
  }


  /**
   * 根据 id 获取详细信息
   *
   * @param {number} id id
   * @returns {Object} 详细信息
   * @memberof CommonRestfulModel
   */
  getById(id) {
    return new Promise((resolve, reject) => {
      request.get(this._sourceURL + `/${id}`)
        .then(res => {
          resolve(res.data)
        }, err => {
          reject(err)
        })
    })
  }


  /**
   * 新建
   *
   * @param {Object} values 信息
   * @returns {Object} 信息
   * @memberof CommonRestfulModel
   */
  create(values) {
    return new Promise((resolve, reject) => {
      request.post(this._sourceURL, this._toSubmitFields(values))
        .then(res => {
          resolve(res.data)
        }, err => {
          reject(err)
        })
    })
  }


  /**
   * 批量新建
   *
   * @param {Array} values 多个信息集合
   * @returns {Array} 多个信息集合
   * @memberof CommonRestfulModel
   */
  createMultiple(values) {
    return new Promise((resolve, reject) => {
      request.post(
        this._sourceURL + "/batch",
        values.map(x => this._toSubmitFields(x))
      )
        .then(res => {
          resolve(res.data)
        }, err => {
          reject(err)
        })
    })
  }


  /**
   * 根据 id 更新信息
   *
   * @param {Object} values 信息
   * @returns {Object} 信息
   * @memberof CommonRestfulModel
   */
  updateById(id, values) {
    return new Promise((resolve, reject) => {
      request.put(
        this._sourceURL + `/${id}`,
        this._toSubmitFields(values)
      )
        .then(res => {
          resolve(res.data)
        }, err => {
          reject(err)
        })
    })
  }


  /**
   * 根据 id 删除
   *
   * @param {number} id  id
   * @returns {number} 1 成功 0 失败
   * @memberof CommonRestfulModel
   */
  deleteById(id) {
    return new Promise((resolve, reject) => {
      request.delete(this._sourceURL + `/${id}`)
        .then(() => {
          resolve(1)
        }, err => {
          reject(err)
        })
    })
  }


  /**
   * 根据 id 列表删除多条记录
   *
   * @param {Array} ids id 集合
   * @returns {any} 1 成功 其他失败
   * @memberof CommonRestfulModel
   */
   deleteManyById(ids) {
    return new Promise((resolve, reject) => {
      const array = this._sourceURL.split("/")
      request.delete(`/batch_${array.pop()}`, { params: {
        ids: ids.join(",")
      } })
        .then(() => {
          resolve(1)
        }, err => {
          reject(err)
        })
    })
  }

}

export default CommonRestfulModel
