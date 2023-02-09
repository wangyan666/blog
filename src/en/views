<template>
  <div class="imageList">
    <!-- 素材列表 -->
    <div class="bar" >
    <!-- radios -->
    <el-radio-group v-model="radio1" size="medium" @change="refreshImg(radio1)">
      <!-- 不加prevent会触发两次 -->
      <el-radio-button :label=false >全部</el-radio-button>
      <el-radio-button :label=true >收藏</el-radio-button>
    </el-radio-group>
    <!-- 上传图片 -->
    <el-button type="primary" size="medium" @click="uploadVisible = true" v-if="isShowUpload">上传</el-button>
  </div>
  <el-row :gutter="18" class="row">
    <el-col
     :xs="12"
     :sm="8"
     :md="6"
     :lg="4"
     :xl="4"
      v-for="(image, index) in images"
    :key="index"
    @click.native="ticked===index ? ticked = null : ticked = index"
    >
      <el-image
        class="image"
        style=" height: 180px;width: 100%"
        :src="image.url"
        fit="cover"
      :preview-src-list="isShowPreview || images.map(item => item.url)"
      >
      </el-image>
      <div class="icons" v-loading = "image.loading" element-loading-spinner="el-icon-loading" v-if="isShowIcons">
          <i
        @click="onFavor(image)"
        :class="{
          'el-icon-star-on' : true,
          'favor' : Boolean(image.favor)
        }"></i>
          <i
        class="el-icon-delete-solid"
        @click="onDelete(image)"
        ></i>
      </div>
      <!-- 遮罩对号 -->
      <div class="tickCover" v-if="ticked === index && isShowTick"></div>
    </el-col>

  </el-row>
  <!-- 分页 -->
  <el-pagination
   :disabled="loading"
    layout="prev, pager, next"
    :total="imageNumber"
    @current-change="onPageChange"
    :current-page.sync = imgConfig.page
    :page-size= imgConfig.pageSize
    >
  </el-pagination>
    <!-- /素材列表 -->

    <!-- 弹出层 -->
    <el-dialog title="上传素材" :visible.sync="uploadVisible" :append-to-body="true">
      <el-upload
        v-if="uploadVisible"
        :action ="action"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :multiple="true"
        name="image"
        :on-success="uploaded"
        >
        <i class="el-icon-plus"></i>
      </el-upload>
      <!-- 显示大图dialog -->
      <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-dialog>

  </div>
</template>

<script>

import { getImagesRequest, getTotalRequest, favorRequest, deleteRequest } from '@/api/image.js'
import HOST from '@/conf.js'
export default {
  name: 'ImageList',
  props: {
    isShowUpload: {
      type: Boolean,
      default: true
    },
    isShowIcons: {
      type: Boolean,
      default: true
    },
    isShowPreview: {
      type: Array,
      default: null
    },
    isShowTick: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      action: `http://${HOST}:3000/api/upload/materialImages`,
      radio1: false, // true表示收藏，false全部
      images: [],
      uploadVisible: false,
      // 图片上传相关
      dialogImageUrl: '',
      dialogVisible: false,
      imgConfig: {
        page: 1,
        pageSize: 12,
        favor: null
      },
      // 分页相关
      imageNumber: 0,
      // 换页loading
      loading: false,
      ticked: null
    }
  },

  methods: {
    uploaded () {
      // 上传完成后刷新，以及删除完成后刷新
      this.getImages(this.imgConfig)
      this.getTotal(this.imgConfig.favor)
    },
    refreshImg (flag) {
      // null表示获取全部图片
      this.ticked = null
      this.imgConfig.page = 1
      this.imgConfig.favor = null
      if (flag) this.imgConfig.favor = 1
      this.getImages(this.imgConfig)
      this.getTotal(this.imgConfig.favor)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 分页改变时
    onPageChange (page) {
      this.loading = true // 翻页禁用
      this.imgConfig.page = page
      this.getImages(this.imgConfig)
      this.ticked = null
    },

    // 获取图片
    getImages (confObj) {
      // console.log('InitImages Done')
      getImagesRequest(confObj)
        .then((val) => {
          // console.log(val)
          val.data.data.forEach(item => { item.loading = false })
          this.images = val.data.data
          this.loading = false
          // console.log(this.images)
        })
    },
    // 获取总数
    getTotal (flag) {
      getTotalRequest(flag)
        .then((val) => {
          const number = val.data.data['COUNT(*)']
          this.imageNumber = number
        })
    },
    // 点击收藏
    onFavor (img) {
      img.loading = true
      favorRequest(img.id)
        .then((val) => {
          this.getImages(this.imgConfig)
          img.loading = false
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        })
    },
    // 点击删除
    onDelete (img) {
      // console.log(this.imgConfig.page)
      img.loading = true
      deleteRequest(img.id)
        .then((val) => {
          // console.log(val)
          // console.log(this.imgConfig)
          if (this.imageNumber % this.imgConfig.pageSize === 1 && this.imgConfig.page !== 1) this.imgConfig.page = this.imgConfig.page - 1
          // ******************************当被删除的是该页最后一个数据时，展示前一页的数据，第一页除外
          // console.log(this.imageNumber, this.imgConfig.pageSize, this.imageNumber % this.imgConfig.pageSize)
          // console.log(this.imgConfig.page)
          this.getTotal(this.imgConfig.favor)// 先获取分页数据
          this.getImages(this.imgConfig)
          img.loading = false
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
    }
  },

  mounted () {
    this.refreshImg(false)
  }
}
</script>

<style lang = "less" scoped>
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

  .tickCover{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    height: 100%;
    background: url('./tick.png') no-repeat;
    background-size: 80%;
    background-position: center;
  }

</style>
