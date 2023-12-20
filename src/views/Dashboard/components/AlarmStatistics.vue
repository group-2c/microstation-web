/*
 * @author: zzp
 * @date: 2023-12-20 14:01:16
 * @fileName: AlarmStatistics.vue
 * @filePath: src/views/Dashboard/components/AlarmStatistics.vue
 * @description: 报警统计
 */
<style lang="less" scoped>
 @import url("./index.less");
</style>

<template>
  <div class="alarmStatistics">
    <div class="highLevelTitleBar">
      <i class="alarmIcon" />
      <span class="chTitle">报警统计信息</span>
    </div>
    <div class="contentBar">
      <div class="chart" ref="chartRef" />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue"
  import * as echarts from "echarts"

  let lineChart = null

  const record = ref({})
  const chartRef = ref()
  const times = ref([])

  const _initModeChart = (days, series) => {
    lineChart.setOption(
      {
        grid: {
          top: 30,
          bottom: 40,
          left: 30,
          right: 15
        },
        legend: {
          top: -2,
          right: 0,
          textStyle: {
            color: "#d1f1fe"
          },
          itemWidth: 11, 
          itemHeight: 3, 
          data: [
            {
              icon: "roundRect",
              name: "报警总数",
              icon: "roundRect",
              itemStyle: {
                color: "#2944FD",
                borderRadius: 5, 
                shadowColor: "#2944FD",
              }
            },
            {
              icon: "roundRect",
              name: "严重报警总数",
              icon: "roundRect",
              itemStyle: {
                color: "#FD2929",
                borderRadius: 5, 
                shadowColor: "#FD2929",
              }
            },
            {
              icon: "roundRect",
              name: "紧急报警总数",
              icon: "roundRect",
              itemStyle: {
                color: "#FD7E29",
                borderRadius: 5, 
                shadowColor: "#FD7E29",
              }
            },
            {
              icon: "roundRect",
              name: "一般报警总数",
              icon: "roundRect",
              itemStyle: {
                color: "#29eafd",
                borderRadius: 5, 
                shadowColor: "#29eafd",
              }
            }
          ],
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: 'cross',
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: days,
          axisLine: {
            lineStyle: {
              color: "#394d67",      
            },
          },
          axisTick: {
            show: true,           
            lineStyle: {
              color: "#394d67",      
            },
          },
          axisLabel: {
            fontSize: 10,
            color: "#ffffff",      
          },
        },
        yAxis: {
          name: "数量",
          nameTextStyle: {
            padding: [0, 20, 0, 0],
            fontSize: 12,
            color: "#ffffff",
          },
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: "#394d67",
              type: "dashed",
            },
          },
          axisLabel: {
            fontSize: 10,
            color: "#ffffff",  
          },
        },
        series
      },
      true
    )
  }

  const setChartData = (record = []) => {
    const days = []
    const series = [
      {
        name: "报警总数",
        data: [],
        type: "line",
        symbol: "none",
        smooth: true, 
        lineStyle: {
          color: "#2944FD",
        },
      },
      {
        name: "严重报警总数",
        data: [],
        type: "line",
        symbol: "none",
        smooth: true, 
        lineStyle: {
          color: "#FD2929",
        },
      },
      {
        name: "紧急报警总数",
        data: [],
        type: "line",
        symbol: "none",
        smooth: true, 
        lineStyle: {
          color: "#FD7E29",
        },
      },
      {
        name: "一般报警总数",
        data: [],
        type: "line",
        symbol: "none",
        smooth: true, 
        lineStyle: {
          color: "#40F4F3",
        },
      }
    ]
    record.forEach(item => {
      series[0].data.push(item.total)
      series[1].data.push(item.serious)
      series[2].data.push(item.urgent)
      series[3].data.push(item.general)
      days.push(item.day)
    })
    _initModeChart(days, series)
    setTimeout(_chartResize)
  }

  const _chartResize = () => {
    lineChart && lineChart.resize()
  }

  const _getData = () => {
    const generatedArray = [
      { day: 1, total: 15, serious: 25, urgent: 10, general: 20 },
      { day: 2, total: 120, serious: 15, urgent: 30, general: 75 },
      { day: 3, total: 18, serious: 40, urgent: 20, general: 30 },
      { day: 4, total: 130, serious: 20, urgent: 15, general: 95 },
      { day: 5, total: 160, serious: 35, urgent: 25, general: 50 },
      { day: 6, total: 140, serious: 10, urgent: 30, general: 100 },
      { day: 7, total: 17, serious: 30, urgent: 20, general: 45 },
      { day: 8, total: 110, serious: 25, urgent: 15, general: 80 },
      { day: 9, total: 190, serious: 15, urgent: 25, general: 35 },
      { day: 10, total: 12, serious: 30, urgent: 10, general: 70 },
      { day: 11, total: 150, serious: 20, urgent: 20, general: 85 },
      { day: 12, total: 13, serious: 25, urgent: 15, general: 60 },
      { day: 13, total: 160, serious: 10, urgent: 25, general: 40 },
      { day: 14, total: 140, serious: 35, urgent: 30, general: 75 },
      { day: 15, total: 18, serious: 15, urgent: 10, general: 50 },
      { day: 16, total: 110, serious: 30, urgent: 20, general: 95 },
      { day: 17, total: 190, serious: 20, urgent: 15, general: 30 },
      { day: 18, total: 120, serious: 25, urgent: 25, general: 65 },
      { day: 19, total: 150, serious: 10, urgent: 10, general: 40 },
      { day: 20, total: 10, serious: 35, urgent: 30, general: 80 },
      { day: 21, total: 16, serious: 15, urgent: 20, general: 55 },
      { day: 22, total: 140, serious: 30, urgent: 15, general: 90 },
      { day: 23, total: 170, serious: 25, urgent: 25, general: 35 },
      { day: 24, total: 110, serious: 20, urgent: 10, general: 70 },
      { day: 25, total: 19, serious: 10, urgent: 30, general: 45 },
      { day: 26, total: 120, serious: 35, urgent: 20, general: 100 },
      { day: 27, total: 150, serious: 15, urgent: 15, general: 25 },
      { day: 28, total: 130, serious: 30, urgent: 25, general: 60 },
      { day: 29, total: 160, serious: 20, urgent: 10, general: 85 },
      { day: 30, total: 14, serious: 25, urgent: 20, general: 70 }
    ]

    setChartData(generatedArray)
  }

  onMounted(() => {
    lineChart = echarts.init(chartRef.value)
    setChartData()
    _getData()

    window.addEventListener("resize", () => {
      _chartResize()
    })
  })

  onBeforeUnmount(() => {
    _chartResize()
  })
</script>