import http from '../utils/request'
//获取字典列表
export const getDicList = (params) =>{
    console.log('getDicList',params)
    return http.get('/api/dic/getDicList',{params})
}
//获取字典详情
export const getDicDetails = (id) =>{
    return http.get(`/api/dic/getDicDetials?id=${id}`)
}
//增加字典
export const addDic = (params) =>{
    return http.post('/api/dic/addDic',params)
}
//编辑字典
export const editDic = (params) =>{
    return http.post('/api/dic/editDic',params)
}
//删除字典
export const deleteDic = (params) =>{
    return http.post('/api/dic/deleteDic',params)
}
//增加字典详情
export const addDicDetails = (params) =>{
    return http.post('/api/dic/addDicDetails',params)
}
//编辑字典详情
export const editDicDetails = (params) =>{
    return http.post('/api/dic/editDicDetails',params)
}
//删除字典详情
export const deleteDicDetails = (params) =>{
    return http.post('/api/dic/deleteDicDetails',params)
}