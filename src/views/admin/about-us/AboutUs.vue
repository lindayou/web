<template>
   <div class="image">
  <div class="image1">
    <span class="demonstration">扫一扫，添加我为好友</span>
    <el-image :src="src1"></el-image>
  </div>
  <div class="image2">
    <span class="demonstration">V50看看实力</span>
    <el-image :src="src2">
     
    </el-image>
  </div>
</div>
</template>


<script>
  export default {
    data() {
      return {
        src1: require('@/assets/img/haoyou.jpg'),
        src2: require('@/assets/img/weixin.jpg')
      }
    }
  }
</script>


<style lang="less" scoped>
.image{
    display: flex;
  flex-direction: column; /* 让图片竖直排列 */
  align-items: center; /* 图片居中对齐 */
  justify-content: center;
  height: 100vh; /* 设置高度为视口高度 */
  gap: 20px; /* 设置图片之间的间距 */
    .image1,.image2{
        width: 300px;
  height: auto; /* 图片高度自适应 */
  position: relative;
    }
  
}

.demonstration {
    bottom: 20px; /* 文字距离图片底部的间距 */
    left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 水平居中 */
  font-size: 18px; /* 设置文字大小 */
  font-weight: bold; /* 文字加粗 */
  color: #fff; /* 文字颜色为白色 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* 文字阴影，增加可读性 */
  background: rgba(0, 0, 0, 0.6); /* 半透明背景色 */
  padding: 8px 16px; /* 文字内边距 */
  border-radius: 5px; /* 文字背景圆角 */

}

</style>