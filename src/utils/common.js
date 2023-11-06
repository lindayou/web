


export function rulesMenu(menu,menuData){
    let menuArr =[]
//遍历前端菜单 
menu.forEach(ele => {

    menuData.forEach(item => {
        const pushMenu ={}
        if (ele.name=item.path ){
            if( item.children && item.children.length >0){
                rulesMenu(ele.children,item.children)

            }else{
                pushMenu ={
                    path:ele.path,
                    name:ele.name,
                    component:ele.component
                }
    
    
            }
        }

        
    });
    menuArr.push(pushMenu)
    
});
    // console.log('in--menu',menu)
    // let menuArr =[]

    // menu.forEach(ele => {
    //     menuData.forEach(item => {
    //         if(ele.name =item.path){
             
    //             if(item.children &&item.children.length>0){
    //                 ele.children =rulesMenu(ele.children,item.children)

    //             }
    //             menuArr.push(ele)
               
               
    //         }
            
    //     });
        
    // });

    // return menuArr 

}