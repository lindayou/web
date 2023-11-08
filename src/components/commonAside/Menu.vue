<template>
 <div>

     <template v-for ="item in MenuList">

          <el-submenu :key="item.name"  v-if="item.children && item.children.length>0" >
    <template slot="title">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{item.title}}</span>
    </template>
    <el-menu-item-group>
        <!-- 嵌套调用多级菜单 -->
        <Menu :MenuList="item.children"></Menu>
      <!-- <el-menu-item @click="clickMenu(subItem)" v-for="subItem in item.children" :key="subItem.id" :index="subItem.name">{{subItem.name}}</el-menu-item> -->
   
      <Menu></Menu>
    </el-menu-item-group>
    
  </el-submenu>


      <el-menu-item @click="toPage(item)" :index="item.name" :key="item.name" v-else >
    <i :class="`el-icon-${item.icon}`"></i>
    <span slot="title">{{item.title}}</span>
  </el-menu-item>
 

      <!-- <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.id" :index="item.path" >
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
    
  </el-submenu> -->

</template>
 </div>
</template>

<script>
import { mapMutations } from 'vuex';
 export default {
   name: 'Menu',
   props:['MenuList'],
   components: {

   },
   data () {
     return {

     }
   },
   methods: {
    ...mapMutations('tab',["selectMenu"]),
       toPage(item){
        if(this.$route.name !==item.name ){
          console.log('this.$route',this.$route)

        console.log('this.$item',item)
        this.selectMenu(item)

           this.$router.push(
               {name:item.name}
           )

        }
        

       }

   },
   mounted() {

   },
   watch: {

   },
   computed: {
   

   },
   created(){

   },
   filters: {

   }
 }
</script>

<style lang='less' scoped>

</style>