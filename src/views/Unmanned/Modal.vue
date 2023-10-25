/*
 * @author: zzp
 * @date: 2023-10-20 15:07:51
 * @fileName: Modal.vue
 * @filePath: src/views/Unmanned/Modal.vue
 * @description: 设备实时状态弹窗
 */
<style lang="less" scoped>
 @import url("./index.less");
</style>

<template>
  <a-modal
    class="unmannedModal"
    :title="`${deviceItem.name}详情`"
    :width="900"
    :open="visible"
    :closable="false"
    centered
    @cancel="handleCancel"
  > 
   <div>{{ record.id }}</div>
  </a-modal>
</template>

<script setup>
  import { ref } from "vue"
  import { message } from "ant-design-vue"
  import * as mqtt from "mqtt/dist/mqtt"
  import unmannedApi from "_api/unmanned"
  import Constant from "_constant"

  const props = defineProps({
    controllerId: String,
    currentDevice: Object,
  })

  let mqttClient = null

  const visible = ref(false)
  const deviceItem = ref({})
  const record = ref({})

  const _connectMqtt = () => {
    const { host, port, endpoint, topic } = Constant.mqttOptions
    const connectUrl = `${host}:${port}${endpoint}`
    try {
      mqttClient = mqtt.connect(connectUrl, {...Constant.mqttOptions})
    } catch (error) {
      console.log("mqtt.connect error", error)
    }
    mqttClient.on("connect", () => {
      mqttClient.subscribe(topic, { qos: 1 }, err => {
        if (err) {
          console.log("消息订阅失败！")
        }
      })       
    })
    mqttClient.on("error", () => {
      console.log("Connection failed")
    })
    mqttClient.on("message", (_topic, message) => {
      if(_topic === topic) {
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
    _getHistory()
    _connectMqtt()
  }

  const handleCancel = () => {
    mqttClient && mqttClient.end()
    visible.value = false
  }

  defineExpose({ handleShow })
</script>
