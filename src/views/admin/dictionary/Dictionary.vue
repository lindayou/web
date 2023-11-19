<template>
 <div class="main" >
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
    <el-input v-model="form.desc" placeholder="字典的描述"></el-input>
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

   <!-- 新增按钮 -->
  <div class="button" >

    <el-button type="primary" icon="plus" @click="addDiction">新增字典</el-button>
  </div>


   <!-- 主体表格 -->
  <div class="table-box">
   <el-table
      :max-height="580"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="字典名称(中)"
        width="200">
      </el-table-column>
      <el-table-column
        prop="type"
        label="字典名称(英)"
        width="250">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="250">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="描述"
        width="360">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
            <el-button

              icon="document"
              type="text"
              link
              @click="toDetail(scope.row)"
            >详情</el-button>
            <el-button

              icon="edit"
              type="text"
              link
              @click="updateSysDictionaryFunc(scope.row)"
            >变更</el-button>
            <el-popover
              v-model="scope.row.visible"
              placement="top"
              trigger="hover"
              width="160"
            >
              <p>确定要删除吗？</p>
              <div style="text-align: right; margin-top: 8px">
                <el-button

                  type="text"
                  link
                  @click="scope.row.visible = false"
                >取消</el-button>
                <el-button
                  type="text"

                  @click="deleteSysDictionaryFunc(scope.row)"
                >确定</el-button>
              </div>
              <template #reference>
                <el-button
                  type="text"
                  link
                  icon="delete"

                  style="margin-left: 10px"
                  @click="scope.row.visible = true"
                >删除</el-button>
              </template>
            </el-popover>
          </template>


      </el-table-column>

    </el-table>
 
    
  </div>
       <div class="block">
   
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="[10, 30, 50, 100]"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
   </div>
 


    <!-- 新增字典弹窗 -->
<el-dialog
  :title="dialogTitle"
  :visible.sync="dialogVisible"
  width="30%"
  >


  <el-form  ref="dictionForm" :model="dictionForm" class="dic-form" :rules="rules" >
  <el-form-item label="字典名称(中文)" prop="name">
    <el-input v-model="dictionForm.name" placeholder="字典名称中文"></el-input>
  </el-form-item>
  <el-form-item label="字典名称(英文)" prop="type">
    <el-input v-model="dictionForm.type" placeholder="字典名称英文"></el-input>
  </el-form-item>
  <el-form-item label="状态" prop="status">
    <el-switch v-model="dictionForm.status" 
    active-text="开启"
    inactive-text="停用"
    :active-value="1"
     :inactive-value="2"
     ></el-switch>
  </el-form-item>
  <el-form-item label="描述信息" prop="description">
    <el-input v-model="dictionForm.desc" placeholder="描述信息"></el-input>
  </el-form-item>
 
 </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="cancelDialog">取 消</el-button>
    <el-button type="primary" @click="submitDialog">确 定</el-button>
  </span>
</el-dialog>
     

 </div>
</template>

<script>
import {getDicList,addDic,editDic,deleteDic } from '../../../api/dictionary'
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
       tableData:[],
       total:0,
       dialogVisible:false,
       dictionForm:{},
       dialogTitle:'',
       isEdit:false,
       page:1,
       pageSize:10,
       rules:{
        name:[
          {
            required:true,
          trigger: 'blur' ,
          }
        ],
        type:[{
          required:true,
          trigger: 'blur' ,
        }],
        status:[
          {
            required:true,
            trigger: 'blur' ,
            
          }
        ]

       }

     }
   },
   methods: {
    addDiction(){
      console.log('resField',this.$refs)
      this.initForm()
      this.isEdit =false
      this.dialogTitle ='新增字典'
      this.dialogVisible =true
    },
    updateSysDictionaryFunc(row){
      this.isEdit =true
      this.dictionForm =row
      this.dialogTitle ='编辑字典'
      this.dialogVisible =true


    },
    cancelDialog(){
      this.initForm()

      this.dialogVisible =false
    },
    submitDialog(){
      if(!this.isEdit){
        this.$refs.dictionForm.validate(valid=>{
          if(valid){
            addDic(this.dictionForm).then(res=>{
              console.log('addDicRes',res)
            })
            this.getDictionList()
          }
        })
      }else{
        this.$refs.dictionForm.validate(valid=>{
          if(valid){
            editDic(this.dictionForm).then(res=>{
              console.log('editDicRes',res)

            })
            this.getDictionList()
          }
        })

      }
    
      this.dialogVisible =false
      this.initForm()
      this.getDictionList()

    },
     deleteSysDictionaryFunc(row){
        deleteDic({id:row.id}).then(res=>{
          console.log('deleteDicRes',res)
        })
        this.getDictionList()

      },
    toDetail(row){
      console.log("rowrow",row)
   
      this.$router.push(
        {
          name:'dictionaryDetail',
          query:{
            id:row.id,
          }
        }
      )

    },
    async onSubmit(){
      const req ={
        ...this.form,
        page:1,
        pageSize:10,
      }
      console.log('req',req)
      let res = await getDicList(req)
      console.log('onSubmit',res)
      this.tableData =res.data.data.dicList
      

    },
    

    onReset(){
     this.form ={},
     this.getDictionList()

    },
    handleClose(){

    },


    initForm(){
      if(this.$refs.dictionForm){
        this.$refs.dictionForm.resetFields()

      }
      
      this.dictionForm ={}
    },
    getDictionList(){
    const req ={
        ...this.form,
        page:this.page,
        pageSize:this.pageSize,
      }
      
      
      getDicList(req).then(res =>{
      console.log('dicres',res)
      this.tableData =res.data.data.dicList
      this.total =res.data.data.total
    })

    },
      handleSizeChange(val) {
        this.pageSize =val
      },
      handleCurrentChange(val) {
        this.page =val
        this.getDictionList()
      },

   },
   mounted() {
     this.getDictionList()

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
.main{
  // height: 80vh;
  .table-box{
    margin-top:10px ;
  // height: 70vh;
  // position: relative;
 
}
   .block{

  ::v-deep .el-pagination{
    text-align: right;
  //  position: absolute;
    // bottom: 0;
    // right: 20px;
  }
}
}






</style>