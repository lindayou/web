import Authority from '@/views/admin/authority/authority.vue'
import User from '@/views/admin/user/User.vue'
import Menu from '@/views/admin/menu/Menu.vue'
import Admin from '@/views/admin/index.vue'
import Dictionary from '@/views/admin/dictionary/Dictionary.vue'
import DictionDetails from '@/views/admin/dictionary/DictionDetails.vue'



    
 export const routerMap = [


    {
        path:'admin',
        name:'admin',
        component:Admin,
        children:[
            {
                path:"authority",
                name:'authority',
                component:Authority,
            },
            {
                path:"user",
                name:'user',
                component:User,
            },
            {
                path:"menu",
                name:'menu',
                component:Menu,
            },
            {
                path:"dictionary",
                name:"dictionary",
                component:Dictionary,
            },
            {
                path:"dictionaryDetail",
                name:"dictionaryDetail",
                component:DictionDetails,
            },


        ]
            
    },
   
]
// module.exports = {allmenu}
  
    
  
//   export default routerMap