/*
 * @author: zzp
 * @date: 2023-08-28 11:11:15
 * @fileName: index.vue
 * @filePath: src/components/RealMonitor/index.vue
 * @description: 实时视频组件
 */
<template>
  <h1>实时视频</h1>
  <div class="container">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-list :data-source="props.cameraList" :bordered="true">
          <template #renderItem="{ item }">
            <a-list-item @click="handleCameraItemClick(item.key)">{{
              item.name
            }}</a-list-item>
          </template>
        </a-list>
      </a-col>
      <a-col :span="16">
        <div class="video-container" :class="isFullScreen ? 'fullscreen' : 'normal'">
          <template v-for="item in videoElList" :key="item.key">
            <div class="video-el-wrapper" :class="[
              item.key === currentVideoKey ? 'active' : '',
              videoWrapLayoutClass,
            ]" @click="handleVideoElWrapperClick(item.key)">
              <canvas :ref="x => (canvasRefs[item.key] = x)" class="canvas1" v-show="!item.videoVisible"></canvas>
              <p class="video-loading" v-show="item.loading">
                加载中...
              </p>
              <p class="video-loading" v-show="item.recording">
                录像中...
              </p>
              <video :ref="x => (videoRefs[item.key] = x)" v-show="item.videoVisible"></video>
              <canvas :ref="x => (canvasIvsRefs[item.key] = x)" class="canvas2" width="500" height="300"></canvas>
            </div>
          </template>
        </div>

        <div class="controls">
          <a-space v-if="props.segmentation">
            <span>窗口分割</span>
            <a-radio-group v-model:value="windowNum" @change="handleChangeWindowNum">
              <a-radio-button :value="1">1x1</a-radio-button>
              <a-radio-button :value="2">2x2</a-radio-button>
              <a-radio-button :value="3">3x3</a-radio-button>
              <a-radio-button :value="4">4x4</a-radio-button>
            </a-radio-group>
          </a-space>
          <a-button v-if="props.obtainEvidence" @click="handleAutoRecord" style="margin-left: 10px;">取证</a-button>
        </div>

        <div class="controls">
          <a-space>
            <a-button v-if="props.snapshot" @click="handleSnapshot">抓图</a-button>
            <a-button v-if="props.fullScreen" @click="handleFullScreen">全屏</a-button>
            <a-button v-if="props.startRecord" @click="handleStartRecord">开始录像</a-button>
            <a-button v-if="props.stopRecord" @click="handleStopRecord">停止录像</a-button>
            <span v-show="isRecording">录制中...</span>
          </a-space>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, nextTick } from 'vue'
import { message } from 'ant-design-vue'
import { DownCircleTwoTone } from '@ant-design/icons-vue'

const props = defineProps({
  cameraList: {
    type: Array,
    default: []
  },
  segmentation: {
    type: Boolean,
    default: true
  },
  obtainEvidence: {
    type: Boolean,
    default: true
  },
  snapshot: {
    type: Boolean,
    default: true
  },
  fullScreen: {
    type: Boolean,
    default: true
  },
  startRecord: {
    type: Boolean,
    default: true
  },
  stopRecord: {
    type: Boolean,
    default: true
  },
  windowNumber: {
    type: Number,
    default: 1
  },
  obtainEvidenceUrl: {
    type: String,
    default: ""
  }
})

const videoElList = reactive(
  Array(16)
    .fill(0)
    .map((_, i) => ({
      key: i,
      loading: false,
      cameraKey: null,
      videoVisible: false,
      recording: false,
    }))
)

const videoWrapLayoutClass = computed(() => {
  switch (windowNum.value) {
    case 1:
      return 'layout1'
    case 2:
      return 'layout2'
    case 3:
      return 'layout3'
    case 4:
      return 'layout4'
  }
})

const windowNum = ref(props.windowNumber)
const isFullScreen = ref(document.fullScreen)
const isRecording = ref(false)
const currentVideoKey = ref(null)
const canvasRefs = ref([])
const videoRefs = ref([])
const canvasIvsRefs = ref([])

const playerInstance = []
const recordInstance = []
const ivsInstance = []

// onLogin
const handleCameraItemClick = async key => {
  const camera = props.cameraList.find(x => x.key === key)
  //await onLogout()
  // ??
  setIP(camera.ip + ':' + camera.port)
  _setSession(1)
  onRealPreview(camera)
}

const handleVideoElWrapperClick = key => {
  const videoEl = videoElList.find(x => x.key === key)

  currentVideoKey.value = key

  if (!videoEl?.cameraKey) {
    return
  }

  const camera = props.cameraList.find(x => x.key === videoEl.cameraKey)
  setIP(camera.ip + ':' + camera.port)
}

const handleChangeWindowNum = () => {
  nextTick(() => {
    canvasIvsRefs.value.forEach(el => {
      el.setAttribute('width', el.parentNode.clientWidth)
      el.setAttribute('height', el.parentNode.clientHeight)
    })

    ivsInstance.forEach(x => x?.resize?.())

    handleVideoElWrapperClick(0)
  })
}

const handleAutoRecord = () => {
  fetch(props.obtainEvidenceUrl)
    .then(() => {
      message.success('录制视频成功')
    })
    .catch(err => {
      message.error('录制视频失败, ' + err)
    })
}

const handleSnapshot = () => {
  if (playerInstance[currentVideoKey.value]) {
    playerInstance[currentVideoKey.value].capture('test')
  }
}

const handleFullScreen = async () => {
  if (document.fullScreen) {
    await document.exitFullscreen()
  } else {
    await document.documentElement.requestFullscreen()
  }
}

