import axios from "axios"
import constant from "_constant"
import { message } from "ant-design-vue"
import store from "@/store"
import router from "@/router"

const axiosInstance = axios.create({
  baseURL: constant.BASE_URL,
  timeout: 1000 * 10
})

axiosInstance.interceptors.request.use(
  config => {
    const token = store.state.auth.token
    if (token) {
      config.headers.Authorization = "Bearer " + token
    }
    return config
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  handleMaybeResponse,
  handleErrorResponse
)

function handleMaybeResponse(res) {
  if (res.data.code < 400) {
    return Promise.resolve(res)
  } else {
    const errorsStr = toMaybeErrorsMessage(res)
    throw (errorsStr || res.data?.message || res.data || res.code)
  }
}

function handleErrorResponse(error) {
  console.warn(error)
  if (
    error?.response?.status === 401
    || error?.response?.status === 403
  ) {
    onAuthError(error.response?.data?.message)
    return Promise.reject('认证失败, 请重新登录')
  }

  return new Promise((_, reject) => {

    let message = ''

    if (
      (error.response?.data?.type === 'application/json')
      && (typeof(error.response.data.text) === 'function')
    ) {
      error.response.data.text().then(resText => {
        const resData = JSON.parse(resText)
        message = resData.message || resData.status

        reject(message)
      })
    } else {
      const errorsStr = toMaybeErrorsMessage(error.response)

      message = errorsStr || error.response?.data?.message || error.response?.data?.status || '未知错误'
      reject(message)
    }
  })
}


function onAuthError(msg) {
  if (router.currentRoute.path === '/') {
    return null
  }

  message.error(msg || '认证失败, 请重新登录')
  setTimeout(() => {
    store.dispatch("auth/logout")
  })
}


function toMaybeErrorsMessage(res) {
  const errors = res?.data?.errors

  let errorsStr = ''
  if (errors) {
    errorsStr = Object.values(errors).map(errValueItem => {
      if (typeof errValueItem === 'string') {
        return errValueItem
      } else if (typeof errValueItem === 'object') {
        return errValueItem.toString()
      }
    }).join('; ')
  }

  return errorsStr
}

export default axiosInstance
