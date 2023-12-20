<template>
  <a-drawer
    :title="dataCenter.record.id ? '编辑' : '新增'"
    :width="600"
    :open="dataCenter.visible"
    :closable="false"
    class="editDrawer"
  > 
    <a-form ref="formRef" :model="dataCenter.record" :label-col="{ span: 5 }">
      <a-row :gutter="30"> 
        <a-col :span="24">
          <a-form-item label="设备名称" name="name" :rules="[{ required: true }]">
            <a-input v-model:value="dataCenter.record.name" placeholder="请输入设备名称" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="设备编号" name="code" :rules="[{ required: true }]">
            <a-input v-model:value="dataCenter.record.code" placeholder="请输入设备编号" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="设备地址" name="slaveId" :rules="[{ required: true }]">
            <a-input-number v-model:value="dataCenter.record.slaveId" placeholder="请输入设备地址" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="波特率" name="baudRate" :rules="[{ required: true }]">
            <a-input-number v-model:value="dataCenter.record.baudRate" placeholder="请输入波特率" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="数据位" name="dataBit" :rules="[{ required: true }]">
            <a-input-number v-model:value="dataCenter.record.dataBit" placeholder="请输入数据位" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="停止位" name="stopBit" :rules="[{ required: true }]">
            <a-input-number v-model:value="dataCenter.record.stopBit" placeholder="请输入停止位" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="校验位" name="parity" :rules="[{ required: true }]">
            <a-input v-model:value="dataCenter.record.parity" placeholder="请输入校验位" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="所属微站" name="controllerId" :rules="[{ required: true }]">
            <a-select v-model:value="dataCenter.record.controllerId" popupClassName="modalSelect" placeholder="请选择微站">
              <a-select-option v-for="item in dataCenter.controllerList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="制造商" name="manufacturer" :rules="[{ required: true }]">
            <a-select v-model:value="dataCenter.record.manufacturer" popupClassName="modalSelect" placeholder="请选择制造商">
              <a-select-option v-for="item in dict_manufacturers" :value="item.key" :key="item.key">{{ item.value }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-button  @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="handleOk" :loading="dataCenter.loading">确定</a-button>
    </template>
  </a-drawer>
</template>

<script setup>
import { ref } from "vue"
import { message } from "ant-design-vue"
import { dict_manufacturers } from "_utils/dictionary"
import dryTemperatureControllerApi from "_api/dryTemperatureController"
import controllerApi from "_api/controller"
import Lodash from "lodash"

const props = defineProps({
  onOk: Function
})

const dataDefault = {
  visible: false,
  loading: false,
  record: {},
  controllerList: []
}

const dataCenter = ref(Lodash.cloneDeep(dataDefault))
const formRef = ref()

const _getControllerList = async () => {
  try {
    const res = await controllerApi.getAll()
    dataCenter.value.controllerList = res.data
  } catch(err) {
    message.error(`获取微站列表失败: ${err}`)
  }
}

const handleShow = (item = {}) => {
  dataCenter.value.visible = true
  dataCenter.value.record = Lodash.cloneDeep(item)
  _getControllerList()
}

const _validateForm = callback => {
  formRef.value.validate().then(() => callback()).catch(() => {})
}

const handleOk = async () => {
  _validateForm(async () => {
    const values = dataCenter.value.record

    try {
      dataCenter.value.loading = true
 
      if (!values.id) {
        await dryTemperatureControllerApi.create(values)
        message.success("新增成功！")
      } else {
        await dryTemperatureControllerApi.updateById(values.id, values)
        message.success("编辑成功！")
      }

      props.onOk()
      handleCancel()
    } catch(err) {
      message.error(`失败: ${err}`)
    } finally {
      dataCenter.value.loading = false
    }
  })
}

const handleCancel = () => {
  formRef.value.resetFields()
  dataCenter.value = Lodash.cloneDeep(dataDefault)
}

defineExpose({ handleShow })
</script>