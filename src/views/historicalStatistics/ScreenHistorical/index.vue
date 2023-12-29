/*
 * @author: zzp
 * @date: 2023-12-27 14:32:01
 * @fileName: index.vue
 * @filePath: src/views/historicalStatistics/ScreenHistorical/index.vue
 * @description: 直流屏历史数据统计
 */
<template>
  <div class="parcel dataAnalysisX">
    <a-spin :spinning="loading">
      <a-page-header class="pageHeader">
        <template #tags>
          <a-radio-group v-model:value="pageType" @change="handleSearch">
            <a-radio-button value="1">
              <LineChartOutlined /> 图表
            </a-radio-button>
            <a-radio-button value="2">
              <BarChartOutlined /> 数据
            </a-radio-button>
          </a-radio-group>
        </template>
      </a-page-header>
      <div class="searchContainer">
        <a-row justify="space-between">
          <a-col />
          <a-col>
            <a-form :model="searchForm" layout="inline" class="complexSearch" ref="formRef">
              <a-form-item label="微 站" name="controllerId" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.controllerId" popupClassName="modalSelect" showSearch option-filter-prop="name" placeholder="请选择微站">
                  <a-select-option v-for="item in controllerList" :key="item.id" :value="item.id" :name="item.name">{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="直流屏" name="deviceId" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.deviceId" popupClassName="modalSelect" showSearch option-filter-prop="name" placeholder="请选择直流屏">
                  <a-select-option v-for="item in deviceList" :key="item.id" :value="item.id" :name="item.name">{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="日期" name="time" :rules="[{ required: true }]">
                <a-date-picker v-model:value="searchForm.time" placeholder="请选择日期" />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" :icon="h(SearchOutlined)" @click="handleSearch">查询</a-button>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </div>
      <div class="contentContainer">
        <div class="chartArea" v-if="pageType ==='1'">
          <div v-if="statisticsData.length === 0" class="empty">没有相关统计数据</div>
          <div v-else>
            <a-row :gutter="10">
              <a-col :span="8">
                <div class="title">电压数据</div>
                <line-chart ref="chartRef1" :grid="chartGrid" :legend="chartLegend" yAxisName="V" :colors="['#ebc039', '#bb2d0f', '#23f0f8']" :dataZoom="false"/>
              </a-col>
              <a-col :span="8">
                <div class="title">电流数据</div>
                <line-chart ref="chartRef2" :grid="chartGrid" :legend="chartLegend" yAxisName="A" :colors="['#ebc039', '#bb2d0f', '#23f0f8']" :dataZoom="false"/>
              </a-col>
              <a-col :span="8">
                <div class="title">温度数据</div>
                <line-chart ref="chartRef3" :grid="chartGrid" :legend="chartLegend" yAxisName="°C" :colors="['#ebc039', '#bb2d0f', '#23f0f8']" :dataZoom="false"/>
              </a-col>
            </a-row>
          </div>
        </div>
        <div v-if="pageType ==='2'">
          <div v-if="tableList.length === 0" class="empty">没有相关统计数据</div>
          <a-table
            v-else
            row-key="id" 
            :columns="columns" 
            :data-source="tableList" 
            :pagination="pagination"
            :scroll="{ y: 'calc(100vh - 410px)', x: 'max-content' }" 
            @change="handleTableChange"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'operation'">
                <a-button type="link" @click.stop="handleViewModal(record)">单体电池电压</a-button>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </a-spin>
    <a-modal width="900px" class="editModal" v-model:open="visible" title="单体电池电压数据" cancel-text="取消" @cancel="closureModal" :footer="null" >
      <div style="margin: 40px 0;">
        <x-descriptions :list="labelAndFields" :record="currentItem" :column="4" :minWidth="120" />
      </div>
    </a-modal>
  </div>
</template>
 
<script setup>
import { onMounted, ref, computed, h, nextTick, watch } from "vue"
import { message } from "ant-design-vue"
import { LineChartOutlined, BarChartOutlined, SearchOutlined } from "@ant-design/icons-vue"
import { screenHistoricalApi } from "_api/historicalStatistics"
import dayjs from "dayjs"
import controllerApi from "_api/controller"
import screenApi from "_api/screen"
import LineChart from "_components/charts/LineChart.vue"

const loading = ref(false)
const visible = ref(false)
const searchForm = ref({})
const tableList = ref([])
const pageType = ref("1")
const controllerList = ref([])
const oldDeviceList = ref([])
const statisticsData = ref([])
const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "30", "40", "50", "100", "200", "500", "1000"],
  showTotal: total => `共有 ${total} 条数据`
})
const chartGrid = {
  top: "12%",
  left: "8%",
  right: "10%",
  bottom: "7%",
  containLabel: true
}
const chartLegend = {
  top: 10
}
const currentItem = ref({})

const chartRef1 = ref()
const chartRef2 = ref()
const chartRef3 = ref()
const formRef = ref()

