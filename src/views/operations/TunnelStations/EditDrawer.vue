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
          <a-form-item label="隧管站名称" name="name" :rules="[{ required: true }]">
            <a-input v-model:value="dataCenter.record.name" placeholder="请输入隧管站名称" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="隧管站编号" name="code" :rules="[{ required: true }]">
            <a-input v-model:value="dataCenter.record.code" placeholder="请输入隧管站编号" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="开通日期" name="startDate" :rules="[{ required: true }]">
            <a-date-picker v-model:value="dataCenter.record.startDate" placeholder="请选择开通日期" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="备注信息" name="description">
            <a-input v-model:value="dataCenter.record.description" placeholder="请输入备注信息" />
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
import tunnelStationsApi from "_api/tunnelStations"
import Lodash from "lodash"
import dayjs from "dayjs"

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

const handleShow = (item = {}) => {
  dataCenter.value.visible = true
  dataCenter.value.record = {
    ...Lodash.cloneDeep(item),
    startDate: item.startDate ? dayjs(item.startDate) : ""
  }
}

const _validateForm = callback => {
  formRef.value.validate().then(() => callback()).catch(() => {})
}

const handleOk = async () => {
  _validateForm(async () => {
    const values = Lodash.cloneDeep(dataCenter.value.record)
    values.startDate = (values.startDate).format("YYYY-MM-DD")

    try {
      dataCenter.value.loading = true
 
      if (!values.id) {
        await tunnelStationsApi.create(values)
        message.success("新增成功！")
      } else {
        await tunnelStationsApi.updateById(values.id, values)
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