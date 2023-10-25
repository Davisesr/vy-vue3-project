# vy-spin 加载中

> 用于页面和区块的加载中状态

## 代码演示

### 基础使用

```vue

<template>
  <vy-spin :load-data="loadData" class="define-height">
    <template #default="{record}">
      {{ record }}
    </template>
  </vy-spin>
</template>

<script lang="ts" setup>
// 引入
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

```

## API

### 属性（Attributes）

| 参数        | 说明                 | 类型       | 默认值     | 必需 | 起始版本  |
|-----------|--------------------|----------|---------|----|-------|
| loadData  | 加载数据               | Function |         | 是  | 1.0.0 |
| tip       | 当作为包裹元素时，可以自定义描述文案 | String   | 数据加载中…… | 否  | 1.0.0 |
| showEmpty | 显示无数据              | Boolean  | true    | 否  | 1.0.0 |

### 方法（Events）

| 事件名称     | 说明               | 回调参数           |
|----------|------------------|----------------|
| onFinish | loadData方法执行结束触发 | function(data) |

### 插槽（Slots）

| 插槽名     | 说明                                                                                      |
|---------|-----------------------------------------------------------------------------------------|
| default | 默认插槽，loadData事件结束后，进行渲染。使用方式：<template #default="{record}"></template>，其中`record`为返回的数据 |
| empty   | 自定义错误提示                                                                                 |

