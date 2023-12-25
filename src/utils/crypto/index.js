/*
 * @author: zzp
 * @date: 2023-12-25 10:19:16
 * @fileName: index.js
 * @filePath: src/utils/crypto/index.js
 * @description: 数据加密/解密
 */
import crypto from "crypto-js"
import cryptoKeys from "./keys"

/**
 * 数据加密
 * @param {*} param0 
 * @returns 
 */
export const dataEncryption = ({ data, key }) => {
  const _key = crypto.enc.Utf8.parse(cryptoKeys[key].key)
  const _iv = crypto.enc.Utf8.parse(cryptoKeys[key].iv)

  const encrypted = crypto.AES.encrypt(data, _key, {
    iv: _iv,
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7
  })

  return encrypted.toString()
}

/**
 * 数据解密
 * @param {*} param0 
 * @returns 
 */
export const dataDecrypt = ({ data, key }) => {
  const _key = crypto.enc.Utf8.parse(cryptoKeys[key].key)
  const _iv = crypto.enc.Utf8.parse(cryptoKeys[key].iv)

  const decrypt = crypto.AES.decrypt(data, _key, {
    iv: _iv,
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7
  })

  return decrypt.toString(crypto.enc.Utf8)
}

