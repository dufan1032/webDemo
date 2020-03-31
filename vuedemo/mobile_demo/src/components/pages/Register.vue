<template>
  <div>
      <van-nav-bar 
        title="注册"
        left-text='返回'
        left-arrow
        @click-left='goBack'
      />

      <div class="register-panel">
          <van-field 
            v-model="username"
            label='用户名'
            placeholder='请输入用户名'
            right-icon='clear'
            required
            @click-right-icon="username=''"
            :error-message='usernameError'
          />
          <van-field 
            v-model="password"
            label='密码'
            type='password'
            placeholder='请输入密码'
            right-icon='eye-o'
            required
            :error-message='passwordError'
          />
      </div>
      <div class="register-button">
          <van-button class="button" type="primary" :loading='isLoading' size="large" @click="userRegister">马上注册</van-button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import Url from '@/config/server.config' // 请求路径配置文件
import {Toast} from 'vant'
export default {
  data (){
    return{
        username : '',  // 用户名
        password : '',  // 密码
        isLoading : false, // 用户请求后请求按钮的状态
        usernameError : '', // 用户名输入错误时的提示信息
        passwordError : '', // 密码输入错误时的提示信息
    }
  },
  methods : {
      // 返回键
      goBack : function(){
        this.$router.go(-1);
      },
      // 注册提交
      userRegister : function(){
        // 提交注册前先进行前端验证，符合要求在提交申请
        this.registerCheck() && this.registerRequest()
      },
      // 用户注册请求前的验证函数
      registerCheck: function(){
        let isSend = true;
        // 用户名长度验证
        if(this.username.length >= 8 || this.username.length <= 2){
          this.usernameError = '用户名长度必须在2到8个字符';
          isSend = false;
        }else{
          this.usernameError = ''
        }
        // 密码长度验证
        if(this.password.length >= 16 || this.password.length <= 5){
          this.passwordError = '密码长度必须在5到16个字符';
          isSend = false;
        }else{
          this.passwordError = ''
        }
        return isSend;
      },
      // 用户注册请求函数
      registerRequest: function(){
        this.isLoading = true;
        axios({ // 注册请求
          url : Url.userRegister,
          method : 'post',
          data : {
            username : this.username,
            password : this.password,
          }
        }).then((response)=>{
          // console.log(response);
          if(response.data.code == 200){
            Toast.success(response.data.message);
          }else{
            Toast.fail(response.data.message);
          }
          this.isLoading = false;
        }).catch((err)=>{
          // console.log(err);
          Toast.fail('???');
          this.isLoading = false;
        });
      },
  }
}
</script>

<style scoped>
.register-panel{
    width: 96%;
    border-radius: 0.8rem;
    margin: 0.5rem auto;
}
.register-button{
    padding: 0.5rem 0.2rem;
}
.register-button .button{
    border-radius: 1.8rem;
}
</style>