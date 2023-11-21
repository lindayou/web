<template>
 <div class="manager">
<div class="table-box">
  <el-table
    :data="tableData"
    :max-height="800"
    stripe
    style="width: 100%">
    <el-table-column
      prop="ip"
      label="请求IP"
      width="180">
    </el-table-column>
    <el-table-column
      prop="method"
      label="方法"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="请求路径">
    </el-table-column>
    <el-table-column align="left" label="状态码" prop="status" width="120">
          <template #default="scope">
            <div>
              <el-tag type="success">{{ scope.row.status }}</el-tag>
            </div>
          </template>
        </el-table-column>

    <el-table-column  label="请求" prop="body" width="80">
          <template #default="scope">
            <div>
              <el-popover v-if="scope.row.body" placement="left-start" trigger="hover">
                <div class="popover-box">
                  <pre>{{ fmtBody(scope.row.body) }}</pre>
                </div>
                <template #reference>
                  <el-icon class="el-icon-zoom-in"></el-icon>
                </template>
              </el-popover>

              <span v-else>无</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="响应" prop="resp" width="80">
          <template #default="scope">
            <div>
              <el-popover v-if="scope.row.resp" placement="left-start" trigger="hover">
                <div class="popover-box">
                  <pre>{{ fmtBody(scope.row.resp) }}</pre>
                </div>
                <template #reference>
                  <el-icon class="el-icon-search"></el-icon>
                </template>
              </el-popover>
              <span v-else>无</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
      prop="userId"
      label="操作人">
    </el-table-column>
  
  </el-table>
</div>
 </div>
</template>

<script>
import { getOperationlist} from '../../../api/operation.js'
 export default {
   name: 'Operation',
   props: {
   },
   components: {

   },
   data () {
     return {
      tableData:[],

     }
   },
   methods: {
    async getOperationlist(){

      let res = await getOperationlist()
      console.log("this is res ",res)
      this.tableData =res.data.data.operationList


    },
    fmtBody(value){
      try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
    }

   },
   mounted() {
    this.getOperationlist()

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
.manage{

}

.table-box{

}

</style>    