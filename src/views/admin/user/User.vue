<template>
<div class="manage">

 
     <el-drawer v-if="drawer" v-model="drawer" custom-class="auth-drawer" :with-header="false" size="40%" title="角色配置">
       <el-tabs :before-leave="autoEnter" type="border-card">
         <el-tab-pane label="角色菜单">
           <menus ref="menus" :row="activeRow" @changeRow="changeRow" />
         </el-tab-pane>
       </el-tabs>
     </el-drawer>
 
 
     <div class="gva-btn-list">
         <el-button type="primary" icon="plus" @click="addUser">新增用户</el-button>
         <!-- <el-icon  class="cursor-pointer" @click="toDoc('https://www.bilibili.com/video/BV1kv4y1g7nT?p=8&vd_source=f2640257c21e3b547a790461ed94875e')"><VideoCameraFilled /></el-icon> -->
       </div>

       <div class="table">
         <el-table
        :data="tableData"
        row-key="id"
        height="90%"
      >
        <!-- <el-table-column align="left" label="头像" min-width="75">
          <template #default="scope">
            <CustomPic style="margin-top:8px" :pic-src="scope.row.headerImg" />
          </template>
        </el-table-column> -->
        <el-table-column align="left" label="ID" min-width="50" prop="id" />
        <el-table-column align="left" label="用户名" min-width="150" prop="username" />
        <el-table-column align="left" label="昵称" min-width="150" prop="nickName" />
        <el-table-column align="left" label="手机号" min-width="180" prop="phone" />
        <el-table-column align="left" label="邮箱" min-width="180" prop="email" />
        <el-table-column align="left" label="用户角色" min-width="200">
          <template #default="scope">
            <el-cascader
              v-model="scope.row.authorityIds"
              :options="authOptions"
              :show-all-levels="false"
              collapse-tags
              :props="{ multiple:true,checkStrictly: true,label:'authorityName',value:'authorityId',disabled:'disabled',emitPath:false}"
              :clearable="false"
              @visible-change="(flag)=>{changeAuthority(scope.row,flag,0)}"
              @remove-tag="(removeAuth)=>{changeAuthority(scope.row,false,removeAuth)}"
            />
          </template>
        </el-table-column>
        <el-table-column align="left" label="启用" min-width="150">
          <template #default="scope">
            <el-switch
              v-model="scope.row.enable"
              inline-prompt
              :active-value="1"
              :inactive-value="2"
              @change="()=>{switchEnable(scope.row)}"
            />
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="250" fixed="right">
          <template #default="scope">
            <!-- <el-popover v-model="scope.row.visible" placement="top" width="160">
              <p>确定要删除此用户吗</p>
              <div style="text-align: right; margin-top: 8px;">
                <el-button type="primary" link @click="scope.row.visible = false">取消</el-button>
                <el-button type="primary" @click="deleteUserFunc(scope.row)">确定</el-button>
              </div>
              <template #reference>
               
              </template>
            </el-popover> -->
             <el-button type="text" link icon="delete" @click="deleteAuth(scope.row)">删除</el-button>
            <el-button type="text" link icon="edit" @click="openEdit(scope.row)">编辑</el-button>
            <el-button type="text" link icon="magic-stick" @click="resetPasswordFunc(scope.row)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
       </div>
      
        
      <div class="pager">
  <el-pagination
    layout="prev, pager, next"
    :total="total">
  </el-pagination>
  </div>
      
        
       <!-- 新增角色弹窗 -->
    <el-dialog
     :visible.sync="addUserDialog"
      title="用户"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <div style="height:60vh;overflow:auto;padding:0 12px;">
        <el-form ref="userForm" :rules="rules" :model="userInfo" label-width="80px">
          <el-form-item v-if="dialogFlag === 'add'" label="用户名" prop="username">
            <el-input v-model="userInfo.username" />
          </el-form-item>
          <el-form-item v-if="dialogFlag === 'add'" label="密码" prop="password">
            <el-input v-model="userInfo.password" />
          </el-form-item>
          <!-- <el-form-item label="昵称" prop="nickname">
            <el-input v-model="userInfo.nickname" />
          </el-form-item> -->
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="userInfo.phone" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userInfo.email" />
          </el-form-item>
          <el-form-item label="用户角色" prop="authorityId">
            <el-cascader
              v-model="userInfo.authorityIds"
              style="width:100%"
              :options="authOptions"
              :show-all-levels="false"
              :props="{ multiple:true,checkStrictly: true,label:'authorityName',value:'authorityId',disabled:'disabled',emitPath:false}"
              :clearable="false"
            />
          </el-form-item>
          <el-form-item label="启用" prop="enable">
            <el-switch
              v-model="userInfo.enable"
              inline-prompt
              :active-value="1"
              :inactive-value="2"
            />
          </el-form-item>
          

        </el-form>

      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeAddUserDialog">取 消</el-button>
          <el-button type="primary" @click="enterAddUserDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 新增修改密码弹窗 -->

    <el-dialog
    :visible.sync="passDialog"
      title="修改密码"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false">
 <div style="height:20vh;overflow:auto;padding:0 12px;">
        <el-form ref="editPasForm" :rules="passrules" :model="editpassword" label-width="80px">
          <el-form-item  label="原密码" prop="priPassword">
            <el-input v-model="editpassword.priPassword" />
          </el-form-item>
          <el-form-item  label="新密码" prop="changePassword">
            <el-input v-model="editpassword.changePassword" />
          </el-form-item>

        </el-form>

      </div>
       <template #footer>
        <div class="dialog-footer">
          <el-button @click="closePass">取 消</el-button>
          <el-button type="primary" @click="submitPass">确 定</el-button>
        </div>
      </template>
    </el-dialog>


    
  </div>
