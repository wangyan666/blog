<template>
  <div  class="head">
            <div class="head-left">
              <i class="el-icon-star-off"></i>
              <span>博客Blogs</span>
            </div>

            <el-dropdown v-if="isLogining">
            <div class="el-dropdown-link">
              <el-image
                :key="Date.now()"
                style="width: 50px; height: 50px; border-radius: 50%"
                :src="userInfo.avatar"
                :fit="fit">
                <div slot="error" style="height: 50px;width: 50px;text-align: center;line-height: 50px;font-size:30px;background-color:#dfe6e9" class="image-slot"><i class="el-icon-picture-outline"></i></div>
              </el-image>
              <!-- <img :src="userInfo.avator" alt="" style="width: 50px; height: 50px; border-radius: 50%"> -->
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="goPage('http://www.baidu.com')">百度一下</el-dropdown-item>
              <el-dropdown-item @click.native="goPage('https://www.google.com/ncr')">Google</el-dropdown-item>
              <el-dropdown-item @click.native="goPage('https://github.com/wangyan666')">个人中心</el-dropdown-item>
              <el-dropdown-item divided @click.native="onOutLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 未登录时的右侧导航 -->
          <el-button plain v-if="!isLogining" @click="OnLogin">登&nbsp;&nbsp;录</el-button>
    </div>
</template>

<script>

// import request from '@/utils/request'
import { getUserInfoRequest } from '@/api/user.js'
export default {
  name: 'Head',
  data () {
    return {
      isLogining: false,
      fit: 'cover',
      userInfo: {},
      dialogVisible: false // 消息提示
    }
  },
  methods: {
    // 登录
    OnLogin () {
      this.$router.push({
        name: 'login'
      })
    },
    // 去外部链接
    goPage (url) {
      window.location.href = url
    },

    // 退出登录
    onOutLogin () {
      this.$confirm('此操作将退出该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('token')
        location.reload() // 刷新页面
        this.isLogining = false
        // this.$route.push('/')
        this.$message({
          type: 'success',
          message: '已退出!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    }
  },
  created () {
    const token = window.localStorage.getItem('token')
    if (token) {
      this.isLogining = true
      // 验证登录页面用户信息携带的token，从而返回数据
      getUserInfoRequest()
        .then(res => {
          // console.log(res.data.data)
          this.userInfo = res.data.data
        // console.log(this.userInfo)
        }).catch(err => {
          console.log('未获取用户信息', err.message)
        })
    }
  }
  // beforeCreate () {
  //   const token = window.localStorage.getItem('token')
  //   if (token) {
  //   }
  // }
}
</script>

<style lang="less" scoped>
  /* 设置字体样式 */
  .head-left{
    font-size: 18px;
  }
  .head{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #000;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

</style>
