import type {RouteRecordRaw} from 'vue-router'

export const basicsRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../layout/Index.vue'),
        meta: {title: '后台管理'},
        children: []
    }
]
