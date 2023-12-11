/*
 * @author: zzp
 * @date: 2023-12-08 15:14:09
 * @fileName: index.vue
 * @filePath: src/views/dataAnalysis/PowerQuality/index.vue
 * @description: 电能质量分析 
 */
<template>
  <div class="parcel dataAnalysisX">
    <a-spin :spinning="loading">
      <a-page-header class="pageHeader">
        <template #tags>
          <a-radio-group v-model:value="pageType" @change="handleSearch">
            <a-radio-button value="1"> <ControlOutlined /> 电压报表</a-radio-button>
            <a-radio-button value="2"> <DashboardOutlined /> 电流报表</a-radio-button>
          </a-radio-group>
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
                <a-select v-model:value="searchForm.electricitymeterId" popupClassName="modalSelect" showSearch option-filter-prop="name" placeholder="请选择电表">
                  <a-select-option v-for="item in electricityList" :key="item.id" :value="item.id" :name="item.name">{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="开始日期" name="startDate" :rules="[{ required: true }]">
                <a-date-picker v-model:value="searchForm.startDate" placeholder="请选择开始日期" />
              </a-form-item>
              <a-form-item label="结束日期" name="endDate" :rules="[{ required: true }]">
                <a-date-picker v-model:value="searchForm.endDate" placeholder="请选择结束日期" />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" :icon="h(SearchOutlined)" @click="handleSearch">查询</a-button>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </div>
      <div class="contentContainer">
        <x-descriptions :list="labelAndFields" :record="record" :column="4"/>
        <a-table
          row-key="id"
          class="groupTable"
          :columns="columns" 
          :data-source="tableList" 
          :pagination="pagination"
          :scroll="{ y: 'calc(100vh - 550px)', x: 'max-content' }" 
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.dataIndex === 'parameter'">
              <div v-if="index === 0" style="text-align: center;">
                {{ pageType === "1" ? "基波电流(V)" : "基波电压(A)"}}
              </div>
              <div v-else class="spliceCol">
                <div class="label">{{ Math.floor(tableList.length / 2) === index ? pageType === "1" ? "谐波电流有效值(A)" : "谐波电压含有率(%)": ""}}</div>
                <div class="index">{{ index + 1 }}</div>
              </div>
            </template>
          </template>
          <template #summary>
            <a-table-summary fixed>
              <a-table-summary-row>
                <a-table-summary-cell :index="0">结论/建议: 合格</a-table-summary-cell>
              </a-table-summary-row>
            </a-table-summary>
          </template>
        </a-table>
      </div>
    </a-spin>
  </div>
</template>
 
<script setup>
import { onMounted, ref, h, watch } from "vue"
import { message } from "ant-design-vue"
import { ControlOutlined, DashboardOutlined, SearchOutlined } from "@ant-design/icons-vue"
import controllerApi from "_api/controller"
import dayjs from "dayjs"

const loading = ref(false)
const searchForm = ref({})
const pageType = ref("1")
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
const tableList = ref([])
const record = ref({})

const formRef = ref()

const columns = ref([
  { title: "参 数", dataIndex: "parameter", align: "center", width: 220, fixed: "left" },
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
  ]},
  { title: "国标值", dataIndex: "national", align: "center", width: 120, class: "noBorder" }
])

const labelAndFields = [
  { label: "监测时间", field: "time" },
  { label: "监测回路", field: "loopName" },
  { label: "电压等级", field: "level", unit: "KV" },
  { label: "基准短路容量", field: "capacity", unit: "MVA" },
]

