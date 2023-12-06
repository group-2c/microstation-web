/*
 * @author: zzp
 * @date: 2023-09-05 14:52:38
 * @fileName: function.js
 * @filePath: src/utils/function.js
 * @description: 常用函数方法
 */
import { message } from "ant-design-vue"
import store from "@/store"
import authApi from "_api/auth"
let timer = null

/**
 * 根据name字段取数结构上层数据
 * @param {*} list 
 * @param {*} name 
 * @returns 
 */
const getThreeNameParents = (list, name) => {
  for (let i in list) {
    if(list[i].name == name) {
      return [list[i]]
    }
    if(list[i].children) {
      let node = getThreeNameParents(list[i].children, name)
      if(node !== undefined) {
        return node.concat(list[i])
      }
    }
  }        
}

/**
 * 文件流保存
 * @param {*} blob 
 * @param {*} fileName 
 */
const fileBlobSave = (blob, fileName) => {
  let url = window.URL.createObjectURL(new Blob([blob]))
  let link = document.createElement("a")
  link.style.display = "none"
  link.href = url
  link.setAttribute("download", fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

/**
 * 发送心跳数据
 */
const sendHeartBeat = async () => {
  timer && clearInterval(timer)
  timer = null

  if(store.state.auth.token) {
    timer = setInterval(async () => {
      try {
        await authApi.heartBeat()
      } catch(err) {
        message.error(`心跳数据发送失败: ${err}`)
      } 
    }, 1000 * 5)
  }
}

export {
  getThreeNameParents,
  fileBlobSave,
  sendHeartBeat
}