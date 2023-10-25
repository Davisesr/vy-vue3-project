<template>
  <!--  <vy-spin :load-data="loadData" class="define-height">
      <template #default="{record}">
        {{ record }}
      </template>
    </vy-spin>-->

  <vy-ace-editor class="define-height" v-model="aaa">

  </vy-ace-editor>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import {VySpin} from "@/packages/vy-spin"
import {VyAceEditor} from "@/packages/vy-ace-editor"

let aaa = ref("1111")

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