</template>


<script>
import { getUserList,createUser,editUser,deleteUser,changePass,setUserAuthority} from '../../../api/user.js'
import { getAuthorityList} from '../../../api/authority.js'
 export default {
   name: 'authority',
   props: {
   },
   components: {

   },
   data () {
     return {
      tableData: [],
      total:0,
      authorityIds:0,
    addUserDialog: false,
    dialogTitle:'',
    dialogType:'',
    authOptions:[],
    userInfo:{
      username:'',
      password:'',
      phone:'',
      email:'',
      authorityIds:0,
      disabled:0,
      enabled:0,   
     
    },
    dialogFlag:'',
     passDialog:false,
     editpassword:{
        priPassword:'',
        changePassword:'',
        userId :0,
      },
    rules:{
         username:[
        {
          required:true,
          message:'请输入用户名',
          trigger: 'blur' ,
          min:3,
        }],
         password:[
        {
          required:true,message:'请输入密码',
          trigger: 'blur' ,
          min:6,
        }],
         phone:[
        {
          required:true,message:'请输入手机号',
          trigger: 'blur' 
        }],
         authorityId:[
        {
          required:true,message:'请选择角色',
          trigger: 'blur' 
        }],
    },
    passrules:{
       priPassword:[
        {
          required:true,
          message:'请输入原密码',
           trigger: 'blur' 
        }],
      changePassword:[
        {
          message:'请输入新密码',
          required:true,
          trigger: 'blur'
        }
      ]
    },
    modelType : 0,
    drawer:false,
    activeRow:{},
     }
   },
   methods: {
       // 新增角色方法
 addUser() {
  this.initForm()
    this.dialogFlag = 'add'
  this.addUserDialog = true
  },
  //编辑角色方法
  openEdit(row){
    console.log('this is editOpen row',row)
  this.dialogFlag = 'edit'
  this.userInfo = JSON.parse(JSON.stringify(row))
  this.addUserDialog = true
  },
  //删除角色
  deleteAuth(row){
        this.$confirm('是否删除此角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('id',row.id)
          deleteUser({id:row.id}).then(res=>{
               console.log(res)
            }
          )
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getTableData()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
  },
  //重置密码
  resetPasswordFunc(row){
    this.passDialog =true
    this.editpassword.userId =row.id

  },
//弹窗确定
enterAddUserDialog(){
  
 this.userInfo.authorityId = this.userInfo.authorityIds[0]
 
  this.$refs.userForm.validate(async valid => {
     console.log('$22222222222222222222222',this.$refs)
    if (valid) {
      const req = {
        ...this.userInfo
      }
      if (this.dialogFlag === 'add') {
        const res = await createUser(req)
       
         this.getTableData()
        this.closeAddUserDialog()
        console.log('addUser Res',res)
      }
      if (this.dialogFlag === 'edit') {
        const res = await editUser(req)
        console.log('editrreq and res',req,res)
        // if (res.code === 0) {
        //   ElMessage({ type: 'success', message: '编辑成功' })
        //   await getTableData()
         
        // }
        // console.log('this is editRes',res.code)
        this.getTableData()
        this.closeAddUserDialog()
      }
    }
  })
} ,
//鼠标修改用户角色触发方法
changeAuthority(row, flag, removeAuth){
  console.log('changeAuthority',row, flag, removeAuth)
  const tempAuth = {}
  if (flag) {
    if (!removeAuth) {
      tempAuth[row.ID] = [...row.authorityIds]
    }
    return
  }
  console.log('设置角色传值1',row.id)
  console.log('设置角色传值2',row.authorityIds)
  console.log('开始发送修改角色权限接口')

  setUserAuthority({
    userId: row.id,
    authorityId: row.authorityIds
  }).then(res=>{
    this.$message(
    {
      type:'success',
      message:'设置成功'
    }
  )
  console.log('发送成功')
   this.getTableData()
  })
  
 
  
  
},

initForm(){
    if (this.$refs.userForm) {
      this.$refs.userForm.resetFields()
  }
  this.userInfo = {}
  },
 setOptions(authData){
    this.authOptions =[]
    this.setAuthorityOptions(authData,this.authOptions)

  },
  setAuthorityOptions(AuthorityData, optionsData, disabled){
  AuthorityData &&
        AuthorityData.forEach(item => {
          if (item.children && item.children.length) {
            const option = {
              authorityId: item.authorityId,
              authorityName: item.authorityName,
              children: []
            }
            this.setAuthorityOptions(item.children, option.children)
            optionsData.push(option)
          } else {
            const option = {
              authorityId: item.authorityId,
              authorityName: item.authorityName
            }
            optionsData.push(option)
          }
        })
  },

   closeAddUserDialog(){

  this.$refs.userForm.resetFields()
  console.log('this is userForm',this)
  this.userInfo.authorityIds = []
  this.addUserDialog= false
   },
   //关闭重置密码弹窗
   closePass(){
     this.$refs.editPasForm.resetFields()
     this.passDialog =false
   },
   //重置密码确定
  submitPass(){
   this.$refs.editPasForm.validate(valid=>{
     if(valid){
       const req ={
         ...this.editpassword,
       }
       changePass(req).then(res=>{
         console.log('3333333333',res);
        if(res.status ===200){
          this.passDialog =false
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        }
       }).catch((error)=>{
          this.$message({
            type: 'error',
            message: '重置密码失败'
          });
         this.passDialog =false
       }
         
       )

     }
   })
  },

   handleClose(){
    this.$refs.authorityForm.resetFields()
    this.dialogVisible =false
  },
   setAuthorityIds(){
     console.log("tableData变了",this.tableData)
     console.log('tableData changed ')
        this.tableData && this.tableData.forEach((user) => {
          
    user.authorityIds = user.authorities && user.authorities.map(i => {
      return i.authorityId
    })
    console.log("user.authorityIds",user.authorityIds)

  })

   },
   //启用按钮
   switchEnable(row){
    this.userInfo =JSON.parse(JSON.stringify(row))
      const req = {
    ...this.userInfo
  }
     editUser(req).then(res=>{
        this.$message({
          message:'修改成功',
          type:'success'
        });
     console.log('sitch Res',res)
      this.getTableData()
     this.userInfo.authorityIds = []
     }).catch(

     )




   },
   //刷新
   getTableData(){
     console.log('开始刷新table')
   
    getUserList({page:1,pageSize:10}).then(({data})=>{
      console.log('11111',data)
      this.tableData =data.userList
    }).catch(error=>{
      console.log(error)
    })
    
     console.log('刷新结束')
   },
   },
   mounted() {
    getUserList({page:1,pageSize:10}).then(({data})=>{
      console.log('11111',data)
      this.tableData =data.userList
      this.total =data.total
    }).catch(error=>{
       console.log(error)
    }),
    getAuthorityList().then(({data})=>{
     this.setOptions(data.authorityList)
    })
    
   },
   watch: {
    tableData(){
    this.setAuthorityIds()
    }
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
.manage{
  height: 90%;
 .table{
  position: relative;
  height: 90vh;
  .pager{
    position: absolute;
    bottom: 0;
    right: 20px;
  }
 }
}
</style>