/*
 * @author: zzp
 * @date: 2023-08-27 15:24:54
 * @fileName: index.vue
 * @filePath: src/views/operations/TemperatureEquipment/index.vue
 * @description: 数显温湿度设备
 */
 <template>
  <div class="parcel">
    <a-spin :spinning="dataCenter.loading" >
      <a-page-header class="pageHeader" :title="`${dataCenter.pageName}列表`">
        <template #extra> 
          <a-button :icon="h(FileExcelOutlined)" @click.stop="exportExcel">导出Excel</a-button>
          <a-button :icon="h(PlusOutlined)" @click.stop="handleAdd">添加</a-button>
        </template>
      </a-page-header>
      <div class="searchContainer">
        <a-row justify="space-between">
          <a-col>
            <a-select
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
          :scroll="{ y: 'calc(100vh - 320px)', x: 1800 }"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'operation'">
              <span>
                <a-button type="link" @click.stop="handleEditItem(record)">
                  <template #icon><EditOutlined /></template>
                  编辑
                </a-button>
                <a-popconfirm
                  title="是否删除？"
                  ok-text="是"
                  cancel-text="否"
                  @confirm="() => handleDeleteItem(record)"
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
    <edit-drawer ref="editDrawerRef" :onOk="editDrawerConfirm"/>
  </div>
</template>

<script setup>
  import { h, ref, onMounted, createVNode, computed } from "vue"
  import { FileExcelOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons-vue"
  import { message, Modal } from "ant-design-vue"
  import { dict_manufacturers } from "_utils/dictionary"
  import Lodash from "lodash"
  import ExportXlsx from "_utils/exportXlsx"
  import temperatureEquipmentApi from "_api/temperatureEquipment"
  import EditDrawer from "./EditDrawer.vue"

  const constColumns = [
    { title: "序 号", dataIndex: "index", align: "center",  width: 80, customRender: data => data.index + 1 },    
    { title: "设备名称", dataIndex: "name", align: "left", width: 250, ellipsis: true },    
    { title: "设备地址", dataIndex: "slave_id", align: "left", width: 250, ellipsis: true },
    { title: "波特率", dataIndex: "baud_rate", align: "left", width: 180 },
    { title: "数据位", dataIndex: "data_bit", align: "left", width: 180 },
    { title: "停止位", dataIndex: "stop_bit", align: "left", width: 180 },
    { title: "校验位", dataIndex: "parity", align: "left", width: 180 },
    { title: "所属微站", dataIndex: "controller_name", align: "left", width: 250, ellipsis: true },
    { title: "制造商", dataIndex: "manufacturer_name", align: "left", width: 250, ellipsis: true },
    { title: "创建时间", dataIndex: "createAt", align: "left", width: 200 },
    { title: "更新时间", dataIndex: "updateAt", align: "left", width: 200 },
    { title: "操 作", dataIndex: "operation", align: "center", width: 200, fixed: "right" }
  ]

  const dataDefault = {
    loading: false,
    operationKey: undefined,
    pageName: "数显温湿度设备",
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
  const rowSelection = ref({
    columnWidth: 80,
    onChange: selectedRowKeys => {
      dataCenter.value.selectedRowKeys = selectedRowKeys
    }
  })
  const editDrawerRef = ref()

  const operationDisabled = computed(() => {
    return dataCenter.value.selectedRowKeys.length === 0
  })

  const _getTableList = async () => {
    dataCenter.value.loading = true
    
    const { searchForm, pagination } = dataCenter.value
    const { current, pageSize } = pagination
    const data = { ...searchForm, page: current, size: pageSize }

    try {
      const res = await temperatureEquipmentApi.getByPage(data)
      dataCenter.value.tableList = res.data.content.map(item => {
        item.manufacturer_name = dict_manufacturers.find(x => x.key === item.manufacturer)?.value
        return item
      })
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
    _getTableList()
  }

  
  const handleEditItem = row => {
    editDrawerRef.value.handleShow(row)
  }

  const handleAdd = () => {
    editDrawerRef.value.handleShow({})
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
        await temperatureEquipmentApi.deleteManyById(selectedRowKeys)
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
      await temperatureEquipmentApi.deleteById(row.id)
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
      name: "设备名称",
      slave_id: "设备地址",
      baud_rate: "波特率",
      data_bit: "数据位",
      stop_bit: "停止位",
      parity: "校验位",
      controller_name: "所属微站",
      manufacturer_name: "制造商",
      createAt: "创建时间",
    }]

    tableList.forEach(item => {
      const data = {}
      Object.keys(dataArray[0]).forEach(key => data[key] = item[key])
      dataArray.push(data)
    })
    ExportXlsx.downloadExcel(dataArray, `${pageName}信息表_${new Date().toLocaleString()}`)
  }

  const editDrawerConfirm = () => {
    _getTableList()
  }

  onMounted(() => {
    _getTableList()
  })
</script> 