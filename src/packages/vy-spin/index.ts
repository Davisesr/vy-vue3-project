import VySpin from "./src/Index.vue"

// 一定要先给name赋值，这样后面的局部install和全局install方法才能读到同一个name
VySpin.name = 'VySpin'

// 为组件提供 install 安装方法，供按需引入
VySpin.install = (Vue: any) => {
  //VySpin.name 这就是后面可以使用的组件的名字，install是默认的一个方法
  Vue.component(VySpin.name, VySpin)
}

// 导出该组件
export default VySpin