import {createWebappRouter} from '@/packages/core'
import admin from "@/webapp/admin"
import template from "@/webapp/template"
import website from "@/webapp/website"

const router = createWebappRouter({
    mode: 'history',
    webapps: [
        admin,
        website,
        template
    ]
})

export default router
