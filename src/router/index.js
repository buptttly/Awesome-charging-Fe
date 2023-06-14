import { createRouter, createWebHashHistory } from 'vue-router'
import LayOut from '../views/LayOut/LayOut'
import store from "../store/index.js"

const routes = [
  //登录
  {
    path:"/user/login",
    name:"login",
    component:()=>import("../views/pages/login.vue")
  },
  //各个pages
  {
    path:"/",
        name:"layout",
        component:LayOut,
        //子路由
        children:[
            {
                path:'/index',
                name:'index',
                component:()=>import("../views/pages/rolesList.vue")
            },
            {
                path:'/user',
                name:'user',
                component:()=>import("../views/pages/usersList.vue")
            }
        ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
//路由守卫
router.beforeEach((to,form,next)=>{
  // 判断用户是否登录
  console.log("store",store.state.uInfo)
  const uInfo = store.state.uInfo.userInfo  
  if(!uInfo.username){ 
    // 未登录,跳转到login 
    if(to.path==="/user/login"){
      next()
      return
    }
    next("/user/login")
  }
  else{next()}
})

export default router
