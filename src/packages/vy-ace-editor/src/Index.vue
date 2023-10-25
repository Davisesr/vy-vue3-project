<template>
  <div
      ref="editorFormRef"
      class="bi-ace-editor"
      style="min-height: 250px;height: 100%;">
  </div>
</template>

<script lang="ts" setup>
import {defineProps, defineEmits, defineExpose, onMounted, onBeforeUnmount, ref} from 'vue'

import ace from 'ace-builds'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-mysql'
import 'ace-builds/src-noconflict/mode-text'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-min-noconflict/ext-language_tools'

// props
const props = defineProps({
  //绑定的数据
  modelValue: {
    type: String,
    required: true
  },
});

// emits
const emits = defineEmits(['onChange', 'update:modelValue']);

let editor: any = null

const editorFormRef = ref<any>(null)

const options = {
  theme: 'ace/theme/tomorrow', // 主题
  mode: 'ace/mode/json', // 代码匹配模式
  tabSize: 2, //标签大小
  fontSize: 14, //设置字号
  wrap: true, // 用户输入的sql语句，自动换行
  enableSnippets: true, // 启用代码段
  showLineNumbers: true, // 显示行号
  enableLiveAutocompletion: true, // 启用实时自动完成功能 （比如：智能代码提示）
  enableBasicAutocompletion: true, // 启用基本自动完成功能
  scrollPastEnd: true, // 滚动位置
  highlightActiveLine: true, // 高亮当前行
  useWorker: true
}

onMounted(() => {
  init()
})

function init() {
  if (editor) {
    //实例销毁
    editor.destroy()
  }
  //初始化
  editor = ace.edit(editorFormRef.value, options)
  editor.setValue(props.modelValue ? props.modelValue : '') // 设置内容
  editor.on('change', () => {
    console.log('数据变换了:', editor.getValue())
    emits('onChange', editor.getValue())
  })
}

onBeforeUnmount(() => {
  editor.destroy()
  editor.container.remove()
})
</script>

<style lang="less">

</style>

