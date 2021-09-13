<template>
  <div  class="head">
            <div class="head-left">
              <i class="el-icon-star-off"></i>
              <span>博客Blogs</span>
            </div>

            <el-dropdown v-if="isLogining">
            <div class="el-dropdown-link">
              <el-image
                style="width: 50px; height: 50px; border-radius: 50%"
                :src="userInfo.avator"
                :fit="fit">
                <div slot="error" style="height: 50px;width: 50px;text-align: center;line-height: 50px;font-size:30px;background-color:#dfe6e9" class="image-slot"><i class="el-icon-picture-outline"></i></div>
              </el-image>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided @click.native="onOutLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 未登录时的右侧导航 -->
          <el-button plain v-if="!isLogining" @click="OnLogin">登&nbsp;&nbsp;录</el-button>
    </div>
</template>

<script>

import request from '@/utils/request'

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

    // 退出登录
    onOutLogin () {
      this.$confirm('此操作将退出该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('token')
        this.isLogining = false
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
    // console.log('token是', this.$route.params.token)
    // 验证登录页面用户信息携带的token，从而返回数据
    request({
      method: 'get',
      url: '/userInfo',
      headers: {
        token: JSON.parse(window.localStorage.getItem('token'))
      }
    }).then(res => {
      // console.log(res.data)
      if (res.data.userInfo) {
        this.userInfo = res.data.userInfo
        this.isLogining = true
      }
    }).catch(err => {
      console.log('未获取用户信息', err)
    })
  }
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
