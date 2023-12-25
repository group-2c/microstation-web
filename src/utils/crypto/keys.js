/*
 * @author: zzp
 * @date: 2023-12-25 10:19:35
 * @fileName: keys.js
 * @filePath: src/utils/crypto/keys.js
 * @description: Key集合
 */

// 当前用户数据
const userKey = {
  key: "MICROSTATION-6781121",
  iv: "PERMISSIONS-IV-0728116"
}

// 权限路由
const permissionsKey = {
  key: "MICROSTATION-7791022",
  iv: "PERMISSIONS-IV-8273821"
}

export default {
  userKey,
  permissionsKey
}