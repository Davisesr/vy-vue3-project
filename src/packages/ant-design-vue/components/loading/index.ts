import {ref, createApp, render, h} from 'vue'
import {Spin} from 'ant-design-vue'

import type {App} from "vue";
import type {LoadingParameConfig} from "../../types/loading.d"

function loadingInstance(loadingOptions: LoadingParameConfig) {
  return createApp({
    data() {
      return {
        size: loadingOptions.size || 'large',
        text: loadingOptions.text,
        delay: loadingOptions.delay || 300,
        style: {
          textAlign: 'center',
          background: 'rgba(0,0,0,0.6)',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          display: 'none'
        },
        spinStyle: {
          position: 'absolute',
          width: '100%',
          left: '0',
          top: '40%'
        }
      }
    },
    render() {
      if (this.delay) {
        setTimeout(() => {
          this.style.display = 'block'
        }, this.delay)
      } else {
        this.style.display = 'block'
      }

      // 2、Spin组件
      const SpinRender = h(
        Spin,
        {
          style: this.spinStyle,
          size: this.size,
          tip: this.text
        }
      )

      // 3、返回需要渲染的组件（再套上层语言国际化处理）
      return h(
        'div',
        {
          style: this.style
        },
        {
          default: () => [SpinRender]
        }
      )
    }
  })
}

export class Loading {
  app: App
  dialogDiv: HTMLDivElement

  /**
   * 构造函数
   * @param loadingOptions 参数
   */
  constructor(loadingOptions: LoadingParameConfig) {
    this.app = loadingInstance(loadingOptions)
    this.dialogDiv = document.createElement('div');
    document.body.appendChild(this.dialogDiv);
    this.app.mount(this.dialogDiv);
  }

  /**
   * 关闭
   */
  close() {
    this.app.unmount()
    this.dialogDiv.remove()
  }
}