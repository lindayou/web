<template>
 <div class ="home">
   <el-row>

     <el-col :span="8">

 <el-card class="box-card" >
  <div class="user">
    <img src="../assets/user.jpg" alt="">
    <div class="userInfo">
    <p class="name">Admin</p>
    <p class="assess">超级管理员</p>
  </div>
  </div>
  
  <div class="loginInfo"></div>
  
 
</el-card>
     </el-col >
   </el-row>

   <el-divider></el-divider>

     <div class="gva-card-box">
      <div class="gva-card quick-entrance">
        <div class="gva-card-title">快捷入口</div>
        <el-row :gutter="20">
          <el-col
            v-for="(card, key) in toolCards"
            :key="key"
            :span="4"
            :xs="8"
            class="quick-entrance-items"
            
          >
            <div class="quick-entrance-item">
              <div class="quick-entrance-item-icon" :style="{ backgroundColor: card.bg }" @click="toTarget(card.name)">
                <!-- <el-icon>
                  <component :is="card.icon" :style="{ color: card.color }" />
                </el-icon> -->
                <i :class="`el-icon-${card.icon}`"></i>
              </div>
              <p>{{ card.label }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-divider></el-divider>

<el-row>
    <el-col :span="12">


       <div id="charts" style="width: 100% ; height: 300px;"></div>

     </el-col>

     <el-col :span="12">
       <div id="chart2" style="width: 100% ; height: 300px" > </div>
     </el-col>
</el-row>

  
 </div>
</template>

<script>
import * as echarts from 'echarts';
 export default {
   name: 'home',
   props: {
   },
   components: {

   },
   data () {
     return {
       toolCards:[
          {
    label: '用户管理',
    icon: 'monitor',
    name: 'user',
    color: '#ff9c6e',
    bg: 'rgba(255, 156, 110,.3)'
  },
  {
    label: '角色管理',
    icon: 'setting',
    name: 'authority',
    color: '#69c0ff',
    bg: 'rgba(105, 192, 255,.3)'
  },
  {
    label: '菜单管理',
    icon: 'menu',
    name: 'menu',
    color: '#b37feb',
    bg: 'rgba(179, 127, 235,.3)'
  },
  {
    label: '用户管理',
    icon: 'user',
    name: 'user',
    color: '#ffd666',
    bg: 'rgba(255, 214, 102,.3)'
  },
  {
    label: '操作历史',
    icon: 'time',
    name: 'operation',
    color: '#ff85c0',
    bg: 'rgba(255, 133, 192,.3)'
  },
  {
    label: '字典管理',
    icon: 'user',
    name: 'dictionary',
    color: '#5cdbd3',
    bg: 'rgba(92, 219, 211,.3)'
  }

       ]

     }
   },
   methods: {
     getChart1(){
       
    var myChart = echarts.init(document.getElementById('charts'));
// 绘制图表
myChart.setOption({
  title: {
    text: '访问统计'
  },
  tooltip: {},
  xAxis: {
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

  },
  yAxis: {},
  series: [
    {
      name: '访问次数',
      type: 'bar',
      data: [3000, 5000, 8000, 9000, 8000, 10000,10000,10000,12000,15000,16000,20000]
    }
  ]
});
     },
     getChart2(){
       var chartDom = document.getElementById('chart2');
       var myChart = echarts.init(chartDom);
       var option;

option = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
option && myChart.setOption(option);
     },
     toTarget(name){
       this.$router.push({name:name})

     }

   

   },
   mounted() {
     this.getChart1()
     this.getChart2()


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
.user{
  display: flex;
  align-items: center;
  margin-right: 40px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userInfo{
    .name{
      font-size: 32px;
      margin-bottom: 10px;
    }
    .assess{
      color: #999999;
    }
  }
}

.quick-entrance-item-icon{
  
}
.home{
  background: white;
  height: 100%;
  .gva-card-title{
    text-align: center;
    font-size: 20px;
  }
    .quick-entrance-item-icon{
    text-align: center;
    font-size: 50px
  //  position: absolute;
    // bottom: 0;
    // right: 20px;
  }
  .gva-card-box{
    margin-top: 50px;
    margin-bottom: 20px;
  }
   ::v-deep .el-col{
     
   }
     ::v-deep .el-card.box-card.is-always-shadow{
       height: 200px;
     }
   


}
</style>