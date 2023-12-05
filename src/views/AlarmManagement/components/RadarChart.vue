/*
 * @author: zzp
 * @date: 2023-12-05 14:02:47
 * @fileName: RadarChart.vue
 * @filePath: src/views/AlarmManagement/components/RadarChart.vue
 * @description: 报警类型分析
 */
<template>
  <div class="chart" ref="chartRef" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import * as echarts from "echarts"

let radarChart = null
const chartRef = ref()

const _initModeChart = value => {
  radarChart.setOption(
    {
      tooltip: { trigger: "axis" },
      radar: {
        radius: 80,
        indicator: [
          { name: "通讯状态" },
          { name: "现场报警" },
          { name: "一级报警" },
        ],
        axisLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, 0.5)"
          },
        },
        splitLine: {
          lineStyle: {
            color: "#283c5e"
          },
        },
        splitArea: {
          show: false,
        },
        name: {
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)"
          },
        },
      },
      series: [
        {
          type: "radar",
          tooltip: { trigger: "item" },
          data: [{
            value,
            name: "报警类型分析",
            itemStyle: {
              color: "#2579f7",
              borderColor: "#2579f7",
              borderWidth: 2
            },
            lineStyle: {
              color: "#2579f7",
            }
          }]
        }
      ]
    },
    true
  )
}

const setChartData = (record = undefined) => {
  const data = !record ? [] : [record.status, record.site, record.superlative]
  _initModeChart(data)
  setTimeout(_chartResize)
}

const _chartResize = () => {
  radarChart && radarChart.resize()
}

onMounted(() => {
  radarChart = echarts.init(chartRef.value)
  setChartData()
  window.addEventListener("resize", () => {
    _chartResize()
  })
})

onBeforeUnmount(() => {
  _chartResize()
})

defineExpose({ setChartData })
</script>