# vy-ace-editor ACE编辑器

> 用于页面和区块的加载中状态

## 代码演示

### 基础使用

```vue
<template>
  <div>
    <vy-ace-editor class="define-height" v-model="testDome" :mode="'json'">
  	</vy-ace-editor>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import {VyAceEditor} from "@/packages/vy-ace-editor"
let testDome = ref('[{"value": "1","label": "名称"}]')
</script>

<style lang="less" scoped>
.define-height {
  height: 300px;
}
</style>

```

## API

### 属性（Attributes）

| 参数                  | 说明说明   | 类型      | 默认值                                      | 必需   | 起始版本  |
| ------------------- | ------ | ------- | ---------------------------------------- | ---- | ----- |
| modelValue          | 绑定的数据  | String  |                                          | 是    | 1.0.0 |
| readOnly            | 只读     | Boolean | false                                    | 否    | 1.0.0 |
| theme               | 主题     | String  | `tomorrow`。可选： 'chaos' \| 'tomorrow' \| 'monokai' \| 'chrome' \| 'github' | 否    | 1.0.0 |
| mode                | 代码匹配模式 | String  | `text`。可选：'json' \| 'mysql' \| 'text' \| 'python' \| 'powershell' \| 'yaml' \| 'javascript' | 否    | 1.0.0 |
| fontSize            | 设置字号   | Number  | 14                                       | 否    | 1.0.0 |
| showLineNumbers     | 显示行号   | Boolean | true                                     | 否    | 1.0.0 |
| displayIndentGuides | 显示参考线  | Boolean | true                                     | 否    | 1.0.0 |

### 方法（Events）

| 事件名称    | 说明    | 回调参数           |
| ------- | ----- | -------------- |
| initEnd | 初始化完毕 | function(data) |
| change  | 内容变化  | function(data) |

### 插槽（Slots）

无