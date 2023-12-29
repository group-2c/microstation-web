/*
 * @author: zzp
 * @date: 2023-12-28 08:51:31
 * @fileName: index.vue
 * @filePath: src/views/historicalStatistics/RvbHistorical/index.vue
 * @description: RVB历史数据统计
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
              <a-form-item label="RVB设备" name="deviceId" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.deviceId" popupClassName="modalSelect" showSearch option-filter-prop="name" placeholder="请选择RVB设备">
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
              <a-radio-button value="1">频 度</a-radio-button>
              <a-radio-button value="2">温 度</a-radio-button>
            </a-radio-group>
            <a-row v-if="chartFunKey==='1'" :gutter="10" style="height: 80%;">
              <a-col :span="8">
                <div class="title">局部放电频度</div>
                <line-chart ref="chartRef1" :grid="chartGrid" :legend="chartLegend" :colors="['#ebc039', '#bb2d0f', '#23f0f8']" :dataZoom="false"/>
              </a-col>
              <a-col :span="8">
                <div class="title">局部放电概率强度</div>
                <line-chart ref="chartRef2" :grid="chartGrid" :legend="chartLegend" :colors="['#ebc039', '#bb2d0f', '#23f0f8']" :dataZoom="false"/>
              </a-col>
              <a-col :span="8">
                <div class="title">局部放电平均强度</div>
                <line-chart ref="chartRef3" :grid="chartGrid" :legend="chartLegend" :colors="['#ebc039', '#bb2d0f', '#23f0f8']" :dataZoom="false"/>
              </a-col>
            </a-row>
            <a-row v-else :gutter="10">
              <a-col :span="24">
                <div class="title">温 度</div>
                <line-chart ref="chartRef1" :grid="chartGrid" :legend="chartLegend" :colors="['#ebc039', '#bb2d0f', '#23f0f8']" :dataZoom="false"/>
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
import { rvbDataApi } from "_api/historicalStatistics"
import dayjs from "dayjs"
import controllerApi from "_api/controller"
import fourInOneDeviceApi from "_api/fourInOneDevice"
import LineChart from "_components/charts/LineChart.vue"

const loading = ref(false)
const searchForm = ref({})
const tableList = ref([])
const pageType = ref("1")
const chartFunKey = ref("1")
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

const chartRef1 = ref()
const chartRef2 = ref()
const chartRef3 = ref()
const formRef = ref()

const columns = ref([
  { title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1, fixed: "left" },
  { title: "采集时间", dataIndex: "time", align: "left", width: 180, fixed: "left" },
  { title: "A相", dataIndex: "A", children: [
    { title: "局放概率强度", dataIndex: "aPhasePartialDischargeProbabilityIntensity", align: "center", width: 120 },
    { title: "局放平均强度", dataIndex: "aPhasePartialDischargeAverageIntensity", align: "center", width: 120 },
    { title: "局放频度", dataIndex: "aPhasePartialDischargeFrequency", align: "center", width: 120 },
    { title: "温 度", dataIndex: "aPhaseTemperature", align: "center", width: 120 },
  ]},
  { title: "B相", dataIndex: "B", children: [
    { title: "局放概率强度", dataIndex: "bPhasePartialDischargeProbabilityIntensity", align: "center", width: 120 },
    { title: "局放平均强度", dataIndex: "bPhasePartialDischargeAverageIntensity", align: "center", width: 120 },
    { title: "局放频度", dataIndex: "bPhasePartialDischargeFrequency", align: "center", width: 120 },
    { title: "温 度", dataIndex: "bPhaseTemperature", align: "center", width: 120 },
  ]},
  { title: "C相", dataIndex: "C", children: [
    { title: "局放概率强度", dataIndex: "cPhasePartialDischargeProbabilityIntensity", align: "center", width: 120 },
    { title: "局放平均强度", dataIndex: "cPhasePartialDischargeAverageIntensity", align: "center", width: 120 },
    { title: "局放频度", dataIndex: "cPhasePartialDischargeFrequency", align: "center", width: 120 },
    { title: "温 度", dataIndex: "cPhaseTemperature", align: "center", width: 120 },
  ]},
  { title: "综合局放概率强度", dataIndex: "comprehensivePartialDischargeProbabilityIntensity", align: "center", width: 150 },
  { title: "综合局放平均强度", dataIndex: "comprehensivePartialDischargeAverageIntensity", align: "center", width: 150 },
  { title: "综合局放频度", dataIndex: "comprehensivePartialDischargeFrequency", align: "center", width: 120 },
  { title: "总温度", dataIndex: "totalTemperature", align: "center", width: 120 },
  { title: "局放噪声", dataIndex: "partialDischargeNoise", align: "center", width: 120 },
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
    const res = await fourInOneDeviceApi.getAll()
    oldDeviceList.value = res.data
  } catch(err) {
    message.error(`获取RVB设备列表失败: ${err}`)
  }
}

const _getStatistics = async () => {
  loading.value = true

  try {
    const data = await rvbDataApi.getStatistics({ 
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

  const times = data.map(x => {
    x.time = dayjs(x.time).format("MM-DD HH:mm")
    return x.time
  })

  nextTick(() => {
    if(chartFunKey.value === "1") {
      chartRef1.value && chartRef1.value.setChartData([
        { name: "A相", data: data.map(x => x.aPhasePartialDischargeProbabilityIntensity) },
        { name: "B相", data: data.map(x => x.bPhasePartialDischargeProbabilityIntensity) },
        { name: "C相", data: data.map(x => x.cPhasePartialDischargeProbabilityIntensity) },
        { name: "综合", data: data.map(x => x.comprehensivePartialDischargeProbabilityIntensity) }
      ], times)

      chartRef2.value && chartRef2.value.setChartData([
        { name: "A相", data: data.map(x => x.aPhasePartialDischargeAverageIntensity) },
        { name: "B相", data: data.map(x => x.bPhasePartialDischargeAverageIntensity) },
        { name: "C相", data: data.map(x => x.cPhasePartialDischargeAverageIntensity) },
        { name: "综合", data: data.map(x => x.comprehensivePartialDischargeAverageIntensity) }
      ], times)

      chartRef3.value && chartRef3.value.setChartData([
        { name: "A相", data: data.map(x => x.aPhasePartialDischargeFrequency) },
        { name: "B相", data: data.map(x => x.bPhasePartialDischargeFrequency) },
        { name: "C相", data: data.map(x => x.cPhasePartialDischargeFrequency) },
        { name: "综合", data: data.map(x => x.comprehensivePartialDischargeFrequency) }
      ], times)
    } else {
      chartRef1.value && chartRef1.value.setChartData([
        { name: "A相", data: data.map(x => x.aPhaseTemperature) },
        { name: "B相", data: data.map(x => x.bPhaseTemperature) },
        { name: "C相", data: data.map(x => x.cPhaseTemperature) },
        { name: "综合", data: data.map(x => x.totalTemperature) }
      ], times)
    }
  })
}

const _calibration = callback => {
  formRef.value.validate().then(() => callback(true)).catch(() => callback(false))
}

const _getTableList = async () => {
  const { current, pageSize } = pagination.value

  try {
    loading.value = true

    const data = await rvbDataApi.pageBySheet({ 
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
 