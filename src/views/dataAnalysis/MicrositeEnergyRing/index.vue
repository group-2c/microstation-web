/*
 * @author: zzp
 * @date: 2023-12-08 15:17:40
 * @fileName: index.vue
 * @filePath: src/views/dataAnalysis/MicrositeEnergyRing/index.vue
 * @description: 微站能耗环比分析 
 */
<template>
  <div class="parcel dataAnalysisX">
    <a-spin :spinning="loading">
      <a-page-header class="pageHeader">
        <template #tags>
          <a-radio-group v-model:value="pageType" @change="pageTypeChange">
            <a-radio-button value="day"> <ClockCircleOutlined /> 按日 </a-radio-button>
            <a-radio-button value="week"> <InsertRowBelowOutlined /> 按周 </a-radio-button>
            <a-radio-button value="month"> <ExperimentOutlined /> 按月 </a-radio-button>
          </a-radio-group>
        </template>
        <template #extra>
          <a-button v-if="permissions.export" :icon="h(FileExcelOutlined)" @click.stop="exportExcel">导出Excel</a-button>
        </template>
      </a-page-header>
      <div class="searchContainer">
        <a-row justify="space-between">
          <a-col />
          <a-col>
            <a-form :model="searchForm" layout="inline" class="complexSearch" ref="formRef">
              <a-form-item label="微 站" name="controllerId" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.controllerId" popupClassName="modalSelect" showSearch option-filter-prop="name" placeholder="请选择微站" @change="controllerChange">
                  <a-select-option v-for="item in controllerList" :key="item.id" :value="item.id" :name="item.name">{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="多功能电表" name="electricityMeterId" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.electricityMeterId" popupClassName="modalSelect" mode="multiple" :maxTagCount="1" showSearch option-filter-prop="name" placeholder="请选择电表">
                  <a-select-option v-for="item in electricityList" :key="item.id" :value="item.id" :name="item.name">{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="日期" name="date" :rules="[{ required: true }]">
                <a-date-picker 
                  v-model:value="searchForm.date" 
                  :picker="pageType === 'week' ? 'week' : pageType === 'month' ? 'month' : ''" 
                  placeholder="请选择" 
                />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" :icon="h(SearchOutlined)" @click="handleSearch">查询</a-button>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </div>
      <div class="contentContainer">
        <a-table
          row-key="id" 
          :columns="columns" 
          :data-source="tableList" 
          :pagination="pagination"
          :scroll="{ y: 'calc(100vh - 410px)', x: 'max-content' }" 
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'operation'">
              <span>
                <a-button type="link" @click.stop="handleViewChart(record)">
                  <template #icon><BarChartOutlined /></template>
                  图表
                </a-button>
              </span>
            </template>
          </template>        
        </a-table>
      </div>
    </a-spin>
    <a-modal class="editModal" v-model:open="visible" :title="currentItem.name" :footer="null" width="500px" cancel-text="取消" @cancel="closureModal">
      <div style="margin: 20px 0;">
        <div class="chartTitle">
          <div class="tItem">增长值：{{ currentItem.added }}KW.h</div>
          <div class="tItem">增长率：{{ currentItem.scale }}%</div>
        </div>
        <bar-chart class="barChart" ref="barChartRef" yAxisName="单位(KW.h)" :legend="chartLegend" :grid="chartGrid" />
      </div>
    </a-modal>
  </div>
</template>
 
<script setup>
import { onMounted, ref, h, computed, nextTick } from "vue"
import { getPermissions } from "@/router"
import { message } from "ant-design-vue"
import { ClockCircleOutlined, InsertRowBelowOutlined, FileExcelOutlined, ExperimentOutlined, SearchOutlined, BarChartOutlined } from "@ant-design/icons-vue"
import ExportXlsx from "_utils/exportXlsx"
import dayjs from "dayjs"
import controllerApi from "_api/controller"
import BarChart from "_components/charts/BarChart.vue"

const permissions = getPermissions()

const loading = ref(false)
const searchForm = ref({})
const tableList = ref([])
const pageType = ref("day")
const controllerList = ref([])
const electricityList = ref([])
const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "30", "40", "50", "100", "200", "500", "1000"],
  showTotal: total => `共有 ${total} 条数据`
})
const pageTypeDist = { day: "日", week: "周", month: "月" }
const chartLegend = { top: null, bottom: 0 }
const chartGrid = { top: "10%", left: "10%", right: "10%", bottom: "15%" }
const visible = ref(false)
const currentItem = ref({})

