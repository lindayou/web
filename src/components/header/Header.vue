<template>
 <div class ="header-container">
  <div class="l-content">
      <el-button icon ="el-icon-menu" @click="handleMenu" size="mini"></el-button>
      <span class="text">首页</span>
  </div>
    <div  class="r-content">
        <el-dropdown>
  <span class="el-dropdown-link">
     <img class="user" src="../../assets/user.jpg" alt="">    
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>个人中心</el-dropdown-item>
    <el-dropdown-item>退出</el-dropdown-item>
    
  </el-dropdown-menu>
</el-dropdown>
    </div>
 </div>
</template>

<script>
import { mapMutations } from "vuex";
 export default {
   name: 'Header',
   props: {
   },
   components: {

   },
   data () {
     return {

     }
   },
   methods: {
       ...mapMutations('tab',["collapseMenu"]),
    handleMenu(){
        this.collapseMenu()
        console.log("collapse",this.$store.state)
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
.header-container{
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .text{
        color: aliceblue;
        font-size: 14px;
        margin-left: 10px; 
    }
   .r-content{
       .user{
           width: 40px;
           height: 40px;
           border-radius: 50%;
       }
   }
}

</style>