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
       
      </el-tree>
    </div>

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