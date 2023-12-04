/*
 * @author: zzp
 * @date: 2023-10-12 10:50:22
 * @fileName: index.vue
 * @filePath: src/views/equipments/ElectricityMeter/index.vue
 * @description: 多功能电表
 */
<template>
  <div>
    <basic-list-layout
      ref="layoutRef"
      pageName="多功能电表"
      :oApi="electricityMeterApi"
      :permissions="permissions"
      :columns="columns"
      :tableListFormat="tableListFormat"
      @editItem="editItem"
      @addItem="addItem"
    />
    <edit-drawer ref="editDrawerRef" :onOk="editDrawerConfirm" />
  </div>
</template>

<script setup>
  import { ref } from "vue"
  import { getPermissions } from "@/router"
  import { dict_manufacturers } from "_utils/dictionary"
  import electricityMeterApi from "_api/electricityMeter"
  import EditDrawer from "./EditDrawer.vue"

  const layoutRef = ref()
  const editDrawerRef = ref()
  const permissions = getPermissions()

  const columns = ref([  
    { title: "设备名称", dataIndex: "name", align: "left", width: 250, ellipsis: true, fixed: "left" },    
    { title: "设备地址", dataIndex: "slaveId", align: "left", width: 250 },
    { title: "波特率", dataIndex: "baudRate", align: "left", width: 160 },
    { title: "数据位", dataIndex: "dataBit", align: "left", width: 160 },
    { title: "停止位", dataIndex: "stopBit", align: "left", width: 160 },
    { title: "校验位", dataIndex: "parity", align: "left", width: 160 },
    { title: "所属微站", dataIndex: "controllerName", align: "left", width: 250, ellipsis: true },
    { title: "制造商", dataIndex: "manufacturerName", align: "left", width: 250, ellipsis: true },
  ])

  const tableListFormat = data => {
    return data.map(item => {
      item.manufacturerName = dict_manufacturers.find(x => x.key === item.manufacturer)?.value
      return item
    })
  }

  const editItem = row => {
    editDrawerRef.value.handleShow(row)
  }

  const addItem = () => {
    editDrawerRef.value.handleShow({})
  }

  const editDrawerConfirm = () => {
    layoutRef.value.search()
  }
</script> 