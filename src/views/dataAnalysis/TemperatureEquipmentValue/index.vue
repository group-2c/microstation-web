/*
 * @author: zzp
 * @date: 2023-08-27 15:43:13
 * @fileName: index.vue
 * @filePath: src/views/dataAnalysis/TemperatureEquipmentValue/index.vue
 * @description: 数显温湿度设备数据记录
 */
<template>
  <div>
    <basic-list-layout
      pageName="数显温湿度设备"
      :oApi="temperatureEquipmentValueApi"
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
  import temperatureEquipmentValueApi from "_api/temperatureEquipmentValue"
  
  const permissions = getPermissions()

  const columns = ref([  
    { title: "温度测量值", dataIndex: "temperature", align: "left" },    
    { title: "湿度测量值", dataIndex: "humidity", align: "left" },
    { title: "数显温湿度设备ID", dataIndex: "temperatureHumidityEquipmentId", align: "left" },
    { title: "数显温湿度设备名称", dataIndex: "temperatureHumidityEquipmentName", align: "left" }
  ])
</script> 