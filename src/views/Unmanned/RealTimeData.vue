/*
 * @author: zzp
 * @date: 2023-10-26 16:23:26
 * @fileName: RealTimeData.vue
 * @filePath: src/views/Unmanned/RealTimeData.vue
 * @description: 实时数据
 */
<template>
  <a-drawer :title="`${props.currentDevice.name}实时数据`" :width="880" :open="visible" :closable="false" class="editDrawer"> 
    <div class="containerBody">
      <component :is="currentCompoent" :record="record" />
    </div>
    <template #footer>
      <a-button @click="handleCancel">取消</a-button>
    </template>
  </a-drawer>
</template>

<script setup>
import { ref, shallowRef, defineAsyncComponent } from "vue"
import { message } from "ant-design-vue"
import * as mqtt from "mqtt/dist/mqtt"
import Constant from "_constant"
import Lodash from "lodash"

const props = defineProps({
  controllerId: [String, Number],
  currentDevice: Object,
  onCancel: Function
})

let mqttClient = null

const visible = ref(false)
const deviceItem = ref({})
const record = ref({})
const topic = ref("")
const currentCompoent = shallowRef()

const _connectMqtt = () => {
  const { host, port, endpoint } = Constant.mqttOptions
  const connectUrl = `${host}:${port}${endpoint}`
  try {
    mqttClient = mqtt.connect(connectUrl, {...Constant.mqttOptions})
  } catch (error) {
    console.log("mqtt.connect error", error)
  }
  mqttClient.on("connect", () => {
    mqttClient.subscribe(topic.value, { qos: 1 }, err => {
      if (err) {
        console.log("消息订阅失败！")
      }
    })       
  })
  mqttClient.on("error", () => {
    console.log("Connection failed")
  })
  mqttClient.on("message", (_topic, message) => {
    if(_topic === topic.value) {
      const data  = JSON.parse(`${message}`)
      console.log(data)
      record.value = data
    }
  })   
}

const _getHistory = async () => {
  const data = {
    controllerID: props.controllerId,
    deviceType: props.currentDevice.type,
    deviceID: deviceItem.value.id
  }
  try {
    const res = await unmannedApi.getDeviceRealtimeData(data)
    record.value = res || {}
  } catch(err) {
    message.error(`获取详细数据失败: ${err}`)
  }
}

const handleShow = (item = {}) => {
  visible.value = true
  deviceItem.value = item
  const microstation = Lodash.replace(props.currentDevice.topic, "$microstation_id", props.controllerId)
  topic.value = Lodash.replace(microstation, "$equipment_id", deviceItem.value.id)

  if(props.currentDevice.definition) {
    const componentName = Lodash.upperFirst(Lodash.camelCase(props.currentDevice.type))
    currentCompoent.value = defineAsyncComponent(() => import(`@/views/Unmanned/form/${componentName}.vue`))
  }

  _getHistory()
  _connectMqtt()
}

const handleCancel = () => {
  mqttClient && mqttClient.end()
  visible.value = false
}

defineExpose({ handleShow })
</script>