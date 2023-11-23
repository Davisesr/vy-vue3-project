<template>

</template>

<script lang='ts'>
/**
 * 时间：2023/7/12 13:31
 */
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import type { Dic } from '../types'
import {useDictionaryStore} from "./store"

export default defineComponent({

  props: {
    modelValue: {
      type: Object as PropType<Dic>,
      required: true
    }
  },

  emits: ['update:modelValue'],

  /**
   * @param props 接收外部参数，且在 上述prop中声明的参数
   * @param context {attrs, slots, emit}
   *    attrs 接收外部参数，不在 上述prop中申明的参数
   *    slots 插槽
   *    emit （派发）emit 传递给父组件
   */
  setup(props, { emit }) {
    const dictionaryStore = useDictionaryStore()
    const names = (props.modelValue && Object.keys(props.modelValue)) || []
    dictionaryStore.loadByNames(names).then(dictionaryList => {
      const data:any = {}
      names.forEach(name => {
        const item = dictionaryList.find(item => item.name === name)
        try {
          data[name] = JSON.parse(item.property) || []
        } catch (e) {
          console.error(`字典${item.name}不是json格式`)
        }
      })
      emit('update:modelValue', data)
    })
  }

})
</script>

<style lang='less' scoped>

</style>