/**
 * 设置浏览器Storage存储
 * @param {*} data // 对象
 * @param {*} data.type // 类型
 * @param {*} data.key // 键
 * @param {*} data.value // 值
 * @param {*} data.isJson // 是否转json
 */
const setStorageItem = ({
  type,
  key,
  value,
  isJson = true
}) => {
  const valueData = isJson ? JSON.stringify(value) : value
  if(type === "local") {
    localStorage.setItem(key, valueData)
  } else {
    sessionStorage.setItem(key, valueData)
  }
}


/**
 * 获取浏览器Storage存储
 * @param {*} data // 对象
 * @param {*} data.type // 类型
 * @param {*} data.key // 键
 */
 const getStorageItem = ({
  type,
  key,
  isJson = true
}) => {
  let data = type === "local" ? localStorage.getItem(key) : sessionStorage.getItem(key)
  return isJson ? JSON.parse(data) : data
}


/**
 * 删除浏览器Storage存储
 * @param {*} data
 * @param {*} data.type // 类型
 * @param {*} data.key // 键
 */
const removeStorageItem = ({
  type,
  key
}) => {
  if(type === "local") {
    localStorage.removeItem(key)
  } else {
    sessionStorage.removeItem(key)
  }
}


/**
 * 监听Storage存储
 * @param {*} data
 * @returns
 */
const dispatchEventStroage = ({
  type,
  key,
  value,
  isJson = true
}) => {
  const valueData = isJson ? JSON.stringify(value) : value
  // 创建一个StorageEvent事件
  const newStorageEvent = document.createEvent('StorageEvent')
  const storage = {
    setItem: function (k, val) {
      if(type === "local") {
        localStorage.setItem(k, val)
      } else {
        sessionStorage.setItem(k, val)
      }
      localStorage.setItem(k, val)
      // 初始化创建的事件
      newStorageEvent.initStorageEvent('setStorageEvent', false, false, k, null, val, null, null)
      // 派发对象
      window.dispatchEvent(newStorageEvent)
    }
  }
  return storage.setItem(key, valueData)
}


export {
  setStorageItem,
  getStorageItem,
  removeStorageItem,
  dispatchEventStroage
}