const handleStartRecord = () => {
  const videoEl = videoElList.find(x => x.key === currentVideoKey.value)
  const camera = props.cameraList.find(x => x.key === videoEl.cameraKey)

  const options = {
    wsURL: 'ws://' + camera.ip + ':' + camera.port + '/rtspoverwebsocket',
    rtspURL:
      'rtsp://' +
      camera.ip +
      ':' +
      camera.port +
      '/cam/realmonitor?channel=1&subtype=0&proto=Private3',
    username: camera.user,
    password: camera.passcode,
    lessRateCanvas: true,
  }
  const player = new PlayerControl(options)
  player.startRecod(true)
  videoEl.recording = true
  isRecording.value = true
  recordInstance[videoEl.key] = player
}

const handleStopRecord = () => {
  const videoEl = videoElList.find(x => x.key === currentVideoKey.value)

  if (recordInstance[currentVideoKey.value]) {
    recordInstance[currentVideoKey.value].startRecod(false)
    recordInstance[currentVideoKey.value] = null
    videoEl.recording = false
    isRecording.value = false
  }
}

const onLogout = async () => {
  const videoEl = videoElList.find(x => x.key === currentVideoKey.value)

  await RPC.Global.logout().then(function () {
    if (playerInstance[currentVideoKey.value]) {
      playerInstance[currentVideoKey.value].stop()
      playerInstance[currentVideoKey.value].close()
      playerInstance[currentVideoKey.value] = null
    }

    if (recordInstance[currentVideoKey.value]) {
      recordInstance[currentVideoKey.value].startRecod(false)
      recordInstance[currentVideoKey.value] = null
    }

    videoEl.loading = true

    pubsub.publish('_clearTime_', currentVideoKey.value)
  })
}

const onRealPreview = camera => {
  if (playerInstance[currentVideoKey.value]) {
    playerInstance[currentVideoKey.value].stop()
    playerInstance[currentVideoKey.value].close()
    playerInstance[currentVideoKey.value] = null
  }

  const videoEl = videoElList.find(x => x.key === currentVideoKey.value)
  videoEl.cameraKey = camera.key
  videoEl.videoVisible = true
  //videoRefs.value[videoEl.key].videoVisible = true

  const options = {
    wsURL: 'ws://' + camera.ip + ':' + camera.port + '/rtspoverwebsocket',
    rtspURL:
      'rtsp://' +
      camera.ip +
      ':' +
      camera.port +
      '/cam/realmonitor?channel=1&subtype=0&proto=Private3',
    username: camera.user,
    password: camera.passcode,
    lessRateCanvas: true,
  }
  console.log(options)
  const player = new PlayerControl(options)
  player.on('MSEResolutionChanged', e => {
    console.log(e)
  })
  player.on('PlayStart', e => {
    console.log(e)
    videoEl.loading = false

    const runningPlayers = playerInstance.filter(x => x).length

    if (
      windowNum.value !== 1 &&
      runningPlayers < windowNum.value * windowNum.value
    ) {
      handleChangeWindowNum(currentVideoKey.value + 1)
    }
  })

  player.on('DecodeStart', e => {
    console.log(e)
    if (e.decodeMode === 'video') {
      videoEl.videoVisible = true
    } else {
      videoEl.videoVisible = false
    }

    const canvasSon = new PluginCanvasES6()

    canvasSon.init(canvasIvsRefs.value[videoEl.key], data => {
      rebackActivateLocalEnlarging(data)
    })
    canvasSon.addChangeShapeEvent()
    playerInstance[videoEl.key] = player
    ivsInstance[videoEl.key] = canvasSon
  })

  player.on('GetFrameRate', function (e) {
    console.log('GetFrameRate: ' + e)
  })
  player.on('FrameTypeChange', function (e) {
    console.log('FrameTypeChange: ' + e)
  })
  player.on('Error', function (e) {
    //console.log('Error: ' + JSON.stringify(e))
  })
  player.on('WorkerReady', function () {
    player.connect()
  })

  // console.log(videoRefs)
  // console.log(videoEl.key)
  console.log(videoRefs.value[videoEl.key])
  player.init(canvasRefs.value[videoEl.key], videoRefs.value[videoEl.key])
  videoEl.loading = true
}

onMounted(() => {
  bindWindowEvents()
})

const bindWindowEvents = () => {
  window.addEventListener('fullscreenchange', () => {
    isFullScreen.value = document.fullscreenElement !== null

    nextTick(() => {
      canvasIvsRefs.value.forEach(el => {
        el.setAttribute('width', el.parentNode.clientWidth)
        el.setAttribute('height', el.parentNode.clientHeight)
      })

      ivsInstance.forEach(x => x?.resize?.())
    })
  })
}
</script>

<style lang="less" scoped>
.video-container {
  &.fullscreen {
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: visible;
    background: #000;
  }

  &.normal {
    position: relative;
    overflow: hidden;
    width: 800px;
    height: 600px;
  }

  .video-el-wrapper {
    float: left;
    background-color: #000;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 1px solid rgb(125, 125, 125);

    &.active {
      border-color: rgb(255, 204, 0);
    }

    &.layout1 {
      width: 100%;
      height: 100%;
      border-color: #000;
    }

    &.layout2 {
      width: calc(50% - 2px);
      height: calc(50% - 2px);
    }

    &.layout3 {
      width: calc(33.333% - 2px);
      height: calc(33.333% - 2px);
    }

    &.layout4 {
      width: calc(25% - 2px);
      height: calc(25% - 2px);
    }

    .canvas1 {
      width: 100%;
      height: 100%;
    }

    .video-loading {
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
    }

    video {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .canvas2 {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}

.controls {
  margin: 8px 0;
}
</style>
