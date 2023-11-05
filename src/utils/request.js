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
http.interceptors.response.use(function (response) {
switch (response.data.code){
  case 7:
    Vue.prototype.$message.error(response.data.msg)
}
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    if (err.response.data.message) {
      Vue.prototype.$message.error(err.response.data.message)
      return Promise.reject(err.response.data.message) // 返回接口返回的错误信息
    } else {
      // 返回状态码不为200时候的错误处理
      Vue.prototype.$message.error(err.toString())
      return Promise.resolve(err)
    }
  });


  export default http