const formRef = ref()
const barChartRef = ref()

const columns = computed(() => {
  return [
    { title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1 },
    { title: "回路名称", dataIndex: "name" },
    { title: `当${pageTypeDist[pageType.value]}用电/KW.h`, dataIndex: "current" },
    { title: `上${pageTypeDist[pageType.value]}用电/KW.h`, dataIndex: "last" },
    { title: "增加值", dataIndex: "added" },
    { title: "环比(%)", dataIndex: "scale" },
    { title: "操 作", dataIndex: "operation", align: "center", width: 150, fixed: "right" }
  ]
})

const _getControllerList = async () => {
  try {
    const res = await controllerApi.getAll()
    controllerList.value = res.data
  } catch(err) {
    message.error(`获取微站列表失败: ${err}`)
  }
}

const controllerChange = async () => {
  electricityList.value = []
  delete searchForm.value.electricityMeterId
  loading.value = true
  try {
    const res = await controllerApi.getDeviceByDeviceType({
      deviceType: "electricity_meter",
      controllerID: searchForm.value.controllerId
    })
    electricityList.value = res
  } catch(err) {
    console.log(err)
    message.error(`获取多功能电表列表失败:${err}`)
  } finally {
    loading.value = false 
  }  
}

const _calibration = callback => {
  formRef.value.validate().then(() => callback(true)).catch(() => callback(false))
}

const _getTableList = async () => {
  const { current, pageSize } = pagination.value
  const data = { 
    ...searchForm.value,
    type: pageType.value,
    page: current, 
    size: pageSize 
  }
  if(pageType.value === "day") data.date = dayjs(data.date).format("YYYY-MM-DD")
  if(pageType.value === "month") data.date = dayjs(data.date).format("YYYY-MM")
  if(pageType.value === "week") data.date = dayjs(dayjs(data.date).day(1)).format("YYYY-MM-DD")

  console.log(JSON.stringify(data))

  loading.value = true
  try {
    pagination.value.total = 10
    pagination.value.current = 1
  } catch (err) {
    message.error("列表数据失败: " + err)
  } finally {
    loading.value = false
  }
}

const handleTableChange = _pagination => {
  pagination.value.current = _pagination.current
  pagination.value.pageSize = _pagination.pageSize
  _getTableList()
}

const pageTypeChange = () => {
  searchForm.value = {}
  pagination.value.current = 1
}

const _searchPrefix = () => {
  pagination.value.current = 1
  _getTableList()
}

const handleSearch = () => {
  _calibration(status => {
    if(status) _searchPrefix()
      else message.warning("请完善查询条件！")
  })
}

const handleViewChart = row => {
  currentItem.value = row
  visible.value = true

  const name = pageTypeDist[pageType.value]
  let date = [row.name], array = [
    { name: `当${name}用电`, data: [row.current] },
    { name: `上${name}用电`, data: [row.last] }
  ]
  nextTick(() => {
    barChartRef.value.setChartData(date, array)
  })
}

const closureModal = () => {
  visible.value = false
  currentItem.value = {}
}

const exportExcel = () => {
  if (tableList.value.length === 0) {
    return message.error("列表为空！")
  }

  const obj = {}
  columns.value.forEach(item => {
    if(!["index"].includes(item.dataIndex)) {
      obj[item.dataIndex] = item.title
    }
  })
  
  const dataArray = [obj]
  tableList.value.forEach(item => {
    const data = {}
    Object.keys(dataArray[0]).forEach(key => data[key] = item[key])
    dataArray.push(data)
  })
  ExportXlsx.downloadExcel(dataArray, `微站能耗分析数据表_${new Date().toLocaleString()}`)
}

onMounted(() => {
  _getControllerList()
  tableList.value = [
    {
      id: 1,
      name: "回路1",
      current: 100,
      last: 120,
      added: 0,
      scale: "0"
    },
    {
      id: 2,
      name: "回路2",
      current: 200,
      last: 120,
      added: 80,
      scale: "40"
    }
  ]
})
</script>

<style lang="less" scoped>
.barChart {
  width: 100%;
  height: 400px;
}

.chartTitle {
  margin: 10px 0;
  color: #a3d4f9;
  text-align: center;
  .tItem {
    display: inline-block;
    margin-right: 30px;
  }
}
</style>
 