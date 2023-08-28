/*
 * @author: zzp
 * @date: 2023-08-28 08:54:19
 * @fileName: index.vue
 * @filePath: src/views/RealTimeVideo/index.vue
 * @description: 实时视频
 */
<template>
  <div class="parcel">
    <a-spin :spinning="dataCenter.loading" >
      <a-page-header class="pageHeader" title="实时视频" />
      <div class="contentContainer">
        <real-monitor 
          ref="realMonitorRef"
          :cameraList="dataCenter.cameraList"
          :obtainEvidenceUrl="dataCenter.obtainEvidenceUrl"
        />
      </div>
    </a-spin>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue"
  import RealMonitor from "_components/RealMonitor/index.vue"
  import Lodash from "lodash"

  const obtainEvidenceUrl = encodeURI(
    "rtsp://admin:abc123456@192.168.31.108:554/cam/realmonitor?channel=1&subtype=0"
  )

  const dataDefault = {
    loading: false,
    cameraList: [],
    obtainEvidenceUrl: `/api/video_capture?u=${obtainEvidenceUrl}`
  }

  const dataCenter = ref(Lodash.cloneDeep(dataDefault))

  const _getCameraList = () => {
    dataCenter.value.cameraList = [
      {
        key: 0,
        name: '192.168.31.108',
        ip: '192.168.31.108',
        port: 80,
        user: 'admin',
        passcode: 'abc123456',
      },
      {
        key: 1,
        name: '192.168.31.109',
        ip: '192.168.31.109',
        port: 80,
        user: 'admin',
        passcode: 'abc123456',
      },
    ]
  }

  onMounted(() => {
    _getCameraList()
  })
</script> 