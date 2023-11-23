<template>
    <div class="manage">
        <!-- 弹窗 -->

      <el-dialog :visible.sync="DialogVisible"  :title="dialogTitle">
      <!-- <warning-bar title="新增菜单，需要在角色管理内配置权限才可使用" /> -->
      <el-form
        v-if="dialogFormVisible"
        ref="menuForm"
        :inline="true"
        :model="form"
        :rules="rules"
        label-position="top"
        label-width="85px"
      >
        <el-form-item label="路由Name" prop="path" style="width:30%">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="唯一英文字符串"
            @change="changeName"
          />
        </el-form-item>
        <el-form-item prop="path" style="width:30%" label="路由Path">
          <!-- <template #label>
            <span style="display: inline-flex;align-items: center;">
              <span>路由Path</span>
              <el-checkbox v-model="checkFlag" style="margin-left:12px;height: auto">添加参数</el-checkbox>
            </span>
          </template> -->

          <el-input
            v-model="form.path"
            :disabled="!checkFlag"
            autocomplete="off"
            placeholder="建议只在后方拼接参数"
          />
        </el-form-item>
        <el-form-item label="是否隐藏" style="width:30%">
          <el-select v-model="form.hidden" placeholder="是否在列表隐藏">
            <el-option :value="false" label="否" />
            <el-option :value="true" label="是" />
          </el-select>
        </el-form-item>
        <el-form-item label="父节点ID" style="width:30%">
          <el-cascader
            v-model="form.parentId"
            style="width:100%"
            :disabled="!isEdit"
            :options="menuOption"
            :props="{ checkStrictly: true,label:'title',value:'ID',disabled:'disabled',emitPath:false}"
            :show-all-levels="false"
            filterable
          />
        </el-form-item>
        <!-- <el-form-item label="文件路径" prop="component" style="width:60%"> -->
          <!-- <el-input v-model="form.component" autocomplete="off" placeholder="页面:view/xxx/xx.vue 插件:plugin/xx/xx.vue" @blur="fmtComponent" /> -->
          <!-- <span style="font-size:12px;margin-right:12px;">如果菜单包含子菜单，请创建router-view二级路由页面或者</span><el-button style="margin-top:4px" @click="form.component = 'view/routerHolder.vue'">点我设置</el-button> -->
        <!-- </el-form-item> -->
        <el-form-item label="展示名称" prop="meta.title" style="width:30%">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item label="图标" prop="meta.icon" style="width:30%">
          <icon :meta="form.meta" style="width:100%" />
        </el-form-item> -->
        <el-form-item label="排序标记" prop="sort" style="width:30%">
          <el-input v-model="form.sort" autocomplete="off" placeholder="排序" />
        </el-form-item>
        <!-- <el-form-item prop="meta.activeName" style="width:30%">
          <template #label>
            <div>
              <span> 高亮菜单 </span>
              <el-tooltip content="注：当到达此路由时候，指定左侧菜单指定name会处于活跃状态（亮起），可为空，为空则为本路由Name。" placement="top" effect="light">
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-input v-model="form.meta.activeName" :placeholder="form.name" autocomplete="off" />
        </el-form-item> -->
        <el-form-item label="KeepAlive" prop="meta.keepAlive" style="width:30%">
          <el-select v-model="form.keepAlive" style="width:100%" placeholder="是否keepAlive缓存页面">
            <el-option :value="false" label="否" />
            <el-option :value="true" label="是" />
          </el-select>
        </el-form-item>
       
      </el-form>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="enterDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>



      <div class="manage-header">
        <el-button type="primary" icon="plus" @click="addMenu('0')">新增根菜单</el-button>
        <el-icon  class="cursor-pointer" @click="toDoc('https://www.bilibili.com/video/BV1kv4y1g7nT/?p=4&vd_source=f2640257c21e3b547a790461ed94875e')"><VideoCameraFilled /></el-icon>
      
      
      </div>

    <div class="table">
       <el-table :data="tableData" row-key="id" :max-height="580" >
        <el-table-column align="left" label="ID" min-width="100" prop="id" />
        <el-table-column align="left" label="展示名称" min-width="120" prop="title">
          <!-- <template #default="scope">
            <span>{{ scope.row.meta.title }}</span>
          </template> -->
        </el-table-column>
        <el-table-column align="left" label="图标" min-width="140" prop="icon">
          <template #default="scope">
            <div v-if="scope.row.icon" class="icon-column">
                <i :class="`el-icon-${scope.row.icon}`"></i>
              <span>{{ scope.row.icon }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" label="路由Name" show-overflow-tooltip min-width="160" prop="name" />
        <el-table-column align="left" label="路由Path" show-overflow-tooltip min-width="160" prop="path" />
        <el-table-column align="left" label="是否隐藏" min-width="100" prop="hidden">
          <template #default="scope">
            <span>{{ scope.row.hidden?"隐藏":"显示" }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="父节点" min-width="90" prop="parentId" />
        <el-table-column align="left" label="排序" min-width="70" prop="sort" />
        <el-table-column align="left" fixed="right" label="操作" width="300">
          <template #default="scope">
            <el-button
              type="text"
              link
              icon="plus"
              @click="addMenu(scope.row.id)"
            >添加子菜单</el-button>
            <el-button
              type="text"
              link
              icon="edit"
              @click="editMenu(scope.row)"
            >编辑</el-button>
            <el-button

              type="text"
              link
              icon="delete"
              @click="deleteMenu(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
      
  </div>
</template>

<script>
import { getMenuList,addMenu,editMenu,deleteMenu} from '../../../api/menu.js'
export default {
   name: 'menu',
   props: {
   },
   components: {

   },
   data () {
     return {
        tableData:[],
        //弹窗
        DialogVisible:false,
        dialogTitle:'',
        dialogFormVisible:false,
        form:{
          name:'',
        },
        rules:[

        ],
        checkFlag:false,
        isEdit : false,
        menuOption:[{
    ID: '0',
    title: '根菜单'
  }],
    
     }
   },
   methods: {
     //刷新列表
     getTableData(){
        getMenuList().then(({data})=>{
         console.log('data',data)
        this.tableData =data.menuList
        console.log(this.tableData)
    })
     },
     //新增菜单
     addMenu(id){
       this.initForm()
       this.isEdit =false
       this.setOptions()
        this.dialogTitle ='新增菜单'
       this.form.parentId =String(id)
       this.DialogVisible =true
       this.dialogFormVisible=true
      
       
     },
     //编辑菜单
     editMenu(row){
       this.initForm()
       console.log('editMenueditMenu',row)
       this.form =row
       this.form.parentId =String(row.id)
       this.isEdit =true
       this.setOptions()
       this.DialogVisible =true
       this.dialogTitle ='编辑菜单',
       this.dialogFormVisible =true

     },
     //删除菜单
     deleteMenu(id){
         this.$confirm('是否删除此菜单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('id',id)
          deleteMenu({id:id}).then(res=>{
               console.log(res)
               this.getTableData()
            }
          )
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     },
     setOptions(){
       this.menuOption = [
    {
      ID: '0',
      title: '根目录'
    }
  ]
  this.setMenuOptions(this.tableData, this.menuOption, false)
     },

     setMenuOptions(menuData,optionsData,disabled){
       menuData &&
        menuData.forEach(item => {
          if (item.children && item.children.length) {
            const option = {
              title: item.title,
              ID: String(item.id),
              disabled: disabled || item.id === this.form.id,
              children: []
            }
              this.setMenuOptions(
              item.children,
              option.children,
              disabled || item.id === this.form.id
            )
            optionsData.push(option)
          } else {
            const option = {
              title: item.title,
              ID: String(item.id),
              disabled: disabled || item.id === this.form.id
            }
            optionsData.push(option)
          }
        })
     },
     //弹窗确定
     enterDialog(){
       if(!this.isEdit){
         this.form.sort =Number(this.form.sort)
         addMenu(this.form).then(res=>{
           this.DialogVisible =false
           console.log('addMenuRes',res)
           
         })
       }else{
         console.log(this.form)
         editMenu(this.form).then(res=>{
           this.DialogVisible =false
         })
       }

     },
     initForm(){
       this.form ={}
     },
       
  
     //弹窗关闭
     closeDialog(){
       this.DialogVisible =false

     },
     handleClose(){

     },
     changeName(){
       this.form.path =this.form.name
    
     },
 
   },
   mounted() {
    getMenuList().then(({data})=>{
         console.log('data',data)
        this.tableData =data.menuList
        console.log(this.tableData)
    })
    
   },
   watch: {
    'form.name'(newValue,oldValue){
      this.form.path =newValue
    }
   },
   computed: {

   },
   filters: {

   }
 }


</script>

<style lang='less' scoped>
.manage{
 
 .table {
   
  }





}

</style>