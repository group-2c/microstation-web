/*
 * @author: zzp
 * @date: 2023-12-08 13:01:28
 * @fileName: LineChart.vue
 * @filePath: src/views/dataAnalysis/SteadyCurve/components/LineChart.vue
 * @description: 功率 - 功率因数 分析
 */
<template>
  <div class="chart" ref="chartRef" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import * as echarts from "echarts"

let pieChart = null
const chartRef = ref()

const _initModeChart = (data, date) => {
  pieChart.setOption(
    {
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: data.map(x => x.name),
        itemGap: 30,
        top: -10,
        textStyle: {
          color: "#dff6ff"
        }
      },
      grid: {
        left: "2%",
        right: "3%",
        bottom: "10%",
        containLabel: true
      },
      dataZoom: [
        {
          type: "slider",
          start: 0,
          end: 100,
          xAxisIndex: [0],
          textStyle: {
            color: "#dff6ff"
          }
        },
        {
          type: "slider",
          start: 0,
          end: 100,
          yAxisIndex: [0],
          textStyle: {
            color: "#dff6ff"
          }
        },
        {
          type: "inside",
          start: 0,
          end: 100
        }
      ],
      toolbox: {
        right: 30,
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
        axisLabel: {
          color: "#dff6ff"
        },
        splitLine: {
          lineStyle: {
            color: "#44668A"
          }
        }
      },
      series: data.map(item => ({
        name: item.name,
        type: "line",
        stack: "Total",
        data: item.data
      }))
    },
    true
  )
}

const setChartData = (data = [], date = []) => {
  _initModeChart(data, date)
  setTimeout(_chartResize)
}

const _chartResize = () => {
  pieChart && pieChart.resize()
}

onMounted(() => {
  pieChart = echarts.init(chartRef.value)
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