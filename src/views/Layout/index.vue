<style lang="less" scoped>
  @import url("./index.less");
</style>

<template>
  <a-layout class="layoutContainer">
    <a-layout-header class="layoutHeaderContainer"></a-layout-header>

    <a-layout-content class="layoutContentWarpper">
      <menu-bar />
      <div class="layoutContentContainer">
        <div class="layoutContentBody">
          <router-view />
        </div>
      </div>
    </a-layout-content>

  </a-layout>
</template> 

<script setup>
  import MenuBar from "./MenuBar.vue"
</script>