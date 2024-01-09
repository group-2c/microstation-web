/*
 * @author: zzp
 * @date: 2023-10-26 16:23:26
 * @fileName: RealTimeData.vue
 * @filePath: src/views/Unmanned/RealTimeData.vue
 * @description: 实时数据
 */
<template>
  <a-drawer :title="`${deviceGroup.name}实时数据`" :width="deviceGroup.drawerWidth || 1000" :open="visible" :closable="false" class="unmannedDrawer"> 
    <div class="containerBody">
      <component 
        :is="currentCompoent"
        :deviceItem="deviceItem"
        :record="record" 
        :publish="publishMqtt" 
      />
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
import unmannedApi from "_api/unmanned"

const props = defineProps({
  deviceGroup: Object,
  onCancel: Function
})

let mqttClient = null

const visible = ref(false)
const deviceItem = ref({})
const record = ref({})
const subscribeKey = ref("")
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
    mqttClient.subscribe(subscribeKey.value, { qos: 1 }, err => {
      if (err) {
        console.log("消息订阅失败！")
      }
    })       
  })

  mqttClient.on("error", () => console.log("Connection failed"))

  mqttClient.on("message", (_key, message) => {
    if(_key === subscribeKey.value) {
      const data = JSON.parse(`${message}`)
      record.value = data
    }
  })   
}

const publishMqtt = (data, keyIndex) => {
  const { controlSubKeys } = deviceItem.value
  const loading = message.loading("正在发送指令...", 0)
  try {
    mqttClient.publish(controlSubKeys[keyIndex], JSON.stringify(data), err => {
      if (err) {
        message.error("指令发送失败: ", err)
      } else {
        message.success("指令发送成功！ ")
      }
      loading()
    })  
  } catch (error) {
    loading()
    console.log(`Publish failed: ${error}`)
  }
}

const _getHistory = async () => {
  const data = {
    controllerID: deviceItem.value.controllerId,
    deviceType: props.deviceGroup.type,
    deviceID: deviceItem.value.id
  }
  try {
    const res = await unmannedApi.getDeviceRealtimeData(data)
    record.value = res || {}
  } catch(err) {
    message.error(`获取详细数据失败: ${err}`)
  }
}

const handleShow = async (item = {}) => {
  const { subKey, controlSubKeys, type } = props.deviceGroup

  visible.value = true
  deviceItem.value = item

  const microstation = Lodash.replace(subKey, "$microstation_id", item.controllerId)
  subscribeKey.value = Lodash.replace(microstation, "$equipment_id", item.id)

  if(controlSubKeys) {
    deviceItem.value.controlSubKeys = controlSubKeys.map(key => {
      const replace1 = Lodash.replace(key, "$microstation_id", item.controllerId)
      return Lodash.replace(replace1, "$equipment_id", item.id)
    })
  }

  const componentName = Lodash.upperFirst(Lodash.camelCase(type))
  currentCompoent.value = defineAsyncComponent(() => import(`@/views/Unmanned/form/${componentName}.vue`))

  await _getHistory()
  _connectMqtt()
}

const handleCancel = () => {
  mqttClient && mqttClient.end()
  visible.value = false
  props.onCancel()
}

defineExpose({ handleShow })
</script>