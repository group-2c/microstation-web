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
          <a-form-item label="模型名称" name="name">
            <a-input v-model:value="dataCenter.record.name" placeholder="请输入模型名称" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="所属微站" name="controllerId">
            <a-select v-model:value="dataCenter.record.controllerId" popupClassName="modalSelect" placeholder="请选择微站">
              <a-select-option v-for="item in dataCenter.controllerList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="模型上传" name="fileName">
            <div class="fileArea">
              <a-input v-show="false" v-model:value="dataCenter.record.fileName" />
              <a-button type="primary" size="small" @click.stop="handleClickUpload">点击上传</a-button>
              <div v-if="dataCenter.record.fileName" class="uploadFileList">
                <span class="tips">{{ dataCenter.record.fileName }}</span>
                <a-button type="primary" size="small" @click.stop="handleClickDownload">下载</a-button>
              </div>
            </div>
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
import { fileBlobSave } from "_utils/function"
import controllerApi from "_api/controller"
import powerMonitoringApi from "_api/powerMonitorings"
import fileApi from "_api/files"
import Lodash from "lodash"

const formRules = {
  name: [{ required: true, message: "请输入模型名称" }],
  controllerId: [{ required: true, message: "请选择所属微站" }],
  fileName: [{ required: true, message: "请上传模型文件" }],
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

const _uploadStart = async data => {
  const loading = message.loading("正在上传...", 0)
  const formData = new FormData()
  formData.append("file", data)
  try {
    const res = await fileApi.fileUpload(formData)
    message.success("上传成功!")
    dataCenter.value.record.fileName = res.fileName
  } catch(err) {
    console.log(err)
    message.error(`上传失败:${err}`)
  } finally {
    setTimeout(loading) 
  }   
}

const handleClickUpload = () => {
  const tempInput = document.createElement("input")
  tempInput.setAttribute("type", "file")
  tempInput.addEventListener("change", e => {
    const file = e.target.files[0]
    _uploadStart(file)
  })
  tempInput.click()
}

const handleClickDownload = async () => {
  const loading = message.loading("正在下载...", 0)
  const { fileName } = dataCenter.value.record
  try {
    const res = await fileApi.fileDownload({ fileName })
    fileBlobSave(res, fileName)
  } catch(err) {
    console.log(err)
    message.error(`下载失败:${err}`)
  } finally {
    setTimeout(loading) 
  }   
}

const handleShow = (item = {}) => {
  dataCenter.value.visible = true
  dataCenter.value.record = Lodash.cloneDeep({ ...item })
  _getControllerList()
}

const _validateForm = callback => {
  formRef.value.validate().then(() => callback()).catch(() => {})
}

const handleOk = async () => {
  _validateForm(async () => {
    const values = { ...dataCenter.value.record }

    try {
      dataCenter.value.loading = true
 
      if (!values.id) {
        await powerMonitoringApi.create(values)
        message.success("新增成功！")
      } else {
        await powerMonitoringApi.updateById(values.id, values)
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

<style lang="less" scoped>
.uploadFileList {
  display: flex;
  padding: 5px;
  border: #3882e1 1px solid;
  border-radius: 5px;
  margin-left: 30px;
  max-width: 300px;
  overflow: hidden;
  flex: none;
  .tips {
    margin-right: 10px;
    width: calc(100% - 10px);
    overflow: hidden;
  }
}

.fileArea {
  display: flex;
}
</style>