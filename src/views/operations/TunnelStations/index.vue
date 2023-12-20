/*
 * @author: zzp
 * @date: 2023-12-20 08:30:49
 * @fileName: index.vue
 * @filePath: src/views/operations/TunnelStations/index.vue
 * @description: 隧管站页面
 */
<template>
  <div>
    <basic-list-layout
      ref="layoutRef"
      pageName="隧管站"
      :oApi="tunnelStationsApi"
      :permissions="permissions"
      :columns="columns"
      @editItem="editItem"
      @addItem="addItem"
    />
    <edit-drawer ref="editDrawerRef" :onOk="editDrawerConfirm" />
  </div>
</template>

<script setup>
  import { ref } from "vue"
  import { getPermissions } from "@/router"
  import tunnelStationsApi from "_api/tunnelStations"
  import EditDrawer from "./EditDrawer.vue"

  const layoutRef = ref()
  const editDrawerRef = ref()
  const permissions = getPermissions()

  const columns = ref([  
    { title: "名 称", dataIndex: "name" },    
    { title: "编 号", dataIndex: "code" },
    { title: "开通时间", dataIndex: "startDate" },
  ])

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