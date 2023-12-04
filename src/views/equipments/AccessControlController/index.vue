/*
 * @author: zzp
 * @date: 2023-10-12 11:03:13
 * @fileName: index.vue
 * @filePath: src/views/equipments/AccessControlController/index.vue
 * @description: 门禁控制器 
 */
<template>
  <div>
    <basic-list-layout
      ref="layoutRef"
      pageName="门禁控制器"
      :oApi="accessControlControllerApi"
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
  import accessControlControllerApi from "_api/accessControlController"
  import EditDrawer from "./EditDrawer.vue"

  const layoutRef = ref()
  const editDrawerRef = ref()
  const permissions = getPermissions()

  const columns = ref([  
    { title: "设备名称", dataIndex: "name", align: "left", width: 250, ellipsis: true, fixed: "left" },    
    { title: "IP地址", dataIndex: "ip", align: "left", width: 250, ellipsis: true },
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