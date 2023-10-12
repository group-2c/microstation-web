<template>
  <a-drawer
    :title="dataCenter.record.id ? '编辑' : '新增'"
    :width="600"
    :open="dataCenter.visible"
    :closable="false"
    class="editDrawer"
  > 
    <a-form ref="formRef" :model="dataCenter.record" :rules="formRules" :label-col="{ span: 5 }">
      <a-row :gutter="30"> 
        <a-col :span="24">
          <a-form-item label="设备名称" name="name">
            <a-input v-model:value="dataCenter.record.name" placeholder="请输入设备名称" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="设备编号" name="code">
            <a-input v-model:value="dataCenter.record.code" placeholder="请输入设备编号" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="设备IP地址" name="ip">
            <a-input v-model:value="dataCenter.record.ip" placeholder="请输入设备IP地址" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="设备型号" name="model">
            <a-select v-model:value="dataCenter.record.model" popupClassName="modalSelect" placeholder="请选择设备型号">
              <a-select-option v-for="item in dict_controller_equipment_model" :value="item.key" :key="item.key">{{ item.value }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="坐标位置" name="coordinates">
            <a-input class="coordinates" v-model:value="dataCenter.record.coordinates" placeholder="点击选择" readonly @click="selectionCoordinate"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="安装位置" name="location">
            <a-input v-model:value="dataCenter.record.location" placeholder="请输入安装位置" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="制造商" name="manufacturer">
            <a-select v-model:value="dataCenter.record.manufacturer" popupClassName="modalSelect" placeholder="请选择制造商">
              <a-select-option v-for="item in dict_manufacturers" :value="item.key" :key="item.key">{{ item.value }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="安装日期" name="installation_date">
            <a-date-picker v-model:value="dataCenter.record.installation_date" placeholder="请选择安装日期" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="维修人员" name="repairer">
            <a-input v-model:value="dataCenter.record.repairer" placeholder="请输入维修人员" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="联系电话" name="telephone">
            <a-input v-model:value="dataCenter.record.telephone" placeholder="请输入联系电话" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-button  @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="handleOk">确定</a-button>
    </template>
  </a-drawer>
  <pick-coordinate ref="pickCoordinateRef" :onOk="pickCoordinateCallback"/>
</template>

<script setup>
import { ref } from "vue"
import { message } from "ant-design-vue"
import { dict_manufacturers, dict_controller_equipment_model } from "_utils/dictionary"
import controllerApi from "_api/controller"
import Lodash from "lodash"
import dayjs from "dayjs"
import PickCoordinate from "_components/PickCoordinate/index.vue"

const formRules = {
  name: [{ required: true, message: "请输入设备名称" }],
  code: [{ required: true, message: "请输入设备编号" }],
  ip: [{ required: true, message: "请输入设备IP地址" }],
  coordinates: [{ required: true, message: "请选择坐标位置" }],
  model: [{ required: true, message: "请选择设备型号" }],
  location: [{ required: true, message: "请输入安装位置" }],
  manufacturer: [{ required: true, message: "请选择制造商" }],
  installation_date: [{ required: true, message: "请选择安装日期" }],
}

const props = defineProps({
  onOk: Function
})

const dataDefault = {
  visible: false,
  loading: false,
  record: {}
}

const dataCenter = ref(Lodash.cloneDeep(dataDefault))
const formRef = ref()
const pickCoordinateRef = ref()

const handleShow = (item = {}) => {
  dataCenter.value.visible = true
  dataCenter.value.record = {
    ...Lodash.cloneDeep(item),
    installation_date: item.installation_date ? dayjs(item.installation_date) : ""
  }
}

const _validateForm = callback => {
  formRef.value.validate().then(() => callback()).catch(() => {})
}

const selectionCoordinate = () => {
  pickCoordinateRef.value.handleShow(dataCenter.value.record)
}

const pickCoordinateCallback = data => {
  dataCenter.value.record.latitude = data.latitude.toString()
  dataCenter.value.record.longitude = data.longitude.toString()
  dataCenter.value.record.coordinates = `${data.longitude},${data.latitude}`
}

const handleOk = async () => {
  _validateForm(async () => {
    const values = Lodash.cloneDeep(dataCenter.value.record)
    values.installation_date = dayjs(values.installation_date).format("YYYY-MM-DD HH:mm:ss")
    try {
      dataCenter.value.loading = true
 
      if (!values.id) {
        await controllerApi.create(values)
        message.success("新增成功！")
      } else {
        await controllerApi.updateById(values.id, values)
        message.success("编辑成功！")
      }
      handleCancel()
      props.onOk()
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

<style lang="less" scoped>
.coordinates {
  cursor: pointer;
}
</style>