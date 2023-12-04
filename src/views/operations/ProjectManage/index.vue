/*
 * @author: zzp
 * @date: 2023-11-18 16:17:24
 * @fileName: index.vue
 * @filePath: src/views/operations/ProjectManage/index.vue
 * @description: 项目管理
 */
<template>
  <div>
    <basic-list-layout
      ref="layoutRef"
      pageName="项目"
      :oApi="projectsApi"
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
  import projectsApi from "_api/projects"
  import EditDrawer from "./EditDrawer.vue"

  const layoutRef = ref()
  const editDrawerRef = ref()
  const permissions = getPermissions()

  const columns = ref([  
    { title: "项目名称", dataIndex: "name", align: "left", width: 250, ellipsis: true, fixed: "left" },    
    { title: "开始日期", dataIndex: "startDate", align: "left", width: 150, ellipsis: true },
    { title: "结束日期", dataIndex: "endDate", align: "left", width: 150, ellipsis: true },
    { title: "负责人", dataIndex: "leader", align: "left", width: 150 },
    { title: "联系电话", dataIndex: "telephone", align: "left", width: 150 },
    { title: "公司名称", dataIndex: "company", align: "left", width: 200 },
    { title: "图纸数量", dataIndex: "fileCount", align: "center", width: 100 },
  ])

  const tableListFormat = data => {
    return data.map(item => {
      item.fileCount = JSON.parse(item.files || '[]').length
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