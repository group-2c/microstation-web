<template>
  <a-drawer
    :title="dataCenter.record.id ? '编辑' : '新增'"
    :width="1000"
    :open="dataCenter.visible"
    :closable="false"
    class="editDrawer"
  > 
    <a-form ref="formRef" :model="dataCenter.record" :rules="formRules" :label-col="{ span: 8 }">
      <a-row :gutter="30"> 
        <a-col :span="12">
          <a-form-item label="设备名称" name="name">
            <a-input v-model:value="dataCenter.record.name" placeholder="请输入设备名称" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="设备地址" name="slave_id">
            <a-input-number v-model:value="dataCenter.record.slave_id" placeholder="请输入设备地址" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="波特率" name="baud_rate">
            <a-input-number v-model:value="dataCenter.record.baud_rate" placeholder="请输入波特率" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="数据位" name="data_bit">
            <a-input-number v-model:value="dataCenter.record.data_bit" placeholder="请输入数据位" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="停止位" name="stop_bit">
            <a-input-number v-model:value="dataCenter.record.stop_bit" placeholder="请输入停止位" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="校验位" name="parity">
            <a-input-number v-model:value="dataCenter.record.parity" placeholder="请输入校验位" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="所属微站" name="controller_code">
            <a-select v-model:value="dataCenter.record.controller_code" popupClassName="modalSelect" placeholder="请选择微站">
              <a-select-option v-for="item in dataCenter.controllerList" :key="item.code" :value="item.code">{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="制造商" name="manufacturer">
            <a-select v-model:value="dataCenter.record.manufacturer" popupClassName="modalSelect" placeholder="请选择制造商">
              <a-select-option v-for="item in dict_controller_manufacturers" :value="item.key" :key="item.key">{{ item.value }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-button style="margin-right: 8px" @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="handleOk">确定</a-button>
    </template>
  </a-drawer>
</template>

<script setup>
import { ref } from "vue"
import { message } from "ant-design-vue"
import { dict_controller_manufacturers } from "_utils/dictionary"
import temperatureEquipmentApi from "_api/temperatureEquipment"
import controllerApi from "_api/controller"
import Lodash from "lodash"

const formRules = {
  name: [{ required: true, message: "请输入设备名称" }],
  slave_id: [{ required: true, message: "请输入设备地址" }],
  baud_rate: [{ required: true, message: "请输入波特率" }],
  data_bit: [{ required: true, message: "请输入数据位" }],
  stop_bit: [{ required: true, message: "请输入停止位" }],
  parity: [{ required: true, message: "请输入校验位" }],
  controller_code: [{ required: true, message: "请选择所属微站" }],
  manufacturer: [{ required: true, message: "请选择制造商" }],
}

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
        await temperatureEquipmentApi.create(values)
        message.success("新增成功！")
      } else {
        await temperatureEquipmentApi.updateById(values.id, values)
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