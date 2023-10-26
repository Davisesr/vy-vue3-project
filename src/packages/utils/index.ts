import {ref,customRef, onMounted, onUnmounted} from "vue"

/**
 * 创建者：杜家源
 * 时间：2023/9/17
 * 文件详情：自定义 防抖的 ref
 * @param value 值
 * @param duration 防抖时间 1000毫秒
 */
export function useDebounceRef(value:any, duration = 1000) {
  let timer:any
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(val) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          trigger();
          value = val
        }, duration);
      }
    }
  })
}

/**
 * 创建者：杜家源 <br/>
 * 时间：2023/9/16 <br/>
 * 文件详情：优化页面中的循环渲染组件问题，配合 v-for、v-if使用 <br/>
 * 用法：
 * <div v-for="(v,i) in 100" :key="i">
 *   <div v-if="useDefer(i)">
 *   </div>
 * </div>
 */
export function useDefer(maxCount = 100) {

  // 记录
  const frameCount = ref(0)
  let refId: any;

  // 加载
  onMounted(() => {
    updateFrameCount();
  })

  // 卸载
  onUnmounted(() => {
    cancelAnimationFrame(refId);
  })

  /**
   * 设置边界
   */
  function updateFrameCount() {
    refId = requestAnimationFrame(() => {
      frameCount.value++;
      if (frameCount.value < maxCount) {
        updateFrameCount();
      }
    })
  }

  /**
   * 判断是否需要渲染
   * @param n
   */
  return function defer(n: number) {
    return frameCount.value >= n
  }
}
