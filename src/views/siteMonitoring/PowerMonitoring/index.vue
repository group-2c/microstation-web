/*
 * @author: zzp
 * @date: 2023-12-04 13:39:23
 * @fileName: index.vue
 * @filePath: src/views/siteMonitoring/PowerMonitoring/index.vue
 * @description: 电力监控
 */
<style lang="less" scoped>
@import url("./index.less");
</style>

<template>
  <div class="parcel">
    <a-page-header class="pageHeader" title="电力监控" />
    <div class="contentContainer">
      <div class="microstationContainer">
        <div class="leftArea">
          <a-list :data-source="modelList" :bordered="true">
            <template #header>
              <div>模型列表</div>
            </template>
            <template #renderItem="{ item }">
              <a-list-item :class="currentModel?.id === item.id ? 'active' : ''" @click="modelItemClick(item)" >
                <div class="name">{{ item.name }}</div>
              </a-list-item>
            </template>
          </a-list>
        </div>
        <div class="powerDistribution" style="height: calc(100vh - 244px);">
          <a-spin :spinning="loading">
            <div class="modelContainer" ref="modelRef"></div>
          </a-spin>
          <div v-if="!currentModel?.id" class="empty">暂无模型数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { message } from "ant-design-vue"
import fileApi from "_api/files"
import powerMonitoringApi from "_api/powerMonitorings"
import PowerModel from "./model"

const loading = ref(false)
const modelList = ref([])
const currentModel = ref({})

const modelRef = ref()

const _getModelList = async () => {
  const loading = message.loading("正在加载模型数据...", 0)
    try {
      const res = await powerMonitoringApi.getAll()
      modelList.value = res.data
    } catch(err) {
      message.error(`模型数据加载失败:${err}`)
    } finally {
      setTimeout(loading) 
    }
}

const _initModelView = url => {
  const powerModel = new PowerModel()
  powerModel.initModelView(modelRef.value, url, () => {
    console.log("加载完成！")
  })
}

const _getFileUrl = async fileName => {
  const _loading = message.loading("正在加载模型...", 0)
  loading.value = true
  try {
    const res = await fileApi.filePreview({ fileName })
    console.log(res.data.url)
    _initModelView(res.data.url)
  } catch (err) {
    console.error(err)
    message.error(`加载模型失败:${err}`)
  } finally {
    loading.value = false
    setTimeout(_loading)
  }
}

const modelItemClick = item => {
  currentModel.value = item
  _getFileUrl(item.fileName)
}

onMounted(() => {
  _getModelList()
})
</script>
