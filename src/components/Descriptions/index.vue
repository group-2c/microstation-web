/*
 * @author: zzp
 * @date: 2023-10-27 16:06:22
 * @fileName: index.vue
 * @filePath: src/components/Descriptions/index.vue
 * @description: 描述组件
 */
<style lang="less" scoped>
  @import url("./index.less");
</style> 
 
<template>
  <a-descriptions :column="column" :labelStyle="{ minWidth: `${minWidth}px` }">
    <a-descriptions-item v-for="item, index in list" :key="index" :label="item.label" :class="[
      item.dictionary && mistakesColors.includes(item.dictionary[record[item.field]]) ? 'mistakes' : '',
      item.dictionary && offlineColors.includes(item.dictionary[record[item.field]]) ? 'offline' : '',
      item.dictionary && warnColors.includes(item.dictionary[record[item.field]]) ? 'warn' : ''
    ]">
      {{
        item.factor ?
        (((record[item.field] || 0) - 0) * item.factor).toFixed(3) :
        item.dictionary ?
          item.dictionary[record[item.field]] :
          record[item.field]
      }}
      {{ (!record[item.field] && record[item.field] !== 0 && !item.factor) ? "-" : "" }}
      <span>{{ item.unit }}</span>
    </a-descriptions-item>
  </a-descriptions>
</template>
 
<script setup>
import { mistakesColors, offlineColors, warnColors } from "_utils/dictionary"

const props = defineProps({
  column: {
    type: Number,
    default: 3
  },
  list: Object,
  record: Object,
  minWidth: {
    type: Number,
    default: 170
  }
})

</script>