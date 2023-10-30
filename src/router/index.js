import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Main from '@/views/Main.vue'
import Authority from '@/views/admin/authority/authority.vue'
import User from '@/views/admin/user/User.vue'
import Menu from '@/views/admin/menu/Menu.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'main',
    redirect:'/dashboard',
    component:Main,
    children:[
      {
        path:"home",
        name:'home',
        component:Home,
    },
    
        {
          path:'authority',
          name:'authority',
          component:Authority,
        },
        {
          path:'user',
          name:'user',
          component:User,
        },
        {
          path:'menu',
          name:'menu',
          component:Menu,
        },
     
    {
      path:"dashboard",
      name:'dashboard',
      component:Home,
  },
    ]


  },

  
  ]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
export default router