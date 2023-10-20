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
                <svg v-if="currentCamera.status === 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="144" height="144" viewBox="0 0 144 144">
                  <defs>
                    <clipPath id="clip-path">
                      <path id="减去_101" data-name="减去 101" d="M72,144A72.018,72.018,0,0,1,43.977,5.658a72.019,72.019,0,0,1,56.052,132.684A71.557,71.557,0,0,1,72,144ZM72,42.843A29.158,29.158,0,1,0,101.157,72,29.192,29.192,0,0,0,72,42.843Z" transform="translate(-0.4 -0.4)" fill="#28467b" stroke="#388cff" stroke-width="1"/>
                    </clipPath>
                  </defs>
                  <g id="组_6506" data-name="组 6506" transform="translate(-421.601 -820.6)">
                    <path id="减去_100" data-name="减去 100" d="M72,144A72.018,72.018,0,0,1,43.977,5.658a72.019,72.019,0,0,1,56.052,132.684A71.557,71.557,0,0,1,72,144ZM72,42.843A29.158,29.158,0,1,0,101.157,72,29.192,29.192,0,0,0,72,42.843Z" transform="translate(421.6 820.6)" fill="#28467b"/>
                    <path id="减去_100_-_轮廓" data-name="减去 100 - 轮廓" d="M72,143A71.019,71.019,0,0,0,99.639,6.579,71.019,71.019,0,0,0,44.366,137.421,70.562,70.562,0,0,0,72,143M72,41.843A30.158,30.158,0,1,1,41.844,72,30.19,30.19,0,0,1,72,41.843M72,144A72.018,72.018,0,0,1,43.977,5.658a72.019,72.019,0,0,1,56.052,132.684A71.557,71.557,0,0,1,72,144ZM72,42.843A29.158,29.158,0,1,0,101.157,72,29.192,29.192,0,0,0,72,42.843Z" transform="translate(421.6 820.6)" fill="#388cff"/>
                    <g id="蒙版组_7" data-name="蒙版组 7" transform="translate(422 821)" clip-path="url(#clip-path)">
                      <path id="直线_745" data-name="直线 745" d="M111.67,112.377-.354.354.354-.354,112.377,111.67Z" transform="translate(16.089 16.089)" fill="#388cff"/>
                      <path id="直线_746" data-name="直线 746" d="M.354,113.569l-.707-.707L112.862-.354l.707.707Z" transform="translate(16.089 14.897)" fill="#388cff"/>
                    </g>
                    <circle id="椭圆_293" data-name="椭圆 293" cx="31" cy="31" r="31" transform="translate(462.6 861.6)" fill="#263c66"/>
                    <path id="椭圆_293_-_轮廓" data-name="椭圆 293 - 轮廓" d="M31,1A30.008,30.008,0,0,0,19.323,58.643,30.008,30.008,0,0,0,42.677,3.357,29.811,29.811,0,0,0,31,1m0-1A31,31,0,1,1,0,31,31,31,0,0,1,31,0Z" transform="translate(462.6 861.6)" fill="#388cff"/>
                    <path id="多边形_54" data-name="多边形 54" d="M7.148,1.384a1,1,0,0,1,1.7,0l6.21,10.092A1,1,0,0,1,14.21,13H1.79a1,1,0,0,1-.852-1.524Z" transform="translate(485.601 835.601)" fill="#fff" class="runningStateFill" :onmousedown="() => onHandlePTZ('Up', false)" :onmouseup="() => onHandlePTZ('Up', true)" />
                    <path id="多边形_55" data-name="多边形 55" d="M7.148,1.384a1,1,0,0,1,1.7,0l6.21,10.092A1,1,0,0,1,14.21,13H1.79a1,1,0,0,1-.852-1.524Z" transform="translate(501.6 948.6) rotate(180)" fill="#fff" class="runningStateFill" :onmousedown="() => onHandlePTZ('Down', false)" :onmouseup="() => onHandlePTZ('Down', true)" />
                    <path id="多边形_56" data-name="多边形 56" d="M7.5,1.326a1,1,0,0,1,1.687,0l6.521,10.247a1,1,0,0,1-.844,1.537H1.822a1,1,0,0,1-.844-1.537Z" transform="translate(437.493 901.442) rotate(-90)" fill="#fff" class="runningStateFill" :onmousedown="() => onHandlePTZ('Left', false)" :onmouseup="() => onHandlePTZ('Left', true)" />
                    <path id="多边形_57" data-name="多边形 57" d="M7.5,1.326a1,1,0,0,1,1.687,0l6.521,10.247a1,1,0,0,1-.844,1.537H1.822a1,1,0,0,1-.844-1.537Z" transform="translate(549.517 884.758) rotate(90)" fill="#fff" class="runningStateFill" :onmousedown="() => onHandlePTZ('Right', false)" :onmouseup="() => onHandlePTZ('Right', true)" />
                  </g>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="144" height="144" viewBox="0 0 144 144">
                  <defs>
                    <clipPath id="clip-path">
                      <path id="减去_101" data-name="减去 101" d="M72,144A72.018,72.018,0,0,1,43.977,5.658a72.019,72.019,0,0,1,56.052,132.684A71.557,71.557,0,0,1,72,144ZM72,42.843A29.158,29.158,0,1,0,101.157,72,29.192,29.192,0,0,0,72,42.843Z" transform="translate(-0.4 -0.4)" fill="#28467b" stroke="#666" stroke-width="1"/>
                    </clipPath>
                  </defs>
                  <g id="组_65062" data-name="组 65062" transform="translate(-421.601 -820.6)">
                    <g id="减去_100" data-name="减去 100" opacity="0.57">
                      <path id="减去_100-2" data-name="减去 100" d="M72,144A72.018,72.018,0,0,1,43.977,5.658a72.019,72.019,0,0,1,56.052,132.684A71.557,71.557,0,0,1,72,144ZM72,42.843A29.158,29.158,0,1,0,101.157,72,29.192,29.192,0,0,0,72,42.843Z" transform="translate(421.6 820.6)" fill="#393939"/>
                      <path id="减去_100_-_轮廓" data-name="减去 100 - 轮廓" d="M72,143A71.019,71.019,0,0,0,99.639,6.579,71.019,71.019,0,0,0,44.366,137.421,70.562,70.562,0,0,0,72,143M72,41.843A30.158,30.158,0,1,1,41.844,72,30.19,30.19,0,0,1,72,41.843M72,144A72.018,72.018,0,0,1,43.977,5.658a72.019,72.019,0,0,1,56.052,132.684A71.557,71.557,0,0,1,72,144ZM72,42.843A29.158,29.158,0,1,0,101.157,72,29.192,29.192,0,0,0,72,42.843Z" transform="translate(421.6 820.6)" fill="#545657"/>
                    </g>
                    <g id="蒙版组_7" data-name="蒙版组 7" transform="translate(422 821)" opacity="0.3" clip-path="url(#clip-path)">
                      <path id="直线_745" data-name="直线 745" d="M111.67,112.377-.354.354.354-.354,112.377,111.67Z" transform="translate(16.089 16.089)" fill="#666"/>
                      <path id="直线_746" data-name="直线 746" d="M.354,113.569l-.707-.707L112.862-.354l.707.707Z" transform="translate(16.089 14.897)" fill="#666"/>
                    </g>
                    <g id="椭圆_293" data-name="椭圆 293" opacity="0.3">
                      <circle id="椭圆_293-2" data-name="椭圆 293" cx="31" cy="31" r="31" transform="translate(462.6 861.6)" fill="#2a2a2a"/>
                      <path id="椭圆_293_-_轮廓" data-name="椭圆 293 - 轮廓" d="M31,1A30.008,30.008,0,0,0,19.323,58.643,30.008,30.008,0,0,0,42.677,3.357,29.811,29.811,0,0,0,31,1m0-1A31,31,0,1,1,0,31,31,31,0,0,1,31,0Z" transform="translate(462.6 861.6)" fill="#7c7c7c"/>
                    </g>
                    <path id="多边形_54" data-name="多边形 54" d="M7.148,1.384a1,1,0,0,1,1.7,0l6.21,10.092A1,1,0,0,1,14.21,13H1.79a1,1,0,0,1-.852-1.524Z" transform="translate(485.601 835.601)" fill="#7c7c7c" opacity="0.3"/>
                    <path id="多边形_55" data-name="多边形 55" d="M7.148,1.384a1,1,0,0,1,1.7,0l6.21,10.092A1,1,0,0,1,14.21,13H1.79a1,1,0,0,1-.852-1.524Z" transform="translate(501.6 948.6) rotate(180)" fill="#7c7c7c" opacity="0.3"/>
                    <path id="多边形_56" data-name="多边形 56" d="M7.5,1.326a1,1,0,0,1,1.687,0l6.521,10.247a1,1,0,0,1-.844,1.537H1.822a1,1,0,0,1-.844-1.537Z" transform="translate(437.493 901.442) rotate(-90)" fill="#7c7c7c" opacity="0.3"/>
                    <path id="多边形_57" data-name="多边形 57" d="M7.5,1.326a1,1,0,0,1,1.687,0l6.521,10.247a1,1,0,0,1-.844,1.537H1.822a1,1,0,0,1-.844-1.537Z" transform="translate(549.517 884.758) rotate(90)" fill="#7c7c7c" opacity="0.3"/>
                  </g>
                </svg>
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
            <div v-if="!item.videoVisible" class="empty" />
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
    if(item.cameraKey || item.cameraKey === 0) {
      currentCamera.value = cameraList.value.find(x => x.key === item.cameraKey)
    }
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