import { RouteRecordRaw } from "vue-router";
import { Layout } from "../constant";

const homeRouter: Array<RouteRecordRaw> = [
  {
    path: "/basis",
    component: Layout,
    redirect: "/basis/index",
    children: [
      {
        path: "index",
        name: "basis",
        component: () => import("../../views/basic.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "基础",
          key: "basis"
        }
      }, {
        path: 'mouse',
        name: "mouse",
        component: () => import('../../views/mouse.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "鼠标滚轮事件",
          key: "mouse"
        }
      }, {
        path: 'group',
        name: "group",
        component: () => import('../../views/group.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "物体的组合运动 group",
          key: "group"
        }
      }, {
        path: 'movingCart',
        name: "movingCart",
        component: () => import('../../views/movingCart.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "运动的车子",
          key: "movingCart"
        }
      }, {
        path: 'fullscreen',
        name: 'fullscreen',
        component: () => import('../../views/fullscreen.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "双击全屏",
          key: "fullscreen"
        }
      }, {
        path: 'deBugUi',
        name: 'deBugUi',
        component: () => import('../../views/deBugUi.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "调试ui",
          key: "deBugUi"
        }
      }
    ]
  }
];

export default homeRouter;
