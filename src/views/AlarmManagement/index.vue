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
    <a-page-header class="pageHeader" title="报警信息" />
    <div class="contentContainer">
      <div class="microstationContainer">
        <div class="leftArea">
          <a-tabs class="superTabs" v-model:activeKey="activeKey" @change="getTableList">
            <a-tab-pane key="1" tab="全部报警" />
            <a-tab-pane key="2" tab="未处理报警" />
          </a-tabs>
          <div class="statistics">共计报警<span>249</span>条</div>
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
          <a-spin :spinning="loading">
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
                :row-selection="rowSelection"
                :scroll="{ y: 'calc(100vh - 410px)', x: 'max-content' }"
                @change="handleTableChange"
              >
                <template #bodyCell="{ column, record }">
                  <template v-if="column.dataIndex === 'alarmLevel'">
                    <a-tag :color="`${record.level == 0 ? 'success' : record.level == 1 ? 'error' : 'orange'}`">{{ record.alarmLevel }}</a-tag>
                  </template>
                  <template v-if="column.dataIndex === 'status'">
                    <div :class="['status', `status-${record.status}`]" @click.stop="confirmData(record)">{{ record.statusName }}</div>
                  </template>
                </template>
              </a-table>
            </div>
          </a-spin>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, h } from "vue"
import { message } from "ant-design-vue"
import { FileExcelOutlined } from "@ant-design/icons-vue"
import RadarChart from "./components/RadarChart.vue"
import PieChart from "./components/PieChart.vue"
import ExportXlsx from "_utils/exportXlsx"

const loading = ref(false)
const activeKey = ref("1")
const alarmType = ref("0")
const searchForm = ref({})
const tableList = ref([])
const selectedRowKeys = ref([])
const operationKey = ref(undefined)
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
  { title: "报警分类", dataIndex: "alarmType", align: "left", width: 120, ellipsis: true },
  { title: "事件类型", dataIndex: "eventType", align: "left", width: 120, ellipsis: true },
  { title: "发生时间", dataIndex: "time", align: "left", width: 150, ellipsis: true },
  { title: "报警描述", dataIndex: "description", align: "left", width: 250, ellipsis: true },
  { title: "报警等级", dataIndex: "alarmLevel", align: "center", width: 150, ellipsis: true },
  { title: "确认状态", dataIndex: "status", align: "left", width: 100, fixed: "right" },
])

const radarChartRef = ref()
const pieChartRef = ref()

const rowSelection = ref({
  columnWidth: 80,
  onChange: keys => {
    selectedRowKeys.value = keys
  }
})

const operationDisabled = computed(() => {
  return selectedRowKeys.value.length === 0
})

const _getStatistics = async () => {
  const loading = message.loading("正在加载统计数据...", 0)
  try {
    radarChartRef.value.setChartData({
      status: 100, 
      site: 200, 
      superlative: 300
    })
    pieChartRef.value.setChartData([
      { value: 10, name: "普通" },
      { value: 20, name: "严重" },
      { value: 30, name: "事故" }
    ])
  } catch (err) {
    message.error(`统计数据加载失败:${err}`)
  } finally {
    setTimeout(loading)
  }
}

const getTableList = async () => {
  const { current, pageSize } = pagination.value
  const data = { name: searchForm.value.name, page: current, size: pageSize, type: alarmType.value, classification: activeKey.value }
  console.log(data)
  tableList.value = [
    {
      id: 1,
      controllerName: "微站101",
      deviceName: "门禁设备1",
      alarmType: "现场报警",
      eventType: "关门报警",
      time: "2023-12-01 13:20:31",
      description: "01 标签 1#门 状态变化",
      level: 0,
      alarmLevel: "普通",
      status: 0,
      statusName: "未确认"
    },
    {
      id: 2,
      controllerName: "微站102",
      deviceName: "空调",
      alarmType: "现场报警",
      eventType: "无法开机",
      time: "2023-12-01 11:11:11",
      description: "01 标签 开机异常",
      level: 1,
      alarmLevel: "严重",
      status: 0,
      statusName: "未确认"
    }
  ]
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

}

const confirmData = async () => {

}

const exportExcel = () => {
  if(tableList.value.length === 0) {
    return message.error("列表为空！")
  }

  const dataArray = [{
    id: `报警ID`,
    controllerName: "微站名称",
    deviceName: "设备名称",
    alarmType: "报警分类",
    eventType: "事件类型",
    time: "发生时间",
    description: "报警描述",
    alarmLevel: "报警等级",
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
  _getStatistics()
  getTableList()
})
</script>
