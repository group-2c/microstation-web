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
      top: "12%",
      left: "2%",
      right: "4%",
      bottom: "7%",
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

  if (props.colors) {
    options.color = props.colors
  }
  if (props.dataZoom) {
    const zoomStyles = {
      type: "slider",
      show: true,
      borderColor: "transparent",
      backgroundColor: "#1e3b58",
      handleIcon: "M512 512m-208 0a6.5 6.5 0 1 0 416 0 6.5 6.5 0 1 0-416 0Z M512 192C335.264 192 192 335.264 192 512c0 176.736 143.264 320 320 320s320-143.264 320-320C832 335.264 688.736 192 512 192zM512 800c-159.072 0-288-128.928-288-288 0-159.072 128.928-288 288-288s288 128.928 288 288C800 671.072 671.072 800 512 800z",
      handleColor: "#3f5c79",
      handleSize: 20,
      moveHandleSize: 0,
      moveHandleStyle: {},
      handleStyle: {
        borderColor: "#3f5c79",
        shadowBlur: 4,
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowColor: "#1e3b58"
      },
      textStyle: {
        color: "#bbbbbb"
      },
      start: 0,
      end: 100
    }
    options.dataZoom = [
      {
        xAxisIndex: [0],
        height: 10,
        bottom: 15,
        left: 85,
        right: 85,
        ...zoomStyles
      },
      {
        yAxisIndex: [0],
        width: 10,
        top: 100,
        bottom: 100,
        right: 30,
        ...zoomStyles
      },
      {
        type: "inside"
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