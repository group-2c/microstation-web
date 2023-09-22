/*
 * @author: zzp
 * @date: 2023-09-21 10:13:10
 * @fileName: LowPressure.vue
 * @filePath: src/views/Dashboard/components/LowPressure.vue
 * @description: 低压电线柜
 */
<style lang="less" scoped>
 @import url("./index.less");
</style>

<template>
  <div class="lowPressure">
    <div class="highLevelTitleBar">
      <i class="lowIcon" />
      <span class="chTitle">低压电线柜电流曲线</span>
    </div>
    <div class="contentBar">
      <div class="chart" ref="chartRef" />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue"
  import * as echarts from "echarts"
  import Lodash from "lodash"

  let lineChart = null

  const upList = ref([])
  const downList = ref([])
  const chartRef = ref()
  const times = ref([])

  const _generateXAxisData = () => {
    const hours = Lodash.range(0, 24)
    return Lodash.map(hours, (hour) => {
      return Lodash.padStart(hour.toString(), 2, "0") + ":00"
    })
  }

  const _initModeChart = () => {
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
              name: "数据1",
              icon: "roundRect",
              itemStyle: {
                color: "#29eafd",
                borderRadius: 5, 
                shadowColor: "#29eafd",
              }
            },
            {
              icon: "roundRect",
              name: "数据2",
              icon: "roundRect",
              itemStyle: {
                color: "#2944FD",
                borderRadius: 5, 
                shadowColor: "#2944FD",
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
          data: times.value,
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
          name: "电流",
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
        series: [
          {
            name: "数据1",
            data: upList.value,
            type: "line",
            symbol: "none",
            smooth: true, 
            lineStyle: {
              color: "#40F4F3",
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#298E97"
                },
                {
                  offset: 1,
                  color: "#0D1C2E"
                }
              ])
            },
          },
          {
            name: "数据2",
            data: downList.value,
            type: "line",
            symbol: "none",
            smooth: true, 
            lineStyle: {
              color: "#2944FD",
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#183C82"
                },
                {
                  offset: 1,
                  color: "#0D1C2E"
                }
              ])
            },
          }
        ]
      },
      true
    )
  }

  const setChartData = () => {
    _initModeChart()
    setTimeout(_chartResize)
  }

  const _chartResize = () => {
    lineChart && lineChart.resize()
  }

  const _getData = () => {
    upList.value = [10, 20, 30, 40, 50, 30, 20, 80, 80, 20, 10, 0, 0, 10, 80, 50, 20, 18, 20, 30, 40, 20, 10, 70]
    downList.value = [20, 30, 10, 20, 40, 70, 30, 10, 60, 30, 20, 10, 20, 50, 60, 30, 15, 20, 20, 30, 40, 20, 10]
    setChartData()
  }

  onMounted(() => {
    times.value = _generateXAxisData()
    lineChart = echarts.init(chartRef.value)
    _getData()

    window.addEventListener("resize", () => {
      _chartResize()
    })
  })

  onBeforeUnmount(() => {
    _chartResize()
  })
</script>