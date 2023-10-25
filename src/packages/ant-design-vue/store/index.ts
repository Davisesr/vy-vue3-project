import {defineStore} from "pinia" // 定义容器
import {ref} from 'vue'
import type {Locale} from 'ant-design-vue/es/locale-provider';
import zh_CN from 'ant-design-vue/es/locale/zh_CN';


/**
 * 国际化处理
 */
export const useAntDStore = defineStore(
  'antDStore',
  () => {

    /**
     * 主题
     */
    const theme = ref<'light' | 'dark' | 'compact'>('light')

    /**
     * 语言
     */
    const locale = ref<Locale>(zh_CN)

    /**
     * 设置语言
     * @param data
     */
    const setLocale = (data: Locale) => {
      if (data) {
        locale.value = data
      }
    }

    return {
      theme,
      locale,
      setLocale
    }
  })
