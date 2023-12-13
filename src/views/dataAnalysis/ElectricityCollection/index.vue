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
          :columns="columns" 
          :data-source="tableList" 
          :pagination="pagination"
          :scroll="{ y: 'calc(100vh - 410px)', x: 'max-content' }" 
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
      { title: "回路名称 / KW.h", dataIndex: "name" },
      { title: `${data.startTime} 示数`, dataIndex: "startNumber" },
      { title: `${data.endTime} 示数`, dataIndex: "endNumber" },
      { title: "用电量", dataIndex: "energy" },
      { title: "电 费", dataIndex: "cost" }
    ]
  } else {
    // console.log(dayjs('2021-10-19').diff('2021-10-1', 'day'))
    // console.log(dayjs('2021-10-19 12:30:10').diff('2021-10-19 09:30:10', 'hour'))
    // console.log(dayjs('2021-12-31').diff('2021-10-1', 'month'))

    const number = dayjs('2021-10-19').diff('2021-10-18', 'day')
    console.log(number)
    columns.value = [
      { title: "回路名称 / KW.h", dataIndex: "name", align: "center", width: 220, fixed: "left" },
      { title: "A组", dataIndex: "A", children: [
        { title: "最大值", dataIndex: "aMax", align: "center", width: 120 },
        { title: "平均值", dataIndex: "aAverage", align: "center", width: 120 },
        { title: "最小值", dataIndex: "aMin", align: "center", width: 120 },
        { title: "95%值", dataIndex: "a95", align: "center", width: 120 },
        { title: "结论", dataIndex: "aEnding", align: "center", width: 120 },
      ]},
      { title: "B组", dataIndex: "B", children: [
        { title: "最大值", dataIndex: "bMax", align: "center", width: 120 },
        { title: "平均值", dataIndex: "bAverage", align: "center", width: 120 },
        { title: "最小值", dataIndex: "bMin", align: "center", width: 120 },
        { title: "95%值", dataIndex: "b95", align: "center", width: 120 },
        { title: "结论", dataIndex: "bEnding", align: "center", width: 120 },
      ]},
      { title: "C组", dataIndex: "C", children: [
        { title: "最大值", dataIndex: "cMax", align: "center", width: 120 },
        { title: "平均值", dataIndex: "cAverage", align: "center", width: 120 },
        { title: "最小值", dataIndex: "cMin", align: "center", width: 120 },
        { title: "95%值", dataIndex: "c95", align: "center", width: 120 },
        { title: "结论", dataIndex: "cEnding", align: "center", width: 120 },
      ]}
    ]
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
  ExportXlsx.downloadExcel(dataArray, `微站能耗分析数据表_${new Date().toLocaleString()}`)
}

onMounted(() => {
  _getControllerList()
  // console.log(dayjs('2021-10-19').diff('2021-10-1', 'day'))
  // console.log(dayjs('2021-10-19 12:30:10').diff('2021-10-19 09:30:10', 'hour'))
  // console.log(dayjs('2021-12-31').diff('2021-10-1', 'month'))
})
</script>

<style lang="less" scoped>
.barChart {
  width: 100%;
  height: 400px;
}

.chartTitle {
  margin: 10px 0;
  color: #a3d4f9;
  text-align: center;
  .tItem {
    display: inline-block;
    margin-right: 30px;
  }
}
</style>
 