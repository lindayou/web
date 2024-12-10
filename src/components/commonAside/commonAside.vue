<template>
 <div>
  
<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"   background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
       <h3>{{isCollapse ? '后台':'后台管理系统'}}</h3>
   <!-- 动态菜单 -->
   <el-menu-item @click="toPage('dashboard')"   >
    <i class="el-icon-location"></i>
    <span slot="title">首页</span>
  </el-menu-item>

   <el-menu-item @click="toPage('css')"   >
    <i class="el-icon-location"></i>
    <span slot="title">测试Css</span>
  </el-menu-item>
 
 
     <Menu :MenuList="menu" ></Menu>
 
</el-menu>
 </div>
</template>

<script>
import { getMenuData } from '../../api/index.js'
import { mapState } from "vuex";
import Cookies  from "js-cookie";
import Menu from './Menu.vue'
 export default {
   name: 'commonAside',
   props: {
   },
   components: {
     Menu
   },
   data () {
     return {
     }
   },
   methods: {
     toPage(name){
       this.$router.push({name})
     },
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
    

   },
   mounted() {
        
   },
   watch: {

   },
     computed: {
   

   },
 
   computed: {
      ...mapState('tab',['menu']),
    noChildren(){
     return this.menuData.filter(item=>!item.children)
    },
    hasChildren(){
      return this.menuData.filter(item=>item.children)
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    },
    menuData(){
      return   this.$store.state.tab.menu
    }
   },
     created(){
    console.log('加载动态导航菜单',this.menu)

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
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu-item {
  transition: all 0.3s ease; /* 过渡效果 */
  padding: 12px 24px;
  border-radius: 6px; /* 增加圆角 */
}
.el-menu-item:hover {
  background-color: #1a2328; /* 悬停时深色背景 */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2); /* 悬停时添加右侧阴影 */
}
.el-menu-item.is-active {
  background-color: #16a085; /* 选中项背景颜色 */
  color: #fff; /* 选中项文字颜色 */
}
.el-menu-item i {
  margin-right: 12px;
  font-size: 18px; /* 图标稍微增大 */
  transition: transform 0.2s ease-in-out; /* 图标过渡效果 */
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px; /* 扩展宽度，让菜单更宽 */
  min-height: 400px;
  padding-top: 20px;
}
.el-menu-item span {
  font-size: 16px; /* 增加文字的大小 */
  font-weight: 500; /* 文字加粗 */
  letter-spacing: 0.5px; /* 字母间距 */
}

</style>