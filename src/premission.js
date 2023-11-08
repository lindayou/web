import router from '@/router'
import store from '@/store'
router.beforeEach((to,from,next)=>{
  console.log('开始路由守卫')
  console.log('tototo',to )
    if(to.matched.length ==0 || to.matched.some(ele => ele.meta.isLogin)){  //需要登录  
      //判断是否登录 token 值是否存在
       if(store.state.login.userInfo.token){ //登录过 可以查看页面
        console.log('在state中发现token', )
           //获取动态导航
           if(!store.state.tab.menu.length){
            console.log('store中得menu数组为空',store.state.tab.menu )

               store.dispatch('tab/getMenuList').then(mybaseRoutes=>{
                   console.log('mybaseRoutes',mybaseRoutes)
                  mybaseRoutes.forEach(element => {
                      router.addRoute(element)
                     
                  });
            
               })
               
               next()

           }else{
            next()

           }
           
           
       }else{  //没登陆  去登录
         next('/login')
       }
    }else{ //不需要登录
      next()
    }
  }
  
  )