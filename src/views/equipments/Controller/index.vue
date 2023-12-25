/*
 * @author: zzp
 * @date: 2023-08-27 14:59:52
 * @fileName: index.vue
 * @filePath: src/views/equipments/Controller/index.vue
 * @description: 微站控制器
 */
<template>
  <div>
    <basic-list-layout
      ref="layoutRef"
      pageName="微站控制器"
      :oApi="controllerApi"
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
  import { dict_manufacturers, dict_controller_equipment_model } from "_utils/dictionary"
  import controllerApi from "_api/controller"
  import EditDrawer from "./EditDrawer.vue"

  const layoutRef = ref()
  const editDrawerRef = ref()
  const permissions = getPermissions()

  const columns = ref([  
    { title: "设备名称", dataIndex: "name", align: "left", width: 250, ellipsis: true, fixed: "left" },    
    { title: "设备编号", dataIndex: "code", align: "left", width: 200, ellipsis: true },
    { title: "设备IP地址", dataIndex: "ip", align: "left", width: 200 },
    { title: "设备型号", dataIndex: "modelName", align: "left", width: 200 },
    { title: "隧道名称", dataIndex: "tunnelName", align: "left", width: 200 },
    { title: "经度", dataIndex: "longitude", align: "left", width: 200 },
    { title: "纬度", dataIndex: "latitude", align: "left", width: 200 },
    { title: "安装位置", dataIndex: "location", align: "left", width: 200, ellipsis: true },
    { title: "制造商", dataIndex: "manufacturerName", align: "left", width: 200, ellipsis: true },
    { title: "安装日期", dataIndex: "installationDate", align: "left", width: 200 },
  ])

  const tableListFormat = data => {
    return data.map(item => {
      item.coordinates = `${item.longitude},${item.latitude}`
      item.manufacturerName = dict_manufacturers.find(x => x.key === item.manufacturer)?.value
      item.modelName = dict_controller_equipment_model.find(x => x.key === item.model)?.value
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