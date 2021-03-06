import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// * 导入所有router
const metaRouters = import.meta.globEager("./modules/*.ts");

// * 处理路由
export const routerArray: RouteRecordRaw[] = [];
Object.keys(metaRouters).forEach(item => {
  Object.keys(metaRouters[item]).forEach((key: any) => {
    routerArray.push(...metaRouters[item][key]);
  });
});

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'basis' }
  }, ...routerArray];

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: false,
  // 切换页面，滚动到最顶部
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
