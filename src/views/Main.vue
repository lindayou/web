<template>
 <div>  
<el-container>
  <el-aside width="auto">
      <CommonAside/>
  </el-aside>
  
  <el-container>
      <el-header>
      <Header />
  </el-header>
    <el-main>
   <router-view></router-view>
   </el-main>
  </el-container>
</el-container>
  
 </div>
</template>


<script setup>
import CommonAside from '../components/commonAside/commonAside.vue'
import Header from '../components/header/Header.vue'
</script>

<script>

 export default {
   name: 'Main',
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
.el-header{
    padding: 0;
}

</style>