/*
 * @author: zzp
 * @date: 2023-12-28 08:34:07
 * @fileName: index.vue
 * @filePath: src/views/historicalStatistics/InverterHistorical/index.vue
 * @description: 逆变器历史数据统计
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
              <a-form-item label="逆变器" name="deviceId" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.deviceId" popupClassName="modalSelect" showSearch option-filter-prop="name" placeholder="请选择逆变器">
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
                <line-chart ref="chartRef1" :grid="chartGrid" yAxisName="V" :legend="chartLegend" :colors="['#ebc039', '#bb2d0f', '#23f0f8']" :dataZoom="false"/>
              </a-col>
              <a-col :span="8">
                <div class="title">电流数据</div>
                <line-chart ref="chartRef2" :grid="chartGrid" yAxisName="A" :legend="chartLegend" :colors="['#ebc039', '#bb2d0f', '#23f0f8']" :dataZoom="false"/>
              </a-col>
              <a-col :span="8">
                <div class="title">温度数据</div>
                <line-chart ref="chartRef3" :grid="chartGrid" yAxisName="°C" :legend="chartLegend" :colors="['#ebc039', '#bb2d0f', '#23f0f8']" :dataZoom="false"/>
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
import { inverterDataApi } from "_api/historicalStatistics"
import dayjs from "dayjs"
import controllerApi from "_api/controller"
import inverterApi from "_api/inverter"
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
  { title: "采集时间", dataIndex: "time", align: "left", width: 180, fixed: "left" },
  { title: "直流电压(V)", dataIndex: "dcVoltage", align: "center",width: 130, ellipsis: true },
  { title: "市电电压(V)", dataIndex: "mainsVoltage", align: "center",width: 120, ellipsis: true },
  { title: "市电频率(次)", dataIndex: "mainsFrequency", align: "center", width: 120, ellipsis: true },
  { title: "工作频率(次)", dataIndex: "workingFrequency", align: "center", width: 120, ellipsis: true },
  { title: "输出电压(V)", dataIndex: "outputVoltage", align: "center", width: 120, ellipsis: true },
  { title: "输出电流(A)", dataIndex: "outputCurrent", align: "center", width: 120, ellipsis: true },
  { title: "温度(°C)", dataIndex: "temperature", align: "center", width: 110, ellipsis: true }
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
    const res = await inverterApi.getAll()
    oldDeviceList.value = res.data
  } catch(err) {
    message.error(`获取逆变器列表失败: ${err}`)
  }
}

const _getStatistics = async () => {
  loading.value = true

  try {
    const data = await inverterDataApi.getStatistics({ 
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
        { name: "直流电压", data: data.map(x => x.dcVoltage) },
        { name: "市电电压", data: data.map(x => x.mainsVoltage) },
        { name: "输出电压", data: data.map(x => x.outputVoltage) }
      ], times)

      chartRef2.value && chartRef2.value.setChartData([
        { name: "输出电流", data: data.map(x => x.outputCurrent) }
      ], times)

      chartRef3.value && chartRef3.value.setChartData([
        { name: "温度", data: data.map(x => x.temperature) }
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

    const data = await inverterDataApi.pageBySheet({ 
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
 