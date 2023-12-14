/*
 * @author: zzp
 * @date: 2023-12-08 15:18:37
 * @fileName: index.vue
 * @filePath: src/views/dataAnalysis/ElectricityCollection/index.vue
 * @description: 用电集抄分析页面
 */
<template>
  <div class="parcel dataAnalysisX">
    <a-spin :spinning="loading">
      <a-page-header class="pageHeader">
        <template #tags>
          <a-radio-group v-model:value="pageType" @change="pageTypeChange">
            <a-radio-button value="minute"> <ClockCircleOutlined /> 分 </a-radio-button>
            <a-radio-button value="hour"> <InsertRowBelowOutlined /> 时 </a-radio-button>
            <a-radio-button value="day"> <ExperimentOutlined /> 日 </a-radio-button>
            <a-radio-button value="month"> <ProfileOutlined /> 月 </a-radio-button>
          </a-radio-group>
        </template>
        <template #extra>
          <!-- <a-button :icon="h(FileExcelOutlined)" @click.stop="exportExcel">导出Excel</a-button> -->
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
              <a-form-item label="多功能电表" name="electricitymeterId" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.electricitymeterId" popupClassName="modalSelect" mode="multiple" :maxTagCount="1" showSearch option-filter-prop="name" placeholder="请选择电表">
                  <a-select-option v-for="item in electricityList" :key="item.id" :value="item.id" :name="item.name">{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item v-if="pageType === 'day' || pageType === 'month'" label="日期" name="date" :rules="[{ required: true }]">
                <a-range-picker 
                  v-model:value="searchForm.date" 
                  :format="pickerFormat"
                  :valueFormat="pickerFormat"
                  :picker="pageType"
                  :placeholder="['请选择', '请选择']"
                  :show-time="pageType === 'minute' || pageType === 'hour'"
                />
              </a-form-item>
              <template v-else>
                <a-form-item label="日期" name="date" :rules="[{ required: true }]">
                  <a-date-picker v-model:value="searchForm.date" placeholder="请选择日期" valueFormat="YYYY-MM-DD"/>
                </a-form-item>
                <a-form-item :label="pageType === 'minute' ? '分钟' : '小时'" name="time" :rules="[{ required: true }]">
                  <a-time-range-picker
                    v-model:value="searchForm.time" 
                    :format="pickerFormat"
                    :valueFormat="pickerFormat"
                    :placeholder="['请选择', '请选择']"
                    show-time
                  />
                </a-form-item>
              </template>
              <a-form-item label="参 数" name="type" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.type" placeholder="请选择参数">
                  <a-select-option value="1">有功总电能</a-select-option>
                  <a-select-option value="2">反向有功总电能</a-select-option>
                  <a-select-option value="3">正向无功总</a-select-option>
                  <a-select-option value="4">反向无功总</a-select-option>
                </a-select>
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
        <a-table
          v-else
          row-key="id"
          :class="pageType !== 'minute' ? 'groupTable' : ''"
          :columns="columns" 
          :data-source="tableList" 
          :pagination="pagination"
          :scroll="{ y: 'calc(100vh - 550px)', x: 'max-content' }" 
          @change="handleTableChange"
        />       
      </div>
    </a-spin>
  </div>
</template>
 
<script setup>
import { onMounted, ref, h, computed } from "vue"
import { message } from "ant-design-vue"
import { 
  ClockCircleOutlined, 
  InsertRowBelowOutlined, 
  FileExcelOutlined, 
  ExperimentOutlined, 
  SearchOutlined, 
  ProfileOutlined
} from "@ant-design/icons-vue"
import ExportXlsx from "_utils/exportXlsx"
import controllerApi from "_api/controller"
import dayjs from "dayjs"

const loading = ref(false)
const searchForm = ref({})
const tableList = ref([])
const pageType = ref("minute")
const controllerList = ref([])
const electricityList = ref([])
const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "30", "40", "50", "100", "200", "500", "1000"],
  showTotal: total => `共有 ${total} 条数据`
})

const formRef = ref()
const columns = ref([])

const pickerFormat = computed(() => {
  return  pageType.value === "minute" ? "HH:mm" : 
    pageType.value === "hour" ? "HH" : 
    pageType.value === "day" ? "YYYY-MM-DD" : 
    "YYYY-MM"
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
  delete searchForm.value.electricitymeterId
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

const _calibration = callback => {
  formRef.value.validate().then(() => callback(true)).catch(() =>  callback(false))
}

const _getTableList = async () => {
  const { current, pageSize } = pagination.value
  const data = { 
    ...searchForm.value,
    type: pageType.value,
    page: current, 
    size: pageSize 
  }

  console.log("data", data)
  tableList.value = [
    {
      id: 1,
      name: "1"
    }
  ]
  loading.value = true
  try {
    pagination.value.total = 10
    pagination.value.current = 1
  } catch (err) {
    message.error("列表数据失败: " + err)
  } finally {
    loading.value = false
  }
}

const handleTableChange = pagination => {
  pagination.value.current = pagination.current
  pagination.value.pageSize = pagination.pageSize
  _getTableList()
}

const pageTypeChange = () => {
  searchForm.value = {}
  tableList.value = []
  pagination.value.current = 1
}

const _searchPrefix = () => {
  const data = searchForm.value

  if(pageType.value === "minute" || pageType.value === "hour") {
    data.startTime = `${data.date} ${data.time[0]}${pageType.value === "minute" ? ":00" : ":00:00"}`
    data.endTime = `${data.date} ${data.time[1]}${pageType.value === "minute" ? ":00" : ":00:00"}`
  }
  else if(pageType.value === "month") {
    data.startTime = `${data.date[0]}-01`
    data.endTime = `${data.date[1]}-31`
  }
  else {
    data.startTime = data.date[0]
    data.endTime = data.date[1]
  }

  pagination.value.current = 1

  if(pageType.value === "minute") {
    columns.value = [
      { title: "回路名称 / KW.h", dataIndex: "name", width: 220 },
      { title: `${data.startTime} 示数`, dataIndex: "number0" },
      { title: `${data.endTime} 示数`, dataIndex: "number1" },
      { title: "用电量", dataIndex: "power0" },
      { title: "电 费", dataIndex: "cost0" }
    ]
  } else {
    const _columns = [{ title: "回路名称 / KW.h", dataIndex: "name", width: 220, align: "center", fixed: "left" }]
    let columnNumber = dayjs(data.endTime).diff(data.startTime, pageType.value) + 1
    if(pageType.value === "month") columnNumber--

    new Array(columnNumber).fill("-").forEach((_x, index) => {
      const _formats = { hour: "YYYY-MM-DD HH:mm", month: "YYYY-MM", day: "YYYY-MM-DD"}
      const _time = dayjs(data.startTime).add(index, pageType.value)
      const _title = dayjs(_time).format(_formats[pageType.value])
      _columns.push({ title: _title, children: [
        { title: "示 数", dataIndex: `number${index}`, align: "center", width: 120 },
        { title: "用电量", dataIndex: `power${index}`, align: "center", width: 120 },
        { title: "电 费", dataIndex: `cost${index}`, align: "center", width: 120 },
      ]})
    })

    columns.value = _columns
  }

  _getTableList()
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
  ExportXlsx.downloadExcel(dataArray, `用电集抄分析数据表_${new Date().toLocaleString()}`)
}

onMounted(() => {
  _getControllerList()
})
</script>
 