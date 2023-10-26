<template>
 <div>
   <el-row>

     <el-col :span="8">

 <el-card class="box-card">
  <div class="user">
    <img src="../assets/user.jpg" alt="">
    <div class="userInfo">
    <p class="name">Admin</p>
    <p class="assess">超级管理员</p>
  </div>
  </div>
  
  <div class="loginInfo"></div>
  
 
</el-card>
     </el-col>
   </el-row>
  
 </div>
</template>

<script>
 export default {
   name: 'home',
   props: {
   },
   components: {

   },
   data () {
     return {

     }
   },
   methods: {

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
.user{
  display: flex;
  align-items: center;
  margin-right: 40px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userInfo{
    .name{
      font-size: 32px;
      margin-bottom: 10px;
    }
    .assess{
      color: #999999;
    }
  }
}
</style>