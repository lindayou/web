import Cookies  from "js-cookie"
import  router,{baseRoute,allMenu}  from '@/router/index'
import {rulesMenu} from '@/utils/common'
const state = {
  isCollapse:false ,//控制菜单
  menu:[],
  
}

const mutations = {
  collapseMenu(state){
     state.isCollapse =!state.isCollapse
  },
  setMenu(state,val){
    state.menu =val
    Cookies.set('menu',JSON.stringify(val))

  },

  addMenu(state,router){
    if(!Cookies.get('menu')){
      return      
    }
    const menuData =JSON.parse(Cookies.get('menu'))
    state.menu =menuData
    console.log('allMenu  ',allMenu,)
    console.log('baseRoute  ',baseRoute,)
    
    console.log('menuData',menuData)
    let myMenu = rulesMenu(allMenu,menuData)
    // let myMenu = rulesMenu(routerMap,menuData)
    console.log('myMenu ',myMenu)
   

  },

}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
