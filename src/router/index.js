import Vue from 'vue'
import VueRouter from 'vue-router'
import DashBoard from '@/views/Home.vue'
import Main from '@/views/Main.vue'
import Css from '@/components/TestCss/TestCss.vue'
import Register from '@/views/register/Register.vue'
import AboutUs from '@/views/admin/about-us/AboutUs.vue'
import Login from '@/views/login/Login.vue'


Vue.use(VueRouter)

const originalPush =VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path:'/login',
    name:'login',
    component:Login,

  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutUs,
  },
  

]
  
export const baseRoute= [
  {
    path:'/',
    name:'main',
    redirect:'/dashboard',
    meta:{
    isLogin:true
    },
    component:Main,
    children:[
      {
        path:'dashboard',
        name:'dashboard',
        component:DashBoard,
        meta:{
          title:'首页',
        },
        // component:DashBoard,
      },
      {
        path:'css',
        name:'css',
        component:Css
      }

    ]

  }
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})


export default router