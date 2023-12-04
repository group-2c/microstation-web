/*
 * @author: zzp
 * @date: 2023-08-25 15:46:56
 * @fileName: index.vue
 * @filePath: src/views/operations/User/index.vue
 * @description: 用户管理 
 */
<template>
  <div>
    <basic-list-layout
      ref="layoutRef"
      pageName="用户"
      :oApi="userApi"
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
  import userApi from "_api/user"
  import EditDrawer from "./EditDrawer.vue"

  const layoutRef = ref()
  const editDrawerRef = ref()
  const permissions = getPermissions()

  const columns = ref([  
    { title: "用户名", dataIndex: "username", align: "left", fixed: "left", width: 150, ellipsis: true },    
    { title: "组织机构", dataIndex: "organizationName", width: 150, align: "left", ellipsis: true },    
    { title: "联系电话", dataIndex: "telephone", align: "left", width: 150, ellipsis: true },
    { title: "真实姓名", dataIndex: "realname", align: "left", width: 150, ellipsis: true },
    { title: "角色", dataIndex: "roleName", align: "left", width: 150, ellipsis: true },
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