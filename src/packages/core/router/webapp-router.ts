import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import type {NavigationGuardNext, RouteLocationNormalized, Router} from 'vue-router';
import type {WebappRouterOptions} from "../types/webapp-router";

function webappRouter(options: WebappRouterOptions): Router {

  // 1、根据地址栏查找应用
  const findApp = options.webapps.find((app: any) => (location.pathname).indexOf(app.baseUrl) === 0)

  let webapp = options.webapps[0]
  if (!findApp) {
    webapp = options.webapps.find((app: any) => app.baseUrl === '/')
  } else {
    webapp = findApp
  }

  if (!webapp) {
    console.error('未找到应用')
  }

  // 2、设置路由模式
  if (options.mode === 'history') {
    options.history = createWebHistory(webapp.baseUrl)
  } else if (options.mode === 'hash') {
    options.history = createWebHashHistory(webapp.baseUrl)
  }

  // 3、设置路由
  options.routes = webapp.basicsRoutes || []

  // 4、创建路由
  // @ts-ignore
  const router = createRouter(options)

  // 5、路由跳转之前处理
  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (webapp.beforeEach) {
      webapp.beforeEach(to, from, next)
    } else {
      next()
    }
  })


  /**
   * 6、路由跳转结束
   */
  router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (webapp.afterEach) {
      webapp.afterEach(to, from)
    }
  })

  // 返回路由
  return router
}

export {
  webappRouter
}
