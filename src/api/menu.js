import http from '../utils/request'
//获取菜单列表
export const getMenuList = () =>{
    return http.get('/api/menu/getMenuList')
}

//添加菜单
export const addMenu = (param) =>{
    return http.post('/api/menu/addBaseMenu',param)
}
//编辑菜单
export const editMenu = (param) =>{
    return http.post('/api/menu/editMenu',param)
}
//删除菜单
export const deleteMenu = (param) =>{
    return http.post('/api/menu/deleteMenu',param)
}

//获取指定角色菜单
export const getMenuAuthority = (param) =>{
    return http.post('/api/menu/getMenuAuthority',param)
}

//获取指定用户菜单
export const getUserMenus = (params) =>{
    return http.get('/api/menu/getUserMenus',{params})
}


//增加菜单和角色关联
export const addMenuAuthority = (param) =>{
    return http.post('/api/menu/addMenuAuthority',param)
}