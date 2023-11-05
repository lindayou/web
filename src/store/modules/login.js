
const state = {
  userInfo :{
    username:'',
    token:'',
  }
   
  
  }
  
  const mutations = {

    setUser(state,payload){
      state.userInfo = payload

    },

    removeUser(){
      state.userInfo ={
        username:'',
        token:'',
      }
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
  