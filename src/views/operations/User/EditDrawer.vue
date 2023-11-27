<template>
  <a-drawer
    :title="dataCenter.record.id ? '编辑' : '新增'"
    :width="500"
    :open="dataCenter.visible"
    :closable="false"
    class="editDrawer"
  > 
    <a-form ref="formRef" :model="dataCenter.record" :rules="formRules" :label-col="{ span: 6 }">
      <a-row :gutter="30"> 
        <a-col :span="24">
          <a-form-item label="用户名" name="username">
            <a-input v-model:value="dataCenter.record.username" placeholder="请输入用户名" :disabled="dataCenter.record.id" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="真实姓名" name="realname">
            <a-input v-model:value="dataCenter.record.realname" placeholder="请输入真实姓名" />
          </a-form-item>
        </a-col>
        <a-col v-if="dataCenter.record.id" :span="24">
          <a-form-item label="修改密码" name="isEditPassword">
            <a-switch v-model:checked="dataCenter.isEditPassword" @change="changeEditPassword"/>
          </a-form-item>
        </a-col>
        <a-col v-if="dataCenter.isEditPassword || !dataCenter.record.id" :span="24">
          <a-form-item label="密码" name="password">
            <a-input class="passwordInput" v-model:value="dataCenter.record.password" autocomplete="off" placeholder="请输入密码" />
          </a-form-item>
        </a-col>
        <a-col v-if="dataCenter.isEditPassword || !dataCenter.record.id" :span="24">
          <a-form-item label="重复密码" name="rPassword">
            <a-input class="passwordInput" v-model:value="dataCenter.record.rPassword" autocomplete="off" placeholder="请再次输入密码" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="组织机构" name="organizationId">
            <a-select v-model:value="dataCenter.record.organizationId" popupClassName="modalSelect" placeholder="请选择组织机构">
              <a-select-option v-for="item in dataCenter.organizationList" :value="item.id" :key="item.id">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="角色" name="roleId">
            <a-select v-model:value="dataCenter.record.roleId" popupClassName="modalSelect" placeholder="请选择角色">
              <a-select-option v-for="item in dataCenter.roleList" :value="item.id" :key="item.id">{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="联系电话" name="telephone">
            <a-input-number v-model:value="dataCenter.record.telephone" :maxlength="11"/>
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
import userApi from "_api/user"
import organizationApi from "_api/organizations"
import roleApi from "_api/roles"
import Lodash from "lodash"

const formRules = ref({
  username: [{ required: true, message: "请输入用户名" }],
  realname: [{ required: true, message: "请输入真实姓名" }],
  organizationId: [{ required: true, message: "请选择组织机构" }],
  roleId: [{ required: true, message: "请选择角色" }],
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
  organizationList: [],
  roleList: []
}

const dataCenter = ref(Lodash.cloneDeep(dataDefault))
const formRef = ref()

const _getOrganizationList = async () => {
  try {
    const res = await organizationApi.getAll()
    dataCenter.value.organizationList = res.data
  } catch(err) {
    message.error(`获取组织机构列表失败: ${err}`)
  }
}

const _getRoleList = async () => {
  try {
    const res = await roleApi.getAll()
    dataCenter.value.roleList = res.data
  } catch(err) {
    message.error(`获取角色列表失败: ${err}`)
  }
}

const handleShow = (item = {}) => {
  Lodash.merge(formRules.value, passwordRule)
  dataCenter.value.visible = true
  dataCenter.value.record = {
    ...Lodash.cloneDeep(item),
    password: ""
  }
  _getOrganizationList()
  _getRoleList()
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

    if(!isEditPassword && record.id) {
      delete dataCenter.value.record.rPassword 
      delete dataCenter.value.record.password
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