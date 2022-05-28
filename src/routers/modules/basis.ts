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
      }
    ]
  }
];

export default homeRouter;
