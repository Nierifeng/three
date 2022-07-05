import { defineStore } from "pinia";
import { MenuOptions, MenuStoreState } from "./models";
import { StoreName } from "./store-name";

export const MenuStore = defineStore(StoreName.MenuStore, {
  state: (): MenuStoreState => ({
    menuList: [{
      title: '基础的旋转',
      path: '/basis/index',
    }, {
      title: '基本的鼠标交互',
      path: '/basis/mouse',
    }, {
      title: '物体的组合运动 group',
      path: '/basis/group',
    }, {
      title: '运动的车子',
      path: '/basis/movingCart',
    }, {
      title: '双击全屏与动态渲染大小',
      path: '/basis/fullscreen',
    }, {
      title: '调试ui',
      path: '/basis/deBugUi',
    }, {
      title: '纹理',
      path: '/basis/textures',
    }, {
      title: '材质',
      path: '/basis/materials',
    }, {
      title: '3D Text',
      path: '/basis/3dText',
    }, {
      title: '灯光',
      path: '/basis/light',
    }]
  }),
  actions: {
    setMenuList(menuList: MenuOptions[]) {
      this.menuList = menuList;
    }
  }
})
