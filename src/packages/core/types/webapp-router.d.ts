import {Router, RouterOptions, RouteRecordRaw} from 'vue-router';
import type {RouterHistory} from 'vue-router';


export interface WebappRouterOptions extends RouterOptions {
  /**
   * 路由模式，支持 'hash' | 'history'
   */
  mode: 'history' | 'hash'
  webapps: any,
  history?: RouterHistory;
  routes?: Readonly<RouteRecordRaw[]>;
}

export declare function createWebappRouter(options: WebappRouterOptions): Router;