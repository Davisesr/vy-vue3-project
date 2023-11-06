import {createWebappRouter} from '@/packages/core'
import admin from "@/webapp/admin"
import template from "@/webapp/template"

const router = createWebappRouter({
    mode: 'history',
    webapps: [
        admin,
        template
    ]
})

export default router
