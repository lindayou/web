import Cookies  from "js-cookie"
import  {routerMap}  from '@/router/menu'
import  router,{baseRoute}  from '@/router/index'
import {rulesMenu,} from '@/utils/common'
import  {cloneDeep} from 'loadsh'
import {getMenuAuthority} from '@/api/menu'
const state = {
  isCollapse:false ,//控制菜单
  menu:[],
  
}
 
const mutations = {
  collapseMenu(state){
     state.isCollapse =!state.isCollapse
  },
  //设置菜单导航
  setMenu(state,val){
    state.menu =val
    console.log('setMenu Over')

  },
  //清除菜单导航
  removeMenu(state){
    state.menu =[]
  },


}

const actions = {
  //请求接口
  async getMenuList({commit,rootState}){
    // authorityId:rootState.login.userinfo.authorityId
    console.log('rootState.login.userinfo',rootState)
    let res = await getMenuAuthority({authorityId:rootState.login.userInfo.authorityId})

  console.log('后端返回的菜单信息',res.data)
  const testMenu =[{
    path:'admin', 
    name:'admin',
    meta:{
      title:'超级管理员'
    },
    children:[
      {
        path:'user',
        name:'user',
        meta:{
          title:'用户'
        }

      }
    ]
  }]
  let myMenu = rulesMenu(routerMap,res.data.menuList)
  console.log('myMenu ',myMenu)
  commit('setMenu',res.data.menuList)
  //添加
  let mybaseRoutes =cloneDeep(baseRoute)
 
  mybaseRoutes[0].children.push(...myMenu)
  console.log('mybaseChild',mybaseRoutes)


  return mybaseRoutes;




  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
