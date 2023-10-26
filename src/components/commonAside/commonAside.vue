<template>
 <div>
  
<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"   background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
       <h3>{{isCollapse ? '后台':'后台管理系统'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.id" :index="item.path" >
    <i :class="`el-icon-${item.icon}`"></i>
    <span slot="title">{{item.title}}</span>
  </el-menu-item>
  <el-submenu v-for="item in hasChildren" :key="item.id" :index="item.name">
    <template slot="title">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{item.title}}</span>
    </template>
    <el-menu-item-group>
      <el-menu-item @click="clickMenu(subItem)" v-for="subItem in item.children" :key="subItem.id" :index="subItem.name">{{subItem.title}}</el-menu-item>
    </el-menu-item-group>
    
  </el-submenu>

 
</el-menu>
 </div>
</template>

<script>
import { getMenuData } from '../../api/index.js'
 export default {
   name: 'commonAside',
   props: {
   },
   components: {

   },
   data () {
     return {
       menuData:[],
     }
   },
   methods: {
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      getMenuList(){
        getMenuData().then(({data})=>{
          this.menuData =data.menuList
        })
      },
      //点击菜单
      clickMenu(item){
          if(this.$route.path !==('/'+item.path)){
            console.log(this.$route.path,item.path,"11111111111")
            
              this.$router.push(item.path)
              console.log('22222',this.$route.path)
          }
         
      },
      //带二级菜单的跳转
      clickChildMenu(subItem,item){
         this.$router.push(item.path +'/'+subItem.path)
          console.log('33333',this.$route)
      }

   },
   mounted() {
        this.getMenuList()
   },
   watch: {

   },
   computed: {
    noChildren(){
     return this.menuData.filter(item=>!item.children)
    },
    hasChildren(){
      return this.menuData.filter(item=>item.children)
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    }
   },
   filters: {

   }
 }
</script>

<style lang='less' scoped>
.el-menu {
 height: 100vh;
 h3 {
   color: #fff;
   text-align: center;
   line-height: 48px;
   font-size: 16px;
   }
   border-right: none;
}
</style>