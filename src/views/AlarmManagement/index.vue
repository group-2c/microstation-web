/*
 * @author: zzp
 * @date: 2023-09-05 10:49:59
 * @fileName: index.vue
 * @filePath: src/views/AlarmManagement/index.vue
 * @description: 报警管理
 */
<style lang="less" scoped>
@import url("./index.less");
</style>

<template>
  <div class="parcel">
    <a-spin :spinning="loading">
      <a-page-header class="pageHeader" title="报警信息" />
      <div class="contentContainer">
        <div class="microstationContainer">
          <div class="leftArea">
            <a-tabs class="superTabs" v-model:activeKey="activeKey" @change="dataUpdate">
              <a-tab-pane key="1" tab="全部报警" />
              <a-tab-pane key="2" tab="未处理报警" />
            </a-tabs>
            <div class="statistics">共计报警<span>{{ alarmTotal }}</span>条</div>
            <div class="containerArea">
              <div class="areaItem">
                <div class="highLevelTitleBar">
                  <span class="chTitle">报警类型分析</span>
                </div>
                <radar-chart ref="radarChartRef" />
              </div>
              <div class="areaItem">
                <div class="highLevelTitleBar">
                  <span class="chTitle">报警等级分析</span>
                </div>
                <pie-chart ref="pieChartRef" />
              </div>
            </div>
          </div>
          <div class="rightArea" style="height: calc(100vh - 244px);">
            <a-page-header class="pageHeader" title="数据列表">
              <template #extra> 
                <a-button :icon="h(FileExcelOutlined)" @click.stop="exportExcel">导出Excel</a-button>
              </template>
            </a-page-header>
            <div class="searchContainer">
              <a-row justify="space-between">
                <a-col>
                  <a-select
                    v-model:value="operationKey"
                    class="batchOperation"
                    allowClear
                    @change="batchOperationChange"
                    placeholder="批量操作所选"
                  >
                    <a-select-option value="confirm" :disabled="operationDisabled">一键确认</a-select-option>
                  </a-select>
                </a-col>
                <a-col>
                  <a-select v-model:value="alarmType" class="batchOperation alarmType" @change="getTableList">
                    <a-select-option value="0">普通</a-select-option>
                    <a-select-option value="1">严重</a-select-option>
                    <a-select-option value="2">事故</a-select-option>
                  </a-select>
                  <a-input-search
                    v-model:value="searchForm.name"
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
                :columns="columns"
                :data-source="tableList" 
                :pagination="pagination"
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: rowChange, getCheckboxProps: rowChangeDisabled  }"
                :scroll="{ y: 'calc(100vh - 410px)', x: 'max-content' }"
                @change="handleTableChange"
              >
                <template #bodyCell="{ column, record }">
                  <template v-if="column.dataIndex === 'alarmLevelName'">
                    <a-tag :color="`${record.alarmLevel == '0' ? 'cyan' : record.alarmLevel == '1' ? 'error' : 'orange'}`">{{ record.alarmLevelName }}</a-tag>
                  </template>
                  <template v-if="column.dataIndex === 'statusName'">
                    <div v-if="record.status == '1'">{{ record.statusName }}</div>
                    <a-popconfirm
                      v-else
                      title="是否确认？"
                      ok-text="是"
                      cancel-text="否"
                      @confirm="() => confirmData(record)"
                    >
                      <div :class="['status', `status-${record.status}`]">{{ record.statusName }}</div>
                    </a-popconfirm>
                  </template>
                </template>
              </a-table>
            </div>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, h } from "vue"
import { message } from "ant-design-vue"
import { FileExcelOutlined } from "@ant-design/icons-vue"
import { dict_alarms_types, dict_alarms_level, dict_alarms_status } from "_utils/dictionary"
import RadarChart from "./components/RadarChart.vue"
import PieChart from "./components/PieChart.vue"
import ExportXlsx from "_utils/exportXlsx"
import alarmsApi from "_api/alarms"

const loading = ref(false)
const activeKey = ref("1")
const alarmType = ref("0")
const searchForm = ref({})
const tableList = ref([])
const selectedRowKeys = ref([])
const operationKey = ref(undefined)
const alarmTotal = ref(0)
const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "30", "40", "50", "100", "200", "500", "1000"],
  showTotal: total => `共有 ${total} 条数据`
})

