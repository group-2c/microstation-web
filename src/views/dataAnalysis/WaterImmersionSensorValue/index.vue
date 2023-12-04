/*
 * @author: zzp
 * @date: 2023-08-27 15:59:33
 * @fileName: index.vue
 * @filePath: src/views/dataAnalysis/WateImmersionSensorValue/index.vue
 * @description: 水浸传感器数据
 */
<template>
  <div>
    <basic-list-layout
      pageName="水浸传感器数据"
      :oApi="waterImmersionSensorValueApi"
      :permissions="permissions"
      :columns="columns"
      :notOperation="true"
      :logOnly="true"
    />
  </div>
</template>

<script setup>
  import { ref } from "vue"
  import { getPermissions } from "@/router"
  import waterImmersionSensorValueApi from "_api/waterImmersionSensorValue"
  
  const permissions = getPermissions()

  const columns = ref([  
    { title: "状态字", dataIndex: "status", align: "left" },    
    { title: "泄漏阻抗", dataIndex: "leakage_impedance", align: "left" },
    { title: "工作电流", dataIndex: "current", align: "left" },
    { title: "泄露电流", dataIndex: "leakage_current", align: "left" },
  ])
</script> 