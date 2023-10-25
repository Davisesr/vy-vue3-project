/**
 * 创建者：杜家源
 * 时间：2023/9/16
 * 文件详情：$END$
 */
export interface DialogComponentOptions extends Record<string, any> {

  /**
   * 传输的数据，组件通过props接收
   * props: {
   *     record: Object
   *   },
   */
  record?: { [key: string]: any } | string

  /**
   * 子组件通知 this.$emit('ok',values)
   * @param arguments
   */
  ok?: (values: any, arg1: any, arg2: any) => any

  /**
   * 子组件通知 this.$emit('close',values)
   * @param arguments
   */
  close?: (values: any, arg1: any, arg2: any) => any

}
