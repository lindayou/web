
const state = {
  isCollapse:false //控制菜单
  
}

const mutations = {
  collapseMenu(state){
     state.isCollapse =!state.isCollapse
  }

}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
