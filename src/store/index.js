import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import tab from './modules/tab'
import  createPersistedstate from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    login,
    tab,
  },
  plugins:[
    createPersistedstate({
      key:'info',
      paths:['login']
    })
  ]
})


