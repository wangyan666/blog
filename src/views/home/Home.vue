<template>
    <el-container class="layout-container">
      <el-aside class="aside" width="200px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Head></Head>
        </el-header>
        <el-main class="main">
          <!-- 子路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>

import Aside from './components/aside.vue'
import Head from './components/head.vue'

export default {
  name: 'Home',
  components: { Aside, Head }
}
</script>

<style lang="less" scoped>
  .layout-container{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

      .aside{
      background-color: #808e9b;
      }

      .main{
      background-color: #f5f6fa;
      }
  }
</style>
