import http from '../utils/request'
//获取用户列表
export const getMenuList = () =>{
    return http.get('/api/menu/getMenuList')
}