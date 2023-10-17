/*
 * @author: zzp
 * @date: 2023-08-23 10:00:41
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
    <div id="map" ref="mapRef" />
    <div class="mapContainers">
      <div class="mapContainerLeft">
        <equipment-status :data="deviceStatus" />
        <dynamo />
        <equipment-search />
      </div>
      <div class="mapContainerRight">
        <power-consumption />
        <low-pressure />
        <event-information />
      </div>
    </div>
    <a-layout-footer class="layoutFooter">
      <div class="left" :style="`width: ${footerWidth}px`" />
      <div class="center">
        <div class="copyright">版权信息: {{ Constant.appCopyright }}</div>
      </div>
      <div class="right" :style="`width: ${footerWidth}px`" />
    </a-layout-footer>
  </div>
</template>


<script setup>
  import { onMounted, ref, inject } from "vue"
  import { message } from "ant-design-vue"
  import L from "leaflet"
  import "leaflet/dist/leaflet.css"
  import Constant from "_constant"
  import controllerApi from "_api/controller"
  import EquipmentStatus from "./components/EquipmentStatus.vue"
  import Dynamo from "./components/Dynamo.vue"
  import EquipmentSearch from "./components/EquipmentSearch.vue"
  import PowerConsumption from "./components/PowerConsumption.vue"
  import LowPressure from "./components/LowPressure.vue"
  import EventInformation from "./components/EventInformation.vue"
  
  const routeJump = inject("$routeJump")
  let map = null, markerFeatures = []

  const footerWidth = ref(0)
  const equipmentList = ref([])
  const deviceStatus = ref({})
  const openPopupId = ref(undefined)

  const mapRef = ref()

  const _initMap = () => {
    const { mapOptions, mapCenter, mapZoom , mapURL, mapKey } = Constant
    map = L.map(mapRef.value, mapOptions).setView(mapCenter, mapZoom)
      .addLayer(L.tileLayer(`${mapURL}?T=vec_w&x={x}&y={y}&l={z}&tk=${mapKey}`))
      .addLayer(L.tileLayer(`${mapURL}?T=cva_w&x={x}&y={y}&l={z}&tk=${mapKey}`))
  }

  const _drawEquipmentMarker = () => {
    markerFeatures.forEach(marker => marker.remove())
    markerFeatures = []

    equipmentList.value.forEach(item => {
      const coordinates = [item.latitude, item.longitude]
      const marker = L.marker(coordinates, { 
        icon: L.divIcon({
          html: `<div class="equipmentIcon">
            <div class="eqLabel">${item.name}</div>
          </div>`,
          iconAnchor: [55, 70]
        }) 
      })
      marker.data = item

      marker.bindPopup(`
        <div class="wMarkerTop">
          <div class="wMarkerTitle">${item.name}</div>
          <div class="mpWControllBtn">查看</div>
        </div>
        <div class="wMarkerInfoWindow"> 
          <div>微站编号：${item.code}</div>
          <div>微站IP：${item.ip}</div>
          <div>安装日期：${item.installationDate}</div>
        </div>
      `, { closeButton: false, closeOnClick: false, offset: [8, -40] })

      marker.on("click", () => _markerClick(item.id))
      marker.addTo(map)
      markerFeatures.push(marker)
      if(openPopupId.value === item.id) _markerClick(item.id)
    })
  }

  const _markerClick = id => {
    const marker = markerFeatures.find(x => Number(x.data.id) === Number(id))
    openPopupId.value = id

    markerFeatures.forEach(feature => feature.setIcon(
      L.divIcon({
        html: `<div class="equipmentIcon">
          <div class="eqLabel">${feature.data.name}</div>
        </div>`,
        iconAnchor: [55, 70]
      }) 
    ))

    marker.setIcon(
      L.divIcon({ 
        html: `<div class="equipmentIconActive">
          <div class="eqLabel">${marker.data.name}</div>
        </div>`, 
        iconAnchor: [182, 86] 
      }
    ))
    marker.openPopup()
    
    setTimeout(() => {
      document.querySelector(".mpWControllBtn").addEventListener("click", () => {
        // routeJump({ name: "LargeTunnel", query: { id } })
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

  const _computeEdgeScale = () => {
    const centerWidth = document.body.clientWidth - 660
    footerWidth.value = centerWidth / 2
  }

  onMounted(() => {
    _computeEdgeScale()
    window.addEventListener("resize", () => {
      _computeEdgeScale()
    })

    _initMap()
    _getEquipmentlList()
    _getDeviceStatus()
  })
</script>