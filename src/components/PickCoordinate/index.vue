/*
 * @author: zzp
 * @date: 2023-08-25 10:11:04
 * @fileName: index.vue
 * @filePath: src/components/PickCoordinate/index.vue
 * @description: 地图坐标拾取
 */
<template>
  <a-modal
    class="editModal map"
    title="坐标拾取"
    width="100%"
    :open="dataCenter.visible"
    :closable="false"
    centered
    @ok="handleOk"
    @cancel="handleCancel"
  > 
    <div v-if="dataCenter.visible" id="map" ref="mapRef" />
  </a-modal>
</template>

<script setup>
  import { nextTick, ref, inject } from "vue"
  import Constant from "_constant"
  import L from "leaflet"
  import "leaflet/dist/leaflet.css"
  import Lodash from "lodash"

  const getEnvConfig = inject("getEnvConfig")

  const props = defineProps({
    onOk: Function
  })

  const dataDefault = {
    visible: false,
    record: {}
  }

  const dataCenter = ref(Lodash.cloneDeep(dataDefault))
  let map = null, marker = null
  const mapRef = ref()

  const _initMap = () => {
    const { latitude, longitude } = dataCenter.value.record
    const { mapOptions , mapKey } = Constant
    const mapCenter = [getEnvConfig("VUE_APP_MAP_CENTER_LAT"), getEnvConfig("VUE_APP_MAP_CENTER_LON")]
    const mapZoom = getEnvConfig("VUE_APP_MAP_ZOOM")
    map = L.map(mapRef.value, mapOptions).setView([latitude || mapCenter[0], longitude || mapCenter[1]], mapZoom)
      .addLayer(L.tileLayer(`${getEnvConfig("VUE_APP_MAP_URL")}?T=vec_w&x={x}&y={y}&l={z}&tk=${mapKey}`))
      .addLayer(L.tileLayer(`${getEnvConfig("VUE_APP_MAP_URL")}?T=cva_w&x={x}&y={y}&l={z}&tk=${mapKey}`))

    map.on("click", e => {
      if(!marker) {
        _drawMarker(e.latlng.lng, e.latlng.lat)
        dataCenter.value.record.latitude = e.latlng.lat.toFixed(5)
        dataCenter.value.record.longitude = e.latlng.lng.toFixed(5)
      }
    })
  }

  const _drawMarker = (longitude, latitude) => {
    marker = new L.marker([latitude, longitude], { draggable: true })
    marker.addEventListener("dragend", () => {
      const coordinates = marker.getLatLng()
      dataCenter.value.record.latitude = coordinates.lat.toFixed(5)
      dataCenter.value.record.longitude = coordinates.lng.toFixed(5)
    })
    marker.addTo(map)
  }

  const _initCoordinate = () => {
    const { longitude, latitude } = dataCenter.value.record
    if(longitude && latitude) {
      _drawMarker(longitude, latitude)
    }
  }

  const handleShow = (item = {}) => {
    dataCenter.value.visible = true
    dataCenter.value.record = Lodash.cloneDeep(item)
    nextTick(() => {
      _initMap()
      _initCoordinate()
    })
  }

  const handleCancel = () => {
    map = null
    marker = null
    dataCenter.value = Lodash.cloneDeep(dataDefault)
  }

  const handleOk = () => {
    props.onOk(dataCenter.value.record)
    handleCancel()
  }

  defineExpose({ handleShow })
</script>