<template>
<div>
 <!-- 新增角色弹窗 -->
   <el-dialog
   :title="dialogTitle"
   :visible.sync="dialogVisible"
   width="30%"
   :before-close="handleClose">
  <!-- 用户表单信息 -->
  <el-form ref="authorityForm" :rules="rules" :model="form" label-width="80px">
  <el-form-item label="父级角色" prop="parentId">
            <el-cascader
             v-model="form.parentId"
             style="width:100%"
             :disabled="dialogType==='add'"
             :options="AuthorityOption"
             :props="{ checkStrictly: true,label:'authorityName',value:'authorityId',disabled:'disabled',emitPath:false}"
             :show-all-levels="false"
             filterable
           />
         </el-form-item>
         <el-form-item label="角色ID" prop="authorityId">
           <el-input v-model="form.authorityId" :disabled="dialogType==='edit'" autocomplete="off" maxlength="15" />
         </el-form-item>
         <el-form-item label="角色姓名" prop="authorityName">
           <el-input v-model="form.authorityName" autocomplete="off" />
         </el-form-item>
       </el-form>
   <span slot="footer" class="dialog-footer">
     <el-button @click="cancel">取 消</el-button>
     <el-button type="primary" @click="submit">确 定</el-button>
   </span>
 </el-dialog>
 
     <el-drawer v-if="drawer" v-model="drawer" custom-class="auth-drawer" :with-header="false" size="40%" title="角色配置">
       <el-tabs :before-leave="autoEnter" type="border-card">
         <el-tab-pane label="角色菜单">
           <menus ref="menus" :row="activeRow" @changeRow="changeRow" />
         </el-tab-pane>
       </el-tabs>
     </el-drawer>
 
 
     <div class="gva-btn-list">
         <el-button type="primary" icon="plus" @click="addAuthority(0)">新增角色</el-button>
         <!-- <el-icon  class="cursor-pointer" @click="toDoc('https://www.bilibili.com/video/BV1kv4y1g7nT?p=8&vd_source=f2640257c21e3b547a790461ed94875e')"><VideoCameraFilled /></el-icon> -->
       </div>
       <el-table
       :data="tableData"
       :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
       row-key="authorityId"
       style="width: 100%">
       <el-table-column
         prop="authorityId"
         label="角色ID"
         width="180">
       </el-table-column>
       <el-table-column
         prop="authorityName"
         label="角色姓名"
         width="180">
       </el-table-column>
       <el-table-column
         prop="address"
         label="操作" >
          <template #default="scope" >
             <el-button
               icon="setting"
               type="text"
               link
               @click="opdendrawer(scope.row)"
             >设置权限</el-button>
             <el-button
               icon="plus"
 
               type="text"
               link
               @click="addAuthority(scope.row.authorityId)"
             >新增子角色</el-button>
             <!-- <el-button
               icon="copy-document"
 
               type="primary"
               link
               @click="copyAuthorityFunc(scope.row)"
             >拷贝</el-button> -->
             <el-button
               icon="edit"
 
               type="text"
               link
               @click="editAuthority(scope.row)"
             >编辑</el-button>
             <el-button
               icon="el-icon-delete"
               type="text"
               link
               @click="deleteAuth(scope.row)"
             >删除</el-button>
           </template>
       </el-table-column>
     </el-table>
  </div>
</template>


<script>
import { getAuthorityList,addAuthority,deleteAuthority,editAuthority} from '../../../api/authority.js'
 export default {
   name: 'authority',
   props: {
   },
   components: {

   },
   data () {
     return {
      tableData: [],
    dialogVisible: false,
    dialogTitle:'',
    dialogType:'',
    AuthorityOption:[],
    form:{
      parentId:0,
      authorityId:0,
      authorityName:'',
    },
    rules:{
      authorityId:[
        {required : true,message : '请输入角色ID'}
      ],
      authorityName:[
        {
          required:true,message:'请输入角色名称'
        }]
    },
    modelType : 0,
    drawer:false,
    activeRow:{},
     }
   },
   methods: {
       // 新增角色方法
 addAuthority(parentId) {
   this.initForm()
    this.dialogTitle = '新增角色'
    this.dialogType ='add'
   
    this.form.parentId =parentId
    this.setOptions()
     this.dialogVisible = true
  },
  //编辑角色方法
  editAuthority(row){
    this.dialogTitle ='编辑角色'
    this.dialogType='edit'
    this.setOptions()
      for (const key in this.form) {
    this.form[key] = row[key]
  }
    this.dialogVisible =true
  },
  //删除角色
  deleteAuth(row){
        this.$confirm('是否删除此角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteAuthority({authorityId:row.authorityId}).then(res=>{
               console.log(res)
            }
          )
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getAuthList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
  },

  submit() {
    if (this.dialogType ==='add'){
      // 新增角色
      this.form.authorityId =Number(this.form.authorityId)
      addAuthority(this.form).then(()=>{
        this.getAuthList()
      })
      
    }else if(this.dialogType ==='edit'){
      console.log('1111111111111111',)
      this.form.authorityId =Number(this.form.authorityId)
     editAuthority(this.form).then(()=>{

            this.getAuthList()
      })
    }
    this.$refs.authorityForm.validate((valid)=>{
      if(valid){
        this.$refs.authorityForm.resetFields()
        this.dialogVisible =false
      }
    })
  },
  handleClose(){
    this.$refs.authorityForm.resetFields()
    this.dialogVisible =false
  },
  cancel(){
    this.handleClose()
  },
  initForm(){
    if (this.$refs.authorityForm) {
    this.$refs.authorityForm.resetFields()
  }
  this.form = {
    authorityId: 0,
    authorityName: '',
    parentId: 0
  }
  },
  setOptions(){
    this.AuthorityOption =[{
      authorityId: 0,
      authorityName: '根角色'
    }]
     this.setAuthorityOptions(this.tableData, this.AuthorityOption, false)
  },
  setAuthorityOptions(AuthorityData, optionsData, disabled){
 this.form.authorityId = String(this.form.authorityId)
  AuthorityData &&
        AuthorityData.forEach(item => {
          if (item.children && item.children.length) {
            const option = {
              authorityId: item.authorityId,
              authorityName: item.authorityName,
              disabled: disabled || item.authorityId === this.form.authorityId,
              children: []
            }
            this.setAuthorityOptions(
              item.children,
              option.children,
              disabled || item.authorityId === this.form.authorityId
            )
            optionsData.push(option)
          } else {
            const option = {
              authorityId: item.authorityId,
              authorityName: item.authorityName,
              disabled: disabled || item.authorityId === this.form.authorityId
            }
            optionsData.push(option)
          }
        })
  },
  getAuthList(){
    getAuthorityList().then(({data})=>{
      console.log('11111',data)
      this.tableData =data.authorityList
    })
  },
  opdendrawer(row){
    this.drawer = true,
  this.activeRow = row
  },
   },
   mounted() {
    getAuthorityList().then(({data})=>{
      console.log('11111',data)
      this.tableData =data.authorityList
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
.el-button{
  border-radius: 2px;
  font-weight: 400;
}
.el-button.is-link{
 border-color: transparent;
      color: #000;
      background: transparent;
}

</style>