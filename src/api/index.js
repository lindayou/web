import http from '../utils/request'

export const getMenuData = () =>{
    return http.get('/api/menu/getMenuList')
}