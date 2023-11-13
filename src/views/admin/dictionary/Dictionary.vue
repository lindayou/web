<template>
 <div>
   <!-- 搜索框 -->
   <div class="search-box">

     <el-form ref="form" :model="form" :inline="true" label-width="80px">
  <el-form-item label="字典名(中)">
    <el-input v-model="form.name" placeholder="字典名称"></el-input>
  </el-form-item>
  <el-form-item label="字典名(英)">
    <el-input v-model="form.type" placeholder="字典名称"></el-input>
  </el-form-item>
  <el-form-item label="状态">
    <el-input v-model="form.status" placeholder="启用状态"></el-input>
  </el-form-item>

  <el-form-item label="描述">
    <el-input v-model="form.description" placeholder="字典的描述"></el-input>
  </el-form-item>
   <el-form-item>
          <el-button

            type="primary"
            icon="search"
            @click="onSubmit"
          >查询</el-button>
          <el-button

            icon="refresh"
            @click="onReset"
          >重置</el-button>
        </el-form-item>
</el-form>
   </div>


   <!-- 主体表格 -->
   <div class="table-box"></div>
   <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="字典名称(中)"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="字典名称(英)"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="discription"
        label="描述">
      </el-table-column>
    </el-table>
     

 </div>
</template>

<script>
import {getDicList } from '../../../api/dictionary'
 export default {
   name: 'Dictionary',
   props: {
   },
   components: {

   },
   data () {
     return {
       form:{
         name:'',
       },
       tableData:[]

     }
   },
   methods: {

   },
   mounted() {
    getDicList().then(res =>{
      console.log('dicres',res)
      this.tableData =res.data.data.dicList
    })

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