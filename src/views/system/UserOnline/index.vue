/*
 * @author: zzp
 * @date: 2023-12-06 16:28:04
 * @fileName: index.vue
 * @filePath: src/views/system/UserOnline/index.vue
 * @description: 用户在线
 */
<template>
  <div>
    <basic-list-layout
      pageName="用户在线"
      :oApi="loginInfoApi"
      :permissions="permissions"
      :columns="columns"
      :logOnly="true"
      :notOperation="true"
    />
  </div>
</template>

<script setup>
  import { ref } from "vue"
  import { getPermissions } from "@/router"
  import loginInfoApi from "_api/loginInfo"
  
  const permissions = getPermissions()

  const columns = ref([  
    { title: "用户名", dataIndex: "username", align: "left" },    
    { title: "登录IP", dataIndex: "ip", align: "left" },
    { title: "登录城市", dataIndex: "address", align: "left" },
    { title: "登录时间", dataIndex: "loginTime", align: "left" },
  ])
</script> 