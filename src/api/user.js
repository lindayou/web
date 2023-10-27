import http from '../utils/request'
//获取用户列表
export const getUserList = (param) =>{
    return http.post('/api/user/getUserList',param)
}
//新增用户
export const createUser = (param) =>{
    return http.post('/api/user/register',param)
}

//删除用户
export const deleteUser = (param) =>{
    return http.post('/api/user/register',param)
}
//编辑用户
export const editUser = (param) =>{
    return http.post('/api/user/edit',param)
}