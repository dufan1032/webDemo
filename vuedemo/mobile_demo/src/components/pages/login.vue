<template>
  <div>
      <van-nav-bar 
        title="登录"
        left-text='返回'
        left-arrow
        @click-left='goBack'
      />

      <div class="login-panel">
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
      <div class="login-button">
          <van-button class="button" type="primary" :loading='isLoading' size="large" @click="userLogin">登录</van-button>
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
        isLoading : false, // 用户请求后 按钮 状态
        usernameError : '', // 用户名输入错误时的提示信息
        passwordError : '', // 密码输入错误时的提示信息
    }
  },
  methods : {
      // 返回键
      goBack : function(){   
        this.$router.go(-1);
      },
    //   登录提交
      userLogin : function(){
        // 提交登录前先进行验证，符合要求在提交申请
        this.loginCheck() && this.loginrRequest()
      },
      // 用户登录请求前的验证函数
      loginCheck: function(){
        let isSend = true;
        console.log(this.username.length,this.password.length);
        // 用户名验证
        if(this.username.length >= 8 || this.username.length <= 2){
          this.usernameError = '用户名长度必须在2到8个字符';
          isSend = false;
        }else{
          this.usernameError = ''
        }
        // 密码验证
        if(this.password.length >= 16 ||this.password.length <= 5){
          this.passwordError = '密码长度必须在5到16个字符';
          isSend = false;
        }else{
          this.passwordError = ''
        }
        return isSend;
      },
      // 用户登录请求函数
      loginrRequest: function(){ 
        this.isLoading = true;
        axios({ // 登录请求
          url : Url.userLogin,
          method : 'post',
          data : {
            username : this.username,
            password : this.password,
          }
        }).then((response)=>{
          // 根据返回数据进行操作
          if(response.data.code == 200){
            Toast.success(response.data.message);
            new Promise((resolve,reject)=>{
                localStorage.userInfo = JSON.stringify({
                    username : this.username,
                    password : this.password,
                    userState : true,
                });
                setTimeout(()=>{
                    resolve();
                },500);
            })
              .then(()=>{
                    this.$route.push('/')
              })
              .catch(err=>{
                    Toast.fail('登录状态保存失败');
                    console.log(err);
                    this.$router.push('/');
              });
          }else{
            Toast.fail(response.data.message);
            this.isLoading = false;
          }
        }).catch((err)=>{
        //   请求出现问题时的操作
          console.log(err);
          Toast.fail('无法提交');
          this.isLoading = false;
        });
      },
  },
  created : function(){
      if(localStorage.userInfo){
          Toast.fail('您已经登录，无法重复登录');
          JSON.parse(localStorage.userInfo).userState && this.$router.push('/');
      }
  }
}
</script>

<style scoped>
.login-panel{
    width: 96%;
    border-radius: 0.8rem;
    margin: 0.5rem auto;
}
.login-button{
    padding: 0.5rem 0.2rem;
}
.login-button .button{
    border-radius: 1.8rem;
}
</style>