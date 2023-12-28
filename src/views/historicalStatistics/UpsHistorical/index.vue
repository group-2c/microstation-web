/*
 * @author: zzp
 * @date: 2023-12-28 11:27:21
 * @fileName: index.vue
 * @filePath: src/views/historicalStatistics/UpsHistorical/index.vue
 * @description: UPS历史数据统计
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
              <a-form-item label="UPS设备" name="deviceId" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.deviceId" popupClassName="modalSelect" showSearch option-filter-prop="name" placeholder="请选择UPS设备">
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
            <a-row v-if="chartFunKey==='1'" :gutter="10" style="height: 80%;">
              <a-col :span="8">
                <div class="title">电 压</div>
                <line-chart ref="chartRef1" :grid="chartGrid" :legend="chartLegend" :dataZoom="false"/>
              </a-col>
              <a-col :span="8">
                <div class="title">电 流</div>
                <line-chart ref="chartRef2" :grid="chartGrid" :legend="chartLegend" :dataZoom="false"/>
              </a-col>
              <a-col :span="8">
                <div class="title">功 率</div>
                <line-chart ref="chartRef3" :grid="chartGrid" :legend="chartLegend" :dataZoom="false"/>
              </a-col>
            </a-row>
          </div>
        </div>
        <div v-if="pageType ==='2'">
          <div v-if="tableList.length === 0" class="empty">没有相关统计数据</div>
          <a-table
            v-else
            row-key="id" 
            class="groupTable"
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
import { upsDataApi } from "_api/historicalStatistics"
import dayjs from "dayjs"
import controllerApi from "_api/controller"
import upsApi from "_api/ups"
import LineChart from "_components/charts/LineChart.vue"

const loading = ref(false)
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

const chartRef1 = ref()
const chartRef2 = ref()
const chartRef3 = ref()
const formRef = ref()

const columns = ref([
  { title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1, fixed: "left" },
  { title: "输入线电压", dataIndex: "Z", children: [
    { title: "AB", dataIndex: "inputLineVoltageAb", align: "center", width: 120 },
    { title: "BC", dataIndex: "inputLineVoltageBc", align: "center", width: 120 },
    { title: "CA", dataIndex: "inputLineVoltageCa", align: "center", width: 120 },
  ]},
  { title: "A相", dataIndex: "A", children: [
    { title: "旁路相电压", dataIndex: "bypassPhaseVoltageA", align: "center", width: 120 },
    { title: "输出相电压", dataIndex: "outputPhaseVoltageA", align: "center", width: 120 },
    { title: "主路输入电流", dataIndex: "mainInputCurrentA", align: "center", width: 120 },
    { title: "输出电流", dataIndex: "outputCurrentA", align: "center", width: 120 },
    { title: "输出有功功率", dataIndex: "outputActivePowerA", align: "center", width: 120 },
    { title: "输出视在功率", dataIndex: "outputApparentPowerA", align: "center", width: 120 },
    { title: "输出负载率", dataIndex: "outputLoadRateA", align: "center", width: 120 },
  ]},
  { title: "B相", dataIndex: "B", children: [
    { title: "旁路相电压", dataIndex: "bypassPhaseVoltageB", align: "center", width: 120 },
    { title: "输出相电压", dataIndex: "outputPhaseVoltageB", align: "center", width: 120 },
    { title: "主路输入电流", dataIndex: "mainInputCurrentB", align: "center", width: 120 },
    { title: "输出电流", dataIndex: "outputCurrentB", align: "center", width: 120 },
    { title: "输出有功功率", dataIndex: "outputActivePowerB", align: "center", width: 120 },
    { title: "输出视在功率", dataIndex: "outputApparentPowerB", align: "center", width: 120 },
    { title: "输出负载率", dataIndex: "outputLoadRateB", align: "center", width: 120 },
  ]},
  { title: "C相", dataIndex: "C", children: [
    { title: "旁路相电压", dataIndex: "bypassPhaseVoltageC", align: "center", width: 120 },
    { title: "输出相电压", dataIndex: "outputPhaseVoltageC", align: "center", width: 120 },
    { title: "主路输入电流", dataIndex: "mainInputCurrentC", align: "center", width: 120 },
    { title: "输出电流", dataIndex: "outputCurrentC", align: "center", width: 120 },
    { title: "输出有功功率", dataIndex: "outputActivePowerC", align: "center", width: 120 },
    { title: "输出视在功率", dataIndex: "outputApparentPowerC", align: "center", width: 120 },
    { title: "输出负载率", dataIndex: "outputLoadRateC", align: "center", width: 120 },
  ]},
  { title: "电池电压", dataIndex: "batteryVoltage", align: "center", width: 120 },
  { title: "电池电流", dataIndex: "batteryCurrent", align: "center", width: 120 },
  { title: "BUS电压", dataIndex: "busVoltage", align: "center", width: 120 }
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
    const res = await upsApi.getAll()
    oldDeviceList.value = res.data
  } catch(err) {
    message.error(`获取RVB设备列表失败: ${err}`)
  }
}

const _getStatistics = async () => {
  loading.value = true

  try {
    const data = await upsDataApi.getStatistics({ 
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
    chartRef1.value && chartRef1.value.setChartData([
      { name: "A相旁路相电压", data: data.map(x => x.bypassPhaseVoltageA) },
      { name: "A相输出相电压", data: data.map(x => x.outputPhaseVoltageA) },
      { name: "B相旁路相电压", data: data.map(x => x.bypassPhaseVoltageB) },
      { name: "B相输出相电压", data: data.map(x => x.outputPhaseVoltageB) },
      { name: "C相旁路相电压", data: data.map(x => x.bypassPhaseVoltageC) },
      { name: "C相输出相电压", data: data.map(x => x.outputPhaseVoltageC) },
    ], times)

    chartRef2.value && chartRef2.value.setChartData([
      { name: "A相主路输入电流", data: data.map(x => x.mainInputCurrentA) },
      { name: "A相输出电流", data: data.map(x => x.outputCurrentA) },
      { name: "B相主路输入电流", data: data.map(x => x.mainInputCurrentB) },
      { name: "B相输出电流", data: data.map(x => x.outputCurrentB) },
      { name: "C相主路输入电流", data: data.map(x => x.mainInputCurrentC) },
      { name: "C相输出电流", data: data.map(x => x.outputCurrentC) },
    ], times)

    chartRef3.value && chartRef3.value.setChartData([
      { name: "A相输出有功功率", data: data.map(x => x.outputActivePowerA) },
      { name: "A相输出视在功率", data: data.map(x => x.outputApparentPowerA) },
      { name: "A相输出负载率", data: data.map(x => x.outputLoadRateA) },
      { name: "B相输出有功功率", data: data.map(x => x.outputActivePowerB) },
      { name: "B相输出视在功率", data: data.map(x => x.outputApparentPowerB) },
      { name: "B相输出负载率", data: data.map(x => x.outputLoadRateB) },
      { name: "C相输出有功功率", data: data.map(x => x.outputActivePowerC) },
      { name: "C相输出视在功率", data: data.map(x => x.outputApparentPowerC) },
      { name: "C相输出负载率", data: data.map(x => x.outputLoadRateC) },
    ], times)
  })
}

const _calibration = callback => {
  formRef.value.validate().then(() => callback(true)).catch(() => callback(false))
}

const _getTableList = async () => {
  const { current, pageSize } = pagination.value

  try {
    loading.value = true

    const data = await upsDataApi.pageBySheet({ 
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
 