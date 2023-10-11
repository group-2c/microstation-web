/*
 * @author: zzp
 * @date: 2023-08-28 08:54:19
 * @fileName: index.vue
 * @filePath: src/views/RealTimeVideo/index.vue
 * @description: 实时视频
 */

<style lang="less" scoped>
 @import url("./index.less");
</style>

<template>
  <div class="parcel">
    <a-spin :spinning="loading" >
      <a-page-header class="pageHeader" title="实时视频" />
      <div class="contentContainer">
        <div class="videoContainer">
          <a-row :gutter="20">
            <a-col :span="8">
              <a-list :data-source="cameraList" :bordered="true">
                <template #renderItem="{ item }">
                  <a-list-item @click="cameraListItemClick(item)" :class="currentCamera?.key === item.key ? 'active' : ''">{{ item.name }}</a-list-item>
                </template>
              </a-list>
              <div class="videoControls">
                <div class="title">视频区域控制</div>
                <a-row>
                  <a-col :span="12">
                    <div class="controlItem">
                      <label>窗口数量:</label>
                      <div class="content">
                        <a-select v-model:value="videoNumber" @change="generateVideoElItem">
                          <a-select-option :value="1">1个</a-select-option>
                          <a-select-option :value="4">4个</a-select-option>
                          <a-select-option :value="9">9个</a-select-option>
                          <a-select-option :value="16">16个</a-select-option>
                        </a-select>
                      </div>
                    </div>
                  </a-col>
                  <a-col v-if="currentCamera.ip" :span="12">
                    <div class="controlItem">
                      <label>步长:</label>
                      <div class="content">
                        <a-input-number v-model:value="stepNum" :min="1" :max="8" />
                      </div>
                    </div>
                  </a-col>
                </a-row>
                <a-row v-if="currentCamera.ip">
                  <a-col>
                    <div class="controlItem">
                      <label>视频控制:</label>
                      <div class="content">
                        <a-button size="small" @click="handleSnapshot">抓图</a-button>
                        <a-button size="small" @click="handleFullScreen">全屏</a-button>
                        <a-button size="small" @click="handleTalk">{{ isTalk ? "停止" : "开始"}}对讲</a-button>
                        <a-button size="small" @click="handleRecording">{{ isRecording ? "停止" : "开始"}}录像</a-button>
                        <span v-show="isRecording">录制中...</span>
                        <span v-show="isTalk">对讲中...</span>
                      </div>
                    </div>
                  </a-col>
                </a-row>
                <a-row v-if="currentCamera.ip">
                  <div class="controlItem">
                    <label>云台控制:</label>
                  </div>
                  <div class="holder"> 
                    <UpCircleFilled :onmousedown="() => onHandlePTZ('Up', false)" :onmouseup="() => onHandlePTZ('Up', true)" />
                    <LeftCircleFilled :onmousedown="() => onHandlePTZ('Left', false)" :onmouseup="() => onHandlePTZ('Left', true)" />
                    <DownCircleFilled :onmousedown="() => onHandlePTZ('Down', false)" :onmouseup="() => onHandlePTZ('Down', true)" />
                    <RightCircleFilled :onmousedown="() => onHandlePTZ('Right', false)" :onmouseup="() => onHandlePTZ('Right', true)" />
                  </div>
                </a-row>
              </div>
            </a-col>
            <a-col :span="16">
              <div :class="['bearBox', `bearNum-${videoNumber}`, isFullScreen ? 'fullscreen' : '']" style="height: calc(100vh - 260px);">
                <div :class="['videoElItem', item.key === currentVideoKey ? 'active' : '']" v-for="item in videoElList" :key="item.key" @click.stop="videoElWrapperClick(item)">
                  <div v-if="item.loading" class="runningState">加载中...</div>
                  <canvas :ref="x => (canvasRefs[item.key] = x)" class="canvas1" v-show="!item.videoVisible" />
                  <video :ref="x => (videoRefs[item.key] = x)" v-show="item.videoVisible" />
                  <canvas :ref="x => (canvasIvsRefs[item.key] = x)" class="canvas2" width="500" height="300" />
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch, nextTick } from "vue"
  import { UpCircleFilled, LeftCircleFilled, DownCircleFilled, RightCircleFilled } from "@ant-design/icons-vue"

  const sessions = []
  const playerInstance = []
  const recordInstance = []
  const talkInstance = []
  const ivsInstance = []

  const loading = ref(false)
  const cameraList = ref([])
  const videoNumber = ref(4)
  const videoElList = ref([])
  const currentCamera = ref({})
  const currentVideoKey = ref(null)
  const stepNum = ref(1)
  const isRecording = ref(false)
  const isTalk = ref(false)
  const isFullScreen = ref(document.fullScreen)

  const canvasRefs = ref([])
  const videoRefs = ref([])
  const canvasIvsRefs = ref([])

  watch(() => videoNumber.value, () => {
    nextTick(() => {
      ivsInstanceResize()
      videoElWrapperClick(cameraList.value[0])
    })
  })

  const cameraOptions = (camera, subtype = 0) => {
    return {
      wsURL: `ws://${camera.ip}:${camera.port}/rtspoverwebsocket`,
      rtspURL: `rtsp://${camera.ip}:${camera.port}/cam/realmonitor?channel=1&subtype=${subtype}&proto=Private3`,
      username: camera.user,
      password: camera.passcode,
      lessRateCanvas: true,
      isTalkService: true
    }
  }

  const onHandlePTZ = (type, isStop) => {
    const cameraKey = currentCamera.value.key
    console.log("Sessions onHandlePTZ >>>", sessions, cameraKey)
    _setSession(sessions[cameraKey])

    if (!isStop) {
      RPC.PTZManager("start", 1, { 
        code: type, 
        arg1: stepNum.value, 
        arg2: 0, 
        arg3: 0 
      })
    } else {
      RPC.PTZManager("stop", 1, { 
        code: type, 
        arg1: stepNum.value, 
        arg2: 0, 
        arg3: 0 
      })
    }  
  }

  const handleTalk = () => {
    const camera = currentCamera.value
    const videoEl = videoElList.value.find(x => x.key === camera.key)

    if(!isTalk.value) {
      isTalk.value = true
      const options = cameraOptions(camera, 5)
      const talkPlayer = new PlayerControl(options)
      talkPlayer.talk("on")
      talkInstance[videoEl.key] = talkPlayer
    } else {
      isTalk.value = false
      if(talkInstance[videoEl.key]) {
        talkInstance[videoEl.key].talk("off")
        talkInstance[videoEl.key] = null
      }
    }
  }

  const cameraListItemClick = camera => {
    const videoEl = videoElList.value.find(x => x.key === camera.key)

    currentCamera.value = camera

    if(videoEl) {
      currentVideoKey.value = camera.key
      videoEl.cameraKey = camera.key
      videoEl.videoVisible = true
    } else {
      const lastVideoEl =  videoElList.value[videoElList.value.length - 1]
      lastVideoEl.cameraKey = camera.key
      lastVideoEl.videoVisible = true
      currentVideoKey.value = lastVideoEl.key
    }

    setIP(`${camera.ip}:${camera.port}`)
    _setSession(sessions[camera.key])

    onLogout()
    sessions.forEach((_, i) => sessions[i] = 0)
    onRealPreview()
    onLogin()
  }

  const onLogout = () => {
    const cameraKey = currentCamera.value.key
    const videoEl = videoElList.value.find(x => x.key === cameraKey)

    if (playerInstance[cameraKey]) {
      playerInstance[cameraKey].stop()
      playerInstance[cameraKey].close()
      playerInstance[cameraKey] = null
    }

    RPC.Global.logout().then(() => {
      videoEl.loading = true
      pubsub.publish("_clearTime_", cameraKey)
    })
  }

  const onRealPreview = () => {
    const camera = currentCamera.value
    const videoEl = videoElList.value.find(x => x.key === camera.key)

    const options = cameraOptions(camera)
    const player = new PlayerControl(options)

    player.on("PlayStart", () => {
      videoEl.loading = false
    })

    player.on("MSEResolutionChanged", e => {
      console.log(e)
    })

    player.on("DecodeStart", e => {
      videoEl.videoVisible = e.decodeMode === "video" ? true : false

      const canvasSon = new PluginCanvasES6()

      canvasSon.init(canvasIvsRefs.value[videoEl.key], data => {
        rebackActivateLocalEnlarging(data)
      })
      canvasSon.addChangeShapeEvent()
      playerInstance[videoEl.key] = player
      ivsInstance[videoEl.key] = canvasSon
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

    player.init(canvasRefs.value[videoEl.key], videoRefs.value[videoEl.key])
    videoEl.loading = true
  }

  const onLogin = () => {
    const camera = currentCamera.value

    RPC.login(camera.user, camera.passcode, false).then(() => {
      setCookie("DWebClientSessionID", "", -1)
      setCookie("DhWebClientSessionID", "", -1)

      RPC.keepAlive(300, 60000, _getSession(), `${camera.ip}:${camera.port}`, camera.key)
      sessions[camera.key] = _getSession()
      console.log("Sessions after login >>>", sessions)
    }).catch((err) => {
      console.error("RPC.login error: ", err)
    })
  }

  const videoElWrapperClick = item => {
    currentVideoKey.value = item.key

    const videoEl = videoElList.value.find(x => x.key === item.key)
    if (!videoEl?.cameraKey && videoEl.cameraKey !== 0) {
      return
    }

    const camera = cameraList.value.find(x => x.key === videoEl.cameraKey)
    currentCamera.value = camera

    setIP(`${camera.ip}:${camera.port}`)
  }

  const generateVideoElItem = () => {
    videoElList.value = Array(videoNumber.value).fill(0).map((_, i) => ({
      key: i,
      cameraKey: null,
      loading: false,
      recording: false,
      videoVisible: false
    }))
  }

  const handleSnapshot = () => {
    const camera = currentCamera.value
    if (playerInstance[camera.key]) {
      playerInstance[camera.key].capture("videoCapture")
    }
  }

  const handleFullScreen = async () => {
    if (document.fullScreen) {
      await document.exitFullscreen()
    } else {
      await document.documentElement.requestFullscreen()
    }
  }

  const handleRecording = () => {
    const camera = currentCamera.value
    const videoEl = videoElList.value.find(x => x.key === camera.key)

    if(!isRecording.value) {
      videoEl.recording = true
      isRecording.value = true

      const options = cameraOptions(camera)
      const player = new PlayerControl(options)
      player.startRecod(true)

      recordInstance[videoEl.key] = player
    } else {
      videoEl.recording = false
      isRecording.value = false

      if (recordInstance[camera.key]) {
        recordInstance[camera.key].startRecod(false)
        recordInstance[camera.key] = null
      }
    }
  }

  const ivsInstanceResize = () => {
    canvasIvsRefs.value.forEach(el => {
      if(el) {
        el.setAttribute("width", el.parentNode.clientWidth)
        el.setAttribute("height", el.parentNode.clientHeight)
      }
    })
    ivsInstance.forEach(x => x?.resize?.())
  }

  const bindWindowEvents = () => {
    window.addEventListener("fullscreenchange", () => {
      isFullScreen.value = document.fullscreenElement !== null

      nextTick(() => {
        ivsInstanceResize()
      })
    })
  }

  const getCameraList = async () => {
    cameraList.value = [
      {
        key: 0,
        name: "设备108",
        ip: "192.168.31.108",
        port: 80,
        user: "admin",
        passcode: "abc123456",
      },
      {
        key: 1,
        name: "设备109",
        ip: "192.168.31.109",
        port: 80,
        user: "admin",
        passcode: "abc123456",
      },
      {
        key: 2,
        name: "设备107",
        ip: "192.168.31.107",
        port: 80,
        user: "admin",
        passcode: "admin123",
      },
    ]
  }

  const initData = () => {
    generateVideoElItem()
    getCameraList()
  }
  
  onMounted(() => {
    initData()
    bindWindowEvents()
  })
</script> 