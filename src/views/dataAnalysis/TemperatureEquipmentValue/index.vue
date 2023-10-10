/*
 * @author: zzp
 * @date: 2023-08-27 15:43:13
 * @fileName: index.vue
 * @filePath: src/views/dataAnalysis/TemperatureEquipmentValue/index.vue
 * @description: 数显温湿度设备数据记录
 */
<template>
  <div class="parcel">
    <a-spin :spinning="dataCenter.loading" >
      <a-page-header class="pageHeader" :title="`${dataCenter.pageName}列表`">
        <template #extra> 
          <a-button :icon="h(FileExcelOutlined)" @click.stop="exportExcel">导出Excel</a-button>
        </template>
      </a-page-header>
      <div class="searchContainer">
        <a-row justify="space-between">
          <a-col />
          <a-col>
            <a-input-search
              v-model:value="dataCenter.searchForm.name"
              class="searchBox"
              placeholder="模糊搜索"
              enter-button
              size="large"
              @search="handleSearch"
            />
          </a-col>
        </a-row> 
      </div>
      <div class="contentContainer">
        <a-table 
          row-key="id"
          :columns="constColumns"
          :data-source="dataCenter.tableList" 
          :pagination="dataCenter.pagination"
        />
      </div>
    </a-spin>
  </div>
</template>

<script setup>
  import { h, ref, onMounted } from "vue"
  import { FileExcelOutlined } from "@ant-design/icons-vue"
  import { message } from "ant-design-vue"
  import Lodash from "lodash"
  import ExportXlsx from "_utils/exportXlsx"
  import temperatureEquipmentValueApi from "_api/temperatureEquipmentValue"

  const constColumns = [
    { title: "序 号", dataIndex: "index", align: "center",  width: 80, customRender: data => data.index + 1 },    
    { title: "温度测量值", dataIndex: "temperature", align: "left" },    
    { title: "湿度测量值", dataIndex: "humidity", align: "left" },
    { title: "数显温湿度设备ID", dataIndex: "temperature_humidity_equipment_id", align: "left" },
    { title: "数显温湿度设备名称", dataIndex: "temperature_humidity_equipment_name", align: "left" },
    { title: "创建时间", dataIndex: "createAt", align: "left" },
    { title: "更新时间", dataIndex: "updateAt", align: "left" }
  ]

  const dataDefault = {
    loading: false,
    pageName: "数显温湿度设备数据",
    tableList: [],
    searchForm: {},
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
      showTotal: total => `共有 ${total} 条数据`
    }
  }

  const dataCenter = ref(Lodash.cloneDeep(dataDefault))

  const _getTableList = async () => {
    dataCenter.value.loading = true
    
    const { searchForm, pagination } = dataCenter.value
    const { current, pageSize } = pagination
    const data = { ...searchForm, page: current, size: pageSize }

    try {
      const res = await temperatureEquipmentValueApi.getByPage(data)
      dataCenter.value.tableList = res.data
      dataCenter.value.pagination.total = res.total
      dataCenter.value.pagination.current = res.page_num
    } catch(err) {
      message.error("获取列表失败: " + err)
    } finally {
      dataCenter.value.loading = false
    }
  }

  const handleSearch = () => {
    dataCenter.value.pagination.current = 1
    _getTableList()
  }

  const exportExcel = () => {
    const { tableList, pageName } = dataCenter.value
    if(tableList.length === 0) {
      return message.error("列表为空！")
    }

    const dataArray = [{
      id: `${pageName}id`,
      temperature: "温度测量值",
      humidity: "湿度测量值",
      temperature_humidity_equipment_id: "数显温湿度设备id",
      temperature_humidity_equipment_name: "数显温湿度设备名称",
      createAt: "创建时间",
    }]

    tableList.forEach(item => {
      const data = {}
      Object.keys(dataArray[0]).forEach(key => data[key] = item[key])
      dataArray.push(data)
    })
    ExportXlsx.downloadExcel(dataArray, `${pageName}信息表_${new Date().toLocaleString()}`)
  }

  onMounted(() => {
    _getTableList()
  })
</script> 