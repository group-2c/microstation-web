/*
 * @author: zzp
 * @date: 2023-12-09 13:40:23
 * @fileName: LineChart.vue
 * @filePath: src/views/dataAnalysis/components/LineChart.vue
 * @description: 通用折线图表
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
  },
  legend: Object,
  grid: Object,
  colors: Array,
  dataZoom: {
    type: Boolean,
    default: true
  },
})

let lineChart = null
const chartRef = ref()

const _initModeChart = (data, date) => {
  const options = {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: data.map(x => x.name),
      itemGap: 30,
      top: 30,
      textStyle: {
        color: "#dff6ff"
      },
      ...props.legend
    },
    grid: props.grid || {
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
    series: data.map(item => ({
      name: item.name,
      type: "line",
      stack: "Total",
      data: item.data
    }))
  }

  if(props.colors) {
    options.color = props.colors
  }
  if(props.dataZoom) {
    options.dataZoom = [
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
    ]
  }

  lineChart.setOption(
    options,
    true
  )
}

const setChartData = (data = [], date = []) => {
  _initModeChart(data, date)
  setTimeout(_chartResize)
}

const _chartResize = () => {
  lineChart && lineChart.resize()
}

onMounted(() => {
  lineChart = echarts.init(chartRef.value)
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