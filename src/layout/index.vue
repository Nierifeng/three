<template>
  <el-container>
    <el-aside>
      <Menu class="menu"></Menu>
    </el-aside>
    <el-container>
      <el-main>
        <section class="main-box">
          <router-view v-slot="{ Component, route }">
            <component :is="Component" :key="route.path"></component>
          </router-view>
        </section>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Footer from './Footer/index.vue';
import Menu from './Menu/index.vue';

</script>

<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
  min-width: 960px;
  min-height: 100vh;
  display: flex;

  .el-aside {
    width: auto;
    background: #20222a;
    overflow: inherit;

    .menu {
      width: 200px;
    }
  }

  .el-header,
  .el-footer {
    height: auto;
    padding: 0;
  }

  .el-main {
    background: #f0f2f5;
    padding: 10px 13px;
    box-sizing: border-box;
    // 防止切换出现横向滚动条
    overflow-x: hidden;

    .main-box {
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      border-radius: 4px;
      padding: 20px;
      box-sizing: border-box;
      overflow: auto;
      overflow-x: hidden !important;

      &::-webkit-scrollbar {
        background-color: white;
      }
    }
  }
}
</style>
