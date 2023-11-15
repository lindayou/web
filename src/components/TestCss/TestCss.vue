<template>
 <div class="div0">
     <div class ="div1"></div>
     <div class ="div2"></div>
     <div class ="div3"></div>


 </div>
</template>

<script>
 export default {
   name: 'TestCss',
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
.div0{
    height: calc(100vh - 150px);
    
    
.div1{
    border: 1px solid blue;
    height: 15%;
    margin: 10px 10px;
}
.div2{
    border: 1px solid blue;
    height: 75%;
    margin: 10px 10px;
}
.div3{
    border: 1px solid blue;
    height: 10%;
    margin: 10px 10px;
     

}
}


</style>