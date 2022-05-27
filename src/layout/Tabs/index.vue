<template>
  <div class="tabs-box">
    <!-- <div class="tabs-menu">
      <el-tabs v-model="tabsMenuValue" type="card" tab-position="top" @tab-click="tabClick" @tab-remove="removeTab">
        <el-tab-pane v-for="item in tabsMenuList" :key="item.path" :label="item.title" :name="item.path"
          :closable="item.close">

        </el-tab-pane>
      </el-tabs>

    </div> -->
  </div>
</template>

<script setup lang="ts">import { TabsPaneContext } from 'element-plus';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import { TabsStore } from '../../store/modules/tabs';

// const tabStore = TabsStore();
// const route = useRoute();
// const router = useRouter();


// const tabsMenuList = computed(() => tabStore.tabsMenuList);
// const tabsMenuValue = computed({
//   get: () => {
//     return tabStore.tabsMenuValue;
//   },
//   set: val => {
//     tabStore.setTabsMenuValue(val);
//   }
// });

// watch(
//   () => route.path,
//   () => {
//     let params = {
//       title: route.meta.title as string,
//       path: route.path,
//       close: true
//     };
//     tabStore.addTabs(params);
//   },
//   {
//     immediate: true
//   }
// );

// const tabClick = (tabItem: TabsPaneContext) => {
//   let path = tabItem.props.name as string;
//   router.push(path);
// };

// const removeTab = (activeTabPath: string) => {
//   tabStore.removeTabs(activeTabPath);
// };

</script>

<style scoped>
</style>
