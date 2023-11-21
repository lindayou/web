import http from '../utils/request'
//获取日志列表
export const getOperationlist = (params) =>{
    return http.get('/api/operation/getOperationList',{params})
}

//创建日志

export const createOperation = (params) =>{
    return http.post('/api/operation/createOperation',params)
}



