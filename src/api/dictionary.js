import http from '../utils/request'
//获取字典列表
export const getDicList = () =>{
    return http.get('/api/dic/getDicList')
}
