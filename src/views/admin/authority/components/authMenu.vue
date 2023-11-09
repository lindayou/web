<template>
 <div>
    <div class="header">
      <el-input v-model="filterText"  placeholder="筛选"  style="width:60%" />
      <el-button class="button" type="primary" @click="relation">确 定</el-button>
    </div>
    <div class="tree-content clear-both">
      <el-tree
        ref="menuTree"
        :data="menuTreeData"
        :default-checked-keys="menuTreeIds"
        :props="menuDefaultProps"
        default-expand-all
        highlight-current
        node-key="id"
        show-checkbox
        :filter-node-method="filterNode"
        @check="nodeChange"
      >
        <!-- <template #default="{ node , data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span> -->
            <!-- <span>
              <el-button
                type="primary"
                link

                :style="{color:row.defaultRouter === data.name?'#E6A23C':'#85ce61'}"
                :disabled="!node.checked"
                @click="() => setDefault(data)"
              >
                {{ row.defaultRouter === data.name?"首页":"设为首页" }}
              </el-button>
            </span> -->
            <!-- <span v-if="data.menuBtn.length">
              <el-button
                type="primary"
                link

                @click="() => OpenBtn(data)"
              >
                分配按钮
              </el-button>
            </span> -->
          <!-- </span>
        </template> -->
      </el-tree>
    </div>
    <el-dialog v-model="btnVisible" title="分配按钮" destroy-on-close>
      <el-table
        ref="btnTableRef"
        :data="btnData"
        row-key="ID"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="按钮名称" prop="name" />
        <el-table-column label="按钮备注" prop="desc" />
      </el-table>
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
import {getMenuList,getMenuAuthority,addMenuAuthority} from '../../../../api/menu'
 export default {
   name: 'authMenu',
   props:['row','drawer'],
   components: {

   },
   data () {
     return {
         menuTreeData:[],
         menuDefaultProps:{
             id:'id',
            children: 'children',
            label:'title'
            // function(data) {
            // return data.title
            // }
         },
         filterText:'',
         btnData:[],
         menuTreeIds:[],
         btnVisible:false,

     }
   },
   methods: {
       relation(){
           const checkArr = this.$refs.menuTree.getCheckedNodes(false, true)
           console.log('this is checkArr ',checkArr)
           addMenuAuthority({
               authorityId:this.row.authorityId,
               menuList:checkArr
           }).then(res=>{
                console.log('addMenuAuthorityRes',res)
                this.$message({
                     type: 'success',
                     message: '设置成功!'

                })
                this.init()

           })
           

       },
       nodeChange(){

       },
       closeDialog(){

       },
       enterDialog(){

       },
       OpenBtn(){

       },
       setDefault(){

       },
       handleSelectionChange(){

       },
       filterNode(value, data){
           if (!value) return true
         return data.title.indexOf(value) !== -1

       },
       async init(){
        let res =await getMenuList()
        console.log('res',res.data)
          this.menuTreeData =res.data.menuList
        let res1 = await getMenuAuthority({authorityId:this.row.authorityId})
        console.log('this is res1',res1)
        const menus = res1.data.menuList
        const arr = []
        menus.forEach(item => {
        // 防止直接选中父级造成全选
        //item下面没有子元素  item不是父元素
        if (!menus.some(same => same.parentId === item.menuId)) {
        arr.push(Number(item.id))
    }
  })
  console.log('this is arr ',arr )
  this.menuTreeIds =arr

       }

   },
   mounted() {
      

   },
 created(){
   this.init()
 },
   watch: {
       filterText(val){
           console.log('this.$refs.menuTree',this.$refs.menuTree)
           this.$refs.menuTree.filter(val)

       }

   },
   computed: {

   },
   filters: {

   }
 }
</script>

<style lang='less' scoped>
.header{
    display: flex;
    .button{
         margin-left: 20px;
        
    }
}

</style>