const columns = ref([
  { title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1, fixed: "left" },
  { title: "采集时间", dataIndex: "time", width: 180, ellipsis: true, fixed: "left" },
  { title: "电池电压", dataIndex: "batteryVoltage", align: "center",width: 120, ellipsis: true },
  { title: "控母电压", dataIndex: "busbarVoltage", align: "center",width: 100, ellipsis: true },
  { title: "电池电流", dataIndex: "batteryCurrent", align: "center", width: 100, ellipsis: true },
  { title: "负载电流", dataIndex: "loadCurrent", align: "center", width: 100, ellipsis: true },
  { title: "正地电阻", dataIndex: "positiveGroundResistance", align: "center", width: 100, ellipsis: true },
  { title: "负地电阻", dataIndex: "negativeGroundResistance", align: "center", width: 100, ellipsis: true },
  { title: "正地电压", dataIndex: "positiveGroundVoltage", align: "center", width: 100, ellipsis: true },
  { title: "负地电压", dataIndex: "negativeGroundVoltage", align: "center", width: 100, ellipsis: true },
  { title: "环境温度", dataIndex: "ambientTemperature", align: "center", width: 100, ellipsis: true },
  { title: "硅链温度", dataIndex: "siliconTemperature", align: "center", width: 100, ellipsis: true },
  { title: "查 看", dataIndex: "operation", align: "center", width: 120, fixed: "right" }
])
const labelAndFields = ref([])

const deviceList = computed(() => {
  delete searchForm.value.deviceId
  return oldDeviceList.value.filter(x => x.controllerId === searchForm.value.controllerId)
})

watch(searchForm.value, () => {
  tableList.value = []
  statisticsData.value = []
  _calibration(status => {
    if(status) _searchPrefix()
  })
})

const _getControllerList = async () => {
  try {
    const res = await controllerApi.getAll()
    controllerList.value = res.data
  } catch(err) {
    message.error(`获取微站列表失败: ${err}`)
  }
}

const _getDeviceList = async () => {
  try {
    const res = await screenApi.getAll()
    oldDeviceList.value = res.data
  } catch(err) {
    message.error(`获取直流屏列表失败: ${err}`)
  }
}

const _getStatistics = async () => {
  loading.value = true

  try {
    const data = await screenHistoricalApi.getStatistics({ 
      ...searchForm.value,
      time: dayjs(searchForm.value.time).format("YYYY-MM-DD"),
    })

    const times = data.map(x => {
      x.time = dayjs(x.time).format("MM-DD HH:mm")
      return x.time
    })

    statisticsData.value = data

    nextTick(() => {
      chartRef1.value && chartRef1.value.setChartData([
        { name: "电池电压", data: data.map(x => x.batteryVoltage) },
        { name: "控母电压", data: data.map(x => x.busbarVoltage) },
        { name: "正地电压", data: data.map(x => x.positiveGroundVoltage) },
        { name: "负地电压", data: data.map(x => x.negativeGroundVoltage) },
      ], times)

      chartRef2.value && chartRef2.value.setChartData([
        { name: "电池电流", data: data.map(x => x.batteryCurrent) },
        { name: "负载电流", data: data.map(x => x.loadCurrent) },
      ], times)

      chartRef3.value && chartRef3.value.setChartData([
        { name: "环境温度", data: data.map(x => x.ambientTemperature) },
        { name: "硅链温度", data: data.map(x => x.siliconTemperature) },
      ], times)
    })
  } catch (err) {
    message.error("统计数据加载失败: " + err)
  } finally {
    loading.value = false
  }
}

const _calibration = callback => {
  formRef.value.validate().then(() => callback(true)).catch(() => callback(false))
}

const _getTableList = async () => {
  const { current, pageSize } = pagination.value

  try {
    loading.value = true

    const data = await screenHistoricalApi.pageBySheet({ 
      ...searchForm.value,
      time: dayjs(searchForm.value.time).format("YYYY-MM-DD"),
      page: current, 
      size: pageSize
    })
    tableList.value = data.content
    pagination.value.total = data.totalElements
    pagination.value.current = data.pageNumber
  } catch (err) {
    message.error("获取统计列表数据失败: " + err)
  } finally {
    loading.value = false
  }
}

const handleTableChange = _pagination => {
  pagination.value.current = _pagination.current
  pagination.value.pageSize = _pagination.pageSize
  _getTableList()
}

const _searchPrefix = () => {
  pagination.value.current = 1
  if(pageType.value === "1") {
    _getStatistics()
  } else {
    _getTableList()
  }
}

const handleSearch = () => {
  _calibration(status => {
    if(status) _searchPrefix()
      else message.warning("请完善查询条件！")
  })
}

const closureModal = () => {
  visible.value = false
}

const handleViewModal = row => {
  const obj = {}
  JSON.parse(row.singleCellBatteryVoltage).forEach((item, index) => {
    obj[`voltageObj${index}`] = item
  })
  currentItem.value = obj
  visible.value = true
}

onMounted(() => {
  new Array(18).fill("-").forEach((_x, index) => {
    labelAndFields.value.push({ label: `电池${index+1}`, field: `voltageObj${index}`, unit: "V" })
  })
  _getControllerList()
  _getDeviceList()
})
</script>
 