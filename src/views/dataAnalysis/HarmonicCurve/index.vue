/*
 * @author: zzp
 * @date: 2023-12-08 15:07:18
 * @fileName: index.vue
 * @filePath: src/views/dataAnalysis/HarmonicCurve/index.vue
 * @description: 谐波曲线分析
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
                <a-select v-model:value="searchForm.type" placeholder="请选择类别">
                  <a-select-option value="1">电压谐波</a-select-option>
                  <a-select-option value="2">电流谐波</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item v-show="searchForm.type" label="" name="phase" :rules="[{ required: true }]">
                <a-checkbox-group v-model:value="searchForm.phase" :options="checkboxOptions" @change="phaseChange"/>
              </a-form-item>
              <a-form-item v-show="searchForm.type" label="含有率" name="contentRate" :rules="[{ required: true }]">
                <a-select v-model:value="searchForm.contentRate" mode="multiple" :maxTagCount="1" placeholder="请选择含有率">
                  <a-select-option 
                    v-for="item in contentRateList" 
                    :key="item.value" 
                    :value="item.value"
                    :disabled="contentRateDisabled(item.value)"
                  >{{item.label}}</a-select-option>
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
        <div class="chartArea" v-if="pageType ==='1'">
          <div v-if="statisticsData.length === 0" class="empty">没有相关统计数据</div>
          <div v-else>
            <div class="title" v-if="searchForm.startDate && searchForm.endDate">
              {{ dayjs(searchForm.startDate).format("YYYY-MM-DD") }} - {{ dayjs(searchForm.endDate).format("YYYY-MM-DD") }} 
              <span>功率 - 功率因数</span>
            </div>
            <line-chart ref="lineChartRef" yAxisName="%"/>
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
import ExportXlsx from "_utils/exportXlsx"
import dayjs from "dayjs"
import controllerApi from "_api/controller"
import { harmonicCurveApi } from "_api/dataAnalysis"
import LineChart from "_components/charts/LineChart.vue"

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
const checkboxOptions = ref([
  { label: "A相", value: "A" },
  { label: "B相", value: "B" },
  { label: "C相", value: "C" }
])
const contentRateList = ref([])

const lineChartRef = ref()
const formRef = ref()

const columns = computed(() => {
  const _array = [
    { title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1, fixed: "left" },
    { title: "微站名称", dataIndex: "controllerName", align: "left", width: 200, ellipsis: true, fixed: "left" },
    { title: "设备名称", dataIndex: "deviceName", align: "left", width: 200, ellipsis: true },
    { title: "采集时间", dataIndex: "time", align: "left", width: 180, ellipsis: true }
  ]

  checkboxOptions.value.forEach(item => {
    if((searchForm.value.phase || []).includes(item.value)) {
      searchForm.value.contentRate.forEach(_con => {
        const title = `${item.label}${_con == "999" ? "总谐波" : `${_con}次谐波`}`
        _array.push({ title, dataIndex: `${item.value}${_con}`, align: "left", width: 130, ellipsis: true })
      })
    }
  })
  return _array
})

const contentRateDisabled = computed(() => value => {
  const { phase, contentRate } = searchForm.value
  const _ary = contentRate || []
  return (phase || []).length * _ary.length >= 10 && !_ary.includes(value)
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
    const { startDate, endDate } = searchForm.value

    const data = await harmonicCurveApi.getStatistics({ 
      ...searchForm.value,
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
    })

    let array = []

    checkboxOptions.value.forEach(item => {
      if((searchForm.value.phase || []).includes(item.value)) {
        searchForm.value.contentRate.forEach(_con => {
          array.push({
            name: `${item.label}${_con == "999" ? "总谐波" : `${_con}次谐波`}`,
            data: data.map(x => x[`${item.value}${_con}`])
          })
        })
      }
    })
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
  const { startDate, endDate } = searchForm.value
  try {
    loading.value = true

    const data = await harmonicCurveApi.pageBySheet({ 
      ...searchForm.value,
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
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

const phaseChange = () => {
  delete searchForm.value.contentRate
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
  ExportXlsx.downloadExcel(dataArray, `谐波曲线数据表_${new Date().toLocaleString()}`)
}

onMounted(() => {
  contentRateList.value = new Array(30).fill("-").map((item, x) => ({
    label: `${x+2}次谐波含量`, value: `${x+2}`
  }))
  contentRateList.value.unshift({ label: "总谐波", value: "999"})
  _getControllerList()
})
</script>
 