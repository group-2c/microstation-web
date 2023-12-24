/*
 * @author: zzp
 * @date: 2023-12-08 15:13:00
 * @fileName: index.vue
 * @filePath: src/views/dataAnalysis/SoeEvent/index.vue
 * @description: SOE事件分析
 */
<template>
  <div class="parcel dataAnalysisX">
    <a-spin :spinning="loading">
      <a-page-header class="pageHeader">
        <template #tags>
          <a-radio-group v-model:value="pageType">
            <a-radio-button value="1"> <BarChartOutlined /> 数据 </a-radio-button>
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
                <a-select v-model:value="searchForm.controllerId" popupClassName="modalSelect" showSearch option-filter-prop="name" placeholder="请选择微站">
                  <a-select-option v-for="item in controllerList" :key="item.id" :value="item.id" :name="item.name">{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="设备类型" name="deviceType" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.deviceType" popupClassName="modalSelect" placeholder="请选择设备类型" @change="deviceTypeChange">
                  <a-select-option v-for="item in dict_svg_device_types.filter(x => x.key !== 'electricity_meter')" :value="item.key" :key="item.key">{{ item.value }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="设 备" name="deviceId" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.deviceId" popupClassName="modalSelect" showSearch option-filter-prop="name" placeholder="请选择设备">
                  <a-select-option v-for="item in deviceList" :key="item.id" :value="item.id" :name="item.name">{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="开始日期" name="startDate" :rules="[{ required: true }]">
                <a-date-picker v-model:value="searchForm.startDate" placeholder="请选择开始日期" />
              </a-form-item>
              <a-form-item label="结束日期" name="endDate" :rules="[{ required: true }]">
                <a-date-picker v-model:value="searchForm.endDate" placeholder="请选择结束日期" />
              </a-form-item>
              <a-form-item label="事 件" name="event">
                <a-input v-model:value="searchForm.event" autocomplete="off" placeholder="输入事件代码或名称" />
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
import { FileExcelOutlined, BarChartOutlined, SearchOutlined } from "@ant-design/icons-vue"
import { dict_svg_device_types } from "_utils/dictionary"
import { soeEventsApi } from "_api/dataAnalysis"
import ExportXlsx from "_utils/exportXlsx"
import dayjs from "dayjs"
import controllerApi from "_api/controller"

const loading = ref(false)
const searchForm = ref({})
const tableList = ref([])
const pageType = ref("1")
const controllerList = ref([])
const deviceList = ref([])
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
  { title: "微站名称", dataIndex: "controllerName", align: "left", width: 200, ellipsis: true, fixed: "left" },
  { title: "动作时间", dataIndex: "createAt", align: "left", width: 180, ellipsis: true },
  { title: "仪表编号", dataIndex: "code", align: "left", width: 200, ellipsis: true },
  { title: "仪表名称", dataIndex: "name", align: "left", width: 200, ellipsis: true },
  { title: "事件名称", dataIndex: "eventName", align: "left", width: 200, ellipsis: true },
  { title: "事件属性", dataIndex: "attributesName", align: "left", width: 200, ellipsis: true }
])

const _getControllerList = async () => {
  try {
    const res = await controllerApi.getAll()
    controllerList.value = res.data
  } catch(err) {
    message.error(`获取微站列表失败: ${err}`)
  }
}

const deviceTypeChange = async () => {
  deviceList.value = []
  delete searchForm.value.deviceId
  loading.value = true
  try {
    const res = await controllerApi.getDeviceByDeviceType({
      deviceType: searchForm.value.deviceType,
      controllerID: searchForm.value.controllerId
    })
    deviceList.value = res
  } catch(err) {
    console.log(err)
    message.error(`获取设备列表失败:${err}`)
  } finally {
    loading.value = false 
  }  
}

const _calibration = callback => {
  formRef.value.validate().then(() => callback(true)).catch(() => callback(false))
}

const _getTableList = async () => {
  const attributesObj = { "0": "复归", "1": "动作" }
  const { current, pageSize } = pagination.value
  const { startDate, endDate } = searchForm.value

  try {
    loading.value = true

    const data = await soeEventsApi.pageBySheet({ 
      ...searchForm.value,
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
      page: current, 
      size: pageSize 
    })
    tableList.value = data.content.map(item => {
      item.attributesName = attributesObj[item.attributes]
      return item
    })
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
  ExportXlsx.downloadExcel(dataArray, `SOE事件分析数据表_${new Date().toLocaleString()}`)
}

onMounted(() => {
  _getControllerList()
})
</script>
 