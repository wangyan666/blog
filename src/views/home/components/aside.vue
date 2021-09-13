<template>
  <el-menu
      router
      background-color="#40407a"
      text-color="#fff"
      active-text-color="#ffc048"
      default-active=""
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="">
        <i class="iconfont icon-shouyex"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="content">
        <i class="iconfont icon-neirongguanli1"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="material">
        <i class="iconfont icon-sucai"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="publish">
        <i class="iconfont icon-fabu2"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="comment">
        <i class="iconfont icon-tubiaozhizuo-"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="fans">
        <i class="iconfont icon-fensiguanli"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="setting">
        <i class="iconfont icon-shezhi"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'Aside',
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo{
    height: 100%;
  }

  // 设置icon样式
  i{
    font-size: 20px;
    margin-right: 12px;
  }
</style>
