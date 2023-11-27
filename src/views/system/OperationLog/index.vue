/*
 * @author: zzp
 * @date: 2023-11-24 15:39:16
 * @fileName: index.vue
 * @filePath: src/views/system/OperationLog/index.vue
 * @description: 操作日志
 */
<template>
  <div class="parcel">
    <a-spin :spinning="dataCenter.loading" >
      <a-page-header class="pageHeader" :title="`${dataCenter.pageName}列表`">
        <template #extra> 
          <a-button v-if="permissions.export" :icon="h(FileExcelOutlined)" @click.stop="exportExcel">导出Excel</a-button>
        </template>
      </a-page-header>
      <div class="searchContainer">
        <a-row justify="space-between">
          <a-col>
            <a-select
              v-if="permissions.delete"
              v-model:value="dataCenter.operationKey"
              class="batchOperation"
              allowClear
              @change="batchOperationChange"
              placeholder="批量操作所选"
            >
              <a-select-option value="delete" :disabled="operationDisabled">批量删除</a-select-option>
            </a-select>
          </a-col>
          <a-col>
            <a-input-search
              v-model:value="dataCenter.searchForm.name"
              class="searchBox"
              placeholder="模糊搜索"
              enter-button
              size="large"
              @search="handleSearch"
            />
          </a-col>
        </a-row> 
      </div>
      <div class="contentContainer">
        <a-table 
          row-key="id"
          :columns="constColumns"
          :data-source="dataCenter.tableList" 
          :pagination="dataCenter.pagination"
          :row-selection="rowSelection"
          :scroll="{ y: 'calc(100vh - 410px)', x: 'max-content' }"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'operation'">
              <span>
                <a-popconfirm
                  title="是否删除？"
                  ok-text="是"
                  cancel-text="否"
                  @confirm="() => handleDeleteItem(record)"
                  v-if="permissions.delete"
                >
                  <a-button type="link">
                    <template #icon><DeleteOutlined /></template>
                    删除
                  </a-button>
                </a-popconfirm>
              </span>
            </template>
          </template>
        </a-table>
      </div>
    </a-spin>
  </div>
</template>

<script setup>
  import { h, ref, onMounted, createVNode, computed } from "vue"
  import { getPermissions } from "@/router"
  import { FileExcelOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons-vue"
  import { message, Modal } from "ant-design-vue"
  import Lodash from "lodash"
  import ExportXlsx from "_utils/exportXlsx"
  import operateLogsApi from "_api/operateLogs"

  const constColumns = [
    { title: "序 号", dataIndex: "index", align: "center",  width: 80, customRender: data => data.index + 1, fixed: "left" },    
    { title: "用户", dataIndex: "username", align: "left", width: 150, ellipsis: true, fixed: "left" },    
    { title: "IP", dataIndex: "ip", align: "left", width: 150, ellipsis: true },
    { title: "地址", dataIndex: "address", align: "left", width: 200 },
    { title: "微站名称", dataIndex: "controllerName", align: "left", width: 200 },
    { title: "操作内容", dataIndex: "content", align: "left", width: 250 },
    { title: "操作时间", dataIndex: "time", align: "left", width: 200 },
    { title: "创建时间", dataIndex: "createAt", align: "left", width: 200 },
    { title: "操 作", dataIndex: "operation", align: "center", width: 200, fixed: "right" }
  ]

  const dataDefault = {
    loading: false,
    operationKey: undefined,
    pageName: "操作日志",
    searchForm: {},
    tableList: [],
    selectedRowKeys: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
      showTotal: total => `共有 ${total} 条数据`
    }
  }

  const dataCenter = ref(Lodash.cloneDeep(dataDefault))
  const permissions = getPermissions()

  const rowSelection = ref({
    columnWidth: 80,
    onChange: selectedRowKeys => {
      dataCenter.value.selectedRowKeys = selectedRowKeys
    }
  })

  const operationDisabled = computed(() => {
    return dataCenter.value.selectedRowKeys.length === 0
  })

  const _getTableList = async () => {
    dataCenter.value.loading = true
    
    const { searchForm, pagination } = dataCenter.value
    const { current, pageSize } = pagination
    const data = { ...searchForm, page: current, size: pageSize }

    try {
      const res = await operateLogsApi.getByPage(data)
      dataCenter.value.tableList = res.data.content
      dataCenter.value.pagination.total = res.data.totalElements
      dataCenter.value.pagination.current = res.data.pageNumber
    } catch(err) {
      message.error("获取列表失败: " + err)
    } finally {
      dataCenter.value.loading = false
    }
  }

  const handleSearch = () => {
    dataCenter.value.pagination.current = 1
    _getTableList()
  }

  const handleTableChange = pagination => {
    dataCenter.value.selectedRowKeys = []
    dataCenter.value.pagination.current = pagination.current
    _getTableList()
  }

  const batchOperationChange = type => {
    switch(type) {
      case "delete": 
        batchDelete()
        break
      default:
        break
    }
  }

  const batchDelete = () => {

    const _deleteData = async () => {
      dataCenter.value.loading = true
      try {
        const { selectedRowKeys } = dataCenter.value
        await operateLogsApi.deleteManyById(selectedRowKeys)
      } catch(err) {
        message.error("删除失败: " + err)
      } finally {
        dataCenter.value.loading = false
        dataCenter.value.operationKey = undefined
        handleSearch()
      }
    }

    Modal.confirm({
      title: "确定要批量删除选中的数据？",
      icon: createVNode(ExclamationCircleOutlined),
      onOk() {
        _deleteData()
      },
      onCancel() {
        dataCenter.value.operationKey = undefined
      }
    })
  }

  const handleDeleteItem = async row => {
    dataCenter.value.loading = true
    try {
      await operateLogsApi.deleteById(row.id)
    } catch(err) {
      message.error("删除失败: " + err)
    } finally {
      dataCenter.value.loading = false
      handleSearch()
    }
  }

  const exportExcel = () => {
    const { tableList, pageName } = dataCenter.value
    if(tableList.length === 0) {
      return message.error("列表为空！")
    }

    const dataArray = [{
      id: `${pageName}id`,
      username: "用户名",
      ip: "IP",
      address: "地址",
      controllerName: "微站名称",
      content: "操作内容",
      time: "操作时间",
      createAt: "创建时间",
    }]

    tableList.forEach(item => {
      const data = {}
      Object.keys(dataArray[0]).forEach(key => data[key] = item[key])
      dataArray.push(data)
    })
    ExportXlsx.downloadExcel(dataArray, `${pageName}信息表_${new Date().toLocaleString()}`)
  }

  onMounted(() => {
    _getTableList()
  })
</script> 