import {createWebappRouter} from '@/packages/core'
import admin from "@/webapp/admin"

const router = createWebappRouter({
  mode: 'history',
  webapps: [
    admin
  ]
})

export default router
