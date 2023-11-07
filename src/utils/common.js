

import  {cloneDeep} from 'loadsh'
export function rulesMenu(menu,menuData){
    let menuArr =[]
//遍历前端菜单
let arr =cloneDeep(menu)
arr.forEach(ele => {
    //  debugger
    menuData.forEach(item => {
        if (ele.name===item.path ){
            // debugger
            if( item.children && item.children.length >0){
                // debugger
                ele.children=rulesMenu(ele.children,item.children)

            }
            menuArr.push(ele)
        }



    })



});

return menuArr
}

