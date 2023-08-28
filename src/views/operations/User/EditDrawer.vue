<template>
  <a-drawer
    :title="dataCenter.record.id ? '编辑' : '新增'"
    :width="1000"
    :open="dataCenter.visible"
    :closable="false"
    class="editDrawer"
  > 
    <a-form ref="formRef" :model="dataCenter.record" :rules="formRules" :label-col="{ span: 6 }">
      <a-row :gutter="30"> 
        <a-col :span="12">
          <a-form-item label="用户名" name="username">
            <a-input v-model:value="dataCenter.record.username" placeholder="请输入用户名" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="真实姓名" name="realname">
            <a-input v-model:value="dataCenter.record.realname" placeholder="请输入真实姓名" />
          </a-form-item>
        </a-col>
        <div v-if="dataCenter.record.id" style="width: 100%;">
          <a-col :span="12">
            <a-form-item label="修改密码" name="isEditPassword">
              <a-switch v-model:checked="dataCenter.isEditPassword" @change="changeEditPassword"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" />
        </div>
        <a-col v-if="dataCenter.isEditPassword || !dataCenter.record.id" :span="12">
          <a-form-item label="密码" name="password">
            <a-input v-model:value="dataCenter.record.password" type="password" placeholder="请输入密码" />
          </a-form-item>
        </a-col>
        <a-col v-if="dataCenter.isEditPassword || !dataCenter.record.id" :span="12">
          <a-form-item label="重复密码" name="rPassword">
            <a-input v-model:value="dataCenter.record.rPassword" type="password" placeholder="请再次输入密码" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="所属部门" name="department">
            <a-select v-model:value="dataCenter.record.department" popupClassName="modalSelect" placeholder="请选择所属部门">
              <a-select-option v-for="item in dict_departments" :value="item.key" :key="item.key">{{ item.value }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="联系电话" name="telephone">
            <a-input-number v-model:value="dataCenter.record.telephone" :maxlength="11"/>
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
import { dict_departments } from "_utils/dictionary"
import userApi from "_api/user"
import Lodash from "lodash"

const formRules = ref({
  username: [{ required: true, message: "请输入用户名" }],
  realname: [{ required: true, message: "请输入真实姓名" }],
  department: [{ required: true, message: "请选择部门" }]
})

const passwordRule = {
  password: [
    { required: true, message: "请输入密码" },
    { min: 6, message: "不得少于6个字符" },
    { max: 18, message: "不得超出18个字符" }
  ],
  rPassword: [
    { required: true, message: "请再次输入密码" },
    { min: 6, message: "不得少于6个字符" },
    { max: 18, message: "不得超出18个字符" }
  ]
}

const props = defineProps({
  onOk: Function
})

const dataDefault = {
  visible: false,
  loading: false,
  record: {},
  isEditPassword: false,
  departmentList: []
}

const dataCenter = ref(Lodash.cloneDeep(dataDefault))
const formRef = ref()

const handleShow = (item = {}) => {
  Lodash.merge(formRules.value, passwordRule)
  dataCenter.value.visible = true
  dataCenter.value.record = {
    ...Lodash.cloneDeep(item),
    password: ""
  }
}

const _validateForm = callback => {
  formRef.value.validate().then(() => callback()).catch(() => {})
}

const changeEditPassword = status => {
  if(status) {
    if(!formRules.value.password) {
      Lodash.merge(formRules.value, passwordRule)
    }
  } else {
    delete formRules.value.password
    delete formRules.value.rPassword
  }
  delete dataCenter.value.record.rPassword 
  delete dataCenter.value.record.password
}

const handleOk = async () => {
  _validateForm(async () => {
    const { record, isEditPassword } = dataCenter.value

    if((isEditPassword || !record.id) && record.rPassword !== record.password) {
      return message.error("两次密码输入不一致！")
    }

    try {
      dataCenter.value.loading = true
 
      if (!record.id) {
        await userApi.create(record)
        message.success("新增成功！")
      } else {
        await userApi.updateById(record.id, record)
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
  dataCenter.value.visible = false
  formRef.value.resetFields()
  dataCenter.value = Lodash.cloneDeep(dataDefault)
}

defineExpose({ handleShow })
</script>