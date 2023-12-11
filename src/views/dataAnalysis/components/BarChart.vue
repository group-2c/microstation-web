/*
 * @author: zzp
 * @date: 2023-12-11 16:38:57
 * @fileName: BarChart.vue
 * @filePath: src/views/dataAnalysis/components/BarChart.vue
 * @description: 通用柱状图
 */
<template>
  <div class="chart" ref="chartRef" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import * as echarts from "echarts"

const props = defineProps({
  yAxisName: {
    type: String,
    default: ""
  }
})

let barChart = null
const chartRef = ref()

const _initModeChart = (date, array) => {
  barChart.setOption(
    {
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: array.map(x => x.name),
        itemGap: 30,
        top: 30,
        textStyle: {
          color: "#dff6ff"
        }
      },
      grid: {
        top: "13%",
        left: "2%",
        right: "3%",
        bottom: "10%",
        containLabel: true
      },
      toolbox: {
        right: 30,
        top: -5,
        feature: {
          restore: {
            title: "还原"
          },
          saveAsImage: {
            title: "保存为图片",
            backgroundColor: "#081A2A" 
          }
        },
        iconStyle: {
          borderColor: "#dff6ff",
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: "#44668A"
          }
        },
        axisLabel: {
          color: "#dff6ff"
        },
        data: date
      },
      yAxis: {
        type: "value",
        name: props.yAxisName,
        nameTextStyle: {
          padding: [0, 20, 0, 0],
          fontSize: 12,
          color: "#dff6ff",
        },
        axisLabel: {
          color: "#dff6ff"
        },
        splitLine: {
          lineStyle: {
            color: "#44668A"
          }
        }
      },
      series: array.map(item => ({
        type: "bar",
        name: item.name,
        data: item.data
      }))
    },
    true
  )
}

const setChartData = (date = [], array = []) => {
  _initModeChart(date, array)
  setTimeout(_chartResize)
}

const _chartResize = () => {
  barChart && barChart.resize()
}

onMounted(() => {
  barChart = echarts.init(chartRef.value)
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