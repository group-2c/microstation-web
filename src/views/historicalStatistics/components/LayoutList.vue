/*
 * @author: zzp
 * @date: 2023-12-27 08:58:32
 * @fileName: LayoutList.vue
 * @filePath: src/views/historicalStatistics/components/LayoutList.vue
 * @description: 通用页面组件
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
              <a-form-item :label="deviceLabel" name="deviceId" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.deviceId" popupClassName="modalSelect" showSearch option-filter-prop="name" :placeholder="`请选择${deviceLabel}`">
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
          <a-col :span="8">
            <a-table
              row-key="id" 
              :columns="columns"
              :data-source="tableList" 
              :pagination="pagination"
              :scroll="{ x: 'max-content' }" 
              @change="handleTableChange"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'statusName'">
                  <div :class="['status', `status-${record.status}`]">
                    {{ record.statusName }}
                  </div>
                </template>
              </template>            
            </a-table>
          </a-col>
          <a-col v-if="chartNumber === 2" :span="16">
            <div style="width: 100%; height: 40%; margin-top: 2%;">
              <line-chart ref="chart1" :yAxisName="yAxisName1" :grid="chartGrid" :legend="chartLegend" :colors="chart1Colors" :dataZoom="chartDataZoom"/>
            </div>
            <div style="width: 100%; height: 40%; margin-top: 5%;">
              <line-chart ref="chart2" :yAxisName="yAxisName2" :grid="chartGrid" :legend="chartLegend" :colors="chart2Colors" :dataZoom="chartDataZoom"/>
            </div>
          </a-col>
          <a-col v-else :span="16">
            <div style="width: 100%; height: 90%; margin-top: 2%;">
              <line-chart ref="chart1" :yAxisName="yAxisName1" :grid="chartGrid" :legend="chartLegend" :colors="chart1Colors" :dataZoom="chartDataZoom"/>
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
import LineChart from "_components/charts/LineChart.vue"

const props = defineProps({
  deviceLabel: String,
  columns: Array,
  deviceOApi: Object,
  oApi: Object,
  chart1Colors: {
    type: Array,
    default: ["#FD2929"]
  },
  chart2Colors: {
    type: Array,
    default: ["#FD7E29"]
  },
  chartNumber: {
    type: Number,
    default: 2
  },
  chartDataZoom: {
    type: Boolean,
    default: false
  },
  yAxisName1: String,
  yAxisName2: String,
  chartDataProcess: Function,
  tableDataProcess: Function,
  chartGrid: Object,
  chartLegend: Object,
})

const loading = ref(false)
const searchForm = ref({})
const tableList = ref([])
const pageType = ref("1")
const controllerList = ref([])
const oldDeviceList = ref([])
const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "30", "40", "50", "100", "200", "500", "1000"],
  showTotal: total => `共有 ${total} 条数据`
})
const chart1 = ref()
const chart2 = ref()
const formRef = ref()
const chartGrid = props.chartGrid || {
  top: "13%",
  left: "10%",
  right: "10%",
  bottom: "15%",
  containLabel: true
}
const chartLegend = props.chartLegend || {
  top: 0
}

const deviceList = computed(() => {
  delete searchForm.value.deviceId
  return oldDeviceList.value.filter(x => x.controllerId === searchForm.value.controllerId)
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

const _getDeviceList = async () => {
  try {
    const res = await props.deviceOApi.getAll()
    oldDeviceList.value = res.data
  } catch(err) {
    message.error(`获取${props.deviceLabel}列表失败: ${err}`)
  }
}

const _getStatistics = async () => {
  loading.value = true

  try {
    const data = await props.oApi.getStatistics({ 
      ...searchForm.value,
      time: dayjs(searchForm.value.time).format("YYYY-MM-DD"),
    })
    
    const times = data.map(x => {
      x.time = dayjs(x.time).format("MM-DD HH:mm")
      return x.time
    })

    nextTick(() => {
      props.chartDataProcess(data, (chart1Data, chart2Data) => {
        chart1.value && chart1.value.setChartData(chart1Data, times)
        chart2.value && chart2.value.setChartData(chart2Data, times)
      })
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
    const data = await props.oApi.pageBySheet({ 
      ...searchForm.value,
      time: dayjs(searchForm.value.time).format("YYYY-MM-DD"),
      page: current, 
      size: pageSize
    })
    if(props.tableDataProcess) {
      props.tableDataProcess(data.content, list => {
        tableList.value = list
      })
    } else {
      tableList.value = data.content
    }
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

const _searchPrefix = async () => {
  pagination.value.current = 1
  tableList.value = []
  await _getTableList()
  await _getStatistics()
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
  ::v-deep(.chart) {
    width: 100%;
    height: 100%;
  }
</style>