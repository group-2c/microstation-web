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
    { title: "地址", dataIndex: "address", align: "left", width: 200 },
    { title: "微站名称", dataIndex: "controllerName", align: "left", width: 200 },
    { title: "操作内容", dataIndex: "content", align: "left", width: 250 },
    { title: "操作时间", dataIndex: "time", align: "left", width: 200 },
  ])
</script> 