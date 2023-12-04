<template>
  <a-drawer
    :title="dataCenter.record.id ? '编辑' : '新增'"
    :width="1000"
    :open="dataCenter.visible"
    :closable="false"
    class="editDrawer"
  > 
    <a-form ref="formRef" :model="dataCenter.record" :label-col="{ span: 6 }">
      <a-row :gutter="30"> 
        <a-col :span="24">
          <a-form-item label="项目名称" name="name" :rules="[{ required: true }]" :label-col="{ span: 3 }" style="margin-left: -5px;">
            <a-input v-model:value="dataCenter.record.name" placeholder="请输入项目名称" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="开始日期" name="startDate" :rules="[{ required: true }]">
            <a-date-picker v-model:value="dataCenter.record.startDate" placeholder="请选择开始日期" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="结束日期" name="endDate" :rules="[{ required: true }]">
            <a-date-picker v-model:value="dataCenter.record.endDate" placeholder="请选择结束日期" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="负责人" name="leader" :rules="[{ required: true }]">
            <a-input v-model:value="dataCenter.record.leader" placeholder="请输入负责人姓名" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="联系电话" name="telephone">
            <a-input-number v-model:value="dataCenter.record.telephone" :maxlength="11"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="公司名称" name="company" :rules="[{ required: true }]">
            <a-input v-model:value="dataCenter.record.company" placeholder="请输入公司名称" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="项目描述" name="description" :label-col="{ span: 3 }" style="margin-left: -5px;">
            <a-textarea v-model:value="dataCenter.record.description" placeholder="请输入项目描述" :rows="4" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <div class="nodeConfig contentContainer">
            <div class="conTitle">项目图纸管理</div>
            <div class="controlBtns">
              <a-button type="primary" size="small" @click.stop="nodeAddRow">添加行</a-button>
            </div>
            <a-table 
              row-key="index"
              :data-source="dataCenter.record.files" 
              :pagination="false"
              size="middle"
            >
              <a-table-column title="序号" data-index="index" width="100px" align="center" />
              <a-table-column title="文件名称" data-index="name">
                <template #default="{ record }">
                  <a-input v-model:value="record.name" placeholder="请输入文件名称" />
                </template>
              </a-table-column>
              <a-table-column title="上传日期" data-index="createAt">
                <template #default="{ record }">
                  {{ record.createAt }}
                </template>
              </a-table-column>   
              <a-table-column title="操作" width="240px" align="center">
                <template #default="{ record }">
                  <a-button
                    v-if="record.fileName"
                    type="primary" 
                    size="small" 
                    @click.stop="handleClickDowload(record.fileName)" 
                    style="margin-right: 20px;"
                  >下载</a-button>
                  <a-button 
                    type="primary" 
                    size="small" 
                    @click.stop="handleClickUpload(record)" 
                    style="margin-right: 20px;"
                  >上传文件</a-button>
                  <a-popconfirm
                    title="是否删除？"
                    ok-text="是"
                    cancel-text="否"
                    @confirm="() => deleteNodeRow(record.index)"
                  >
                    <a-button type="primary" size="small" danger>删除</a-button>
                  </a-popconfirm>
                </template>
              </a-table-column>        
            </a-table>
          </div>
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
import projectsApi from "_api/projects"
import fileApi from "_api/files"
import Lodash from "lodash"
import dayjs from "dayjs"

const props = defineProps({
  onOk: Function
})

const dataDefault = {
  visible: false,
  loading: false,
  record: {
    files: []
  }
}

const dataCenter = ref(Lodash.cloneDeep(dataDefault))
const formRef = ref()

const _uploadStart = async (data, callback) => {
  const loading = message.loading("正在上传...", 0)
  const formData = new FormData()
  formData.append("file", data)
  try {
    const res = await fileApi.fileUpload(formData)
    message.success("上传成功!")
    callback(res)
  } catch(err) {
    console.log(err)
    message.error(`上传失败:${err}`)
  } finally {
    setTimeout(loading) 
  }   
}

const nodeAddRow = () => {
  dataCenter.value.record.files.push({
    index: dataCenter.value.record.files.length + 1,
  })
}

const deleteNodeRow = index => {
   dataCenter.value.record.files.splice((index - 1), 1)
   dataCenter.value.record.files.forEach((item, index) => {
    item.index = index + 1
  })
}

const handleClickUpload = item => {
  const tempInput = document.createElement("input")
  tempInput.setAttribute("type", "file")
  tempInput.setAttribute("accept", "*")
  tempInput.addEventListener("change", e => {
    const file = e.target.files[0]
    _uploadStart(file, data => {
      item.fileName = data.fileName
      item.createAt = dayjs().format("YYYY-MM-DD HH:mm:ss")
    })
  })
  tempInput.click()
}

const handleClickDowload = async fileName => {
  const loading = message.loading("正在下载...", 0)
  try {
    const res = await fileApi.fileDownload({ fileName }, { responseType: "blob" })
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
  dataCenter.value.record = Lodash.cloneDeep({
    ...item,
    files: JSON.parse(item.files || '[]').map((file, index) => {
      file.index = index + 1
      return file
    }),
    startDate: item.startDate ? dayjs(item.startDate) : "",
    endDate: item.endDate ? dayjs(item.endDate) : ""
  })
}

const _validateForm = callback => {
  formRef.value.validate().then(() => callback()).catch(() => {})
}

const handleOk = async () => {
  _validateForm(async () => {
    const { files, startDate, endDate } = dataCenter.value.record
   
    if(files.find(x => !x.name)) {
      return message.warning("请输入文件名！")
    }

    if(files.find(x => !x.fileName)) {
      return message.warning("请上传文件！")
    }

    const values = { 
      ...dataCenter.value.record,
      files: JSON.stringify(files),
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD")
    }

    try {
      dataCenter.value.loading = true
 
      if (!values.id) {
        await projectsApi.create(values)
        message.success("新增成功！")
      } else {
        await projectsApi.updateById(values.id, values)
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
.nodeConfig {
  padding: 20px 0 0 20px;
  .conTitle {
    font-size: 14px;
    font-weight: bold;
    color: #DFF6FE;
    height: 40px;
    display: inline-block;
  }
  .controlBtns {
    margin-bottom: 10px;
    float: right;
  }
}

::v-deep(.ant-switch) {
  background: #23353c;
}
::v-deep(.ant-switch-checked) {
  background: #199cd1 !important;
}

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