/*
 * @author: zzp
 * @date: 2023-12-08 15:15:26
 * @fileName: index.vue
 * @filePath: src/views/dataAnalysis/MicrositeEnergy/index.vue
 * @description: 微站能耗分析 
 */
<template>
  <div class="parcel dataAnalysisX">
    <a-spin :spinning="loading">
      <a-page-header class="pageHeader">
        <template #tags>
          <a-radio-group v-model:value="pageType" @change="pageTypeChange">
            <a-radio-button value="day"> <ClockCircleOutlined /> 日报 </a-radio-button>
            <a-radio-button value="month"> <InsertRowBelowOutlined /> 月报 </a-radio-button>
            <a-radio-button value="year"> <ExperimentOutlined /> 年报 </a-radio-button>
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
              <a-form-item label="日期" name="date" :rules="[{ required: true }]">
                <a-date-picker 
                  v-model:value="searchForm.date" 
                  :format="pageType === 'day' ? 'YYYY-MM-DD' : pageType === 'month' ? 'YYYY-MM' : 'YYYY'" 
                  placeholder="请选择日期" 
                />
              </a-form-item>
              <a-form-item label="开始" name="start" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.start" popupClassName="modalSelect" placeholder="请选择开始">
                  <a-select-option 
                    v-for="number in pageType === 'day' ? hourList : pageType === 'month' ? dayList : monthList" 
                    :key="number" 
                    :value="number"
                    :disabled="searchForm.end < number"
                  >{{number}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="结束" name="end" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.end" popupClassName="modalSelect" placeholder="请选择结束">
                  <a-select-option 
                    v-for="number in pageType === 'day' ? hourList : pageType === 'month' ? dayList : monthList" 
                    :key="number" 
                    :value="number" 
                    :disabled="searchForm.start > number"
                  >{{number}}</a-select-option>
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
        <a-table
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
import { onMounted, ref, h } from "vue"
import { message } from "ant-design-vue"
import { ClockCircleOutlined, InsertRowBelowOutlined, FileExcelOutlined, ExperimentOutlined, SearchOutlined } from "@ant-design/icons-vue"
import ExportXlsx from "_utils/exportXlsx"
import dayjs from "dayjs"
import controllerApi from "_api/controller"

const loading = ref(false)
const searchForm = ref({
  start: 15,
  end: 20
})
const tableList = ref([])
const pageType = ref("day")
const controllerList = ref([])
const electricityList = ref([])
const dayList = new Array(31).fill("-").map((_x, index) => index + 1)
const monthList = new Array(12).fill("-").map((_x, index) => index + 1)
const hourList = new Array(25).fill("-").map((_x, index) => index)
const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "30", "40", "50", "100", "200", "500", "1000"],
  showTotal: total => `共有 ${total} 条数据`
})

const formRef = ref()

const columns = ref([
  { title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1, fixed: "left" },
  { title: "回路名称/KW.h", dataIndex: "name", align: "left", width: 200, ellipsis: true, fixed: "left" },
])

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
  formRef.value.validate().then(() => callback(true)).catch(() => callback(false))
}

const _setDynamicColumns = data => {
  const text = pageType.value === "year" ? "月" : pageType.value === "month" ? "日" : "时"
  const count = searchForm.value.end - searchForm.value.start

  new Array(count+1).fill("-").forEach((_x, index) => {
    const number = searchForm.value.start + index
    columns.value.push({ title: `${number}${text}`, dataIndex: `${pageType.value}${number}`, align: "center", width: 150 })
  })
  columns.value.push({ title: "合计", dataIndex: "count", align: "center", width: 150 })

  data.forEach(item => {
    item.values.forEach((value, index) => {
      const number = searchForm.value.start + index
      item[`${pageType.value}${number}`] = value
    })
  })
  tableList.value = data
}

const _getTableList = async () => {
  const { current, pageSize } = pagination.value
  const { yearMonthDay, yearMonth, year } = searchForm.value
  const data = { 
    ...searchForm.value,
    page: current, 
    size: pageSize 
  }
  if(yearMonthDay) data.yearMonthDay = dayjs(yearMonthDay).format("YYYY-MM-DD")
  if(yearMonth) data.yearMonth = dayjs(yearMonth).format("YYYY-MM")
  if(year) data.year = dayjs(year).format("YYYY")

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
  pagination.value.current = 1
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
  const data = [
    {
      id: 1,
      name: "回路1",
      values: [100, 200, 300, 400, 500, 600]
    },
    {
      id: 2,
      name: "回路2",
      values: [1000, 2000, 3000, 4000, 5000, 6000]
    },
  ]
  _setDynamicColumns(data)
  _getControllerList()
})
</script>
 