const columns = ref([  
  { title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1, fixed: "left" },
  { title: "微站名称", dataIndex: "controllerName", align: "left", width: 200, ellipsis: true, fixed: "left" },    
  { title: "设备名称", dataIndex: "deviceName", align: "left", width: 200, ellipsis: true },
  { title: "报警分类", dataIndex: "alarmTypeName", align: "left", width: 120, ellipsis: true },
  { title: "事件类型", dataIndex: "eventType", align: "left", width: 120, ellipsis: true },
  { title: "发生时间", dataIndex: "createAt", align: "left", width: 150, ellipsis: true },
  { title: "报警描述", dataIndex: "description", align: "left", width: 250, ellipsis: true },
  { title: "报警等级", dataIndex: "alarmLevelName", align: "center", width: 150, ellipsis: true },
  { title: "确认状态", dataIndex: "statusName", align: "left", width: 100, fixed: "right" },
])

const radarChartRef = ref()
const pieChartRef = ref()

const rowChange = keys => {
  selectedRowKeys.value = keys
}

const rowChangeDisabled = record => ({
  disabled: record.status == "1"
})

const operationDisabled = computed(() => {
  return selectedRowKeys.value.length === 0
})

const _getStatistics = async () => {
  loading.value = true
  try {
    const res = await alarmsApi.getAlarmByStatus({ classification: activeKey.value })
    radarChartRef.value.setChartData(res.genre)
    pieChartRef.value.setChartData(res.level)
    alarmTotal.value = res.total
  } catch(err) {
    message.error("统计数据加载失败: " + err)
  } finally {
    loading.value = false
  }
}

const getTableList = async () => {
  const { current, pageSize } = pagination.value
  const data = { name: searchForm.value.name, page: current, size: pageSize, type: alarmType.value, classification: activeKey.value }

  loading.value = true
  try {
    const res = await alarmsApi.getByPage(data)
    tableList.value = (res.data?.content || []).map(item => {
      item.alarmTypeName = dict_alarms_types.find(x => x.key === item.alarmType)?.value
      item.alarmLevelName = dict_alarms_level.find(x => x.key === item.alarmLevel)?.value
      item.statusName = dict_alarms_status.find(x => x.key === item.status)?.value
      return item
    })
    pagination.value.total = res.data.totalElements
    pagination.value.current = res.data.number
  } catch(err) {
    message.error("获取报警列表数据失败: " + err)
  } finally {
    loading.value = false
  }
}

const dataUpdate = async () => {
  alarmTotal.value = 0
  await _getStatistics()
  await getTableList()
} 

const handleTableChange = pagination => {
  selectedRowKeys.value = []
  pagination.value.current = pagination.current
  pagination.value.pageSize = pagination.pageSize
  getTableList()
}

const batchOperationChange = type => {
  switch(type) {
    case "confirm": 
      batchConfirm()
      break
    default:
      break
  }
}

const handleSearch = () => {
  pagination.value.current = 1
  getTableList()
}

const batchConfirm = async () => {
  try {
    loading.value = true
    await alarmsApi.updateStatusByIds({ ids: selectedRowKeys.value })
    message.success("批量确认成功！")
    selectedRowKeys.value = []
    dataUpdate()
  } catch(err) {
    message.error(`批量确认失败: ${err}`)
  } finally {
    loading.value = false
    operationKey.value = undefined
  }
}

const confirmData = async row => {
  try {
    loading.value = true
    await alarmsApi.updateById(row.id, { ...row, status: "1" })
    message.success("确认成功！")
    dataUpdate()
  } catch(err) {
    message.error(`确认失败: ${err}`)
  } finally {
    loading.value = false
  }
}

const exportExcel = () => {
  if(tableList.value.length === 0) {
    return message.error("列表为空！")
  }

  const dataArray = [{
    id: `报警ID`,
    controllerName: "微站名称",
    deviceName: "设备名称",
    alarmTypeName: "报警分类",
    eventType: "事件类型",
    time: "发生时间",
    description: "报警描述",
    alarmLevelName: "报警等级",
    statusName: "确认状态"
  }]

  tableList.value.forEach(item => {
    const data = {}
    Object.keys(dataArray[0]).forEach(key => data[key] = item[key])
    dataArray.push(data)
  })
  ExportXlsx.downloadExcel(dataArray, `报警数据表_${new Date().toLocaleString()}`)
}

onMounted(() => {
  dataUpdate()
})
</script>
