/*
 * @author: zzp
 * @date: 2023-09-05 10:46:04
 * @fileName: index.vue
 * @filePath: src/views/Unmanned/index.vue
 * @description: 无人微站 
 */
<style lang="less" scoped>
  @import url("./index.less");
</style>

<template>
  <div class="unmannedBox">
    <div class="left">
      <div class="backdrops">
        <div class="back1" />
        <div class="back2" :style="`height: ${leftBackdropHeight}px`" />
        <div class="back3" />
      </div>
      <div class="workArea">
        <div class="unmannedSelect">
          <label>当前微站: </label>
          <a-select v-model:value="controllerId" popupClassName="modalSelect" placeholder="请选择微站" :onChange="controllerSelectChange">
            <a-select-option v-for="item in controllerList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
          </a-select>
        </div>
        <div class="unTitle">微站设备占比</div>
        <div class="chart" ref="chartRef" />
        <div class="chartImg" />
        <div class="equipmentStatistics">
          <div v-for="item, index in deviceList" :key="index" 
            :class="[
              'equipmentItem',
              item.type === currentDevice?.type ? 'active' : '',
              item.offline !== 0 ? 'offline' : ''
            ]"
            @click.stop="equipmentItemClick(item)"
          >
            <div class="itemTop">
              <i :class="`eIcon eIcon-${index}`" />
              <span class="name">{{ item.name }}</span>
            </div>
            <div class="itemBottom">
              <span class="number">{{ item.count }}</span>
              <span class="unit">台</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div class="topControls">
          <div class="tLeft" />
          <div class="tButton" @click.stop="backHomePage">返回平台首页</div>
          <div class="tRight" />
        </div>
      </div>
      <div class="containerBody">
        <div class="backdrops">
          <div class="sLeft">
            <div class="topLeft" />
            <div class="lAuto" :style="`height: ${scAutoHeight}px`" />
            <div class="lCenter" />
            <div class="lAuto" :style="`height: ${scAutoHeight}px`" />
            <div class="lBottom" />
          </div>
          <div class="sTopCenter" :style="`width: ${centerAutoWidth}px`" />
          <div class="sRight">
            <div class="topRight" />
            <div class="rAuto" :style="`height: ${scAutoHeight + 15}px`" />
            <div class="rCenter" />
            <div class="rAuto" :style="`height: ${scAutoHeight + 15}px`" />
            <div class="rBottom" />
          </div>
          <div class="sBottom" />
        </div>
        <div class="content">
          <div class="topAreas">
            <div class="title">{{ currentDevice?.name }}</div>
            <div class="deviceStatus">
              <div>在线: <span>{{ currentDevice?.online }}</span></div>
              <div class="offline">离线: <span>{{ currentDevice?.offline }}</span></div>
            </div>
            <div class="searchBox">
              <a-input-search
                v-model:value="keyword"
                class="searchBox"
                placeholder="模糊搜索"
                enter-button
                size="small"
                @search="handleSearch"
              />
            </div>
          </div>
          <div class="contentContainer">
            <a-spin :spinning="loading">
              <a-table 
                row-key="id"
                :columns="columns"
                :data-source="tableList" 
                :pagination="pagination"
                :scroll="{ y: 'calc(100vh - 410px)', x: 1500 }"
                @change="handleTableChange"
                :row-class-name="_record => (_record.id === tableActiveItem.id ? 'itemActive' : '')"
                :customRow="customRow"
              />
            </a-spin>
          </div>
        </div>
      </div>
    </div>
  </div>
  <realTime-data ref="drawerRef" :controllerId="controllerId" :deviceGroup="currentDevice" :onCancel="realTimeCancel"/>
  <layout-footer />
</template>

