<template>
  <div>
        <el-card class="setting-card">
          <el-col :span = 15>
            <el-form :label-position="labelPosition" label-width="80px" :model="userInfo">
              <el-form-item label="用户名">
                {{userInfo.username}}
              </el-form-item>
              <el-form-item label="手机">
                {{userInfo.phone}}
              </el-form-item>
              <el-form-item label="个人主页">
                <el-input v-model="userInfo.page"></el-input>
              </el-form-item>
              <el-form-item label="个人介绍">
                <el-input v-model="userInfo.introduction" type="textarea" :rows="4" placeholder="这个人很懒，什么也没说"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="userInfo.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="keepModi">保存修改</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6" :offset=3 :xs="24">
            <div class="avatar-wrapper" @click="$refs.file.click()">
              <el-avatar :size="156" :src="userInfo.avatar" class="avatar">
              </el-avatar>
              <div class="avatar-cover">点击修改头像</div>
            </div>
            <input type="file" name="" id="" ref="file" @change="onFileChange">
          </el-col>
        </el-card>
          <!-- 弹出层 -->
          <el-dialog
            title="修改图片"
            append-to-body
            :visible.sync="dialogVisible"
            width="40%"
            @opened="onDialogOpened"
            @closed="onDialogClosed"
            >
                  <div>
                    <img id="image" :src="previewURL" class="previewImg"  ref="image-ref">
                  </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="onAvatarUpdate" :loading="loading">确 定</el-button>
            </span>
          </el-dialog>
  </div>
</template>

<script>
import { getUserInfoRequest, updateUserProfile } from '@/api/user.js'
import { updateAvatar } from '@/api/setting.js'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import $BUS from '@/utils/Bus.js'

export default {
  name: 'Setting',
  data () {
    return {
      labelPosition: 'left',
      userInfo: {
        username: '',
        page: '',
        phone: '',
        introduction: '',
        email: '',
        avatar: ''
      },
      dialogVisible: false,
      previewURL: '',
      cropper: null,
      loading: false
    }
  },
  methods: {
    keepModi () {
      updateUserProfile(this.userInfo)
        .then((val) => {
          // console.log(val)
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        })
    },
    onFileChange () {
      const fileDom = this.$refs.file
      const BlobData = window.URL.createObjectURL(fileDom.files[0])
      this.previewURL = BlobData
      this.$refs.file.value = ''
      this.dialogVisible = true
    },
    onDialogOpened () {
      // 裁剪
      const image = this.$refs['image-ref']
      if (this.cropper) {
        this.cropper.replace(this.previewURL)
        return
      }
      this.cropper = new Cropper(image, {
        aspectRatio: 1 / 1,
        dragMode: 'none',
        viewMode: 1,
        crop (event) {
          // console.log(event.detail.x)
          // console.log(event.detail.y)
          // console.log(event.detail.width)
          // console.log(event.detail.height)
          // console.log(event.detail.rotate)
          // console.log(event.detail.scaleX)
          // console.log(event.detail.scaleY)
        }
      })
    },

    onDialogClosed () {
      // this.cropper.destroy()
    },
    onAvatarUpdate () {
      this.loading = true
      this.cropper.getCroppedCanvas().toBlob(blob => {
        // console.log(blob)
        const fd = new FormData()
        fd.append('avatar', blob)
        updateAvatar(fd)
          .then((val) => {
            console.log(val)
            this.dialogVisible = false
            // this.userInfo.avatar = val.data  比较慢，需要再发请求
            this.userInfo.avatar = window.URL.createObjectURL(blob)
            this.loading = false
            this.$message({
              message: '头像更新成功',
              type: 'success'
            })
            // 更新顶部 头像
            $BUS.$emit('updateProfile', this.userInfo.avatar)
          })
      })
    }
  },

  // 生命周期钩子
  mounted () {
    getUserInfoRequest()
      .then((val) => {
        this.userInfo = val.data.data
        // console.log(this.userInfo)
      })
  }

}
</script>

<style lang="less" scoped>
.setting-card {
    width: 84%;
    margin-left: 22px;
  }

  .el-avatar{
  }
  // .el-col{
  //   height: 100%;
  // }

  input[type=file]{
    display: none;
  }
  .avatar{
    &:hover{
      cursor: pointer;
      // overflow: hidden;
      // height: 200px;
    }
  }

   .avatar-cover{
      // display: none;
      text-align: center;
      line-height: 156px;
      color: #fff;
      visibility: hidden;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      width: 156px;
      height: 156px;
      background-color:  rgba(29,33,41,.5);
    }

    .avatar-wrapper{
      position: relative;
      // height: 400px;
      width: 156px;
      height: 156px;
      border-radius: 50%;
      overflow: hidden;
      margin-top: 40px;
      margin-bottom: 20px;
    // margin-bottom: 20px;
    &:hover  .avatar-cover{
      visibility: visible;
    }
    }
    /* Ensure the size of the image fit the container perfectly */
    .previewImg{
      display: block;

  /* This rule is very important, please don't ignore this */
      max-width: 100%;
      // max-height: 1200px;
    }
</style>
