<style lang="less" scoped>
  @import url("./index.less");
</style>

<template>
  <div class="menuLayer">
    <a-menu
      class="menu"
      mode="horizontal"
      theme="dark"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
    >
      <a-menu-item key="dashboard">
        <router-link to="/dashboard">
          <HomeOutlined />
          <span>首页</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="unmanned">
        <router-link to="/unmanned">
          <GlobalOutlined />
          <span>无人微站</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="distributionMonitoring">
        <router-link to="/distributionMonitoring">
          <NodeCollapseOutlined />
          <span>配电监控</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="realTimeVideo">
        <router-link to="/realTimeVideo">
          <VideoCameraOutlined />
          <span>实时视频</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="dataAnalysis">
        <router-link to="/dataAnalysis">
          <ProjectOutlined />
          <span>数据分析</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="alarmManagement">
        <router-link to="/alarmManagement">
          <AlertOutlined />
          <span>报警管理</span>
        </router-link>
      </a-menu-item>
      <a-sub-menu class="sub-menu" key="operations">
        <template #icon><AppstoreOutlined /></template>
        <template #title>基础数据</template>
        <a-menu-item key="user">
          <router-link to="/operations/user">
            <span>用户管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="controller">
          <router-link to="/operations/controller">
            <span>微站控制器</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="temperatureEquipment">
          <router-link to="/operations/temperatureEquipment">
            <span>数显温湿度设备</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script setup>
  import { watch, ref } from "vue"
  import { 
    HomeOutlined, 
    AppstoreOutlined,
    GlobalOutlined,
    NodeCollapseOutlined,
    VideoCameraOutlined,
    ProjectOutlined,
    AlertOutlined,
  } from "@ant-design/icons-vue"
  import { useRoute } from "vue-router"

  const route = useRoute()
  const selectedKeys = ref([])
  const openKeys = ref([])

  const matchNewRouteKey = path => {  
    const routeKey = path.substring(
      path.lastIndexOf("/") + 1
    )
    selectedKeys.value.splice(0, 1, routeKey)
  }
  matchNewRouteKey(route.path)

  watch(() => route.path, matchNewRouteKey)
</script>
