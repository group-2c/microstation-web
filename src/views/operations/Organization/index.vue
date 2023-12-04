/*
 * @author: zzp
 * @date: 2023-11-24 15:43:21
 * @fileName: index.vue
 * @filePath: src/views/operations/Organization/index.vue
 * @description: 组织机构管理
 */
<template>
  <div>
    <basic-list-layout
      ref="layoutRef"
      pageName="组织机构"
      :oApi="organizationApi"
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
  import organizationApi from "_api/organizations"
  import EditDrawer from "./EditDrawer.vue"

  const layoutRef = ref()
  const editDrawerRef = ref()
  const permissions = getPermissions()

  const columns = ref([  
    { title: "组织机构名称", dataIndex: "name" }
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