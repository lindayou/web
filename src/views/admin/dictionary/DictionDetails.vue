<template>
 <div>
    <div>
        <el-button type ="primary" @click="addDic">新增字典项</el-button>
    </div>

     <div class ="main-table">
         <el-table
      :data="tableData"
      style="width: 100%">
       <el-table-column align="left" label="日期" width="250">
          <template #default="scope">{{ formatDate(scope.row.date) }}</template>
        </el-table-column>

      <el-table-column
        prop="lable"
        label="展示值"
        width="180">
      </el-table-column>
      <el-table-column
        prop="value"
        label="字典值"
         width="100">
      </el-table-column>
      <el-table-column align="left" label="启用状态" prop="status" width="120">
          <template #default="scope">{{ formatBoolean(scope.row.status) }}</template>
        </el-table-column>
      <el-table-column
        prop="sort"
        label="排序">
       
      </el-table-column>
        <el-table-column
        prop="address"
        label="操作"
        >

    <template #default="scope">
        <el-button type="text" link icon="edit" @click="updateSysDictionaryDetailFunc(scope.row)">变更</el-button>
         <el-popover v-model="scope.row.visible" placement="top" width="160">
              <p>确定要删除吗？</p>
              <div style="text-align: right; margin-top: 8px;">
                <el-button type="text" link @click="scope.row.visible = false">取消</el-button>
                <el-button type="text" @click="deleteSysDictionaryDetailFunc(scope.row)">确定</el-button>
              </div>
              <template #reference>
                <el-button type="text" link icon="delete" @click="scope.row.visible = true">删除</el-button>
              </template>
            </el-popover>
        </template>
      </el-table-column>
    </el-table>

<!-- 新增字典项弹窗 -->
    <el-dialog
  :title="dialogTitle"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">


  <el-form  ref="dictionForm" :model="dictionForm" class="dic-form" :rules="rules" >
  <el-form-item label="展示值" prop="lable">
    <el-input v-model="dictionForm.lable" placeholder="展示值"></el-input>
  </el-form-item>
  <el-form-item label="字典值" prop="value">
    <el-input v-model="dictionForm.value" placeholder="字典值"></el-input>
  </el-form-item>
  <el-form-item label="启用状态" prop="status">
    <el-switch v-model="dictionForm.status" 
    active-text="开启"
    inactive-text="停用"
    :active-value="1"
     :inactive-value="2"
     ></el-switch>
  </el-form-item>
  <el-form-item label="排序标记" prop="sort">
    <el-input v-model="dictionForm.sort" placeholder="排序标记"></el-input>
  </el-form-item>
 
</el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="cancelDialog">取 消</el-button>
    <el-button type="primary" @click="submitDialog">确 定</el-button>
  </span>
</el-dialog>
     </div>
 </div>
</template>

<script>
import {getDicDetails,addDicDetails,editDicDetails,deleteDicDetails } from '../../../api/dictionary'
import {  formatDate } from '../../../utils/formdate.js'
 export default {
     
   name: 'DictionDetails',
   props: {
   },
   components: {

   },
   data () {
     return {
         tableData:[],
         dialogTitle:"",
         dictionForm:{},
         dialogVisible:false,
         isEdit:false,
         rules:{
             lable:[
                 {
                     required:true,
                     trigger: 'blur' ,
                    

                 }
             ],
             value:[
                 {
                     required:true,
                     trigger: 'blur' ,
                     

                 }
             ],
             status:[
                 {
                     required:true,
                     

                 }
             ],
             sort:[
                 {
                     required:true,
                     trigger: 'blur' ,

                 }
             ],

         }

     }
   },
   methods: {


       getDetails(){
          const  id =Number(this.$route.params.id)
         getDicDetails(id).then(res=>{
             console.log('res',res.data.data)
             this.tableData =res.data.data.detailsList
            
         })
       },
       formatDate(date){
           return formatDate(date)
 
       },
       formatBoolean(val){
           if(val===1){
               return "是"
           }else{
               return "否"
           }

       },
       addDic(){
           this.initForm()
           this.dialogTitle='新增字典项'
           this.dialogVisible =true

       },
       updateSysDictionaryDetailFunc(row){
           this.dialogTitle='变更字典项'
           this.isEdit =true
           this.dictionForm =row
           this.dialogVisible =true

       },
       cancelDialog(){
           this.initForm()
           this.dialogVisible =false

       },
       submitDialog(){
           this.dictionForm.sysDictionatyId =this.$route.params.id
           this.dictionForm.value =Number(this.dictionForm.value)
           this.dictionForm.sort =Number(this.dictionForm.sort)
           if(!this.isEdit){
               console.log('111',this.dictionForm)
               addDicDetails(this.dictionForm).then(res=>{
                   console.log('addDicDetailsRes',res)

               })
             
           }else{
               editDicDetails(this.dictionForm).then(res=>{
                   console.log('editDicDetails',res)
               })
           }
           this.dialogVisible =false
        this.getDetails()
       },
       initForm(){
           if(this.$refs.dictionForm){
                this.$refs.dictionForm.resetFields()

           }
          
           this.dictionForm ={}
       }

   },
   mounted() {
       this.getDetails()
      

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