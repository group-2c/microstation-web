/*
 * @author: zzp
 * @date: 2023-12-04 14:20:16
 * @fileName: index.vue
 * @filePath: src/components/BasicListLayout/index.vue
 * @description: 基本列表页组件
 */
<template>
  <div class="parcel">
    <a-spin :spinning="dataCenter.loading" >
      <a-page-header class="pageHeader" :title="`${pageName}列表`">
        <template #extra> 
          <a-button v-if="permissions.export" :icon="h(FileExcelOutlined)" @click.stop="exportExcel">导出Excel</a-button>
          <a-button v-if="permissions.add && !logOnly" :icon="h(PlusOutlined)" @click.stop="handleAdd">添加</a-button>
        </template>
      </a-page-header>
      <div class="searchContainer">
        <a-row justify="space-between">
          <a-col>
            <a-select
              v-if="permissions.delete && !notOperation"
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
          :columns="tableColumns"
          :data-source="dataCenter.tableList" 
          :pagination="dataCenter.pagination"
          :row-selection="rowSelection"
          :scroll="{ y: 'calc(100vh - 410px)', x: 'max-content' }"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'operation'">
              <span>
                <a-button v-if="!logOnly" :disabled="!permissions.edit" type="link" @click.stop="handleEditItem(record)">
                  <template #icon><EditOutlined /></template>
                  编辑
                </a-button>
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
  import { FileExcelOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons-vue"
  import { message, Modal } from "ant-design-vue"
  import Lodash from "lodash"
  import ExportXlsx from "_utils/exportXlsx"

  const dataDefault = {
    loading: false,
    operationKey: undefined,
    searchForm: {},
    tableList: [],
    selectedRowKeys: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "30", "40", "50", "100", "200", "500", "1000"],
      showTotal: total => `共有 ${total} 条数据`
    }
  }

  const props = defineProps({
    pageName: String,
    oApi: Object,
    permissions: {
      type: Object,
      default: {}
    },
    columns: {
      type: Array,
      default: []
    },
    notOperation: {
      type: Boolean,
      default: false
    },
    logOnly: {
      type: Boolean,
      default: false
    },
    operationWidth: {
      type: Number,
      default: 200
    },
    exportExcelArray: Array,
    tableListFormat: Function
  })

  const emits = defineEmits(["editItem", "addItem"])

  const dataCenter = ref(Lodash.cloneDeep(dataDefault))
  const tableColumns = ref([])
  
  const rowSelection = ref({
    columnWidth: 80,
    onChange: selectedRowKeys => {
      dataCenter.value.selectedRowKeys = selectedRowKeys
    }
  })

  const operationDisabled = computed(() => {
    return dataCenter.value.selectedRowKeys.length === 0
  })

  const _dataDriveBreak = () => {
    const columns = Lodash.cloneDeep(props.columns)

    const _firstAry = [{ title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1, fixed: "left" }]  
    const _lastAry = [{ title: "创建时间", dataIndex: "createAt", align: "left", width: 200 }]
    if(!props.logOnly) {
      _lastAry.push({ title: "更新时间", dataIndex: "updateAt", align: "left", width: 200 })
    }
    if(!props.notOperation) {
      _lastAry.push({ title: "操 作", dataIndex: "operation", align: "center", width: props.operationWidth, fixed: "right" })
    } else {
      rowSelection.value = undefined
    }
    
    const _dynamicAry = columns.filter(x => x.visible === undefined)
    tableColumns.value = Lodash.unionWith(_firstAry, _dynamicAry, _lastAry)
  }
  
  const _getTableList = async () => {
    dataCenter.value.loading = true

    const { searchForm, pagination } = dataCenter.value
    const { current, pageSize } = pagination
    const data = { ...searchForm, page: current, size: pageSize }

    try {
      const res = await props.oApi.getByPage(data)
      const content = res.data.content || []
      dataCenter.value.tableList = props.tableListFormat ? props.tableListFormat(content) : content
      dataCenter.value.pagination.total = res.data.totalElements
      dataCenter.value.pagination.current = res.data.number
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
    dataCenter.value.pagination.pageSize = pagination.pageSize
    _getTableList()
  }

  const handleEditItem = row => {
    emits("editItem", row) 
  }

  const handleAdd = () => {
    emits("addItem") 
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
        await props.oApi.deleteManyById(selectedRowKeys)
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
      await props.oApi.deleteById(row.id)
    } catch(err) {
      message.error("删除失败: " + err)
    } finally {
      dataCenter.value.loading = false
      handleSearch()
    }
  }

  const exportExcel = () => {
    const { tableList } = dataCenter.value
    if(tableList.length === 0) {
      return message.error("列表为空！")
    }

    const _obj = { id: `${props.pageName}ID` }
    const _ary = ["index", "updateAt", "operation"]
    tableColumns.value.forEach(item => {
      if(!_ary.includes(item.dataIndex)) {
        _obj[item.dataIndex] = item.title
      }
    })

    const dataArray = [_obj]
    tableList.forEach(item => {
      const data = {}
      Object.keys(dataArray[0]).forEach(key => data[key] = item[key])
      dataArray.push(data)
    })
    ExportXlsx.downloadExcel(dataArray, `${props.pageName}信息表_${new Date().toLocaleString()}`)
  }

  const search = () => {
    _getTableList()
  }

  onMounted(() => {
    _dataDriveBreak()
    _getTableList()
  })

  defineExpose({ search })
</script> 