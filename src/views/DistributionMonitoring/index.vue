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
          <a-list :data-source="controllerList" :bordered="true">
            <template #header>
              <div>微站列表</div>
            </template>
            <template #renderItem="{ item }">
              <a-list-item 
                :class="currentItem?.id === item.id ? 'active' : ''"
                @click="listItemClick(item)" 
              > {{ item.name }} </a-list-item>
            </template>
          </a-list>
          <div class="controls">
            <div class="title">电路控制</div>
            <div class="controlsBody">
              <div class="buttons">
                <a-button :disabled="!circuit.key || (circuit.key && circuit.status)" @click.stop="circuitClick(true)">开启</a-button>
                <a-button :disabled="!circuit.key || (circuit.key && !circuit.status)" @click.stop="circuitClick(false)">关闭</a-button>
              </div>
            </div>
          </div>
        </div>
        <div class="powerDistribution" style="height: calc(100vh - 244px);">
          <!-- <div v-if="!currentItem?.id" class="empty">暂无电路图数据</div> -->
          <component
            ref="svgComponentRef"
            :is="currentComponent"
            :record="currentItem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, shallowRef, defineAsyncComponent } from "vue"
  import { useStore } from "vuex"
  import controllerApi from "_api/controller"

  const store = useStore()

  const currentComponent = shallowRef()
  const controllerList = ref([])
  const currentItem = ref({})
  const circuit = store.state.circuit

  const svgComponentRef = ref()

  const _getControllerList = async () => {
    try {
      const res = await controllerApi.getAll()
      controllerList.value = res.data.map((item, index) => {
        item.svgIndex = index + 1
        return item
      })
    } catch(err) {
      message.error(`获取微站列表失败: ${err}`)
    }
  }

  const listItemClick = item => {
    store.dispatch("circuit/setKey", undefined)
    store.dispatch("circuit/setStatus", false)
    currentItem.value = item
    currentComponent.value = defineAsyncComponent(() => import(`@/views/DistributionMonitoring/svg/circuit${item.svgIndex}.vue`))
  }

  const circuitClick = status => {
    svgComponentRef.value.acceptanceControl(status)
  }

  onMounted(() => {
    _getControllerList()
  })
</script>
