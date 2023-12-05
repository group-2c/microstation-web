/*
 * @author: zzp
 * @date: 2023-12-04 13:43:45
 * @fileName: index.vue
 * @filePath: src/views/operations/PowerMonitoringModel/index.vue
 * @description: 变电微站模型
 */
<template>
  <div>
    <basic-list-layout
      ref="layoutRef"
      pageName="变电微站模型"
      :oApi="powerMonitoringApi"
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
  import powerMonitoringApi from "_api/powerMonitorings"
  import EditDrawer from "./EditDrawer.vue"

  const layoutRef = ref()
  const editDrawerRef = ref()
  const permissions = getPermissions()

  const columns = ref([  
    { title: "模型名称", dataIndex: "name", align: "left", ellipsis: true, fixed: "left" },    
    { title: "所属微站", dataIndex: "controllerName", align: "left", ellipsis: true },
  ])

  const tableListFormat = data => {
    return data.map(item => {
      item.nodeList = JSON.parse(item.nodeList)
      item.nodeCount = item.nodeList.length
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