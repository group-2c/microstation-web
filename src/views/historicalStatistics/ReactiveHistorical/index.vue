/*
 * @author: zzp
 * @date: 2023-12-29 10:23:49
 * @fileName: index.vue
 * @filePath: src/views/historicalStatistics/ReactiveHistorical/index.vue
 * @description: 无功补偿器历史数据分析 
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
              <a-form-item label="设 备" name="deviceId" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.deviceId" popupClassName="modalSelect" showSearch option-filter-prop="name" placeholder="请选择设备">
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
            <a-radio-group class="chartSwitch" v-model:value="chartFunKey">
              <a-radio-button value="1">电 压</a-radio-button>
              <a-radio-button value="2">电 流</a-radio-button>
              <a-radio-button value="3">功率因数</a-radio-button>
              <a-radio-button value="4">有功功率</a-radio-button>
              <a-radio-button value="5">无功功率</a-radio-button>
            </a-radio-group>
            <a-row :gutter="10" style="height: 80%;">
              <a-col :span="24">
                <line-chart ref="chartRef" :grid="chartGrid" :legend="chartLegend" :colors="['#ebc039', '#bb2d0f', '#23f0f8']" :dataZoom="false"/>
              </a-col>
            </a-row>
          </div>
        </div>
        <div v-if="pageType ==='2'">
          <div v-if="tableList.length === 0" class="empty">没有相关统计数据</div>
          <a-table
            v-else
            row-key="id" 
            class="groupTable noIndex"
            :columns="columns" 
            :data-source="tableList" 
            :pagination="pagination"
            :scroll="{ y: 'calc(100vh - 410px)', x: 'max-content' }" 
            @change="handleTableChange"
          />
        </div>
      </div>
    </a-spin>
  </div>
</template>
 
<script setup>
import { onMounted, ref, computed, h, nextTick, watch } from "vue"
import { message } from "ant-design-vue"
import { LineChartOutlined, BarChartOutlined, SearchOutlined } from "@ant-design/icons-vue"
import { reactivePowerApi } from "_api/historicalStatistics"
import dayjs from "dayjs"
import controllerApi from "_api/controller"
import reactivePowerCompensatorApi from "_api/reactivePowerCompensator"
import LineChart from "_components/charts/LineChart.vue"

const loading = ref(false)
const searchForm = ref({})
const tableList = ref([])
const pageType = ref("1")
const controllerList = ref([])
const oldDeviceList = ref([])
const statisticsData = ref([])
const chartFunKey = ref("1")
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

const chartRef = ref()
const formRef = ref()

const columns = ref([
  { title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1, fixed: "left" },
  { title: "采集时间", dataIndex: "time", align: "left", width: 180, fixed: "left" },
  { title: "A相", dataIndex: "A", children: [
    { title: "电压", dataIndex: "aphaseVoltage", align: "center", width: 120 },
    { title: "电流", dataIndex: "aphaseCurrent", align: "center", width: 120 },
    { title: "功率因数", dataIndex: "aphasePowerFactor", align: "center", width: 120 },
    { title: "有功功率", dataIndex: "aphaseActivePower", align: "center", width: 120 },
    { title: "无功功率", dataIndex: "aphaseReactivePower", align: "center", width: 120 },
  ]},
  { title: "B相", dataIndex: "B", children: [
    { title: "电压", dataIndex: "bphaseVoltage", align: "center", width: 120 },
    { title: "电流", dataIndex: "bphaseCurrent", align: "center", width: 120 },
    { title: "功率因数", dataIndex: "bphasePowerFactor", align: "center", width: 120 },
    { title: "有功功率", dataIndex: "bphaseActivePower", align: "center", width: 120 },
    { title: "无功功率", dataIndex: "bphaseReactivePower", align: "center", width: 120 },
  ]},
  { title: "C相", dataIndex: "C", children: [
    { title: "电压", dataIndex: "cphaseVoltage", align: "center", width: 120 },
    { title: "电流", dataIndex: "cphaseCurrent", align: "center", width: 120 },
    { title: "功率因数", dataIndex: "cphasePowerFactor", align: "center", width: 120 },
    { title: "有功功率", dataIndex: "cphaseActivePower", align: "center", width: 120 },
    { title: "无功功率", dataIndex: "cphaseReactivePower", align: "center", width: 120 },
  ]}
])

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

watch(() => chartFunKey.value, () => {
  _calibration(status => {
    if(status) _setChartData()
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
    const res = await reactivePowerCompensatorApi.getAll()
    oldDeviceList.value = res.data
  } catch(err) {
    message.error(`获取无功补偿器设备列表失败: ${err}`)
  }
}

const _getStatistics = async () => {
  loading.value = true

  try {
    const data = await reactivePowerApi.getStatistics({ 
      ...searchForm.value,
      time: dayjs(searchForm.value.time).format("YYYY-MM-DD"),
    })
    statisticsData.value = data
    _setChartData()
  } catch (err) {
    message.error("统计数据加载失败: " + err)
  } finally {
    loading.value = false
  }
}

const _setChartData = () => {
  const data = statisticsData.value

  const times = data.map(x => dayjs(x.time).format("MM-DD HH:mm"))

  nextTick(() => {
    const getChartData = (chartSwitchData) => {
      const phases = ["a", "b", "c"]
      chartRef.value && chartRef.value.setChartData(
        phases.map(phase => ({
          name: `${phase}相`,
          data: data.map(x => x[`${phase}${chartSwitchData[chartFunKey.value]}`])
        })),
        times
      )
    }
    
    getChartData({ 
      "1": "phaseVoltage", 
      "2": "phaseCurrent",
      "3": "phasePowerFactor",
      "4": "phaseActivePower",
      "5": "phaseReactivePower"
    })
  })
}

const _calibration = callback => {
  formRef.value.validate().then(() => callback(true)).catch(() => callback(false))
}

const _getTableList = async () => {
  const { current, pageSize } = pagination.value

  try {
    loading.value = true

    const data = await reactivePowerApi.pageBySheet({ 
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

const handleTableChange = pagination => {
  pagination.value.current = pagination.current
  pagination.value.pageSize = pagination.pageSize
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

onMounted(() => {
  _getControllerList()
  _getDeviceList()
})
</script>

<style lang="less" scoped>
  .chartSwitch {
    text-align: center;
    width: 100%;
    margin-bottom: 30px;
  }
  ::v-deep(.ant-radio-button-wrapper) {
    background: none;
    border-color: #44668A !important;
    &::before {
      background: none !important;
    }
    &:hover {
      color: #ffffff; 
      opacity: .8;
    }
  }
  ::v-deep(.ant-radio-button-wrapper-checked) {
    background: linear-gradient(180deg, #0552B6 0%, #01294C 100%) !important;
    border-color: #44668A !important;
    color: #ffffff;
  }
  ::v-deep(.chart) {
    height: calc(100vh - 410px) !important;
  }
</style>
 