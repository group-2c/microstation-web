/*
 * @author: zzp
 * @date: 2023-12-05 14:31:06
 * @fileName: PieChart.vue
 * @filePath: src/views/AlarmManagement/components/PieChart.vue
 * @description: 报警等级分析
 */
<template>
  <div class="chart" ref="chartRef" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import * as echarts from "echarts"

let pieChart = null
const chartRef = ref()

const _initModeChart = data => {
  pieChart.setOption(
    {
      grid: {
        top: 0
      },
      tooltip: {
        trigger: "item",
        formatter: params => (
          `
            <div style="text-align: center;">
              <span style="display: inline-block; width: 10px; height: 10px; background-color: ${params.color}; border-radius: 50%; margin-right: 5px;"> </span>
              ${params.name} ${params.value} (${params.percent}%)
            </div> 
          `
        ),
      },
      legend: {
        bottom: 0,
        textStyle: {
          color: "rgba(255, 255, 255, 0.8)",
        },
      },
      series: [
        {
          type: "pie",
          radius: "50%",
          data,
          label: {
            show: true,
            position: "outside",
            color: "rgba(255, 255, 255, 0.8)",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "16",
              fontWeight: "bold",
            },
          },
        }
      ],
      color: ["#8BC34A", "#FF5722", "#ff9800"],
    },
    true
  )
}

const setChartData = (record = undefined) => {
  _initModeChart(record || [
    { value: 0, name: "普通" },
    { value: 0, name: "严重" },
    { value: 0, name: "事故" }
  ])
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