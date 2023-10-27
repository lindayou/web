<template>
  <div id="app">
<el-row>
<router-view></router-view>
</el-row>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
   
  }
}
</script>

<style lang="less" >
html,body,p{
  margin: 0;
  padding: 0
}
#app {
  background: #eee;
  height: 100vh;
  overflow: hidden;
  font-weight: 400 !important;
}
.el-button{
  font-weight: 400 !important;
}

</style>

