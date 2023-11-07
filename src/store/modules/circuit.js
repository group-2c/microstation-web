/*
 * @author: zzp
 * @date: 2023-11-07 10:04:04
 * @fileName: circuit.js
 * @filePath: src/store/modules/circuit.js
 * @description: 配电管理
 */
import { 
  SET_CIRCUIT_KEY, 
  SET_CIRCUIT_STATUS, 
 } from "../mutation-types"

export default {
  namespaced: true,
  state: {
    key: undefined,
    status: false
  },
  mutations: { 
    [SET_CIRCUIT_KEY](state, key) {
      state.key = key
    },
    [SET_CIRCUIT_STATUS](state, status) {
      state.status = status
    }
  },
  actions: {
    setKey({ commit }, key) {
      commit(SET_CIRCUIT_KEY, key)
    },
    setStatus({ commit }, status) {
      commit(SET_CIRCUIT_STATUS, status)
    }
  }
}
