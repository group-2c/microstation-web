/*
 * @author: zzp
 * @date: 2023-12-08 09:56:09
 * @fileName: index.vue
 * @filePath: src/views/dataAnalysis/SteadyCurve/index.vue
 * @description: 稳态曲线
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
          <a-button v-if="pageType ==='2'" :icon="h(FileExcelOutlined)" @click.stop="exportExcel">导出Excel</a-button>
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
              <a-form-item label="开始日期" name="startDate" :rules="[{ required: true }]">
                <a-date-picker v-model:value="searchForm.startDate" placeholder="请选择开始日期" />
              </a-form-item>
              <a-form-item label="结束日期" name="endDate" :rules="[{ required: true }]">
                <a-date-picker v-model:value="searchForm.endDate" placeholder="请选择结束日期" />
              </a-form-item>
              <a-form-item label="类 别" name="type" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.type" @change="typeChange" placeholder="请选择类别">
                  <a-select-option v-for="item in dict_steady_type" :value="item.key" :key="item.key">{{ item.value }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="参 数" name="parameter" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.parameter" placeholder="请选择参数">
                  <a-select-option v-for="item in currentSteadyType.dictionarys" :value="item.key" :key="item.key">{{ item.value }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item v-if="currentSteadyType.options" label="" name="phase" :rules="[{ required: true }]">
                <a-checkbox-group v-model:value="searchForm.phase" :options="currentSteadyType.options" />
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
            <div class="title" v-if="searchForm.startDate && searchForm.endDate">
              {{ dayjs(searchForm.startDate).format("YYYY-MM-DD") }} - {{ dayjs(searchForm.endDate).format("YYYY-MM-DD") }} 
              <span>功率 - 功率因数</span>
            </div>
            <line-chart ref="lineChartRef" />
          </div>
        </div>
        <div v-if="pageType ==='2'">
          <div v-if="tableList.length === 0" class="empty">请根据条件查询获取数据</div>
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
import { FileExcelOutlined, LineChartOutlined, BarChartOutlined, SearchOutlined } from "@ant-design/icons-vue"
import { dict_steady_type } from "_utils/dictionary"
import ExportXlsx from "_utils/exportXlsx"
import dayjs from "dayjs"
import controllerApi from "_api/controller"
import { steadyCurvesApi } from "_api/dataAnalysis"
import LineChart from "_components/charts/LineChart.vue"

const loading = ref(false)
const searchForm = ref({})
const tableList = ref([])
const pageType = ref("1")
const currentSteadyType = ref({
  dictionarys: [],
})
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
const lineChartRef = ref()
const formRef = ref()

const columns = computed(() => {
  const { options } = currentSteadyType.value
  const { parameter } = searchForm.value

  const _array = [
    { title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1, fixed: "left" },
    { title: "微站名称", dataIndex: "controllerName", align: "left", width: 200, ellipsis: true, fixed: "left" },
    { title: "设备名称", dataIndex: "deviceName", align: "left", width: 200, ellipsis: true },
    { title: "采集时间", dataIndex: "time", align: "left", width: 120, ellipsis: true }
  ]
  if(options) {
    options.forEach(item => {
      if((searchForm.value.phase || []).includes(item.value)) {
        _array.push({ title: item.label, dataIndex: item.value, align: "left", width: 120, ellipsis: true })
      }
    })
  } else {
    const _res = currentSteadyType.value
    if(_res.key === "4" && parameter) {
      _array.push({ title: _res.dictionarys.find(x => x.key === parameter).value, dataIndex: "Z", align: "left", width: 120, ellipsis: true })
    }
  }
  return _array
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
    const { startDate, endDate, phase, parameter } = searchForm.value
    const { options } = currentSteadyType.value

    const data = await steadyCurvesApi.getStatistics({ 
      ...searchForm.value,
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
      phase: phase || ["Z"]
    })

    let array = []
    if(options) {
      options.forEach(item => {
        if((phase || []).includes(item.value)) {
          array.push({
            name: item.label,
            data: data.map(x => x[item.value])
          })
        }
      })
    } else {
      const _res = currentSteadyType.value
      array.push({
        name: _res.dictionarys.find(x => x.key === parameter).value,
        data: data.map(x => x.Z)
      })
    }
    statisticsData.value = array
    
    nextTick(() => {
      lineChartRef.value.setChartData(array, data.map(x => {
        x.time = dayjs(x.time).format("MM-DD HH:mm")
        return x.time
      }))
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
  const { startDate, endDate, phase } = searchForm.value

  try {
    loading.value = true

    const data = await steadyCurvesApi.pageBySheet({ 
      ...searchForm.value,
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
      phase: phase || ["Z"],
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

const typeChange = () => {
  delete searchForm.value.parameter
  delete searchForm.value.phase
  currentSteadyType.value = dict_steady_type.find(x => x.key === searchForm.value.type)
}

const handleTableChange = pagination => {
  pagination.value.current = pagination.current
  pagination.value.pageSize = pagination.pageSize
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
  ExportXlsx.downloadExcel(dataArray, `稳态曲线数据表_${new Date().toLocaleString()}`)
}

onMounted(() => {
  _getControllerList()
})
</script>
 