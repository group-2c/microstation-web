import { getStorageItem, setStorageItem, removeStorageItem } from "_utils/storage"
import { 
  AUTH_TOKEN, 
  AUTH_USER, 
  AUTH_OWNS,
  SET_AUTHINFO,
  MENU_OPEN_KYES,
  MENU_SELECTED_KEYS
 } from "../mutation-types"

const storageToken = getStorageItem({ key: AUTH_TOKEN, isJson: false })
const storageAuthUser = getStorageItem({ key: AUTH_USER })
const storageAuthOwns = getStorageItem({ key: AUTH_OWNS })

export default {
  namespaced: true,
  state: {
    token: storageToken || "",
    userInfo: storageAuthUser || {},
    owns: storageAuthOwns || {},
  },
  mutations: {
    [SET_AUTHINFO](state, { token, userInfo, owns }) { 
      state.token = token
      state.userInfo = userInfo
      state.owns = owns
      if (token) {
        setStorageItem({ key: AUTH_TOKEN, value: token, isJson: false })
        setStorageItem({ key: AUTH_USER, value: userInfo })
        setStorageItem({ key: AUTH_OWNS, value: owns })
      } else {
        removeStorageItem({ key: AUTH_TOKEN })
        removeStorageItem({ key: AUTH_USER })
        removeStorageItem({ key: AUTH_OWNS })
        removeStorageItem({ key: MENU_OPEN_KYES })
        removeStorageItem({ key: MENU_SELECTED_KEYS })
      }
    }
  },
  actions: {
    login({ commit }, data) {
      commit(SET_AUTHINFO, data)
    },
    logout({ commit }) {
      commit(SET_AUTHINFO, {})
      location.reload()
    }
  }
}
