<template>
 <div>

     <template v-for ="item in MenuList">

          <el-submenu :key="item.name" :index="item.name" v-if="item.children && item.children.length>0" >
    <template slot="title">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title" v-if="!isCollapse">{{item.title}}</span>
    </template>
    <el-menu-item-group>
        <!-- 嵌套调用多级菜单 -->
        <Menu :MenuList="item.children"></Menu>
      <!-- <el-menu-item @click="clickMenu(subItem)" v-for="subItem in item.children" :key="subItem.id" :index="subItem.name">{{subItem.name}}</el-menu-item> -->
   
      
    </el-menu-item-group>
    
  </el-submenu>


      <el-menu-item @click="toPage(item)" :index="item.name" :key="item.name" v-if="!item.children  && !item.hidden" >
    <i :class="`el-icon-${item.icon}`"></i>
    <span slot="title">{{item.title}}</span>
  </el-menu-item>


</template>
 </div>
</template>

<script>
import { mapMutations,mapState } from 'vuex';
import {  } from 'vuex';
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
    ...mapState('tab',["isCollapse"]),
   

   },
   created(){

   },
   filters: {

   }
 }
</script>

<style lang='less' scoped>

</style>