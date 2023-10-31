<template>
    <div>
  <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="addMenu('0')">新增根菜单</el-button>
        <el-icon  class="cursor-pointer" @click="toDoc('https://www.bilibili.com/video/BV1kv4y1g7nT/?p=4&vd_source=f2640257c21e3b547a790461ed94875e')"><VideoCameraFilled /></el-icon>
      </div>

      <!-- 由于此处菜单跟左侧列表一一对应所以不需要分页 pageSize默认999 -->
      <el-table :data="tableData" row-key="id">
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
              @click="deleteMenu(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!-- 弹窗 -->
  <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" :title="dialogTitle">
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
        <el-form-item prop="path" style="width:30%">
          <template #label>
            <span style="display: inline-flex;align-items: center;">
              <span>路由Path</span>
              <el-checkbox v-model="checkFlag" style="margin-left:12px;height: auto">添加参数</el-checkbox>
            </span>
          </template>

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
        <!-- <el-form-item label="文件路径" prop="component" style="width:60%">
          <el-input v-model="form.component" autocomplete="off" placeholder="页面:view/xxx/xx.vue 插件:plugin/xx/xx.vue" @blur="fmtComponent" />
          <span style="font-size:12px;margin-right:12px;">如果菜单包含子菜单，请创建router-view二级路由页面或者</span><el-button style="margin-top:4px" @click="form.component = 'view/routerHolder.vue'">点我设置</el-button>
        </el-form-item> -->
        <el-form-item label="展示名称" prop="title" style="width:30%">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item label="图标" prop="icon" style="width:30%">
          <icon :meta="form.meta" style="width:100%" />
        </el-form-item> -->
        <el-form-item label="排序标记" prop="sort" style="width:30%">
          <el-input v-model.number="form.sort" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item prop="activeName" style="width:30%">
          <template #label>
            <div>
              <span> 高亮菜单 </span>
              <el-tooltip content="注：当到达此路由时候，指定左侧菜单指定name会处于活跃状态（亮起），可为空，为空则为本路由Name。" placement="top" effect="light">
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-input v-model="form.activeName" :placeholder="form.name" autocomplete="off" />
        </el-form-item> -->
        <el-form-item label="KeepAlive" prop="keepAlive" style="width:30%">
          <el-select v-model="form.keepAlive" style="width:100%" placeholder="是否keepAlive缓存页面">
            <el-option :value="false" label="否" />
            <el-option :value="true" label="是" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="CloseTab" prop="closeTab" style="width:30%">
          <el-select v-model="form.closeTab" style="width:100%" placeholder="是否自动关闭tab">
            <el-option :value="false" label="否" />
            <el-option :value="true" label="是" />
          </el-select>
        </el-form-item>
        <el-form-item style="width:30%">
          <template #label>
            <div>
              <span> 是否为基础页面 </span>
              <el-tooltip content="此项选择为是，则不会展示左侧菜单以及顶部信息。" placement="top" effect="light">
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>

          <el-select v-model="form.defaultMenu" style="width:100%" placeholder="是否为基础页面">
            <el-option :value="false" label="否" />
            <el-option :value="true" label="是" />
          </el-select>
        </el-form-item> -->
      </el-form>
      <!-- <div>
        <div class="flex items-center gap-2">
          <el-button
            type="primary"
            icon="edit"
            @click="addParameter(form)"
          >新增菜单参数</el-button>
          <el-icon  class="cursor-pointer" @click="toDoc('https://www.bilibili.com/video/BV1kv4y1g7nT?p=9&vd_source=f2640257c21e3b547a790461ed94875e')"><VideoCameraFilled /></el-icon>
        </div>
        <el-table :data="form.parameters" style="width: 100%;margin-top: 12px;">
          <el-table-column align="left" prop="type" label="参数类型" width="180">
            <template #default="scope">
              <el-select v-model="scope.row.type" placeholder="请选择">
                <el-option key="query" value="query" label="query" />
                <el-option key="params" value="params" label="params" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="key" label="参数key" width="180">
            <template #default="scope">
              <div>
                <el-input v-model="scope.row.key" />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="value" label="参数值">
            <template #default="scope">
              <div>
                <el-input v-model="scope.row.value" />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left">
            <template #default="scope">
              <div>
                <el-button
                  type="danger"

                  icon="delete"
                  @click="deleteParameter(form.parameters,scope.$index)"
                >删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div class="flex items-center gap-2 mt-3">
          <el-button
              type="primary"
              icon="edit"
              @click="addBtn(form)"
          >新增可控按钮
          </el-button>
          <el-icon class="cursor-pointer" @click="toDoc('https://www.gin-vue-admin.com/guide/web/button-auth.html')"><QuestionFilled /></el-icon>
          <el-icon  class="cursor-pointer" @click="toDoc('https://www.bilibili.com/video/BV1kv4y1g7nT?p=11&vd_source=f2640257c21e3b547a790461ed94875e')"><VideoCameraFilled /></el-icon>
        </div>


        <el-table :data="form.menuBtn" style="width: 100%;margin-top: 12px;">
          <el-table-column align="left" prop="name" label="按钮名称" width="180">
            <template #default="scope">
              <div>
                <el-input v-model="scope.row.name" />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="name" label="备注" width="180">
            <template #default="scope">
              <div>
                <el-input v-model="scope.row.desc" />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left">
            <template #default="scope">
              <div>
                <el-button
                  type="danger"

                  icon="delete"
                  @click="deleteBtn(form.menuBtn,scope.$index)"
                >删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div> -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="enterDialog">确 定</el-button>
        </div>
        
      </template>
    </el-dialog> 




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
        dialogFormVisible:false,
        dialogTitle:'新增菜单',
        form:{},
        isEdit:false,
        menuOption:[],
        checkFlag:false,
        rules:{
          path:[
            {
              required:true,
              trigger:'blur',
            }
          ]

        }

    
     }
   },
   methods: {
    //新增菜单
    addMenu(id){
      this.dialogTitle = '新增菜单'
      this.form.parentId = String(id)
      this.isEdit = false
       this.setOptions()
      this.dialogFormVisible =true
      
    },
    //编辑菜单
    editMenu(row){
       this.dialogTitle = '编辑菜单'
       this.isEdit = true
       this.form =row
       this.setOptions()
       this.dialogFormVisible =true

    },
    //删除菜单
    deleteMenu(row){
      this.$confirm('是否删除此菜单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const req ={
            id:row.id
          }
          console.log('id',row.id)
          console.log('req',req)
          deleteMenu(req).then(res=>{
               console.log(res)
            }
          )
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getTable()
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
    setMenuOptions(menuData, optionsData, disabled){
      menuData &&
        menuData.forEach(item => {
          if (item.children && item.children.length) {
            const option = {
              title: item.title,
              ID: String(item.ID),
              disabled: disabled || item.ID === this.form.ID,
              children: []
            }
            this.setMenuOptions(
              item.children,
              option.children,
              disabled || item.ID === this.form.ID
            )
            optionsData.push(option)
          } else {
            const option = {
              title: item.title,
              ID: String(item.ID),
              disabled: disabled || item.ID === this.form.ID
            }
            optionsData.push(option)
          }
        })

    },
    
    //关闭菜单执行
    handleClose(){
 
    },
    //取消按钮
    closeDialog(){
   this.dialogFormVisible =false
    },
    //确定按钮
    enterDialog(){
      this.$refs.menuForm.validate(valid=>{
        if(valid){
          if(this.isEdit){
            editMenu(this.form).then(res=>{
              console.log('editMenu',res)
               this.getTable()
            }
           

            ) 
          }else{
            console.log('addform',this.form)
            addMenu(this.form).then(res=>{
              console.log('addMenu',res)
              this.getTable()
            }

            )
          }
        }
        this.$refs.menuForm.resetFields()
        this.form={}
        this.dialogFormVisible =false
        this.getTable()

      })
    
    },
    changeName(){

    },
   
    fmtComponent(){

    },
    changeName(){
      this.form.path = this.form.name
    },
     getTable(){
        getMenuList().then(({data})=>{
         console.log('data',data)
        this.tableData =data.menuList
        console.log(this.tableData)
    })

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
    
   },
   computed: {

   },
   filters: {

   }
 }


</script>

<style>

</style>