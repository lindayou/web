import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Main from '@/views/Main.vue'
import Admin from '@/views/admin/index.vue'
import Authority from '@/views/admin/authority/authority.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'main',
    component:Main,
    children:[
      {
        path:"home",
        name:'home',
        component:Home,
    },
    {
      path:'admin',
      name:'admin',
      component:Admin,
      children:[
        {
          path:'authority',
          name:'authority',
          component:Authority,
        }
      ]
    },
    {
      path:"dashboard",
      name:'home',
      component:Home,
  },
    ]


  },

  
  ]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
export default router