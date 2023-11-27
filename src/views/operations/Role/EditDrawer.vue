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
              <a-tabs v-model:activeKey="dataCenter.activeKey">
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
                          <div class="permissionChange" @click.stop="permissionChange(record, 'add')">
                            <MinusOutlined class="disabled" v-if="!record.permissions" />
                            <CheckOutlined v-else-if="record.permissions.add" /> 
                            <CloseOutlined v-else class="noPers" /> 
                          </div>
                        </template>
                        <template v-if="column.dataIndex === 'edit'">
                          <div class="permissionChange" @click.stop="permissionChange(record, 'edit')">
                            <MinusOutlined class="disabled" v-if="!record.permissions" />
                            <CheckOutlined v-else-if="record.permissions.edit" /> 
                            <CloseOutlined v-else class="noPers" /> 
                          </div>
                        </template>
                        <template v-if="column.dataIndex === 'delete'">
                          <div class="permissionChange" @click.stop="permissionChange(record, 'delete')">
                            <MinusOutlined class="disabled" v-if="!record.permissions" />
                            <CheckOutlined v-else-if="record.permissions.delete" /> 
                            <CloseOutlined v-else class="noPers" /> 
                          </div>
                        </template>
                        <template v-if="column.dataIndex === 'export'">
                          <div class="permissionChange" @click.stop="permissionChange(record, 'export')">
                            <MinusOutlined class="disabled" v-if="!record.permissions" />
                            <CheckOutlined v-else-if="record.permissions.export" /> 
                            <CloseOutlined v-else class="noPers" /> 
                          </div>
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
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { message } from "ant-design-vue"
import { MinusOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons-vue"
import { routes } from "@/router/index.js"
import roleApi from "_api/roles"
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
]

const fieldNames = { children: "children", title: "title", key: "name" }

const props = defineProps({
  onOk: Function
})

const dataDefault = {
  visible: false,
  loading: false,
  record: {},
  treeList: [],
  autoExpandParent: true,
  activeKey: "1",
  checkedKeys: []
}

const dataCenter = ref(Lodash.cloneDeep(dataDefault))
const formRef = ref()

const _getRouters = () => {
  const array = routes.find(x => x.name === "App")?.children
  const list = array.sort((a, b) => a.meta.index - b.meta.index)
  return list.filter(route => route.meta && !route.meta.hidden)
}

const _setThreeData = (owns = []) => {
  dataCenter.value.treeList = _getRouters().map(item => {
    item.title = item.meta.title
    if(item.children) {
      item.children.forEach(child => {
        child.title = child.meta.title
        const _x = owns.find(x => x.name === child.name)
        const _per = _x?.permissions
        child.permissions = { 
          add: _per?.add === undefined ? true : _per.add,
          edit: _per?.edit === undefined ? true : _per.edit,
          delete: _per?.delete === undefined ? true : _per.delete,
          export: _per?.export === undefined ? true : _per.export,
        }
      })
    }
    return item
  })
}

const handleShow = (item = {}) => {
  _setThreeData(item.owns)
  dataCenter.value.visible = true
  dataCenter.value.checkedKeys = (item?.owns || []).map(x => x.name)
  dataCenter.value.record = {
    ...Lodash.cloneDeep(item)
  }
}

const onExpand = keys => {
  dataCenter.value.expandedKeys = keys
  dataCenter.value.autoExpandParent = false
}

const _validateForm = callback => {
  formRef.value.validate().then(() => callback()).catch(() => {})
}

const tableData = computed(() => {
  const _filterTree = (node) => {
    if (dataCenter.value.checkedKeys.includes(node.name)) {
      return node.children ? { ...node, children: node.children.map(_filterTree) } : { ...node }
    }
    if(node.children) {
      const filteredChildren = node.children.map(_filterTree).filter(child => child !== null)
      if (filteredChildren.length > 0) {
        return { ...node, children: filteredChildren }
      }
    }
    return null
  }

  return dataCenter.value.treeList.map(_filterTree).filter(root => root !== null)
})

const permissionChange = (item, type) => {
  if(item.permissions) {
    item.permissions[type] = !item.permissions[type]
  }
}

const handleOk = async () => {
  _validateForm(async () => {
    const { checkedKeys, record } = dataCenter.value
    const array = []
    tableData.value.forEach(item => {
      if(checkedKeys.includes(item.name)) {
        array.push({ name: item.name })
      }
      if(item.children) {
        item.children.forEach(child => {
          if(checkedKeys.includes(child.name)) {
            array.push({ name: child.name, permissions: child.permissions })
          }
        })
      }
    })

    const data = { name: record.name, owns: JSON.stringify(array) }

    try {
      dataCenter.value.loading = true
 
      if (!record.id) {
        await roleApi.create(data)
        message.success("新增成功！")
      } else {
        await roleApi.updateById(record.id, data)
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