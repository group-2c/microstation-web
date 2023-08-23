import { getStorageItem, setStorageItem, removeStorageItem } from "_utils/storage"
import { 
  AUTH_TOKEN, 
  AUTH_USER, 
  SET_AUTHINFO,
  MENU_OPEN_KYES,
  MENU_SELECTED_KEYS
 } from "../mutation-types"

const storageToken = getStorageItem({ key: AUTH_TOKEN, isJson: false })
const storageAuthUser = getStorageItem({ key: AUTH_USER })

export default {
  namespaced: true,
  state: {
    token: storageToken || "",
    userInfo: storageAuthUser || {}
  },
  mutations: {
    [SET_AUTHINFO](state, { token, userInfo }) {
      state.token = token
      state.userInfo = userInfo
      if (token) {
        setStorageItem({ key: AUTH_TOKEN, value: token, isJson: false })
        setStorageItem({ key: AUTH_USER, value: userInfo })
      } else {
        removeStorageItem({ key: AUTH_TOKEN })
        removeStorageItem({ key: AUTH_USER })
        removeStorageItem({ key: MENU_OPEN_KYES })
        removeStorageItem({ key: MENU_SELECTED_KEYS })
      }
    }
  },
  actions: {
    login({ commit }, data) {
      commit(SET_AUTHINFO, {
        token: data.token,
        userInfo: data.userInfo
      })
    },
    logout({ commit }) {
      commit(SET_AUTHINFO, {})
      location.reload()
    }
  }
}
