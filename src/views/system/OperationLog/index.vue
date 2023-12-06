/*
 * @author: zzp
 * @date: 2023-11-24 15:39:16
 * @fileName: index.vue
 * @filePath: src/views/system/OperationLog/index.vue
 * @description: 操作日志
 */
<template>
  <div>
    <basic-list-layout
      pageName="操作日志"
      :oApi="operateLogsApi"
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
  import operateLogsApi from "_api/operateLogs"
  
  const permissions = getPermissions()

  const columns = ref([  
    { title: "用户", dataIndex: "username", align: "left", width: 150, ellipsis: true, fixed: "left" },    
    { title: "IP", dataIndex: "ip", align: "left", width: 150, ellipsis: true },
    { title: "地址", dataIndex: "address", align: "left", width: 200, ellipsis: true },
    { title: "路由", dataIndex: "route", align: "left", ellipsis: true },
    { title: "方法", dataIndex: "method", align: "left", width: 150, ellipsis: true },
    { title: "结果", dataIndex: "response", align: "left", width: 150, ellipsis: true },
    { title: "操作时间", dataIndex: "time", align: "left", width: 200 },
  ])
</script> 