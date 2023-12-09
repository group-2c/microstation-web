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

const _getStatistics = async () => {
  loading.value = true
  try {
    const _testData = () => {
      let base = +new Date(1968, 9, 3)
      let oneDay = 24 * 3600 * 1000
      let date = []
      let data = [Math.random() * 300]
      for (let i = 1; i < 20000; i++) {
        var now = new Date((base += oneDay));
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"))
        const _i = Math.round((Math.random() - 0.5) * 20 + data[i - 1])
        data.push(_i < 1 ? 10 : _i)
      }
      return { date, data }
    }

    let array = [], date = _testData().date

    if(pageType.value === "1") {
      array = [
        {
          name: "Pa",
          data: _testData().data
        },
        {
          name: "Pb",
          data: _testData().data
        },
        {
          name: "Pc",
          data: _testData().data
        },
        {
          name: "P",
          data: _testData().data
        }
      ]
    } else {
      array = [
        {
          name: "P",
          data: _testData().data
        }
      ]
    }

    statisticsData.value = array

    nextTick(() => {
      lineChartRef.value.setChartData(array, date)
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
 