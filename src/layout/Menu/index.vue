<template>
  <div class="menu">
    <el-scrollbar>
      <el-menu :default-active="activeMenu" :router="true" :unique-opened="true" background-color="#20222a"
        text-color="#bdbdc0" active-text-color="#fff">
        <SubItem :menuList="menuList"></SubItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { MenuStore } from '../../store/menu';
import { MenuOptions } from '../../store/models';
import SubItem from './components/SubItem.vue';
const route = useRoute();

const menuStore = MenuStore();

const activeMenu = computed((): string => route.path);

const menuList = computed((): MenuOptions[] => menuStore.menuList);

// interface Prop {
//   title: string;
//   list?: Array<number>;
// }
// withDefaults(defineProps<Prop>(), {
//   title: '默认值'
// })
// defineProps<Prop>() // 属性
// const emit = defineEmits(['on-click'])  // 事件

// const list = reactive([6, 7, 8]);

// const clickTap = () => {
//   emit('on-click', list)
// }
// const funa = () => {
//   console.log(1);
// }
// defineExpose({ list, funa }) // 将值传给父组件 父组件可以通过ref.value 拿到

</script>

<style lang="less" scoped>
.menu {
  transition: all 0.3s ease;
  background: #20222a;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  .el-scrollbar {
    height: calc(100% - 55px);

    .el-menu {
      flex: 1;
      overflow: auto;
      overflow-x: hidden;
      border-right: none;

      &::-webkit-scrollbar {
        background-color: #20222a;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #41444b;
      }

      .el-menu-item {
        &.is-active {
          background-color: #060708 !important;
        }

        &.is-active::before {
          content: "";
          top: 0;
          left: 0;
          bottom: 0;
          width: 4px;
          background: #409eff;
          position: absolute;
        }
      }
    }
  }
}
</style>
