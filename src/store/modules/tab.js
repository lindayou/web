import Cookies  from "js-cookie"
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
    const menu =JSON.parse(Cookies.get('menu'))
    state.menu =menu
    menu.forEach(item => {
      
    });

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
