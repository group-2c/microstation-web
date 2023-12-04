/*
 * @author: zzp
 * @date: 2023-11-24 15:41:17
 * @fileName: index.vue
 * @filePath: src/views/system/UserMonitoring/index.vue
 * @description: 用户在线监测
 */
<template>
  <div>
    <basic-list-layout
      pageName="登录日志"
      :oApi="loginInfoApi"
      :permissions="permissions"
      :columns="columns"
      :logOnly="true"
      :operationWidth="150"
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
    { title: "IP", dataIndex: "ip", align: "left" },
    { title: "登录地址", dataIndex: "address", align: "left" },
    { title: "登录时间", dataIndex: "loginTime", align: "left" },
  ])
</script> 