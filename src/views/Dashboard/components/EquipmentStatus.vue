/*
 * @author: zzp
 * @date: 2023-09-21 09:36:42
 * @fileName: EquipmentStatus.vue
 * @filePath: src/views/Dashboard/components/EquipmentStatus.vue
 * @description: 设备状态
 */
<style lang="less" scoped>
 @import url("./index.less");
</style>

<template>
  <div class="equipmentStatus">
    <div class="highLevelTitleBar">
      <i class="equipmentIcon" />
      <span class="chTitle">设备状态</span>
    </div>
    <div class="contentBar">
      <div class="chart" ref="chartRef" />
      <div class="chartStyles" />
      <div class="statusList">
        <div class="statusItem" data-name="total">
          <label>微站总数</label>
          <div class="statusNumber">{{ record.total || 0 }}</div>
        </div>
        <div class="statusItem" data-name="onLine">
          <label>微站在线</label>
          <div class="statusNumber">{{ record.online || 0 }}%</div>
        </div>
        <div class="statusItem" data-name="offLine">
          <label>微站离线</label>
          <div class="statusNumber">{{ record.offline || 0 }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, watch } from "vue"
  import * as echarts from "echarts"

  const props = defineProps({
    data: Object
  })

  let pieChart = null

  const record = ref({
    total: 20,
    online: 10,
    offline: 10,
  })
  const chartRef = ref()

  watch(() => props.data, value => {
    record.value = value
    setChartData()
  })

  const _initModeChart = () => {
    pieChart.setOption(
      {
        tooltip: {
          trigger: "item",
          position: ["20%", "0%"],
          formatter: `{b}: {c}`
        },
        color: [ 
          new echarts.graphic.LinearGradient(0, 0, 0, 1, 
          [ { offset: 0, color: "#1E4FAA" }, { offset: 1, color: "#22D6FC" } ]), 
          "#ffffff2b"
        ],
        series: [
          {
            type: "pie",
            radius: ["58%", "72%"],
            label: {
              show: true,
              position: "center",
              formatter: `{number|${record.value.onlinePercent}}\r\n{label|微站总数}`,
              rich: {
                number: {
                  fontSize: 20,
                  fontFamily: "微软雅黑",
                  color: "#ffffff",
                  lineHeight: 30
                },
                label: {
                  fontSize: 10,
                  fontWeight: "200",
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
            data: [
              { value: record.value.online, name: "微站在线" },
              { value: record.value.offline, name: "微站离线" },
            ]
          }
        ]
      },
      true
    ) 
  }

  const setChartData = () => {
    const { online, offline } = record.value
    const onlinePercentage = (Number(online) / (Number(online) + Number(offline))) * 100
    const onlinePercent = Math.floor(onlinePercentage)

    record.value.onlinePercent = onlinePercent

    _initModeChart()
    setTimeout(_chartResize)
  }

  const _chartResize = () => {
    pieChart && pieChart.resize()
  }

  onMounted(() => {
    pieChart = echarts.init(chartRef.value)
    setChartData()
  })

  onBeforeUnmount(() => {
    _chartResize()
  })
</script>