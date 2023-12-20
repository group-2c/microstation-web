/*
 * @author: zzp
 * @date: 2023-09-21 10:11:49
 * @fileName: PowerConsumption.vue
 * @filePath: src/views/Dashboard/components/PowerConsumption.vue
 * @description: 能耗统计
 */
<style lang="less" scoped>
 @import url("./index.less");
</style>

<template>
  <div class="powerConsumption">
    <div class="highLevelTitleBar">
      <i class="powerIcon" />
      <span class="chTitle">能耗统计</span>
    </div>
    <div class="contentBar">
      <div class="chart" ref="chartRef" />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue"
  import * as echarts from "echarts"

  let barChart = null

  const chartRef = ref()

  const _initModeChart = (dataValue) => {
    barChart.setOption(
      {
        grid: {
          top: 40,
          bottom: 35,
          left: 25,
          right: 10
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          top: 0,
          right: 10,
          textStyle: {
            color: "#D1F1FE"
          },
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#112645"
            },
          },
          axisTick: {
            show: false
          },
          data: dataValue.xData,
          axisLabel: {
            fontSize: 12,
            color: "#F3F8FF",
            formatter: value => {
              if (value.length > 4) {
                return value.slice(0, 4) + '\n' + value.slice(4)
              } else {
                return value
              }
            }
          },
        },
        yAxis: {
          type: "value",
          name: "耗电量",
          nameTextStyle: {
            padding: [0, 13, 10, 0],
            fontSize: 12,
            color: "#F3F8FF",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#112645",
            },
          },
          axisLabel: {
            fontSize: 12,
            color: "#F3F8FF",
          },
        },
        series: [
          {
            name: "总能耗",
            data: dataValue.total,
            itemStyle: { 
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#006DFF"
                },
                {
                  offset: 1,
                  color: "#1036b078"
                }
              ]),
              borderRadius: [3, 3, 0, 0]
            },
            barWidth: 8,
            barGap: "20%",
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "#1036b073",
              borderRadius: [3, 3, 0, 0]
            }
          },
          {
            name: "通风",
            data: dataValue.ventilation,
            itemStyle: { 
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00FFD4"
                },
                {
                  offset: 0.9,
                  color: "#00ffd433"
                },
                {
                  offset: 1,
                  color: "#1036b078"
                }
              ]),
              borderRadius: [3, 3, 0, 0]
            },
            barWidth: 8,
            barGap: "20%",
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "#1036b073",
              borderRadius: [3, 3, 0, 0]
            }
          },
          {
            name: "照明能耗",
            data: dataValue.illumination,
            itemStyle: { 
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#78E0FB"
                },
                {
                  offset: 0.9,
                  color: "#79e1fb33"
                },
                {
                  offset: 1,
                  color: "#1036b078"
                }
              ]),
              borderRadius: [3, 3, 0, 0]
            },
            barWidth: 8,
            barGap: "20%",
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "#1036b073",
              borderRadius: [3, 3, 0, 0]
            }
          }
        ]
      },
      true
    )
  }

  const setChartData = (record = {}) => {
    _initModeChart(record)
    setTimeout(_chartResize)
  }

  const _chartResize = () => {
    barChart && barChart.resize()
  }

  const _getData = () => {
    const list = [
      { id: 1, month: 1, ventilation: 10, illumination: 25, total: 70 },
      { id: 2, month: 2, ventilation: 20, illumination: 29, total: 10 },
      { id: 3, month: 3, ventilation: 15, illumination: 20, total: 30 },
      { id: 4, month: 4, ventilation: 30, illumination: 15, total: 20 },
      { id: 5, month: 5, ventilation: 52, illumination: 66, total: 50 },
      { id: 6, month: 6, ventilation: 33, illumination: 10, total: 40 },
      { id: 7, month: 7, ventilation: 20, illumination: 47, total: 20 },
      { id: 8, month: 8, ventilation: 15, illumination: 29, total: 90 },
      { id: 9, month: 9, ventilation: 46, illumination: 18, total: 25 },
      { id: 10, month: 10, ventilation: 27, illumination: 55, total: 64 },
      { id: 11, month: 11, ventilation: 84, illumination: 41, total: 25 },
      { id: 12, month: 12, ventilation: 62, illumination: 69, total: 19 },
    ]

    const array = {
      xData: [],
      ventilation: [],
      illumination: [],
      total: []
    }
    list.forEach(item => {
      array.xData.push(item.month)
      array.ventilation.push(item.ventilation)
      array.illumination.push(item.illumination)
      array.total.push(item.total)
    })
    setChartData(array)
  }

  onMounted(() => {
    barChart = echarts.init(chartRef.value)
    setChartData({ xData: [], yesterday: [], today: [] })
    _getData()

    window.addEventListener("resize", () => {
      _chartResize()
    })
  })

  onBeforeUnmount(() => {
    _chartResize()
  }) 
</script>