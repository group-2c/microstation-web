<template>
  <a-drawer
    :title="dataCenter.record.id ? '编辑' : '新增'"
    :width="600"
    :open="dataCenter.visible"
    :closable="false"
    class="editDrawer"
  > 
    <a-form ref="formRef" :model="dataCenter.record" :rules="formRules" :label-col="{ span: 4 }">
      <a-row :gutter="30"> 
        <a-col :span="24">
          <a-form-item label="名称" name="name">
            <a-input v-model:value="dataCenter.record.name" placeholder="请输入组织机构名称" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-button  @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="handleOk">确定</a-button>
    </template>
  </a-drawer>
</template>

<script setup>
import { ref } from "vue"
import { message } from "ant-design-vue"
import organizationApi from "_api/organizations"
import Lodash from "lodash"

const formRules = {
  name: [{ required: true, message: "请输入组织机构名称" }]
}

const props = defineProps({
  onOk: Function
})

const dataDefault = {
  visible: false,
  loading: false,
  record: {},
  projectList: []
}

const dataCenter = ref(Lodash.cloneDeep(dataDefault))
const formRef = ref()

const handleShow = (item = {}) => {
  dataCenter.value.visible = true
  dataCenter.value.record = { ...Lodash.cloneDeep(item) }
}

const _validateForm = callback => {
  formRef.value.validate().then(() => callback()).catch(() => {})
}

const handleOk = async () => {
  _validateForm(async () => {
    const values = Lodash.cloneDeep(dataCenter.value.record)
    try {
      dataCenter.value.loading = true
 
      if (!values.id) {
        await organizationApi.create(values)
        message.success("新增成功！")
      } else {
        await organizationApi.updateById(values.id, values)
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