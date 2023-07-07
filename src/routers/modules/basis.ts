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
          key: "basis",
        },
      },
      {
        path: "mouse",
        name: "mouse",
        component: () => import("../../views/mouse.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "鼠标滚轮事件",
          key: "mouse",
        },
      },
      {
        path: "group",
        name: "group",
        component: () => import("../../views/group.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "物体的组合运动 group",
          key: "group",
        },
      },
      {
        path: "movingCart",
        name: "movingCart",
        component: () => import("../../views/movingCart.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "运动的车子",
          key: "movingCart",
        },
      },
      {
        path: "fullscreen",
        name: "fullscreen",
        component: () => import("../../views/fullscreen.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "双击全屏",
          key: "fullscreen",
        },
      },
      {
        path: "deBugUi",
        name: "deBugUi",
        component: () => import("../../views/deBugUi.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "调试ui",
          key: "deBugUi",
        },
      },
      {
        path: "textures",
        name: "textures",
        component: () => import("../../views/textures.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "纹理",
          key: "textures",
        },
      },
      {
        path: "materials",
        name: "materials",
        component: () => import("../../views/materials.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "材质",
          key: "materials",
        },
      },
      // {
      //   path: "3dText",
      //   name: "3dText",
      //   component: () => import("../../views/3d_text.vue"),
      //   meta: {
      //     keepAlive: true,
      //     requiresAuth: true,
      //     title: "3D Text",
      //     key: "3dText",
      //   },
      // },
      {
        path: "light",
        name: "Light",
        component: () => import("../../views/light.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "光照",
          key: "light",
        },
      },
      {
        path: "shadow",
        name: "Shadow",
        component: () => import("../../views/shadow.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "阴影",
          key: "shadow",
        },
      },
      {
        path: "GLTF",
        name: "GLTF",
        component: () => import("../../views/GLTF.vue"),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "GLTF",
          key: "GLTF",
        },
      },
    ],
  },
  {
    path: "/model",
    component: () => import("../../views/glb.vue"),
  },
];

export default homeRouter;
