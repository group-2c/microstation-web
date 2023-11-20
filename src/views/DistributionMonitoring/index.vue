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
  import { onMounted, ref, nextTick } from "vue"
  import { message } from "ant-design-vue"
  import svgPanZoom from "svg-pan-zoom"
  import circuitManageApi from "_api/circuitManage"

  const currentItem = ref({})
  const autoExpandParent = ref(true)
  const expandedKeys = ref([])
  const treeList = ref([])

  const _getControllerList = async () => {
    const loading = message.loading("正在加载微站数据...", 0)
    try {
      const res = await circuitManageApi.getCircuitDiagramByID()
      treeList.value = res.data
      res.data.forEach(item => {
        item.key = Math.random().toString().slice(-6)
        item.title = item.controllerName
        item.selectable = false
        if(item.children) {
          item.children.forEach(child => {
            child.key = Math.random().toString().slice(-6)
            child.title = child.name
          })
        }
      })
    } catch(err) {
      message.error(`微站数据加载失败:${err}`)
    } finally {
      setTimeout(loading) 
    }
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

  const _downloadSvg = async fileName => {
    const loading = message.loading("正在加载配电图...", 0)
    try {
      const res = await circuitManageApi.fileDownload({ fileName })
      const el = document.querySelector("#svgPanZoom")
      el.innerHTML = res
      const panZoomTiger = svgPanZoom(el.querySelector("svg"))
      panZoomTiger.fit()
      panZoomTiger.center()
      _svgOperate()
    } catch(err) {
      message.error(`配电图加载失败:${err}`)
    } finally {
      setTimeout(loading) 
    }   
  }

  const _getNodeList = async () => {
    const loading = message.loading("正在获取配电图节点数据...", 0)
    try {
      const res = await circuitManageApi.getNodeList(currentItem.value.id)
      currentItem.value.nodeList = res.data.nodeList || []
    } catch(err) {
      message.error(`获取配电图节点数据失败:${err}`)
    } finally {
      setTimeout(loading) 
    }  
  }

  const onExpand = keys => {
    expandedKeys.value = keys
    autoExpandParent.value = false
  }

  const threeSelect = async selectedKeys => {
    currentItem.value = treeList.value.reduce((accumulator, dicItem) => 
      accumulator.concat(dicItem.children), []
    ).find(childrenItem => childrenItem.key === selectedKeys[0])
    delete currentItem.value.nodeList

    await _getNodeList()
    await _downloadSvg(currentItem.value.fileName)
  }

  onMounted(() => {
    _getControllerList()
  })
</script>
