<template>
 <div class="manager">
<div class="table-box">
  <el-table
    :data="tableData"
    :max-height="750"
    stripe
    style="width: 100%">

      <el-table-column
      prop="createdAt"
      label="操作时间"
      width="180">
      <template #default="scope">
            <div>
              <el-tag >{{ fmtDate(scope.row.createdAt*1000) }}</el-tag>
            </div>
          </template>


    </el-table-column>
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
<div class="page">
        <el-pagination
        background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>

</div>
 </div>
</template>

<script>
import { getOperationlist} from '../../../api/operation.js'
import {parseDate } from  '../../../utils/day.js' 
 export default {
   name: 'Operation',
   props: {
   },
   components: {

   },
   data () {
     return {
      tableData:[],
      pageSize:20,
      page:0,
      total:0,

     }
   },
   methods: {
    async getOperationlist(){
        const req ={
            page:this.page,
            pageSize:this.pageSize,
        }

      let res = await getOperationlist(req)
      console.log("this is res ",res)
      this.tableData =res.data.data.operationList
      this.total =res.data.data.total


    },
    handleSizeChange(val) {

        this.pageSize =Number(val)
      },
        handleCurrentChange(val) {
        this.page =Number(val)
        this.getOperationlist()
      },
    fmtBody(value){
      try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
    },
    fmtDate(value){
       console.log('this is value', value);  
    let date = new Date(value);  
    console.log('this is date', date.toLocaleString());  
    return  date.toLocaleString()

    },
    parseDate(value){
        return parseDate(value)
    },
    timestampToDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
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
.page{
    text-align: right;
}

</style>    