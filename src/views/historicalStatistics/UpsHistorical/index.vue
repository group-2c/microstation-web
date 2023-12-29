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
            <a-row :gutter="10" style="height: 80%;">
              <a-col :span="8">
                <div class="title">电 压</div>
                <a-radio-group class="chartSwitch" v-model:value="chartSwitchs['1']">
                  <a-radio-button value="1">旁路相电压</a-radio-button>
                  <a-radio-button value="2">输出相电压</a-radio-button>
                </a-radio-group>
                <line-chart :ref="x => (chartRefs['1'] = x)" yAxisName="V" :grid="chartGrid" :legend="chartLegend" :dataZoom="false"/>
              </a-col>
              <a-col :span="8">
                <div class="title">电 流</div>
                <a-radio-group class="chartSwitch" v-model:value="chartSwitchs['2']">
                  <a-radio-button value="1">主路输入电流</a-radio-button>
                  <a-radio-button value="2">输出电流</a-radio-button>
                </a-radio-group>
                <line-chart :ref="x => (chartRefs['2'] = x)" yAxisName="A" :grid="chartGrid" :legend="chartLegend" :dataZoom="false"/>
              </a-col>
              <a-col :span="8">
                <div class="title">功 率</div>
                <a-radio-group class="chartSwitch" v-model:value="chartSwitchs['3']">
                  <a-radio-button value="1">输出有功功率</a-radio-button>
                  <a-radio-button value="2">输出视在功率</a-radio-button>
                  <a-radio-button value="3">输出负载率</a-radio-button>
                </a-radio-group>
                <line-chart :ref="x => (chartRefs['3'] = x)" yAxisName="kVA" :grid="chartGrid" :legend="chartLegend" :dataZoom="false"/>
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
const chartSwitchs = ref({"1": "1", "2": "1", "3": "1"})
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

const chartRefs = ref([])
const formRef = ref()

const columns = ref([
  { title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1, fixed: "left" },
  { title: "采集时间", dataIndex: "time", align: "left", width: 180, fixed: "left" },
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

watch(chartSwitchs, () => {
  _calibration(status => {
    if(status) _setChartData()
  })
}, { deep: true }, { immediate: true })

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

  const times = data.map(x => dayjs(x.time).format("MM-DD HH:mm"))

  nextTick(() => {
    const getChartData = (chartSwitchData, refKey) => {
      const phases = ["A", "B", "C"]
      chartRefs.value[refKey].setChartData(
        phases.map(phase => ({
          name: `${phase}相`,
          data: data.map(x => x[`${chartSwitchData[chartSwitchs.value[refKey]]}${phase}`])
        })),
        times
      )
    }
    
    getChartData({ "1": "bypassPhaseVoltage", "2": "outputPhaseVoltage" }, "1")
    getChartData({ "1": "mainInputCurrent", "2": "outputCurrent" }, "2")
    getChartData({ "1": "outputActivePower", "2": "outputApparentPower", "3": "outputLoadRate" }, "3")
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

onMounted(() => {
  _getControllerList()
  _getDeviceList()
})
</script>
 

<style lang="less" scoped>
  .chartSwitch {
    text-align: center;
    width: 100%;
    margin-bottom: 10px;
    margin-top: 20px;
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
 