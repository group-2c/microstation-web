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
    <a-page-header class="pageHeader" title="实时视频" />
    <div class="contentContainer">
      <div class="videoContainer">
        <div class="leftArea">
          <a-list :data-source="cameraList" :bordered="true">
            <template #header>
              <div>视频列表</div>
              <div class="rightBox">
                <label>窗口数量:</label>
                <a-select v-model:value="videoNumber" @change="generateVideoElItem">
                  <a-select-option :value="1">1个</a-select-option>
                  <a-select-option :value="4">4个</a-select-option>
                  <a-select-option :value="9">9个</a-select-option>
                  <a-select-option :value="16">16个</a-select-option>
                </a-select>
              </div>
            </template>
            <template #renderItem="{ item }">
              <a-list-item 
                :class="currentCamera?.key === item.key ? 'active' : ''"
                @click="cameraListItemClick(item)" 
              >
              <div class="cameraName">
                <span class="icon" />
                <span> {{ item.name }} </span>
              </div>
              <div :class="['status', `status-${item.status}`]">
                <span class="icon" />
                <span>{{ item.status === 0 ? "不可控" : "可控" }}</span>
              </div>
              </a-list-item>
            </template>
          </a-list>
          <div class="videoControls">
            <div class="title">视频区域控制</div>
            <div class="controlsBody">
              <div class="turntable">
                <div class="holder"> 
                  <UpCircleFilled :onmousedown="() => onHandlePTZ('Up', false)" :onmouseup="() => onHandlePTZ('Up', true)" />
                  <LeftCircleFilled :onmousedown="() => onHandlePTZ('Left', false)" :onmouseup="() => onHandlePTZ('Left', true)" />
                  <DownCircleFilled :onmousedown="() => onHandlePTZ('Down', false)" :onmouseup="() => onHandlePTZ('Down', true)" />
                  <RightCircleFilled :onmousedown="() => onHandlePTZ('Right', false)" :onmouseup="() => onHandlePTZ('Right', true)" />
                </div>
              </div>
              <div class="rightControl">
                <div class="buttons">
                  <div class="col">
                    <a-button :icon="h(GroupOutlined)" @click="handleSnapshot" :disabled="videoLoadingNComplete">抓图</a-button>
                    <a-button :icon="h(FullscreenOutlined)" @click="handleFullScreen">全屏</a-button>
                  </div>
                  <div class="col">
                    <a-button :icon="h(AudioOutlined)" @click="handleTalk" :disabled="videoLoadingNComplete">{{ isTalk ? "停止" : "开始"}}对讲</a-button>
                    <a-button :icon="h(VideoCameraOutlined)" @click="handleRecording" :disabled="videoLoadingNComplete">{{ isRecording ? "停止" : "开始"}}录像</a-button>
                  </div>
                </div>
                <div class="slidingBlock">
                  <label>步长控制</label>
                  <a-slider v-model:value="stepNum" :min="1" :max="10" :disabled="videoLoadingNComplete" />
                  <div class="number">{{ stepNum }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div 
          :class="['bearBox', `bearNum-${videoNumber}`, isFullScreen ? 'fullscreen' : '']" 
          style="height: calc(100vh - 244px);"
        >
          <div 
            :class="['videoElItem', item.key === currentVideoKey ? 'active' : '']" 
            v-for="item in videoElList" 
            :key="item.key" 
            @click.stop="videoElWrapperClick(item)"
          >
            <div v-if="!item.loading && item.videoVisible" class="cameraDataTop">{{ cameraList.find(x => x.key === item.cameraKey)?.name }}</div>
            <div v-if="item.loading" class="runningState">加载中...</div>
            <canvas :ref="x => (canvasRefs[item.key] = x)" class="canvas1" v-show="!item.videoVisible" />
            <video :ref="x => (videoRefs[item.key] = x)" v-show="item.videoVisible" />
            <canvas :ref="x => (canvasIvsRefs[item.key] = x)" class="canvas2" width="500" height="300" />
            <div v-if="!item.videoVisible" class="empty">暂无视频</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, h, onMounted, nextTick, computed } from "vue"
  import { GroupOutlined, AudioOutlined, VideoCameraOutlined, FullscreenOutlined } from "@ant-design/icons-vue"
  import Lodash from "lodash"

  const sessions = []
  const playerInstance = []
  const recordInstance = []
  const talkInstance = []
  const ivsInstance = []

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

  const videoLoadingNComplete = computed(() => {
    const videoEl = videoElList.value.find(x => x.key === currentVideoKey.value)
    return (!videoEl?.videoVisible) || videoEl?.loading
  })

  const handleTalk = () => {
    const camera = currentCamera.value
    const videoEl = videoElList.value.find(x => x.key === currentVideoKey.value)

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
    currentCamera.value = camera

    let videoEl = null
    if(currentVideoKey.value || currentVideoKey.value === 0) {
      videoEl = videoElList.value.find(x => x.key === currentVideoKey.value)
    } else {
      currentVideoKey.value = 0
      videoEl = videoElList.value[0]
    }

    videoEl.cameraKey = camera.key
    videoEl.videoVisible = true

    setIP(`${camera.ip}:${camera.port}`)
    _setSession(sessions[camera.key])

    onLogout()
    sessions.forEach((_, i) => sessions[i] = 0)
    onRealPreview()
    onLogin()
  }

  const videoElWrapperClick = item => {
    currentVideoKey.value = item.key
  }

  const onLogout = () => {
    const videoKey = currentVideoKey.value
    const videoEl = videoElList.value.find(x => x.key === videoKey)

    if (playerInstance[videoKey]) {
      playerInstance[videoKey].stop()
      playerInstance[videoKey].close()
      playerInstance[videoKey] = null
    }

    RPC.Global.logout().then(() => {
      videoEl.loading = true
      pubsub.publish("_clearTime_", videoKey)
    })
  }

  const onRealPreview = () => {
    const camera = currentCamera.value
    const videoEl = videoElList.value.find(x => x.key === currentVideoKey.value)

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

  const generateVideoElItem = () => {
    ivsInstanceResize()
    
    const array = Lodash.cloneDeep(videoElList.value.filter(x => x.videoVisible))
    
    videoElList.value = Array(videoNumber.value).fill(0).map((_, i) => {
      const item = array[i]
      return {
        key: i,
        cameraKey: item?.cameraKey || null,
        loading: item?.loading || false,
        recording: item?.recording ||false,
        videoVisible: item?.videoVisible ||false
      }
    })

    currentCamera.value = cameraList.value?.[0] || {}
    currentVideoKey.value = currentCamera.value?.key
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
        status: 0
      },
      {
        key: 1,
        name: "设备109",
        ip: "192.168.31.109",
        port: 80,
        user: "admin",
        passcode: "abc123456",
        status: 1
      },
      {
        key: 2,
        name: "设备107",
        ip: "192.168.31.107",
        port: 80,
        user: "admin",
        passcode: "admin123",
        status: 0
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