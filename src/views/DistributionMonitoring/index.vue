/*
 * @author: zzp
 * @date: 2023-09-05 10:47:16
 * @fileName: index.vue
 * @filePath: src/views/DistributionMonitoring/index.vue
 * @description: 配电监控
 */
<style lang="less" scoped>
  @import url("./index.less");
</style>

<template>
  <div class="parcel">
    <a-page-header class="pageHeader" title="配电监控" />
    <div class="contentContainer">
      <div class="microstationContainer">
        <div class="leftArea">
          <div class="treeEBox">
            <div class="threeTitle">微站列表</div>
            <a-tree
              :expanded-keys="expandedKeys"
              :auto-expand-parent="autoExpandParent"
              :tree-data="treeList"
              :blockNode="true"
              @expand="onExpand"
              @select="threeSelect"
            >
              <template #title="{ title }">
                <span>{{ title }}</span>
              </template>
            </a-tree>
          </div>
        </div>
        <div class="powerDistribution" style="height: calc(100vh - 244px);">
          <div id="svgPanZoom"></div>
          <div v-if="!currentItem?.id" class="empty">暂无电路图数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, shallowRef, nextTick } from "vue"
  import { message } from "ant-design-vue"
  import { useStore } from "vuex"
  import svgPanZoom from "svg-pan-zoom"
  import controllerApi from "_api/controller"
  import svgManagementApi from "_api/svgManagement"

  const store = useStore()

  const currentComponent = shallowRef()
  const controllerList = ref([])
  const currentItem = ref({
    "id": 1,
    "name": "配电图1",
    "fileName": "2_1700112872937.svg",
    "nodeList": "[{\"index\":1,\"dom_node_id\":\"直线_912\",\"switch\":\"1\",\"deviceType\":\"electricity_meter\",\"deviceId\":1,\"deviceName\":\"多功能电表1\",\"_initStatus\":true},{\"index\":2,\"dom_node_id\":\"直线_930\",\"switch\":\"0\",\"deviceType\":\"line_protective_device\",\"deviceId\":2,\"deviceName\":\"1\",\"_initStatus\":true},{\"index\":3,\"dom_node_id\":\"直线_940\",\"switch\":\"0\",\"deviceType\":\"transformer_protection_device\",\"deviceId\":2,\"deviceName\":\"1\",\"_initStatus\":true}]"
  })
  const circuit = store.state.circuit
  const autoExpandParent = ref(true)
  const expandedKeys = ref([])
  const treeList = ref([])

  const svgComponentRef = ref()


  const _getControllerList = async () => {
    const data = [
      {
        title: '微站1',
        key: '1',
        selectable: false,
        children: [
          {
            title: '配电图1',
            key: '1-1',
          },
          {
            title: '配电图1',
            key: '1-2',
          }    
        ]
      },
      {
        title: '微站2',
        key: '2',
        selectable: false,
        children: [
          {
            title: '配电图2',
            key: '2-1',
          },
        ]
      },
    ]
    treeList.value = data
    // try {
    //   const res = await controllerApi.getAll()
    //   controllerList.value = res.data.map((item, index) => {
    //     item.svgIndex = index + 1
    //     return item
    //   })
    // } catch(err) {
    //   message.error(`获取微站列表失败: ${err}`)
    // }
  }

  const _svgOperate = () => {
    nextTick(() => {
      const svgPanZoom = document.querySelector("#svgPanZoom")
      const nodeList = JSON.parse(currentItem.value.nodeList)
      nodeList.forEach(item => {
        const closeEl = svgPanZoom.querySelector(`#${item.dom_node_id}`)
        const openEl = svgPanZoom.querySelector(`#${item.dom_node_id}_1`)
        openEl.style.display = item.switch == "0" ? "block" : "none"
        closeEl.style.display = item.switch == "1" ? "block" : "none"
      })
    })
  }

  const _downloadSvg = async () => {
    const loading = message.loading("正在加载配电图...", 0)
    try {
      const res = await svgManagementApi.svgFileDownload("2_1700112872937.svg")
  
      const el = document.querySelector("#svgPanZoom")
      el.innerHTML = res

      const panZoomTiger = svgPanZoom(el.querySelector("svg"))
      panZoomTiger.fit()
      panZoomTiger.center()
      _svgOperate()
    } catch(err) {
      console.log(err)
      message.error(`配电图加载失败:${err}`)
    } finally {
      setTimeout(loading) 
    }   
  }

  const onExpand = keys => {
    expandedKeys.value = keys
    autoExpandParent.value = false
  }

  const threeSelect = selectedKeys => {
    // const item = treeList.value.find(x => x.id === selectedKeys[0])
    // _downloadSvg(item.fileName)
    console.log(selectedKeys)
  }

  onMounted(() => {
    _getControllerList()
  })
</script>
