/*
 * @author: zzp
 * @date: 2023-10-26 17:00:53
 * @fileName: AccessControlController.vue
 * @filePath: src/views/Unmanned/form/AccessControlController.vue
 * @description: 门禁控制器实时数据
 */
<style lang="less" scoped>
  @import url("./index.less");
</style> 

<template>
  <div class="accessControlController">
    <div class="blockItem">
      <div class="conTitle">门 状 态</div>
      <div class="retract">
        <a-row>
          <a-col v-for="item, index in record.status_list" :key="index" :span="3">
            <div :class="['doorItem', item === 0 ? 'close' : 'open']">
              <div class="left">
                <LayoutFilled />
                门{{ index + 1 }}
              </div>
              <div class="right">{{ item === 0 ? "关" : "开" }}</div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="blockItem">
      <div class="conTitle">远程控制</div>
      <div class="retract">
        <a-row>
          <div class="operationItem">
            <label>选择门: </label>
            <div class="content">
              <a-select v-model:value="doorIndex" popupClassName="modalSelect">
                <a-select-option v-for="item, index in record.status_list" :key="index" :value="index">{{index+1}}</a-select-option>
              </a-select>
            </div>
          </div>
          <div class="controlsBtns">
            <a-button @click.stop="accessControl(0)">开门</a-button>
            <a-button @click.stop="accessControl(1)">关门</a-button>
            <a-button @click.stop="accessControl(2)">常开</a-button>
            <a-button @click.stop="accessControl(3)">常关</a-button>
          </div>
        </a-row>
      </div>
    </div>
    <div class="blockItem">
      <div class="conTitle">基本信息</div>
      <div class="retract">
        <a-row :gutter="40">
          <a-col :span="8">
            <div class="recordItem">
              <label>名 称: </label> <div class="content">{{ deviceItem.name }}</div>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="recordItem">
              <label>I P: </label> <div class="content">{{ deviceItem.ip }}</div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="blockItem">
      <div class="conTitle">事件信息</div>
      <div class="contentContainer">
        <a-table 
          row-key="id"
          :columns="columns"
          :data-source="record.incident_list" 
          :pagination="false"
          :scroll="{ y: 'calc(100vh - 540px)' }"
        />
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from "vue"
import { LayoutFilled } from "@ant-design/icons-vue"

const props = defineProps({
  deviceItem: {
    type: Object,
    default: {}
  },
  record: {
    type: Object,
    default: {
      status_list: [],
      incident_list: []
    }
  },
  publish: Function
})

const columns = [  
  { title: "时 间", dataIndex: "name", align: "left", width: 160, ellipsis: true },    
  { title: "类 型", dataIndex: "name", align: "left", width: 100, ellipsis: true },
  { title: "人员编号", dataIndex: "name", align: "left", width: 100, ellipsis: true },
  { title: "卡号", dataIndex: "name", align: "left", width: 150, ellipsis: true },
  { title: "门", dataIndex: "name", align: "left", width: 100, ellipsis: true },
  { title: "验证方式", dataIndex: "name", align: "left", width: 120, ellipsis: true },
  { title: "状态", dataIndex: "name", align: "left", width: 120, ellipsis: true }
]

const doorIndex = ref(0)

// const doorList = ref({ 
//   status_list: [0, 1, 0, 1, 1, 1, 1, 1], 
//   incident_list: [{
//     status: "0",
//     name: "aaa"
//   }]
// })

const accessControl = type => {
  props.publish({
    cmd: type, 
    channel: doorIndex.value
  })
}
</script>