<script setup>
  import { onMounted, onBeforeUnmount, ref, inject } from "vue"
  import { useRoute } from "vue-router"
  import { message } from "ant-design-vue"
  import { dict_unmanned_equipment, dict_camera_types, dict_deviceStatus } from "_utils/dictionary"
  import * as echarts from "echarts"
  import controllerApi from "_api/controller"
  import LayoutFooter from "_components/LayoutFooter/index.vue"
  import dataynamicColumns from "./columns"
  import RealTimeData from "./RealTimeData.vue"
  import Lodash from "lodash"
  import unmannedApi from "_api/unmanned"

  let pieChart = null, timer = null

  const routeJump = inject("$routeJump")
  const route = useRoute()

  const loading = ref(false)
  const leftBackdropHeight = ref(0)
  const centerAutoWidth = ref(0)
  const scAutoHeight = ref(0)
  const controllerId = ref(undefined)
  const controllerList = ref([])
  const currentDevice = ref({})
  const deviceList = ref([])
  const keyword = ref("")
  const columns = ref([])
  const pagination = ref({
    total: 0,
    current: 1,
    pageSize: 10,
    showTotal: total => `共有 ${total} 条数据`
  })
  const tableList = ref([])
  const tableActiveItem = ref({})
  const deviceCount = ref(0)
  const chartRef = ref()
  const drawerRef = ref()

  const backHomePage = () => {
    routeJump({ name: "Dashboard" })
  }

  const _getControllerList = async callback => {
    try {
      const res = await controllerApi.getAll()
      controllerList.value = res.data
      callback()
    } catch(err) {
      message.error(`获取微站列表失败: ${err}`)
    }
  }

  const _getControllerDevices = async (inception = true) => {
    try {
      const res = await unmannedApi.queryEquipmentStatistics(controllerId.value)
      const array = []
      Object.keys(res).forEach(key => {
        const count = res[key]?.total
        const offline = res[key]?.fault
        const online = count - offline
        const dictItem = dict_unmanned_equipment[key]
        array.push({
          name: dictItem.name,
          subKey: dictItem.subKey,
          drawerWidth: dictItem.drawerWidth,
          controlSubKeys: dictItem.controlSubKeys,
          type: key,
          count,
          online,
          offline
        })
      })
      deviceList.value = array
      if(inception) {
        currentDevice.value = deviceList.value[0]
        columns.value = dataynamicColumns.common
      }
      deviceCount.value = Lodash.sumBy(deviceList.value, x => x.count)
      handleSearch()
      setChartData(deviceList.value)
    } catch(err) {
      message.error(`获取设备统计数据失败: ${err}`)
    }
  }

  const customRow = record => {
    return {
      onclick: () => {
        tableActiveItem.value = record
        drawerRef.value.handleShow(record)
      }
    }
  }

  const equipmentItemClick = item => {
    currentDevice.value = item
    switch(item.type) {
      case "access_control":
        columns.value = dataynamicColumns.accessControlController
        break
      case "camera":
        columns.value = dataynamicColumns.camera
        break  
      default: 
        columns.value = dataynamicColumns.common
        break      
    }
    pagination.value.total = 0
    pagination.value.current = 1
    tableList.value = []
    handleSearch()
  }

  const _getTableList = async () => {
    loading.value = true
    
    const { current, pageSize } = pagination.value
    const data = {
      controllerID: controllerId.value,
      deviceType: currentDevice.value.type,
      name: keyword.value, 
      page: current, 
      size: pageSize,
      sort: "asc"
    }

    try {
      const res = await unmannedApi.getDeviceStatusByDeviceType(data)
      tableList.value = res.content.map(item => {
        if(currentDevice.value.type === "camera") {
          item.typeName = dict_camera_types.find(x => x.key === item.type)?.value
        } 
        item.statusName = dict_deviceStatus.find(x => x.key === item.status)?.value
        return item
      })
      pagination.value.total = res.totalElements
      pagination.value.current = res.pageNumber
    } catch(err) {
      message.error("获取列表失败: " + err)
    } finally {
      loading.value = false
    }
  }

  const handleTableChange = pagination => {
    pagination.value.current = pagination.current
    _getTableList()
  }

  const handleSearch = () => {
    pagination.value.current = 1
    _getTableList()
  }

  const _computeEdgeScale = () => {
    const unmannedBox = document.querySelector(".unmannedBox")
    const leftDom = unmannedBox.querySelector(".left")
    const leftBackdrop = leftDom.querySelector(".backdrops")
    const left1 = leftBackdrop.querySelector(".back1")
    const left3 = leftBackdrop.querySelector(".back3")
    leftBackdropHeight.value = leftDom.clientHeight - left1.clientHeight - left3.clientHeight - 10

    const rightDom = unmannedBox.querySelector(".right")
    const rightBackdrop = rightDom.querySelector(".backdrops")
    const sLeft = rightBackdrop.querySelector(".sLeft")
    const topLeft = sLeft.querySelector(".topLeft")
    const lCenter = sLeft.querySelector(".lCenter")
    const lBottom = sLeft.querySelector(".lBottom")
    const sRight = rightBackdrop.querySelector(".sRight")
    const topRight = sRight.querySelector(".topRight")
    centerAutoWidth.value = rightBackdrop.clientWidth -  topLeft.clientWidth - topRight.clientWidth
    scAutoHeight.value = ((rightBackdrop.clientHeight - topLeft.clientHeight - lCenter.clientHeight - lBottom.clientHeight) / 2) - 2
  }

  const controllerSelectChange = () => {
    _getControllerDevices()
  }

  const _initModeChart = data => {
    pieChart.setOption(
      {
        tooltip: {
          trigger: "item",
          backgroundColor: "#0000",
          borderWidth: 0, 
          shadowBlur: 0, 
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          position: (point, params, dom, rect, size) => {
            return [point[0] - size.contentSize[0] / 2, point[1] - size.contentSize[1] - 10]
          },
          formatter: params => {
            return `
              <div class="unChartToolTipBox">
                <div class="title">${params.name}</div>
                <div class="value">${params.value} 台</div>
              </div>
            `
          },
        },
        color: [ 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [ { offset: 0, color: "#026DB2" }, { offset: 1, color: "#12FEE0" } ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [ { offset: 0, color: "#6DD400" }, { offset: 1, color: "#44D7B6" } ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [ { offset: 0, color: "#5C64FF" }, { offset: 1, color: "#6988F8" } ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [ { offset: 0, color: "#2DE1FD" }, { offset: 1, color: "#0E5FFF" } ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [ { offset: 0, color: "#0056FF" }, { offset: 1, color: "#3D7FFF" } ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [ { offset: 0, color: "#5AD8A6" }, { offset: 1, color: "#269A99" } ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [ { offset: 0, color: "#C4A9E7" }, { offset: 1, color: "#9270CA" } ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [ { offset: 0, color: "#FFD8B8" }, { offset: 1, color: "#FF9D4D" } ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [ { offset: 0, color: "#B20202" }, { offset: 1, color: "#FE1212" } ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [ { offset: 0, color: "#B2028F" }, { offset: 1, color: "#FE12C0" } ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [ { offset: 0, color: "#6C02B2" }, { offset: 1, color: "#C712FE" } ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [ { offset: 0, color: "#B26002" }, { offset: 1, color: "#FECF12" } ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [ { offset: 0, color: "#02B23D" }, { offset: 1, color: "#12FE69" } ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [ { offset: 0, color: "#0249B2" }, { offset: 1, color: "#1288FE" } ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [ { offset: 0, color: "#020FB2" }, { offset: 1, color: "#12FEE0" } ]), 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [ { offset: 0, color: "#3D02B2" }, { offset: 1, color: "#49FE12" } ]), 
        ],
        series: [
          {
            type: "pie",
            radius: ["40%", "80%"],
            label: {
              show: true,
              position: "center",
              formatter: `{number|${deviceCount.value}}\r\n{label|总计/台}`,
              rich: {
                number: {
                  fontSize: 30,
                  fontWeight: "bold",
                  fontFamily: "微软雅黑",
                  color: "#ffffff",
                  lineHeight: 38,
                  padding: [0, 0, 0, 10]
                },
                label: {
                  fontSize: 12,
                  fontFamily: "微软雅黑",
                  color: "#ffffff"
                },
              }
            },
            emphasis: {
              label: {
                show: false
              }
            },
            labelLine: {
              show: false 
            },
            data
          }
        ]
      },
      true
    ) 
  }

  const setChartData = data => {
    const array = []
    data.forEach(item => {
      array.push({ value: item.count, name: item.name })
    })

    _initModeChart(array)
    setTimeout(_chartResize)
  }

  const _chartResize = () => {
    pieChart && pieChart.resize()
  }

  const realTimeCancel = () => {
    tableActiveItem.value = {}
  }

  const _initData = () => {
    _getControllerList(() => {
      controllerId.value = route.query.id ? Number(route.query.id) : controllerList.value?.[0]?.id
      _getControllerDevices()
    })
  }

  const _interfacePolling = () => {
    _clearPollingTimer()
    timer = setInterval(() => {
      _getControllerDevices(false)
    }, 10 * 1000)
  }

  const _clearPollingTimer = () => {
    timer && clearInterval(timer)
    timer = null
  }

  onMounted(() => {
    _computeEdgeScale()
    window.addEventListener("resize", () => {
      _computeEdgeScale()
    })
    pieChart = echarts.init(chartRef.value)
    _initData()
    _interfacePolling()
  })

  onBeforeUnmount(() => {
    _clearPollingTimer()
  })
</script>