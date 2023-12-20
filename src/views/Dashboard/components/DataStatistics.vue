/*
 * @author: zzp
 * @date: 2023-12-20 10:50:04
 * @fileName: DataStatistics.vue
 * @filePath: src/views/Dashboard/components/DataStatistics.vue
 * @description: 数据统计
 */
<style lang="less" scoped>
 @import url("./index.less");
</style>

<template>
  <div class="dataStatistics">
    <div class="highLevelTitleBar">
      <i class="equipmentIcon" />
      <span class="chTitle">项目总览</span>
    </div>
    <div class="contentBar">
      <div class="projectItem">
        <div>
          <div class="itemImg" data-name="project" />
          <div class="itemData">
            <div class="itemNumber">{{ statistics.project || 0 }}</div>
            <div class="itemName">项目数量</div>
          </div>
        </div>
      </div>
      <div class="projectItem">
        <div>
          <div class="itemImg" data-name="controller" />
          <div class="itemData">
            <div class="itemNumber">{{ statistics.controller || 0 }}</div>
            <div class="itemName">微站数量</div>
          </div>
        </div>
      </div>
      <div class="projectItem">
        <div>
          <div class="itemImg" data-name="equipment" />
          <div class="itemData">
            <div class="itemNumber">{{ statistics.equipment || 0 }}</div>
            <div class="itemName">设备数量</div>
          </div>
        </div>
      </div>
      <div class="projectItem">
        <div>
          <div class="itemImg" data-name="alarm" />
          <div class="itemData">
            <div class="itemNumber">{{ statistics.alarm || 0 }}</div>
            <div class="itemName">报警数量</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue"
  import { message } from "ant-design-vue"
  // import dashboardApi from "_api/dashboard"

  let timer = null
  
  const statistics = ref({})

  const _getData = async () => {
    statistics.value = {
      project: 54861,
      controller: 54862,
      equipment: 54863,
      alarm: 54864,
    }
    // try {
    //   const res = await dashboardApi.queryEquipmentStatistics()
    //   statistics.value = res.data
    // } catch(err) {
    //   message.error(`获取设备统计数据失败: ${err}`)
    // }
  }

  const _clearPollingTimer = () => {
    timer && clearInterval(timer)
    timer = null
  }

  const _interfacePolling = () => {
    _clearPollingTimer()
    timer = setInterval(() => {
      _getData()
    }, 10 * 1000)
  }

  onMounted(() => {
    _getData()
    _interfacePolling()
  })

  onBeforeUnmount(() => {
    _clearPollingTimer()
  })
</script>