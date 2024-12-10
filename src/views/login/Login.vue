<template>
  <div class="login">
    <div class="mylogin" align="center">
      <h1 class="title">CMS管理系统</h1>
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
        <el-form-item style="margin-top: 10px; text-align: center">
  <div class="register-link">
    <span>没有账号？</span>
    <router-link :to="{ path: '/register' }">立即注册</router-link>
  </div>
</el-form-item>
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
    height: 100vh;
    padding: 0;
    margin: 0;
    font-size: 16px;
    background-color: #ffffff;
    background-image: url('@/assets/img/login.jpg');
    background-size: cover;
    background-position: center;
    color: rgb(36, 35, 77);
    font-family: "Source Sans Pro";
    position: relative;
  }
 
  .mylogin {
    width: 300px;
  padding: 40px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6); /* 半透明背景 */
  border-radius: 10px; /* 圆角效果 */
  color: #fff; /* 字体颜色调整为白色 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); /* 添加阴影效果 */
  animation: fadeIn 1s ease; /* 添加动画 */
  }
  @keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

 
.inps input {
  border: 1px solid rgba(255, 255, 255, 0.3); /* 边框半透明 */
  background-color: rgba(255, 255, 255, 0.2); /* 输入框背景透明 */
  color: #fff; /* 字体颜色 */
  border-radius: 5px; /* 圆角 */
  padding: 10px;
}

.submitBtn {
  width: 100%;
  background: linear-gradient(45deg, #36d1dc, #5b86e5); /* 渐变按钮 */
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.3s;
}
.submitBtn:hover {
  background: linear-gradient(45deg, #5b86e5, #36d1dc); /* 悬停效果 */
}
.register-link {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8); /* 半透明白色 */
}

.register-link span {
  margin-right: 5px;
}

.register-link a {
  color: #36d1dc; /* 按钮渐变主色 */
  text-decoration: none; /* 去掉下划线 */
  font-weight: bold;
  transition: color 0.3s;
}

.register-link a:hover {
  color: #5b86e5; /* 悬停颜色 */
}

</style>