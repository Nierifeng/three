import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

// * 导入所有router
// const metaRouters = import.meta.globEager("./modules/*.ts");
const metaRouters: Record<string, any> = import.meta.glob("./modules/*.ts", {
  eager: true,
});

// * 处理路由
export const routerArray: RouteRecordRaw[] = [];
Object.keys(metaRouters).forEach((key) => {
  routerArray.push(...metaRouters[key].default);
});

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: { name: "basis" },
  },
  ...routerArray,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: false,
  // 切换页面，滚动到最顶部
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
