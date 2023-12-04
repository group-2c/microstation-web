/*
 * @author: zzp
 * @date: 2023-11-13 08:32:19
 * @fileName: index.vue
 * @filePath: src/views/operations/CircuitManage/index.vue
 * @description: 配电图管理
 */
<template>
  <div>
    <basic-list-layout
      ref="layoutRef"
      pageName="配电图"
      :oApi="circuitManageApi"
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
  import circuitManageApi from "_api/circuitManage"
  import EditDrawer from "./EditDrawer.vue"

  const layoutRef = ref()
  const editDrawerRef = ref()
  const permissions = getPermissions()

  const columns = ref([  
    { title: "名称", dataIndex: "name", align: "left", width: 250, ellipsis: true, fixed: "left" },    
    { title: "所属微站", dataIndex: "controllerName", align: "left", width: 250, ellipsis: true },
    { title: "节点数量", dataIndex: "nodeCount", align: "left", width: 250, ellipsis: true },
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