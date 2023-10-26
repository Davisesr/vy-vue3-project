<template>
  <div>
    <vy-ace-editor class="define-height" v-model="aaa" :mode="'json'"></vy-ace-editor>
    <button @click="aaa = JSON.stringify(JSON.parse(aaa),null,2)">jsonFormat</button>
    <button @click="xxx2">jsonNoFormat</button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import {VySpin} from "@/packages/vy-spin"
import {VyAceEditor} from "@/packages/vy-ace-editor"
import {jsonFormat, jsonNoFormat} from "@/packages/vy-ace-editor/utils"

let aaa = ref('[{' +
    '"value": "1",' +
    '"label": "名称"' +
    '}]')

function loadData() {
  // 模拟请求
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('测试数据')
    }, 1000)
  })
}


function xxx() {
  console.log('1')
  aaa.value = jsonFormat(aaa.value);
}

function xxx2() {
  console.log('2')
  aaa.value = jsonNoFormat(aaa.value);
}
</script>

<style lang="less" scoped>
.define-height {
  height: 300px;
}
</style>
