<template>
  <div
      ref="editorFormRef"
      class="bi-ace-editor"
      style="min-height: 250px;height: 100%;">
  </div>
</template>

<script lang="ts" setup>
//vue
import {defineProps, defineEmits, onMounted, onBeforeUnmount, ref} from 'vue'
// ace-builds
import ace, {Ace} from 'ace-builds'
// ace主题
import 'ace-builds/src-noconflict/theme-tomorrow'// 主题：白天
import 'ace-builds/src-noconflict/theme-monokai'; // 主题：黑夜
import 'ace-builds/src-noconflict/theme-chrome'; // 主题：chrome
import 'ace-builds/src-noconflict/theme-github';// 主题：github
import "ace-builds/src-noconflict/theme-chaos";// 主题：chaos
// ace默认设置的语言模式
import 'ace-builds/src-noconflict/mode-text'// 文本
import 'ace-builds/src-noconflict/mode-json'// json
import 'ace-builds/src-noconflict/mode-mysql'// mysql
import 'ace-builds/src-min-noconflict/mode-python'; // python
import 'ace-builds/src-min-noconflict/mode-powershell'; // powershell
import 'ace-builds/src-min-noconflict/mode-yaml'; // yaml
import 'ace-builds/src-min-noconflict/mode-javascript';//javascript
import 'ace-builds/src-min-noconflict/ext-language_tools'

// types
import type {PropType} from "vue"
import type {theme, mode} from "../types"

// 处理 【Failed to execute 'importScripts' on 'WorkerGlobalScope】问题
ace.config.set("basePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.22.0/src-min-noconflict/");

// props
const props = defineProps({
  //绑定的数据
  modelValue: {
    type: String as PropType<string>,
    required: true
  },
  // 只读
  readOnly: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // 主题
  theme: {
    type: String as PropType<theme>,
    default: 'tomorrow'
  },
  // 代码匹配模式
  mode: {
    type: String as PropType<mode>,
    default: 'text'
  },
  // 设置字号
  fontSize: {
    type: Number as PropType<number>,
    default: 14
  },
  // 显示行号
  showLineNumbers: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  // 显示参考线
  displayIndentGuides: {
    type: Boolean as PropType<boolean>,
    default: true
  }
});

// emits
const emits = defineEmits(['update:modelValue', 'initEnd', 'change']);

// 配置
const options = {
  theme: 'ace/theme/' + props.theme, // 主题
  mode: 'ace/mode/' + props.mode, // 代码匹配模式
  fontSize: props.fontSize, //设置字号
  showLineNumbers: props.showLineNumbers, // 显示行号
  displayIndentGuides: props.displayIndentGuides, // 显示参考线
  tabSize: 2, //标签大小（缩进）
  highlightActiveLine: true, // 高亮当前行
  highlightSelectedWord: true, // 高亮选中词
  useWorker: true, //语法校验
  showPrintMargin: true
}

// @ts-ignore
let editor: Ace.Editor  = null
const editorFormRef = ref<any>(null)
const totalRows = ref<number>(0)

// 初始化
onMounted(() => {
  init()
})

// 卸载
onBeforeUnmount(() => {
  if (editor) {
    editor.destroy()
    editor.container.remove()
  }
})

function init() {
  //  销毁旧实例
  if (editor) {
    editor.destroy()
  }
  //  初始化
  editor = ace.edit(editorFormRef.value, options)
  //  设置只读
  editor.setReadOnly(props.readOnly || false);
  //  代码提示和自动补全
  editor.setOptions({
    enableSnippets: true,
    enableLiveAutocompletion: true,
    enableBasicAutocompletion: true,
  });
  //  开启格式校验
  editor.getSession().setUseWrapMode(true);
  //  设置内容
  editor.setValue(props.modelValue ? props.modelValue : '')
  //  设置行数
  totalRows.value = editor.getSession().getLength();
  //  回调
  emits('initEnd', editor)
  //  设置变化
  editor.on('change', () => {
    emits('change', editor)
    emits('update:modelValue', editor.getValue())
  })
}
</script>

<style lang="less">

</style>

