<style lang="less" scoped>
  @import url("./index.less");
</style>
<template>
  <div>
    <a-drawer
      :title="dataCenter.record.id ? '编辑' : '新增'"
      :width="900"
      :open="dataCenter.visible"
      :closable="false"
      class="editDrawer"
    > 
      <a-form ref="formRef" :model="dataCenter.record" :rules="formRules" :label-col="{ span: 3 }">
        <a-row :gutter="30"> 
          <a-col :span="24">
            <a-form-item label="角色名称" name="name">
              <a-input v-model:value="dataCenter.record.name" placeholder="请输入角色名称" :disabled="dataCenter.record.id" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <div class="rightsProfile">
              <a-tabs v-model:activeKey="dataCenter.activeKey" @change="tabChange">
                <a-tab-pane key="1" tab="菜单配置">
                  <div class="treeList">
                    <a-tree
                      :auto-expand-parent="dataCenter.autoExpandParent"
                      :tree-data="dataCenter.treeList"
                      :blockNode="true"
                      v-model:checkedKeys="dataCenter.checkedKeys"
                      :fieldNames="fieldNames"
                      checkable
                      defaultExpandAll
                      @expand="onExpand"
                      @select="threeSelect"
                    >
                      <template #title="{ title }">
                        <span>{{ title }}</span>
                      </template>
                    </a-tree>
                  </div>
                </a-tab-pane>
                <a-tab-pane key="2" tab="权限配置">
                  <div class="contentContainer">
                    <a-table
                      v-if="dataCenter.activeKey === '2'"
                      row-key="name"
                      :columns="columns"
                      :data-source="tableData" 
                      :pagination="false"
                      defaultExpandAllRows
                    >
                      <template #bodyCell="{ column, record }">
                        <template v-if="column.dataIndex === 'add'">
                          <CheckOutlined v-if="record.permissions.add" /> 
                          <CloseOutlined v-else class="noPers" /> 
                        </template>
                        <template v-if="column.dataIndex === 'edit'">
                          <CheckOutlined v-if="record.permissions.edit" /> 
                          <CloseOutlined v-else class="noPers" /> 
                        </template>
                        <template v-if="column.dataIndex === 'delete'">
                          <CheckOutlined v-if="record.permissions.delete" /> 
                          <CloseOutlined v-else class="noPers" /> 
                        </template>
                        <template v-if="column.dataIndex === 'export'">
                          <CheckOutlined v-if="record.permissions.export" /> 
                          <CloseOutlined v-else class="noPers" /> 
                        </template>
                        <template v-if="column.dataIndex === 'operation'">
                          <span>
                            <a-button type="link" @click.stop="handleEditItem(record)">
                              <template #icon><EditOutlined /></template>
                              编辑
                            </a-button>
                          </span>
                        </template>
                      </template>
                    </a-table>
                  </div>
                </a-tab-pane>
              </a-tabs>
            </div>
          </a-col>
        </a-row>
      </a-form>
      <template #footer>
        <a-button  @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleOk">确定</a-button>
      </template>
    </a-drawer>
    <a-modal v-model:open="dataCenter.modalVisible" title="设置权限" ok-text="确认" cancel-text="取消" @ok="modalConfirm" @cancel="closureModal">
      <div style="margin: 20px 0;">
        <a-form :model="dataCenter.currentItem.permissions" :label-col="{ span: 4 }">
          <a-row :gutter="0"> 
            <a-col :span="24">
              <a-form-item label="新增权限" name="add">
                <a-switch v-model:checked="dataCenter.currentItem.permissions.add" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="删除权限" name="delete">
                <a-switch v-model:checked="dataCenter.currentItem.permissions.delete" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { message } from "ant-design-vue"
import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons-vue"
import { routes } from "@/router/index.js"
import { dict_departments } from "_utils/dictionary"
import userApi from "_api/user"
import Lodash from "lodash"

const formRules = ref({
  name: [{ required: true, message: "请输入角色名称" }]
})

const columns = [
  { title: "菜单名称", dataIndex: "title", align: "left" },    
  { title: "新 增", dataIndex: "add", align: "center" },
  { title: "编 辑", dataIndex: "edit", align: "center" },
  { title: "删 除", dataIndex: "delete", align: "center" },
  { title: "导 出", dataIndex: "export", align: "center" },
  { title: "操 作", dataIndex: "operation", align: "center", width: 100, fixed: "right" },
]

const fieldNames = { children: "children", title: "title", key: "name" }

const props = defineProps({
  onOk: Function
})

const dataDefault = {
  visible: false,
  loading: false,
  record: {},
  isEditPassword: false,
  treeList: [],
  autoExpandParent: true,
  activeKey: "1",
  checkedKeys: ["Unmanned", "Organization"],
  tableList: [],
  modalVisible: false,
  currentItem: {}
}

const dataCenter = ref(Lodash.cloneDeep(dataDefault))
const formRef = ref()

const _getRouters = () => {
  const array = routes.find(x => x.name === "App")?.children
  const list = array.sort((a, b) => a.meta.index - b.meta.index)
  return list.filter(route => route.meta && !route.meta.hidden)
}

const _setThreeData = () => {
  dataCenter.value.treeList = _getRouters().map(item => {
    item.title = item.meta.title
    if(item.children) {
      item.children.forEach(child => {
        child.title = child.meta.title
      })
    }
    return item
  })
}

const handleShow = (item = {}) => {
  _setThreeData()
  dataCenter.value.visible = true
  dataCenter.value.record = {
    ...Lodash.cloneDeep(item)
  }
}

const onExpand = keys => {
  dataCenter.value.expandedKeys = keys
  dataCenter.value.autoExpandParent = false
}

const threeSelect = async keys => {

}

const tabChange = () => {
  console.log(dataCenter.value.treeList)
}

const _validateForm = callback => {
  formRef.value.validate().then(() => callback()).catch(() => {})
}

const handleEditItem = row => {
  dataCenter.value.currentItem = row
  dataCenter.value.modalVisible = true
  console.log(row)
}

const modalConfirm = () => {
  const { treeList, currentItem } = dataCenter.value
  treeList.forEach(item => {
    if(item.name === currentItem.name) {
      item.permissions = currentItem.permissions
    }
    if(item.children) {
      item.children.forEach(child => {
        if(child.name === currentItem.name) {
          child.permissions = currentItem.permissions
        }
      })
    }
  })
  dataCenter.value.treeList = Lodash.cloneDeep(treeList)
  console.log(treeList)
}

const tableData = computed(() => {
  const list = Lodash.cloneDeep(dataCenter.value.treeList).filter(item => {
    if(item.children) {
      const _data = item.children.filter(x => dataCenter.value.checkedKeys.includes(x.name))
      item.children = _data
      if(_data.length !== 0) {
        return item
      }
    }
    if(dataCenter.value.checkedKeys.includes(item.name)) {
      return item
    }
  })
  
  return list.map(item => {
    if(!item.permissions) item.permissions = {}
    item.permissions = {
      add: item.permissions.add || true,
      edit: item.permissions.edit || true,
      delete: item.permissions.delete || true,
      export: item.permissions.export || true,
    }
    if(item.children) {
      item.children.forEach(child => {
        if(!child.permissions) child.permissions = {}
        child.permissions = {
          add: child.permissions.add || true,
          edit: child.permissions.edit || true,
          delete: child.permissions.delete || true,
          export: child.permissions.export || true,
        }
      })
    }
    return item
  })
})

const closureModal = () => {
  dataCenter.value.modalVisible = false
}

const handleOk = async () => {
  _validateForm(async () => {
    const { record } = dataCenter.value

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