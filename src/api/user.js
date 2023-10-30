import http from '../utils/request'
//获取用户列表
export const getUserList = (param) =>{
    return http.post('/api/user/getUserList',param)
}
//新增用户
export const createUser = (param) =>{
    return http.post('/api/user/register',param)
}

//编辑用户
export const editUser = (param) =>{
    return http.post('/api/user/edit',param)
}
//删除用户

export const deleteUser = (param) =>{
    return http.post('/api/user/deleteUser',param)
}

//修改密码
export const changePass = (param) =>{
    return http.post('/api/user/changePass',param)
}


//设置用户权限
export const setUserAuthority = (param) =>{
    return http.post('/api/user/setUserAuthority',param)
}

