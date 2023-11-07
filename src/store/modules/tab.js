import Cookies  from "js-cookie"
import  {routerMap}  from '@/router/menu'
import  router,{baseRoute}  from '@/router/index'
import {rulesMenu,} from '@/utils/common'
import  {cloneDeep} from 'loadsh'
import {getMenuAuthority} from '@/api/menu'
import { getAuthorityList } from "@/api/authority"
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
    let res = await getMenuAuthority({authorityId:8881})

  console.log('后端返回的菜单信息',res.data)
  let myMenu = rulesMenu(routerMap,menuData)
  console.log('myMenu ',myMenu)
  commit('setMenu',myMenu)
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
