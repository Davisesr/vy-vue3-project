import {basicsRoutes} from './router'
import {BaseWebapp} from '@/packages/core'

class Webapp extends BaseWebapp {
}

export default new Webapp({
  baseUrl: "/admin",
  appName: '后台管理',
  basicsRoutes: basicsRoutes,
  permissionRoutes: []
})
