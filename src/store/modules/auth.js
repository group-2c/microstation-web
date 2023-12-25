import { getStorageItem, setStorageItem, removeStorageItem, decryptStroage } from "_utils/storage"
import { dataEncryption } from "_utils/crypto"
import { 
  AUTH_TOKEN, 
  AUTH_USER, 
  AUTH_OWNS,
  SET_AUTHINFO,
  MENU_OPEN_KYES,
  MENU_SELECTED_KEYS
 } from "../mutation-types"

const storageToken = getStorageItem({ key: AUTH_TOKEN, isJson: false })
const defaultUser = decryptStroage({ storageKey: AUTH_USER, cryptoKey: "userKey" })
const defaultOwns = decryptStroage({ storageKey: AUTH_OWNS, cryptoKey: "permissionsKey" })

export default {
  namespaced: true,
  state: {
    token: storageToken || "",
    userInfo: JSON.parse(defaultUser),
    owns: JSON.parse(defaultOwns)
  },
  mutations: {
    [SET_AUTHINFO](state, { token, userInfo, owns }) { 
      state.token = token
      state.userInfo = userInfo
      state.owns = owns

      if (token) {
        setStorageItem({ key: AUTH_TOKEN, value: token, isJson: false })
        setStorageItem({ key: AUTH_USER, value: dataEncryption({ data: JSON.stringify(userInfo), key: "userKey" }), isJson: false })
        setStorageItem({ key: AUTH_OWNS, value: dataEncryption({ data: JSON.stringify(owns), key: "permissionsKey" }), isJson: false })
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
