<template>
 <div>
     
<el-container>
  <el-aside width="200px">
      <CommonAside/>
  </el-aside>
  <el-container>
    <el-header>Header</el-header> 
    <el-main>
         <h1>这是main</h1>
   <router-view></router-view>
   </el-main>
  </el-container>
</el-container>
  
 </div>
</template>


<script setup>
import CommonAside from '../components/commonAside/commonAside.vue'
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

</style>