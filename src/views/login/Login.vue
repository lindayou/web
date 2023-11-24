<template>
  <div class="login">
    <div class="mylogin" align="center">
      <h1 class="title">管理平台</h1>
      <h4>登录</h4>
      <el-form
        :model="form"
        :rules="rules"
        ref="loginForm"
        label-width="0px"
        @keyup.native.enter="submitForm"
      >
        <el-form-item label="" prop="username" style="margin-top: 10px">
          <el-row>
            <el-col :span="2">
              <span class="el-icon-s-custom"></span>
            </el-col>
            <el-col :span="22">
              <el-input
                class="inps"
                placeholder="账号"
                v-model="form.username"
              >
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-row>
            <el-col :span="2">
              <span class="el-icon-lock"></span>
            </el-col>
            <el-col :span="22">
              <el-input
                class="inps"
                type="password"
                placeholder="密码"
                v-model="form.password"
                
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin-top: 55px">
          <el-button type="primary" round class="submitBtn" @click="submitForm"
            >登录
          </el-button>
        </el-form-item>
        <!-- <div class="unlogin">
          <router-link :to="{ path: '/forgetpwd' }"> 忘记密码? </router-link>
          |
          <router-link :to="{ path: '/register' }">
            <a href="register.vue" target="_blank" align="right">注册新账号</a>
          </router-link>
        </div> -->
      </el-form>
    </div>
  </div>
</template>

<script>
   import {userLogin}  from '../../api/user.js'
   import {getMenuAuthority} from '../../api/menu.js'
   import Cookie from 'js-cookie'
import { mapMutations } from 'vuex'
 export default {
  
   name: 'Login',
   props: {
   },
   components: {

   },
   data () {
     return {
         form:{},
         rules:{
             username:[
                 {
                     required:true,trigger:'blur',
                 }
             ],
             password:[
                 {
                     required:true,trigger:'blur',
                 }
             ]

         }

     }
   },
   methods: {
    ...mapMutations('login',['setUser']),
    ...mapMutations('tab',['addMenu']),
       submitForm(){
           userLogin(this.form).then(res=>{
               console.log('登录接口返回结果',res)
                 //设置stroe信息
               this.setUser({
                username:this.form.username,
                token:res.data.data.token,
                authorityId :res.data.data.authorityId,
                userId :res.data.data.id,
                })
                
               this.$router.push('/dashboard')

               
              
           }).catch(err => {});
         
       }

   },
   mounted() {

   },
   watch: {

   },
   computed: {

   },
   filters: {

   }
 }
</script>


<style lang='less' scoped>
 .title {
   margin: 5px;
 }  

  .login {
    width: 100vw;
    padding: 0;
    margin: 0;
    height: 90vh;
    font-size: 16px;
    background-position: left top;
    background-color: #ffffff;
    color: rgb(36, 35, 77);
    font-family: "Source Sans Pro";
    position: relative;
  }
 
  .mylogin {
    width: 240px;
    height: 280px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 40px 40px 40px 40px;
    box-shadow: -15px 15px 15px rgba(5, 17, 83, 0.7);
    opacity: 1;
    background: rgb(205, 227, 248);
  }
 
  .inps input {
    border: none;
    color: #fff;
    background-color: transparent;
    font-size: 12px;
  }
 
  .submitBtn {
    background-color: transparent;
    color: #39f;
    width: 200px;
  }



</style>