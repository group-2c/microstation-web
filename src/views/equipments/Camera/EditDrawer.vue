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
          <a-form-item label="IP地址" name="ip" :rules="[{ required: true }]">
            <a-input v-model:value="dataCenter.record.ip" placeholder="请输入IP地址" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="端 口" name="port" :rules="[{ required: true }]">
            <a-input-number v-model:value="dataCenter.record.port" placeholder="请输入端口" :min="1" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="用户名" name="username" :rules="[{ required: true }]">
            <a-input v-model:value="dataCenter.record.username" autocomplete="off" placeholder="请输入用户名" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="密 码" name="password" :rules="[{ required: true }]">
            <a-input v-model:value="dataCenter.record.password" autocomplete="off" placeholder="请输入密码" />
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
          <a-form-item label="类 型" name="type" :rules="[{ required: true }]">
            <a-select v-model:value="dataCenter.record.type" popupClassName="modalSelect" placeholder="请选择类型">
              <a-select-option v-for="item in dict_camera_types" :value="item.key" :key="item.key">{{ item.value }}</a-select-option>
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
import { dict_manufacturers, dict_camera_types } from "_utils/dictionary"
import cameraApi from "_api/camera"
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
        await cameraApi.create(values)
        message.success("新增成功！")
      } else {
        await cameraApi.updateById(values.id, values)
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