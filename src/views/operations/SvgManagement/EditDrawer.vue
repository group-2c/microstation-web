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
          <a-form-item label="配电图名称" name="name">
            <a-input v-model:value="dataCenter.record.name" placeholder="请输入配电图名称" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="所属微站" name="controllerId">
            <a-select v-model:value="dataCenter.record.controllerId" popupClassName="modalSelect" placeholder="请选择微站" @change="controllerChange">
              <a-select-option v-for="item in dataCenter.controllerList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="SVG上传" name="fileName">
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
        <a-col v-if="dataCenter.record.controllerId" :span="24">
          <div class="nodeConfig contentContainer">
            <div class="conTitle">绑定节点配置</div>
            <div class="controlBtns">
              <a-button type="primary" size="small" @click.stop="nodeAddRow">添加行</a-button>
            </div>
            <a-table 
              row-key="index"
              :data-source="dataCenter.record.nodeList" 
              :pagination="false"
              size="middle"
            >
              <a-table-column title="序号" data-index="index" width="100px" align="center" />
              <a-table-column title="设备类型" data-index="deviceType">
                <template #default="{ record }">
                  <a-select 
                    v-model:value="record.deviceType" 
                    popupClassName="modalSelect" 
                    placeholder="请选择设备类型"
                    @change="() => deviceTypeChange(record)"
                  >
                    <a-select-option v-for="item in dict_svg_device_types" :value="item.key" :key="item.key">{{ item.value }}</a-select-option>
                  </a-select>
                </template>
              </a-table-column>
              <a-table-column title="所属设备" data-index="deviceId">
                <template #default="{ record }">
                  <a-select
                    v-if="!record._initStatus"
                    v-model:value="record.deviceId" 
                    popupClassName="modalSelect" 
                    placeholder="请选择设备" 
                    @change="() => deviceIdChange(record)"
                  >
                    <a-select-option v-for="item in dataCenter.record.deviceList" :value="item.id" :key="item.id">{{ item.name }}</a-select-option>
                  </a-select>
                  <div v-else>{{ record.deviceName }}</div>
                </template>
              </a-table-column>
              <a-table-column title="节点ID" data-index="dom_node_id">
                <template #default="{ record }">
                  <a-input v-model:value="record.dom_node_id" placeholder="请输入对应的节点ID" />
                </template>
              </a-table-column>
              <a-table-column title="默认开关状态" data-index="switch" width="120px" align="center">
                <template #default="{ record }">
                  <a-switch 
                    v-model:checked="record.switch"
                    checkedValue="1"
                    unCheckedValue="0"
                    checked-children="开启" 
                    un-checked-children="闭合" 
                  />
                </template>
              </a-table-column>       
              <a-table-column title="操作" width="80px" align="center">
                <template #default="{ record }">
                  <a-button type="primary" size="small" danger @click.stop="deleteNodeRow(record.index)">删除</a-button>
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
import { dict_svg_device_types } from "_utils/dictionary"
import controllerApi from "_api/controller"
import svgManagementApi from "_api/svgManagement"
import Lodash from "lodash"

const formRules = {
  name: [{ required: true, message: "请输入设备名称" }],
  controllerId: [{ required: true, message: "请选择所属微站" }],
  fileName: [{ required: true, message: "请上传SVG图片" }],
}

const props = defineProps({
  onOk: Function
})

const dataDefault = {
  visible: false,
  loading: false,
  record: {
    nodeList: []
  },
  controllerList: [],
  deviceList: []
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
    const res = await svgManagementApi.svgFileUpload(formData)
    message.success("上传成功!")
    dataCenter.value.record.fileName = res.fileName
  } catch(err) {
    console.log(err)
    message.error(`上传失败:${err}`)
  } finally {
    setTimeout(loading) 
  }   
}

const nodeAddRow = () => {
  dataCenter.value.record.nodeList.push({
    index:  dataCenter.value.record.nodeList.length + 1,
    dom_node_id: "",
    switch: "0"
  })
}

const deleteNodeRow = index => {
   dataCenter.value.record.nodeList.splice((index - 1), 1)
   dataCenter.value.record.nodeList.forEach((item, index) => {
    item.index = index + 1
  })
}

const controllerChange = () => {
  dataCenter.value.record.nodeList = []
}

const deviceTypeChange = async item => {
  dataCenter.value.record.deviceList = []
  delete item.deviceId
  delete item._initStatus
  const loading = message.loading("获取设备列表...", 0)
  try {
    const res = await controllerApi.getDeviceByDeviceType({
      deviceType: item.deviceType,
      controllerID: dataCenter.value.record.controllerId
    })
    dataCenter.value.record.deviceList = res
  } catch(err) {
    console.log(err)
    message.error(`获取设备列表失败:${err}`)
  } finally {
    setTimeout(loading) 
  }  
}

const deviceIdChange = item => {
  const data = dataCenter.value.record.deviceList.find(x => x.id === item.deviceId)
  item.deviceName = data.name
}

const handleClickUpload = () => {
  const tempInput = document.createElement("input")
  tempInput.setAttribute("type", "file")
  tempInput.setAttribute("accept", ".svg")
  tempInput.addEventListener("change", e => {
    const file = e.target.files[0]
    _uploadStart(file)
  })
  tempInput.click()
}

const handleClickDownload = async () => {
  const loading = message.loading("正在下载...", 0)
  try {
    const res = await svgManagementApi.svgFileDownload(dataCenter.value.record.fileName)
    let url = window.URL.createObjectURL(new Blob([res]))
    let link = document.createElement("a")
    link.style.display = "none"
    link.href = url
    link.setAttribute("download", dataCenter.value.record.fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch(err) {
    console.log(err)
    message.error(`下载失败:${err}`)
  } finally {
    setTimeout(loading) 
  }   
}

const handleShow = (item = {}) => {
  if(item.id) {
    item.nodeList.forEach(item => {
      item._initStatus = true
    })
  }

  dataCenter.value.visible = true
  dataCenter.value.record = Lodash.cloneDeep({
    ...item,
    nodeList: item.nodeList || []
  })
  _getControllerList()
}

const _validateForm = callback => {
  formRef.value.validate().then(() => callback()).catch(() => {})
}

const handleOk = async () => {
  _validateForm(async () => {
    const { nodeList } = dataCenter.value.record
    if(nodeList.length === 0) {
      return message.error("请配置节点！")
    }
    const values = { 
      ...dataCenter.value.record,
      nodeList: JSON.stringify(nodeList)
    }

    try {
      dataCenter.value.loading = true
 
      if (!values.id) {
        await svgManagementApi.create(values)
        message.success("新增成功！")
      } else {
        await svgManagementApi.updateById(values.id, values)
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