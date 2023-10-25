import VyDictionary from './src/VyDictionary.vue'

import dictionaryApi from "./src/api/index"
import type { DictionaryItemOptions } from './types'


/**
 * 字典文字匹配，可以匹配子集
 * 1、字典匹配成功，字典映射
 * 2、匹配失败，直接返回源数据
 * @param dictionaryData 字典
 * @param value 值
 */
function getDictionaryLabel(dictionaryData: DictionaryItemOptions[], value: any): string | null {

  let temp = value

  // 无字典，直接返回 value
  if (!Array.isArray(dictionaryData)) {
    return temp
  }

  // 查询一级字典
  const dictOptions = dictionaryData?.find(t => t.value === value)
  if (dictOptions) {
    return dictOptions && dictOptions.label
  }

  // 一级未找到，查询子
  dictionaryData?.forEach(item => {
    const children: DictionaryItemOptions[] = item?.children || []
    // 结束条件 temp != value
    if (temp === value && Array.isArray(children) && children.length > 0) {
      temp = getDictionaryLabel(children, value)
    }
  })

  return temp
}


/**
 * 获取级联 label
 * @param dictionaryData 字典
 * @param value 值
 * @param spacer 间隔符
 */
function getCascadeDicLabel(dictionaryData: DictionaryItemOptions[], value: any, spacer = ' / '): string {

  // 无字典，直接返回 value
  if (!Array.isArray(dictionaryData)) {
    return value
  }

  // 查询一级字典
  const dictOptions = dictionaryData?.find(t => t.value === value)
  if (dictOptions) {
    return dictOptions?.label
  }

  // 顶级未找到，查询各自的子集
  let temp: any[] = []
  dictionaryData?.forEach(item => {
    const children: DictionaryItemOptions[] = item?.children || []
    let tempLabel: string = ''
    // 结束条件
    if (temp.length === 0 && Array.isArray(children) && children.length > 0) {
      tempLabel = getCascadeDicLabel(children, value, spacer)
    }
    if (tempLabel != '') {
      temp.push(item.label)
      temp.push(tempLabel)
    }
  })
  return temp.join(spacer)
}

export {
  VyDictionary,
  dictionaryApi,
  getDictionaryLabel,
  getCascadeDicLabel
}