watch(searchForm.value, () => {
  statisticsData.value = []
  _calibration(status => {
    if(status) _getTableList()
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

const _getTableList = async () => {
  const { current, pageSize } = pagination.value
  const { startDate, endDate } = searchForm.value
  const data = { 
    ...searchForm.value,
    startDate: dayjs(startDate).format("YYYY-MM-DD"),
    endDate: dayjs(endDate).format("YYYY-MM-DD"),
    page: current, 
    size: pageSize 
  }
  console.log(data)
  loading.value = true
  try {
    tableList.value = [
      {
      "id": 1,
      "aMax": 654.2,
      "aAverage": 217.3,
      "aMin": 45.8,
      "a95": 873.9,
      "aEnding": 432.6,
      "bMax": 789.1,
      "bAverage": 123.7,
      "bMin": 321.5,
      "b95": 543.8,
      "bEnding": 246.7,
      "cMax": 987.3,
      "cAverage": 543.2,
      "cMin": 145.9,
      "c95": 654.7,
      "cEnding": 321.5,
      "national": 456.8
    },
    {
      "id": 2,
      "aMax": 456.3,
      "aAverage": 654.1,
      "aMin": 789.2,
      "a95": 234.5,
      "aEnding": 345.6,
      "bMax": 123.7,
      "bAverage": 876.4,
      "bMin": 432.1,
      "b95": 567.8,
      "bEnding": 654.2,
      "cMax": 678.5,
      "cAverage": 345.7,
      "cMin": 789.3,
      "c95": 456.4,
      "cEnding": 567.9,
      "national": 321.6
    },
    {
      "id": 3,
      "aMax": 234.1,
      "aAverage": 567.3,
      "aMin": 432.7,
      "a95": 765.4,
      "aEnding": 678.3,
      "bMax": 876.5,
      "bAverage": 345.8,
      "bMin": 543.9,
      "b95": 456.5,
      "bEnding": 789.4,
      "cMax": 543.8,
      "cAverage": 678.4,
      "cMin": 234.2,
      "c95": 987.4,
      "cEnding": 432.8,
      "national": 567.5
    },
    {
      "id": 4,
      "aMax": 567.4,
      "aAverage": 876.6,
      "aMin": 321.7,
      "a95": 678.5,
      "aEnding": 789.5,
      "bMax": 432.2,
      "bAverage": 234.3,
      "bMin": 765.5,
      "b95": 567.6,
      "bEnding": 321.8,
      "cMax": 345.9,
      "cAverage": 789.6,
      "cMin": 456.6,
      "c95": 321.9,
      "cEnding": 567.7,
      "national": 876.7
    },
    {
      "id": 5,
      "aMax": 876.7,
      "aAverage": 456.7,
      "aMin": 567.7,
      "a95": 321.9,
      "aEnding": 234.4,
      "bMax": 567.8,
      "bAverage": 321.9,
      "bMin": 876.8,
      "b95": 678.6,
      "bEnding": 567.8,
      "cMax": 432.3,
      "cAverage": 567.9,
      "cMin": 234.5,
      "c95": 789.7,
      "cEnding": 678.7,
      "national": 432.0
    },
    {
      "id": 6,
      "aMax": 543.9,
      "aAverage": 321.8,
      "aMin": 456.8,
      "a95": 789.8,
      "aEnding": 567.9,
      "bMax": 789.7,
      "bAverage": 567.9,
      "bMin": 678.8,
      "b95": 876.9,
      "bEnding": 321.9,
      "cMax": 876.8,
      "cAverage": 432.0,
      "cMin": 789.9,
      "c95": 345.8,
      "cEnding": 456.9,
      "national": 654.3
    },
    {
      "id": 7,
      "aMax": 567.8,
      "aAverage": 234.5,
      "aMin": 789.9,
      "a95": 876.9,
      "aEnding": 456.9,
      "bMax": 876.9,
      "bAverage": 789.9,
      "bMin": 234.6,
      "b95": 567.9,
      "bEnding": 789.9,
      "cMax": 789.9,
      "cAverage": 345.9,
      "cMin": 654.4,
      "c95": 432.1,
      "cEnding": 567.9,
      "national": 765.6
    },
    {
      "id": 7,
      "aMax": 567.8,
      "aAverage": 234.5,
      "aMin": 789.9,
      "a95": 876.9,
      "aEnding": 456.9,
      "bMax": 876.9,
      "bAverage": 789.9,
      "bMin": 234.6,
      "b95": 567.9,
      "bEnding": 789.9,
      "cMax": 789.9,
      "cAverage": 345.9,
      "cMin": 654.4,
      "c95": 432.1,
      "cEnding": 567.9,
      "national": 765.6
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

const handleTableChange = pagination => {
  pagination.value.current = pagination.current
  pagination.value.pageSize = pagination.pageSize
  _getTableList()
}

const _calibration = callback => {
  formRef.value.validate().then(() => callback(true)).catch(() => callback(false))
}

const handleSearch = () => {
  _calibration(status => {
    if(status) _getTableList()
      else message.warning("请完善查询条件！")
  })
}

onMounted(() => {
  _getTableList()
  _getControllerList()
})
</script>
 