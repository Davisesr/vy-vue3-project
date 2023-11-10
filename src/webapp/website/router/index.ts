import type {RouteRecordRaw} from 'vue-router'

export const basicsRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../layout/Index.vue'),
        meta: {title: '案例'},
        children: []
    }
]
