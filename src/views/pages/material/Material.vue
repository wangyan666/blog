<template>
<div class="material-container">
  <el-card class="material-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
  </div>

  <!-- 图片列表 -->
    <ImageList></ImageList>
  <!-- /图片列表 -->
</el-card>

</div>
</template>

<script>
import ImageList from './components/imageList.vue'
export default {
  name: 'Material',
  components: { ImageList }

}
</script>

<style lang = "less" scoped>

  .material-card {
    width: 90%;
    margin-left: 22px;
  }

  .bar {
    display: flex;
    justify-content: space-between;
    margin-right: 18px;
  }

  .row {
  padding: 0 5px;
  padding-top: 22px;
  }

  .el-col {
    position: relative;
    margin-bottom: 30px;

    .image {
    border-radius: 2px;
    transition: all .2s linear;
    &:hover {
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      transform: translate3d(0,-2px,0);
    }
    &:hover+.icons {
      transform: translate3d(0,-2px,0);
    }
    }

    .icons {
      transition: all .2s linear;
      position: absolute;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 36px;
      /* width: 100%; */
      bottom: 3px;
      left: 9px;
      right: 9px;
      background-color: rgba(210, 218, 226,0.52);
      font-size: 30px;
      color: #fff;

      i {
        cursor: pointer;
        transition: all .1s linear;
      }
      .favor{
          color: #ffdd59;
        }
      i:nth-of-type(1) {
        &:hover{
          color:#ffdd59;
      }
      }
      i:nth-of-type(2) {
        font-size: 22px;
        &:hover{
          color:#f53b57;
        }
      }
    }
  }

  /deep/.el-icon-delete:before {
    content:''
  }
  /deep/.el-upload-list--picture-card .el-upload-list__item-actions span+span {
    margin-left: 0;
  }

</style>
