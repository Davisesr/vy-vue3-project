<template>
  <div class='full-height'>
    <a-spin :spinning='spinning' :tip='tip'>
      <template v-if='errorMessage'>
        <div style='text-align: center;'>
          <div style='color: #ff4d4f;margin: 5px 0'>
            <exclamation-circle-outlined style='font-size: 16px'/>
            {{ errorMessage }}
          </div>
          <a-button type='primary' danger @click='reload()' :loading='spinning' :disabled='spinning'>
            再试一次
          </a-button>
        </div>
      </template>
      <template v-else-if='isEmpty(record)'>
        <slot name='empty' v-if='$slots.empty'/>
        <a-empty v-else/>
      </template>
      <slot :record='record' v-else/>
    </a-spin>
  </div>
</template>

<script lang='ts' setup>
/**
 * 时间：2023/7/13 14:52
 */
import {onMounted, ref, defineEmits, defineProps, defineExpose} from 'vue'
import type {PropType} from 'vue'
import {ExclamationCircleOutlined} from '@ant-design/icons-vue'

const props = defineProps({
  /**
   * 加载数据
   */
  loadData: {
    type: Function as PropType<() => Promise<any>>,
    required: true
  },
  /**
   * 当作为包裹元素时，可以自定义描述文案
   */
  tip: {
    type: String,
    default: '数据加载中……'
  },
  /**
   * 显示无数据
   */
  showEmpty: {
    type: Boolean,
    default: true
  }
});
const emits = defineEmits(['onFinish']);

const record = ref<any>(null)
const spinning = ref<boolean>(false)
const errorMessage = ref<string>('')

loadDataHandler()

/**
 * 加载数据
 */
function loadDataHandler() {
  spinning.value = true
  props.loadData().then(data => {
    record.value = data
    errorMessage.value = ''
    emits('onFinish', data)
    return Promise.resolve(data)
  }).catch(error => {
    errorMessage.value = error?.message || '未知错误'
    return Promise.reject(error)
  }).finally(() => {
    spinning.value = false
  })
}

/**
 * 重新加载数据
 * @param showSpinning 显示加载动画
 */
function reload(showSpinning = true) {
  if (showSpinning) {
    loadDataHandler()
  } else {
    props.loadData().then(data => {
      record.value = data
    })
  }
}

/**
 * 无数据判断
 * @param data
 */
function isEmpty(data: any) {
  if (spinning.value) {
    return false
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return props.showEmpty
  }

  return false
}

// 抛出
defineExpose({
  reload
});
</script>

<style lang='less' scoped>
.full-height {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  :deep(.ant-spin-nested-loading) {
    height: 100%;
    width: 100%;

    .ant-spin-container {
      height: 100%;
      width: 100%;
    }
  }
}
</style>