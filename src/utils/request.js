import axios from "axios";
import Vue from 'vue'
const http = axios.create({
    timeout: 5000,
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(response =>{
  // debugger
 if (response.data.code===7){
   
  Vue.prototype.$message.error(response.data.msg)
  return Promise.reject(response?.data || {})
}else{
  return response
}
  }, error=> {
    // 对响应错误做点什么
    if(!error.response){
      Vue.prototype.$confirm(`
      <p>检测到请求错误</p>
      <p>${error}</p>
      `, '请求报错', {
      dangerouslyUseHTMLString: true,
      distinguishCancelAndClose: true,
      confirmButtonText: '稍后重试',
      cancelButtonText: '取消'
    })
    }

    switch (error.response.status) {
      case 500:
        Vue.prototype.$confirm(`
        <p>检测到接口错误${error}</p>
        <p>错误码<span style="color:red"> 500 </span>：此类错误内容常见于后台panic，请先查看后台日志，如果影响您正常使用可强制登出清理缓存</p>
        `, '接口报错', {
          dangerouslyUseHTMLString: true,
          distinguishCancelAndClose: true,
          confirmButtonText: '清理缓存',
          cancelButtonText: '取消'
        })
          // .then(() => {
          //   const userStore = useUserStore()
          //   userStore.token = ''
          //   localStorage.clear()
          //   router.push({ name: 'Login', replace: true })
          // })
        break
      case 404:
        Vue.prototype.$confirm(`
          <p>检测到接口错误${error}</p>
          <p>错误码<span style="color:red"> 404 </span>：此类错误多为接口未注册（或未重启）或者请求路径（方法）与api路径（方法）不符--如果为自动化代码请检查是否存在空格</p>
          `, '接口报错', {
          dangerouslyUseHTMLString: true,
          distinguishCancelAndClose: true,
          confirmButtonText: '我知道了',
          cancelButtonText: '取消'
        })
        break
    }
    return Promise.reject(error);
  });


  export default http