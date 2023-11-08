<template>

</template>

<script lang="ts">
/**
 * 时间：2023/9/12 11:28
 */
import {defineComponent} from 'vue'

export default defineComponent({
  props: {},

  /**
   * @param props 接收外部参数，且在 上述prop中声明的参数
   * @param context {attrs, slots, emit}
   *    attrs 接收外部参数，不在 上述prop中申明的参数
   *    slots 插槽
   *    emit （派发）emit 传递给父组件
   */
  setup(props, {attrs, slots, emit}) {
    console.log("【2023/9/12 11:28】 prop", props)
    console.log("【2023/9/12 11:28】", attrs, slots, emit)

    return {}
  }

})
</script>

<style lang="less" scoped>

</style>
