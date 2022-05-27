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
      }
    ]
  }
];

export default homeRouter;
