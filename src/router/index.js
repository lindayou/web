import Vue from 'vue'
import VueRouter from 'vue-router'
import DashBoard from '@/views/Home.vue'
import Main from '@/views/Main.vue'
import Login from '@/views/login/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'main',
    meta:{
    isLogin:true
    },
    component:Main,
    children:[
      {
        path:'dashboard',
        name:'dashboard',
        component:DashBoard,
      }

    ]

  },
  {
    path:'/login',
    name:'login',
    component:Login,

  },
  

]
  
export const baseRoute= [
  {
    path:'/',
    name:'main',
    meta:{
    isLogin:true
    },
    component:Main,
    children:[
      {
        path:'dashboard',
        name:'dashboard',
        component:DashBoard,
      }

    ]

  }
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})


export default router