import http from '../utils/request'
//获取角色列表
export const login = (param) =>{
    return http.post('/api/user/login',param)
}
