import {ref,customRef, onMounted, onUnmounted} from "vue"

import globalConfig from "@/config"

class Util{
  /**
   * 创建者：杜家源 <br/>
   * 时间：2023年11月7日 <br/>
   * 功能简介：生成唯一不重复ID <br/>
   * 输入：字符串前缀、无参 <br/>
   * 输出：唯一不重复ID <br/>
   * 用法: Util.UUID("前缀");
   * @param prefix 字符串前缀（非必填） <br/>
   */
  UUID(prefix = ''): string {
    return prefix + Number(Date.now()).toString(36) + Number(Math.random().toString().substring(2)).toString(36)
  }

  /**
   * 创建者：杜家源 <br/>
   * 时间：2023/9/16 <br/>
   * 功能简介：优化页面中的循环渲染组件问题，配合 v-for、v-if使用 <br/>
   * 输入：最大渲染数 <br/>
   * 输出：boolean值 <br/>
   * 用法：
   *  <div v-for="(v,i) in 100" :key="i">
   *    <div v-if="useDefer(i)"></div>
   *  </div>
   * @param maxCount 最大数
   */
  useDefer(maxCount = 100) {

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
    return ((n: number) => (frameCount.value >= n))
  }

  /**
   * 创建者：杜家源 <br/>
   * 时间：2023/9/17 <br/>
   * 功能简介：自定义 防抖的 ref <br/>
   * 输入：value:值、duration:防抖时间 <br/>
   * 输出：value <br/>
   *
   * @param value 值
   * @param duration 防抖时间 1000毫秒
   */
  useDebounceRef(value:any, duration = 1000) {
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
   * 时间：2023年11月7日 <br/>
   * 功能简介：拼接得到文件URL <br/>
   * 输入：uri <br/>
   * 输出：完整的文件地址 <br/>
   * @param uri 文件地址
   */
  fileUri(uri: string | undefined): string {
    if (!uri) {
      return ''
    }
    if (uri.indexOf('https://') === 0 || uri.indexOf("http://") === 0 || uri.indexOf('data:image/') === 0 || uri.indexOf('blob:') === 0) {
      return uri
    }
    const fileBucket = globalConfig?.bucKetName || 'website'
    return globalConfig.fileHostUrl + '/' + fileBucket + '/' + encodeURIComponent(uri).replace(/%2F/g, '/')
  }

  /**
   *
   * @param data
   * @param replaceFields
   */
  listToChildren<T>(data: T[], replaceFields ?: any | string): T[] {
    if (!data || !data.length) {
      return []
    }

    return data
  }

  /**
   *
   * @param treeData
   * @param replaceFields
   */
  childrenToList<T>(treeData: T[], replaceFields?: any | string): T[] {

    return  treeData
  }

}

export default new Util();