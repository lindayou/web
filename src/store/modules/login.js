
const state = {
  userInfo :{
    username:'',
    token:'',
    authorityId:0,
    userId:0,
  }
   
  
  }
  
  const mutations = {

    setUser(state,payload){
      state.userInfo = payload,
      console.log('保存登录信息到stroe完成',state.userInfo)

    },

    removeUser(){
      state.userInfo ={
        username:'',
        token:'',
        authorityId:0,
        userId:0,

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
  