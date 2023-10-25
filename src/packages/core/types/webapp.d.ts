export class WebappOptions {
  // 初始地址
  baseUrl: string

  // 应用名
  appName: string

  // 基础路由
  basicsRoutes: any[]

  //需要权限的路由
  permissionRoutes?: any[]
}
