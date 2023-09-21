/*
 * @author: zzp
 * @date: 2023-08-17 15:45:26
 * @fileName: index.vue
 * @filePath: src/views/Dashboard/index.vue
 * @description: 首页
 */
<style lang="less" scoped>
  @import url("./index.less");
</style>

<template>
  <div class="dashboardBox"> 
    <div class="globalMasking"></div>
    <div id="map" />
    <div class="mapContainers">
      <div class="mapContainerLeft">
        <equipment-status :data="deviceStatus"/>
        <dynamo />
        <equipment-search />
      </div>
      <div class="mapContainerRight">
        <power-consumption />
        <low-pressure />
        <event-information />
      </div>
    </div>
  </div>
</template>


<script setup>
  import { onMounted, ref, inject } from "vue"
  import { message } from "ant-design-vue"
  import { newMarker } from "./map"
  import controllerApi from "_api/controller"
  import EquipmentStatus from "./components/EquipmentStatus.vue"
  import Dynamo from "./components/Dynamo.vue"
  import EquipmentSearch from "./components/EquipmentSearch.vue"
  import PowerConsumption from "./components/PowerConsumption.vue"
  import LowPressure from "./components/LowPressure.vue"
  import EventInformation from "./components/EventInformation.vue"
  
  const routeJump = inject("$routeJump")

  let map = null
  let markerFeatures = []
  let markerInfoWindow = null

  const equipmentList = ref([])
  const deviceStatus = ref({})

  const _initMap = () => {
    map = new T.Map("map", {
      projection: "EPSG:4326",
    })
    map.centerAndZoom(new T.LngLat(118.46489, 39.49825), 13)
    map.setStyle("indigo")
  }

  const _drawEquipmentMarker = (target = undefined, callback = undefined) => {
    markerFeatures.forEach(feature => map.removeOverLay(feature))
    markerFeatures = []

    let feature = null, featureIndex = 0
    
    equipmentList.value.forEach((item, index) => {
      const marker = newMarker({
        iconUrl: new URL("@/assets/images/dashboard/map/equipmentMarker.png", import.meta.url).href,
        data: item,
        iconSize: [125, 74],
        iconAnchor: [55, 70],
      })
      markerFeatures.push(marker)
      map.addOverLay(marker)

      if(target && target.data.id === item.id) {
        feature = marker
        featureIndex = index
      }

      marker.addEventListener("click", e => {
        _markerClick(e.target)
      })
    })

    if(feature && callback) {
      callback(feature, featureIndex)
    }
  }

  const _markerClick = feature => {
    _drawEquipmentMarker(feature, (oldFeature, oldIndex) => {
      map.removeOverLay(oldFeature)
      markerFeatures.splice(oldIndex, 1)

      const marker = newMarker({
        iconUrl: new URL("@/assets/images/dashboard/map/equipmentMarkerSelect.png", import.meta.url).href,
        data: feature.data,
        iconSize: [388, 321],
        iconAnchor: [185, 250],
      })
      markerFeatures.push(marker)
      map.addOverLay(marker)
      _openMarkerWindow(marker)
    })
  }

  const _openMarkerWindow = marker => {
    const data = marker.data
    markerInfoWindow = new T.InfoWindow()
    const content = `
      <div class="tunnelMarkerInfoWindow"> 
        <div>隧道名称：${data.name}</div>
        <div>隧道编号：${data.code}</div>
        <div>隧道长度：${data.length}KM</div>
        <div>通车日期：${data.open_traffic}</div>
      </div>
      <div class="mpWControllBtn">查看隧道</div>
    `
    markerInfoWindow.setContent(content)
    marker.openInfoWindow(markerInfoWindow, { 
      offset: new T.Point(0, 25),
      minWidth: 260,
      closeButton: false
    })

    setTimeout(() => {
      document.querySelector(".mpWControllBtn").addEventListener("click", () => {
        routeJump({ name: "LargeTunnel", query: { id: data.id } })
      })
    }, 500)
  }

  const _getEquipmentlList = async () => {
    try {
      const res = await controllerApi.getAll()
      equipmentList.value = res.data
      _drawEquipmentMarker()
    } catch(err) {
      message.error(`获取设备列表失败: ${err}`)
    }
  }

  const _getDeviceStatus = async () => {
    deviceStatus.value = {
      total: 20,
      online: 10,
      offline: 10,
    }
  }

  onMounted(() => {
    _initMap()
    _getEquipmentlList()
    _getDeviceStatus()
  })
</script>