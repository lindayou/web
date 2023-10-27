import http from '../utils/request'
//获取角色列表
export const getAuthorityList = () =>{
    return http.get('/api/authority/getAuthorityList')
}
//增加角色
export const addAuthority = (param) =>{
    return http.post('/api//authority/createAuthority',param)
}

//删除角色
export const deleteAuthority = (param) =>{
    return http.post('/api/authority/deleteAuthority',param)
}
//修改角色
export const editAuthority = (param) =>{
    return http.post('/api/authority/updateAuthority',param)
}