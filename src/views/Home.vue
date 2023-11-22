<template>
 <div>
   <el-row>

     <el-col :span="8">

 <el-card class="box-card">
  <div class="user">
    <img src="../assets/user.jpg" alt="">
    <div class="userInfo">
    <p class="name">Admin</p>
    <p class="assess">超级管理员</p>
  </div>
  </div>
  
  <div class="loginInfo"></div>
  
 
</el-card>
     </el-col>
   </el-row>
   <el-row>

    <div id="charts" style="width: 100% ; height: 300px;"></div>
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

     }
   },
   methods: {

   },
   mounted() {

    var myChart = echarts.init(document.getElementById('charts'));
// 绘制图表
myChart.setOption({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
});

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
</style>