/*
 * @author: zzp
 * @date: 2023-09-05 11:12:47
 * @fileName: DynamicIcon.vue
 * @filePath: src/views/Layout/DynamicIcon.vue
 * @description: antd图标引入
 */
<template>
  <component :is="name" />
</template>

<script>
import { defineComponent } from "vue"
import {
  HomeOutlined, 
  AppstoreOutlined,
  GlobalOutlined,
  NodeCollapseOutlined,
  VideoCameraOutlined,
  ProjectOutlined,
  AlertOutlined,
} from "@ant-design/icons-vue"

export default defineComponent({
  name: "DynamicIcon",
  components: {
    HomeOutlined, 
    AppstoreOutlined,
    GlobalOutlined,
    NodeCollapseOutlined,
    VideoCameraOutlined,
    ProjectOutlined,
    AlertOutlined,
  },
  props: {
    name: {
      type: String,
      default: "HomeOutlined"
    }
  }
})
</script>