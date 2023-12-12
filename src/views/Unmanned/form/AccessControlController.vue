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
            <a-button @click.stop="openModal(0)">开门</a-button>
            <a-button @click.stop="openModal(1)">关门</a-button>
            <a-button @click.stop="openModal(2)">常开</a-button>
            <a-button @click.stop="openModal(3)">常关</a-button>
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
          :data-source="record.soe_event" 
          :pagination="false"
          :scroll="{ y: 'calc(100vh - 540px)' }"
        />
      </div>
    </div>
    <a-modal v-model:open="visible" title="密码验证" ok-text="确认" cancel-text="取消" @ok="modalConfirm" @cancel="closureModal">
      <div style="margin: 20px 0;">
        <a-input v-model:value="password" placeholder="请输入密码..." />
      </div>
    </a-modal>
  </div>

</template>

<script setup>
import { ref, inject } from "vue"
import { LayoutFilled } from "@ant-design/icons-vue"
import { message } from "ant-design-vue"

const props = defineProps({
  deviceItem: {
    type: Object,
    default: {}
  },
  record: {
    type: Object,
    default: {
      status_list: [],
      soe_event: []
    }
  },
  publish: Function
})

const visible = ref(false)
const password = ref("")
const currentType = ref("")
const getEnvConfig = inject("getEnvConfig")

const columns = [  
  { title: "时 间", dataIndex: "time", align: "left", width: 160, ellipsis: true },    
  { title: "类 型", dataIndex: "type_name", align: "left", width: 100, ellipsis: true },
  { title: "人员编号", dataIndex: "user_code", align: "left", width: 100, ellipsis: true },
  { title: "卡 号", dataIndex: "card_number", align: "left", width: 150, ellipsis: true },
  { title: "门", dataIndex: "door_name", align: "left", width: 100, ellipsis: true },
  { title: "验证方式", dataIndex: "verification_mode", align: "left", width: 120, ellipsis: true },
  { title: "状 态", dataIndex: "status_name", align: "left", width: 120, ellipsis: true }
]

const doorIndex = ref(0)

const modalConfirm = () => {
  if(!password.value) {
    return message.warning("请输入密码！")
  }
  if(password.value !== getEnvConfig("VUE_ACCESS_CONTROL_PASSWORD")) {
    return message.error("密码错误！")
  }
  accessControl()
}

const openModal = type => {
  currentType.value = type
  visible.value = true
}

const closureModal = () => {
  currentType.value = ""
  password.value = ""
  visible.value = false
}

const accessControl = () => {
  props.publish({
    cmd: currentType.value, 
    channel: doorIndex.value
  }, 0)
  closureModal()
}
</script>