import router from '@/router'
import store from '@/store'
router.beforeEach((to,from,next)=>{
  console.log('tototo',to )
    if(to.matched.some(ele => ele.meta.isLogin)){
      console.log('1111111111',ele)
       if(store.state.login.userInfo.token){
           //获取动态导航
           if(!store.state.tab.menu.length){
               store.dispatch('tab/getMenuList').then(mybaseRoutes=>{
                   console.log('mybaseRoutes',mybaseRoutes)
                  mybaseRoutes.forEach(element => {
                      router.addRoute(element)
                  });
               })

           }
            next()
       }else{
         next('/login')
       }
    }else{
      next()
    }
  }
  
  )