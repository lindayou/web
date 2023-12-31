import Cookies  from "js-cookie"
import  {routerMap}  from '@/router/menu'
import  router,{baseRoute}  from '@/router/index'
import {rulesMenu,} from '@/utils/common'
import  {cloneDeep} from 'loadsh'
import {getMenuAuthority,getUserMenus} from '@/api/menu'
const state = {
  isCollapse:false ,//控制菜单
  menu:[],
  //面包屑
  tabList:[
    {
      path:'/',
      name:'dashboard',
      title:"首页",
    }

  ]
  
}
 
const mutations = {
  collapseMenu(state){
     state.isCollapse =!state.isCollapse
  },
  //更新面包屑
  selectMenu(state,val){
    if (val.name !=='home') {
      const index =state.tabList.findIndex(item =>item.name===val.name)
      if(index ===-1){
        state.tabList.push(val)
      }
    }


  },
  //清空面包屑
  removeBreadMenu(state){
    state.tabList =[
      {
        path:'/',
        name:'dashboard',
        title:"首页",
      }
  
    ]

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
    let res = await getUserMenus({userId:rootState.login.userInfo.userId})

  console.log('后端返回的菜单信息',res.data)
 
  let myMenu = rulesMenu(routerMap,res.data.data.menuList)
  console.log('myMenu ',myMenu)
  commit('setMenu',res.data.data.menuList)
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
