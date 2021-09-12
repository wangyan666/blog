<template>
  <div class="head">

            <div>
              <i class="el-icon-star-off"></i>
              <span>博客Blogs</span>
            </div>

            <el-dropdown>
            <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
    </div>
</template>

<script>
export default {
  name: 'Head'
}
</script>

<style lang="less" scoped>
  /* 设置字体样式 */
  i{

    font-size: 24px;
  }
  .head{
    height: 100%;
    display: flex;
    justify-content: space-between;
    // align-content: center;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
