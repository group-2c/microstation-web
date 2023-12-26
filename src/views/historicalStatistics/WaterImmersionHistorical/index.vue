/*
 * @author: zzp
 * @date: 2023-12-26 13:20:00
 * @fileName: index.vue
 * @filePath: src/views/historicalStatistics/WaterImmersionHistorical/index.vue
 * @description: 水浸传感器历史数据统计
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
              <a-form-item label="水浸设备" name="deviceId" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.deviceId" popupClassName="modalSelect" showSearch option-filter-prop="name" placeholder="请选择水浸设备">
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
        <div v-if="tableList.length === 0" class="empty">没有相关统计数据</div>
        <a-row v-else style="height: 100%;" :gutter="20">
          <a-col :span="10">
            <a-table
              row-key="id" 
              :columns="columns" 
              :data-source="tableList" 
              :pagination="pagination"
              :scroll="{ y: 'calc(100vh - 410px)', x: 'max-content' }" 
              @change="handleTableChange"
            />
          </a-col>
          <a-col :span="14">
            <div style="width: 100%; height: 40%; margin-top: 3%;">
              <line-chart 
                ref="temperatureChartRef" 
                :grid="chartGrid" 
                :legend="chartLegend"
                :dataZoom="false"
                :colors="['#ebc039', '#bb2d0f']"
              />
            </div>
            <div style="width: 100%; height: 40%; margin-top: 7%;">
              <line-chart 
                ref="humidityChartRef" 
                :grid="chartGrid" 
                :legend="chartLegend" 
                :dataZoom="false"
                :colors="['#23f0f8']"
              />
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
import waterImmersionSensorApi from "_api/waterImmersionSensor"
import { waterImmersionHistoricalApi } from "_api/historicalStatistics"
import LineChart from "_components/charts/LineChart.vue"

const loading = ref(false)
const searchForm = ref({})
const tableList = ref([])
const pageType = ref("1")
const controllerList = ref([])
const waterImmersionList = ref([])
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
  bottom: "10%",
  containLabel: true
}
const chartLegend = {
  top: 0
}

const columns = ref([
  { title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1, fixed: "left" },
  { title: "设备名称", dataIndex: "deviceName", width: 120, ellipsis: true },
  { title: "设备状态", dataIndex: "status", width: 100, ellipsis: true },
  { title: "工作电流", dataIndex: "workCurrent", width: 100, align: "center", ellipsis: true },
  { title: "泄漏电流", dataIndex: "leakCurrent", width: 100, align: "center", ellipsis: true },
  { title: "泄漏阻抗", dataIndex: "leakImpedance", width: 100, align: "center", ellipsis: true },
  { title: "采集时间", dataIndex: "time", width: 120, ellipsis: true }
])

const deviceList = computed(() => {
  delete searchForm.value.deviceId
  return waterImmersionList.value.filter(x => x.controllerId === searchForm.value.controllerId)
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

const _getWaterImmersionSensorList = async () => {
  try {
    const res = await waterImmersionSensorApi.getAll()
    waterImmersionList.value = res.data
  } catch(err) {
    message.error(`获取水浸设备列表失败: ${err}`)
  }
}

const _getStatistics = async () => {
  loading.value = true

  try {
    const data = await waterImmersionHistoricalApi.getStatistics({ 
      ...searchForm.value,
      time: dayjs(searchForm.value.time).format("YYYY-MM-DD"),
    })

    const times = data.map(x => {
      x.time = dayjs(x.time).format("MM-DD HH:mm")
      return x.time
    })

    nextTick(() => {
      temperatureChartRef.value && temperatureChartRef.value.setChartData([
        { name: "工作电流", data: data.map(x => x.workCurrent) },
        { name: "泄漏电流", data: data.map(x => x.leakCurrent) },
      ], times)
      humidityChartRef.value && humidityChartRef.value.setChartData([{
        name: "泄漏阻抗",
        data: data.map(x => x.leakImpedance)
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
    const data = await waterImmersionHistoricalApi.pageBySheet({ 
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
  _getWaterImmersionSensorList()
})
</script>
 

<style lang="less" scoped>
  ::v-deep(.chart) {
    width: 100%;
    height: 100%;
  }
</style>