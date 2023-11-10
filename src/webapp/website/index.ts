import {basicsRoutes} from './router'
import {BaseWebapp} from '@/packages/core'

class Webapp extends BaseWebapp {
}

export default new Webapp({
  baseUrl: "/",
  appName: '案例',
  basicsRoutes: basicsRoutes,
  permissionRoutes: []
})
