import VyAceEditor from "./src/Index.vue"

// 一定要先给name赋值，这样后面的局部install和全局install方法才能读到同一个name
VyAceEditor.name = 'VyAceEditor'

// 导出该组件
export {
  VyAceEditor
}