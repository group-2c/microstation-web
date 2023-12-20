/*
 * @author: zzp
 * @date: 2023-12-08 15:09:55
 * @fileName: index.vue
 * @filePath: src/views/dataAnalysis/LoadCurve/index.vue
 * @description: 负荷曲线
 */
<template>
  <div class="parcel dataAnalysisX">
    <a-spin :spinning="loading">
      <a-page-header class="pageHeader">
        <template #tags>
          <a-radio-group v-model:value="pageType" @change="handleSearch">
            <a-radio-button value="1"> <DotChartOutlined /> 实时负荷</a-radio-button>
            <a-radio-button value="2"> <LineChartOutlined /> 日负荷</a-radio-button>
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
              <a-form-item>
                <a-button type="primary" :icon="h(SearchOutlined)" @click="handleSearch">查询</a-button>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </div>
      <div class="contentContainer">
        <div class="chartArea">
          <div v-if="statisticsData.length === 0" class="empty">没有相关统计数据</div>
          <div v-else>
            <div class="title">
              <span>{{pageType === "1" ? "实时负荷曲线" : "日负荷曲线"}}</span>
            </div>
            <line-chart ref="lineChartRef" yAxisName="KW"/>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>
 
<script setup>
import { onMounted, ref, h, nextTick, watch } from "vue"
import { message } from "ant-design-vue"
import { DotChartOutlined, LineChartOutlined, SearchOutlined } from "@ant-design/icons-vue"
import controllerApi from "_api/controller"
import LineChart from "../components/LineChart.vue"
import Lodash from "lodash"

const loading = ref(false)
const searchForm = ref({})
const pageType = ref("1")
const controllerList = ref([])
const electricityList = ref([])
const statisticsData = ref([])

const lineChartRef = ref()
const formRef = ref()

watch(searchForm.value, () => {
  statisticsData.value = []
  _calibration(status => {
    if(status) _getStatistics()
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
    const data = [
      {
        time: "18:14",
        Pa: 1,
        Pb: 2,
        Pc: 3,
        P: 4,
      },
      {
        time: "19:14",
        Pa: 5,
        Pb: 6,
        Pc: 7,
        P: 8,
      }
    ]

    let array = []
    
    if(pageType.value === "1") {
      new Array(4).fill("-").forEach((_x, index) => {
        let name = []
        if(index === 0) name = "Pa"
        else if(index === 1) name = "Pb"
        else if(index === 2) name = "Pc"
        else name = "P"
        array.push({
          name,
          data: data.map(x => x[name])
        })
      })
    } else {
      array.push({
        name: "P",
        data: data.map(x => x.P)
      })
    }

    statisticsData.value = array

    nextTick(() => {
      lineChartRef.value.setChartData(array, data.map(x => x.time))
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

const handleSearch = () => {
  _calibration(status => {
    if(status) _getStatistics()
      else message.warning("请完善查询条件！")
  })
}

onMounted(() => {
  _getControllerList()
})
</script>
 