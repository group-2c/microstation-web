/*
 * @author: zzp
 * @date: 2023-10-27 16:35:22
 * @fileName: Camera.vue
 * @filePath: src/views/Unmanned/form/Camera.vue
 * @description: 摄像机
 */
<style lang="less" scoped>
  @import url("./index.less");
</style> 
 
<template>
  <div class="cameraBox">
    <div class="blockItem">
      <div class="conTitle">实时数据</div>
      <div class="retract">
        <x-descriptions :list="labelAndFields" :record="deviceItem" :column="2" :minWidth="80" />
      </div>
    </div>
    <div class="blockItem">
      <div class="conTitle">实时视频</div>
      <div class="videoElItem">
        <div v-if="loading" class="runningState">加载中...</div>
        <canvas ref="canvasRef" class="canvas1" v-show="!videoVisible" />
        <video ref="videoRef" v-show="videoVisible" />
        <canvas ref="canvasIvsRef" class="canvas2" width="500" height="300" />
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { ref, onMounted } from "vue"
const props = defineProps({ 
  record: Object,
  deviceItem: Object
})

const labelAndFields = [
  { label: "设备名称", field: "name" },
  { label: "IP地址", field: "ip" },
  { label: "端 口", field: "port" },
  { label: "类 型", field: "typeName" },
  { label: "状 态", field: "statusName" },
]

let playerInstance = {}
let ivsInstance = {}

const loading = ref(false)
const videoVisible = ref(false)
const canvasRef = ref()
const videoRef = ref()
const canvasIvsRef = ref()

const cameraOptions = (camera, subtype = 0) => {
  return {
    wsURL: `ws://${camera.ip}:${camera.port}/rtspoverwebsocket`,
    rtspURL: `rtsp://${camera.ip}:${camera.port}/cam/realmonitor?channel=1&subtype=${subtype}&proto=Private3`,
    username: camera.username,
    password: camera.password,
    lessRateCanvas: true,
    isTalkService: true
  }
}

const _initData = () => {
  videoVisible.value = true

  setIP(`${props.deviceItem.ip}:${props.deviceItem.port}`)
  _setSession(props.deviceItem.id)

  onRealPreview()
}

const onRealPreview = () => {
  const options = cameraOptions(props.deviceItem)
  const player = new PlayerControl(options)

  player.on("PlayStart", () => {
    loading.value = false
  })

  player.on("MSEResolutionChanged", e => {
    console.log(e)
  })

  player.on("DecodeStart", e => {
    videoVisible.value = true

    const canvasSon = new PluginCanvasES6()

    canvasSon.init(canvasIvsRef.value, data => {
      rebackActivateLocalEnlarging(data)
    })
    canvasSon.addChangeShapeEvent()
    playerInstance = player
    ivsInstance = canvasSon
  })

  player.on("GetFrameRate", e => {
    console.log("GetFrameRate: " + e)
  })
  player.on("FrameTypeChange", e => {
    console.log("FrameTypeChange: " + e)
  })
  player.on("Error", e => {
    console.log("Error: " + JSON.stringify(e))
  })
  player.on("WorkerReady", () => {
    player.connect()
  })

  player.init(canvasRef.value, videoRef.value)
  loading.value = true
}

onMounted(() => {
  _initData()
})
</script>