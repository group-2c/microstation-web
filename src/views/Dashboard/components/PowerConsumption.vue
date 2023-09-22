/*
 * @author: zzp
 * @date: 2023-09-21 10:11:49
 * @fileName: PowerConsumption.vue
 * @filePath: src/views/Dashboard/components/PowerConsumption.vue
 * @description: 耗电量
 */
<style lang="less" scoped>
 @import url("./index.less");
</style>

<template>
  <div class="powerConsumption">
    <div class="highLevelTitleBar">
      <i class="powerIcon" />
      <span class="chTitle">耗电量</span>
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
            name: "昨天",
            data: dataValue.yesterday,
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
            barWidth: 13,
            barGap: "20%",
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "#1036b073",
              borderRadius: [3, 3, 0, 0]
            }
          },
          {
            name: "今天",
            data: dataValue.today,
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
            barWidth: 13,
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
      {
        id: 1,
        name: "微站设备101",
        yesterday: 10,
        today: 20
      },
      {
        id: 2,
        name: "微站设备201",
        yesterday: 30,
        today: 16
      },
      {
        id: 3,
        name: "微站设备301",
        yesterday: 20,
        today: 8
      },
      {
        id: 4,
        name: "微站设备401",
        yesterday: 10,
        today: 30
      },
      {
        id: 5,
        name: "微站设备501",
        yesterday: 5,
        today: 15
      }
    ]

    const array = {
      xData: [],
      yesterday: [],
      today: [],
    }
    list.forEach(item => {
      array.xData.push(item.name)
      array.yesterday.push(item.yesterday)
      array.today.push(item.today)
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