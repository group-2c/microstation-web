/*
 * @author: zzp
 * @date: 2023-11-24 15:44:46
 * @fileName: index.vue
 * @filePath: src/views/operations/Role/index.vue
 * @description: 角色管理
 */
<template>
  <div>
    <basic-list-layout
      ref="layoutRef"
      pageName="角色"
      :oApi="roleApi"
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
  import roleApi from "_api/roles"
  import EditDrawer from "./EditDrawer.vue"

  const layoutRef = ref()
  const editDrawerRef = ref()
  const permissions = getPermissions()

  const columns = ref([  
    { title: "角色名称", dataIndex: "name" }
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