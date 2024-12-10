<template>
    <div class="register">
      <div class="myregister" align="center">
        <h1 class="title">用户注册</h1>
        <el-form
          :model="form"
          :rules="rules"
          ref="registerForm"
          label-width="0px"
          @keyup.native.enter="submitForm"
        >
          <el-form-item label="" prop="username">
            <el-input
              class="inps"
              placeholder="请输入用户名"
              v-model="form.username"
            ></el-input>
          </el-form-item>
  
          <el-form-item label="" prop="email">
            <el-input
              class="inps"
              placeholder="请输入邮箱"
              v-model="form.email"
            ></el-input>
          </el-form-item>
  
          <el-form-item label="" prop="password">
            <el-input
              class="inps"
              type="password"
              placeholder="请输入密码"
              v-model="form.password"
            ></el-input>
          </el-form-item>
  
          <el-form-item label="" prop="confirmPassword">
            <el-input
              class="inps"
              type="password"
              placeholder="确认密码"
              v-model="form.confirmPassword"
            ></el-input>
          </el-form-item>
  
          <el-form-item style="margin-top: 20px">
            <el-button type="primary" round class="submitBtn" @click="submitForm"
              >注册</el-button
            >
          </el-form-item>
          <el-form-item style="margin-top: 10px; text-align: center">
            <div class="login-link">
              <span>已有账号？</span>
              <router-link :to="{ path: '/login' }">立即登录</router-link>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>

<script>
import { userRegister } from "../../api/user.js"; // 替换为你的 API 路径
export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur",
          },
          {
            type: "email",
            message: "请输入有效的邮箱地址",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, message: "密码不能少于6位", trigger: "blur" },
        ],
        confirmPassword: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                callback(new Error("两次密码输入不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          userRegister(this.form)
            .then((res) => {
              console.log("注册成功", res);
              this.$message.success("注册成功！");
              this.$router.push("/login");
            })
            .catch((err) => {
              console.error("注册失败", err);
              this.$message.error("注册失败，请稍后再试！");
            });
        } else {
          this.$message.error("请完善表单信息！");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.register {
  width: 100vw;
  height: 100vh;
  font-size: 16px;
  background-position: center;
  background-color: #ffffff;
  background-image: url('@/assets/img/login.jpg'); /* 替换为你的背景图路径 */
  font-family: "Source Sans Pro";
  position: relative;
  
}

.myregister {
  width: 300px;
  height: 50vh;
  padding: 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  box-shadow: -15px 15px 15px rgba(5, 17, 83, 0.7);
  background: rgba(255, 255, 255, 0.9); /* 半透明背景 */
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8); /* 半透明背景 */
  animation: fadeIn 1s ease; /* 添加动画 */

}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.inps input {
  border: none;
  font-size: 14px;
  padding: 10px;
}

.submitBtn {
  background-color: #36d1dc;
  color: #fff;
  width: 100%;
  height: 40px;
  font-weight: bold;
  font-size: 14px;
}

.login-link {
  font-size: 14px;
  color: rgba(36, 35, 77, 0.8);
}

.login-link a {
  color: #36d1dc;
  text-decoration: none;
  font-weight: bold;
}

.login-link a:hover {
  color: #5b86e5;
}
</style>
