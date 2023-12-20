/*
 * @author: zzp
 * @date: 2023-12-08 15:16:27
 * @fileName: index.vue
 * @filePath: src/views/dataAnalysis/MicrositeEnergyCompare/index.vue
 * @description: 微站能耗同比分析 
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
        <template #extra>
          <a-button :icon="h(FileExcelOutlined)" @click.stop="exportExcel">导出Excel</a-button>
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
                <a-select v-model:value="searchForm.electricityMeterId" popupClassName="modalSelect" showSearch option-filter-prop="name" placeholder="请选择电表">
                  <a-select-option v-for="item in electricityList" :key="item.id" :value="item.id" :name="item.name">{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="年份" name="year" :rules="[{ required: true }]">
                <a-date-picker v-model:value="searchForm.year" picker="year" format="YYYY"  placeholder="请选择年份" />
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
            <bar-chart ref="barChartRef" yAxisName="KW.h"/>
          </div>
        </div>
        <div v-if="pageType ==='2'">
          <div v-if="tableList.length === 0" class="empty">请根据条件查询获取数据</div>
          <a-table
            v-else
            row-key="id" 
            :columns="columns" 
            :data-source="tableList" 
            :pagination="false"
          />
        </div>
      </div>
    </a-spin>
  </div>
</template>
 
<script setup>
import { onMounted, ref, h, watch, nextTick } from "vue"
import { message } from "ant-design-vue"
import { LineChartOutlined, BarChartOutlined, FileExcelOutlined, SearchOutlined } from "@ant-design/icons-vue"
import ExportXlsx from "_utils/exportXlsx"
import dayjs from "dayjs"
import controllerApi from "_api/controller"
import BarChart from "../components/BarChart.vue"

const loading = ref(false)
const searchForm = ref({})
const tableList = ref([])
const pageType = ref("1")
const controllerList = ref([])
const electricityList = ref([])
const statisticsData = ref([])
const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "30", "40", "50", "100", "200", "500", "1000"],
  showTotal: total => `共有 ${total} 条数据`
})

const formRef = ref()
const barChartRef = ref()

const columns = ref([
  { title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1 },
  { title: "月份", dataIndex: "month" },
  { title: "本期", dataIndex: "period" },
  { title: "同期", dataIndex: "same" },
  { title: "同比(%)", dataIndex: "scale" },
  { title: "累计同比(%)", dataIndex: "grandScale" },
])

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

const _getStatistics = async () => {
  loading.value = true
  try {
    let date = [], array = [
      {
        name: "本期",
        data: []
      },
      {
        name: "同期",
        data: []
      }
    ]
    
    new Array(12).fill("-").forEach((_x, index) => {
      date.push(`${index+1}月`)
      array[0].data.push(Math.random() * 300)
      array[1].data.push(Math.random() * 300)
    })

    statisticsData.value = array
    nextTick(() => {
      barChartRef.value.setChartData(date, array)
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
  const { year } = searchForm.value
  const data = { 
    ...searchForm.value,
    page: current, 
    size: pageSize 
  }
  if(year) data.year = dayjs(year).format("YYYY")

  loading.value = true
  try {
    tableList.value = [
      {
        id: 1,
      }
    ]
    pagination.value.total = 10
    pagination.value.current = 1
  } catch (err) {
    message.error("列表数据失败: " + err)
  } finally {
    loading.value = false
  }
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
  ExportXlsx.downloadExcel(dataArray, `微站能耗同比分析数据表_${new Date().toLocaleString()}`)
}

onMounted(() => {
  _getControllerList()
})
</script>
 