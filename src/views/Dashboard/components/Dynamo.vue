/*
 * @author: zzp
 * @date: 2023-09-21 10:03:32
 * @fileName: Dynamo.vue
 * @filePath: src/views/Dashboard/components/Dynamo.vue
 * @description: 发电机
 */
<style lang="less" scoped>
 @import url("./index.less");
</style>

<template>
  <div class="dynamo">
    <div class="highLevelTitleBar">
      <i class="dynamoIcon" />
      <span class="chTitle">高压出线柜和发电机</span>
    </div>
    <div class="contentBar">
      <div class="topIcons">
        <div class="iconItem">
          <i class="ark"/>
          <div>高压出线柜</div>
        </div>
        <div class="iconItem">
          <i class="namo"/>
          <div>发电机</div>
        </div>
      </div>
      <div class="contentBody">
        <div class="backImgs"> <div /> <div /> </div>
        <div class="contentItem">
          <label>总 数</label>
          <div class="arkItem">2889</div>
          <div class="namoItem">2889</div>
        </div>
        <div class="contentItem" style="padding-top: 18px;">
          <label>运 行</label>
          <div class="arkItem">2889</div>
          <div class="namoItem">2889</div>
        </div>
        <div class="contentItem" style="padding-top: 14px;">
          <label>故 障</label>
          <div class="arkItem">2889</div>
          <div class="namoItem">2889</div>
        </div>
        <div class="contentItem">
          <label>维 保</label>
          <div class="arkItem">2889</div>
          <div class="namoItem">2889</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>