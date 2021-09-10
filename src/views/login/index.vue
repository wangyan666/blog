<template>
  <div class="login-container">
    <el-form ref="form" class="login-form" :model="user">
      <el-form-item class="item">
        <el-input class="input" v-model="user.id" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item class="item">
        <el-input class="input" type="password" v-model="user.password" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item class="item">
        <el-button class="button" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script >
export default {
  name: 'Login',
  data () {
    return {
      user: {
        id: '',
        password: ''
      }
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
      width: 360px;
      height: 260px;
      padding:50px;
      box-sizing: border-box;

      .el-input__inner{
      line-height: 1.5;
      }

      .button{
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
