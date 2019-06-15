import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
const router = new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/nav',
      name:'nav',
      component: () => import('./views/Nav.vue')  
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('./views/List.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./views/Cart.vue')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('./views/Mine.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/reg',
      name: 'reg',
      component: () => import('./views/Reg.vue')
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('./views/Details.vue')
    }
  ]
  
})

// 全局路由守卫
router.beforeEach((to,from,next)=>{
  // 判断当前路由是否需要登录
 if(to.matched.some(record=>record.meta.requiresAuth)){

     let token = localStorage.getItem('Authorization');
     if(token){
          router.app.$axios.get('/api/verify',{
              headers:{
                  Authorization:'token '+token
              }
          })
         next();
     }else{
          next({
              path:'/login',
              query:{
                  redirect:to.fullPath
              }
          });
     }
 }else{
     next()
 }
  
})
router.afterEach((to,from)=>{
  // console.log('afterEach')
})
export {
  router
}
export default router;