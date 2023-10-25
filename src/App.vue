<template>
  <vy-spin :load-data="loadData" class="define-height">
    <template #default="{record}">
      {{ record }}
    </template>
  </vy-spin>
</template>

<script lang="ts" setup>
import {VySpin} from "@/packages/vy-spin"

function loadData() {
  // 模拟请求
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('测试数据')
    }, 1000)
  })
}
</script>

<style lang="less" scoped>
.define-height {
  height: 300px;
}
</style>
