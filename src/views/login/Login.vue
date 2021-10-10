<template>
  <div class="login-container">
    <el-form ref="formRef" class="login-form" :model="user" :rules="rules">
      <el-form-item class="item" prop="username">
        <el-input class="input" v-model="user.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item class="item" prop="password">
        <el-input class="input" type="password" v-model="user.password" placeholder="请输入密码" ></el-input>
      </el-form-item>

      <el-form-item class="item">
        <el-button class="button" type="primary" @click="onsubmit('formRef')" :loading="isLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script >

import request from '@/utils/request'

export default {
  name: 'Login',

  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false,
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    onLogin () {
      this.isLoading = true

      // request为封装的axios
      request({
        method: 'post',
        url: '/api/user/login',
        data: this.user
      }).then(res => {
        this.isLoading = false
        if (res.data.data.token) {
          this.$message.success('登陆成功')
          window.localStorage.setItem('token', res.data.data.token)
          this.$router.replace({
            name: 'first'
          })
        } else this.$message.error('登陆失败')
      }).catch(err => {
        console.log('登陆失败了', err)
        this.isLoading = false
        this.$message.error('服务器异常，请稍后重试')
      })
    },

    onsubmit (formRef) {
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          this.onLogin()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang = "less">
  .login-container{
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    background: url('./back.jpg');
    background-size: cover;

    .login-form{
      border-radius: 5px;
      background-color: #e0e0e0;
      /* margin-bottom: 100px; */
      width: 380px;
      height: 270px;
      padding:50px;
      box-sizing: border-box;

      .el-input__inner{
      line-height: 1.5;
      }

      .button{
        margin-top: 14px;
        font-size: 17px;
        font-weight: bold;
        width: 100%;
        border: none;
        color: black;
        border-radius: 14px;
        background: #e0e0e0;
        box-shadow:  10px 10px 20px #bababa,
             -10px -10px 20px #ffffff;
        transition: all 0.2s ease-out;
        &:hover {
          font-size: 16px;
          box-shadow: 0 0 0 rgba(0,0,0,0.2), 0 0 0 rgba(255, 255, 255, 0.8),
          inset 10px 10px 20px rgba(0,0,0,0.1),inset
             -10px -10px 20px rgba(255,255,255,1);
        }
      }
    }
  }
</style>
