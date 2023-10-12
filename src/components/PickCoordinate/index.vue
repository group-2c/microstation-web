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
    <div v-if="dataCenter.visible" id="map" />
  </a-modal>
</template>

<script setup>
  import { nextTick, ref } from "vue"
  import Lodash from "lodash"

  const props = defineProps({
    onOk: Function
  })

  const dataDefault = {
    visible: false,
    record: {}
  }

  const dataCenter = ref(Lodash.cloneDeep(dataDefault))
  let map = null, 
  marker = null

  const _initMap = () => {
    const { latitude, longitude } = dataCenter.value.record
    map = new T.Map("map", {
      projection: "EPSG:4326",
    })
    map.centerAndZoom(new T.LngLat(longitude || 118.46489, latitude || 39.49825), 13)

    map.addEventListener("click", e => {
      if(!marker) {
        _drawMarker(e.lnglat.lng, e.lnglat.lat)
        dataCenter.value.record.latitude = e.lnglat.lat
        dataCenter.value.record.longitude = e.lnglat.lng
      }
    })
    map.setStyle("indigo")
  }

  const _drawMarker = (longitude, latitude) => {
    marker = new T.Marker(new T.LngLat(longitude, latitude))
    marker.addEventListener("dragend", e => {
      dataCenter.value.record.latitude = e.lnglat.lat
      dataCenter.value.record.longitude = e.lnglat.lng
    })
    map.addOverLay(marker)
    marker.enableDragging()
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