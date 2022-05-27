import { defineStore } from "pinia";
import { MenuOptions, MenuStoreState } from "./models";
import { StoreName } from "./store-name";

export const MenuStore = defineStore(StoreName.MenuStore, {
  state: (): MenuStoreState => ({
    menuList: [{
      // icon: 'home-filled',
      title: '基础的旋转',
      path: '/basis/index'
    }]
  }),
  actions: {
    setMenuList(menuList: MenuOptions[]) {
      this.menuList = menuList;
    }
  }
})
