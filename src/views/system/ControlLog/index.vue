/*
 * @author: zzp
 * @date: 2023-11-24 15:40:23
 * @fileName: index.vue
 * @filePath: src/views/system/ControlLog/index.vue
 * @description: 控制日志
 */
<template>
  <div>
    <basic-list-layout
      pageName="控制日志"
      :oApi="controlLogsApi"
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
  import controlLogsApi from "_api/controlLogs"
  
  const permissions = getPermissions()

  const columns = ref([  
    { title: "微站名称", dataIndex: "controllerName", align: "left", width: 200, ellipsis: true, fixed: "left" },    
    { title: "设备名称", dataIndex: "deviceName", align: "left", width: 200, ellipsis: true },
    { title: "设备编号", dataIndex: "deviceCode", align: "left", width: 200, ellipsis: true },
    { title: "设备类型", dataIndex: "deviceType", align: "left", width: 150, ellipsis: true },
    { title: "操作时间", dataIndex: "time", align: "left", width: 200 },
    { title: "操作人", dataIndex: "username", align: "left", width: 150 },
    { title: "操作内容", dataIndex: "content", align: "left", width: 200, ellipsis: true },
  ])
</script> 