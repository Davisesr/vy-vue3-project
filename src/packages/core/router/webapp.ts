import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import type {WebappOptions} from "../types/webapp";

export default class Webapp {

  /**
   * 基础路由 如
   * http://xxx.com/abc 值是 /abc
   */
  baseUrl: string = '/'

  /**
   * 应用名称
   */
  appName: string = ''

  /**
   * 基础路由
   */
  basicsRoutes = []

  /**
   * 需要权限的路由
   */
  permissionRoutes: any[] = []

  constructor(webappOptions: WebappOptions) {
    Object.assign(this, webappOptions)
  }

  /**
   * 路由跳转开始
   * @param to
   * @param from
   * @param next
   */
  public beforeEach(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    // 进行登录判断
    next()
  }


  public afterEach(to: RouteLocationNormalized) {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      // @ts-ignore
      document.title = to.meta.title
    }
  }
}
