/*
 * @author: zzp
 * @date: 2023-12-26 08:47:47
 * @fileName: index.vue
 * @filePath: src/views/dataAnalysis/TemperatureMonitoring/index.vue
 * @description: 温湿度监测分析
 */
<template>
  <div class="parcel dataAnalysisX">
    <a-spin :spinning="loading">
      <a-page-header class="pageHeader">
        <template #tags>
          <a-radio-group v-model:value="pageType" @change="handleSearch">
            <a-radio-button value="1">
              <LineChartOutlined /> 数据
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
              <a-form-item label="温湿度设备" name="temperatureId" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.temperatureId" popupClassName="modalSelect" showSearch option-filter-prop="name" placeholder="请选择温湿度设备">
                  <a-select-option v-for="item in temperatureDataList" :key="item.id" :value="item.id" :name="item.name">{{item.name}}</a-select-option>
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
        <div v-if="tableList.length === 0" class="empty">没有相关统计数据</div>
        <a-row v-else style="height: 100%;" :gutter="20">
          <a-col :span="8">
            <a-table
              row-key="id" 
              :columns="columns" 
              :data-source="tableList" 
              :pagination="pagination"
              :scroll="{ y: 'calc(100vh - 370px)', x: 'max-content' }" 
              @change="handleTableChange"
            />
          </a-col>
          <a-col :span="16">
            <div style="width: 100%; height: 40%; margin-top: 2%;">
              <line-chart ref="temperatureChartRef" :grid="chartGrid" :legend="chartLegend" :colors="['#FD2929']"/>
            </div>
            <div style="width: 100%; height: 40%; margin-top: 5%;">
              <line-chart ref="humidityChartRef" :grid="chartGrid" :legend="chartLegend" :colors="['#FD7E29']"/>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-spin>
  </div>
</template>
 
<script setup>
import { onMounted, ref, h, nextTick, watch, computed } from "vue"
import { message } from "ant-design-vue"
import { LineChartOutlined, SearchOutlined } from "@ant-design/icons-vue"
import dayjs from "dayjs"
import controllerApi from "_api/controller"
import temperatureEquipmentApi from "_api/temperatureEquipment"
import { temperatureHumidityEquipmentDataApi } from "_api/dataAnalysis"
import LineChart from "../components/LineChart.vue"

const loading = ref(false)
const searchForm = ref({})
const tableList = ref([])
const pageType = ref("1")
const controllerList = ref([])
const temperatureList = ref([])
const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "30", "40", "50", "100", "200", "500", "1000"],
  showTotal: total => `共有 ${total} 条数据`
})
const temperatureChartRef = ref()
const humidityChartRef = ref()
const formRef = ref()
const chartGrid = {
  top: "13%",
  left: "2%",
  right: "4%",
  bottom: "20%",
  containLabel: true
}
const chartLegend = {
  top: 0
}

const columns = ref([
  { title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1, fixed: "left" },
  { title: "设备名称", dataIndex: "deviceName" },
  { title: "温度", dataIndex: "temperature" },
  { title: "湿度", dataIndex: "humidity" },
  { title: "采集时间", dataIndex: "time" }
])

const temperatureDataList = computed(() => {
  delete searchForm.value.temperatureId
  return temperatureList.value.filter(x => x.controllerId === searchForm.value.controllerId)
})

watch(searchForm.value, () => {
  _calibration(status => status && _searchPrefix())
})

const _getControllerList = async () => {
  try {
    const res = await controllerApi.getAll()
    controllerList.value = res.data
  } catch(err) {
    message.error(`获取微站列表失败: ${err}`)
  }
}

const _getTemperatureList = async () => {
  try {
    const res = await temperatureEquipmentApi.getAll()
    temperatureList.value = res.data
  } catch(err) {
    message.error(`获取温湿度设备列表失败: ${err}`)
  }
}

const _getStatistics = async () => {
  loading.value = true

  try {
    const data = await temperatureHumidityEquipmentDataApi.getStatistics({ 
      ...searchForm.value,
      time: dayjs(searchForm.value.time).format("YYYY-MM-DD"),
    })

    const temperatures = data.map(x => x.temperature)
    const humiditys = data.map(x => x.humidity)
    const times = data.map(x => {
      x.time = dayjs(x.time).format("MM-DD HH:mm")
      return x.time
    })

    nextTick(() => {
      temperatureChartRef.value.setChartData([{
        name: "温度",
        data: temperatures
      }], times)
      humidityChartRef.value.setChartData([{
        name: "湿度",
        data: humiditys
      }], times)
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
    const data = await temperatureHumidityEquipmentDataApi.pageBySheet({ 
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
  tableList.value = []
  _getStatistics()
  _getTableList()
}

const handleSearch = () => {
  _calibration(status => {
    if(status) _searchPrefix()
      else message.warning("请完善查询条件！")
  })
}

onMounted(() => {
  _getControllerList()
  _getTemperatureList()
})
</script>
 

<style lang="less" scoped>
  ::v-deep(.chart) {
    width: 100%;
    height: 100%;
  }
</style>