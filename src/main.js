import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from "element-ui"
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueLazyload from 'vue-lazyload'

// 刷新页面，从本地存储中获取token并更新到vuex


let token = localStorage.getItem('Authorization');
// 判断是否登陆
let uname = localStorage.uname;
// console.log(uname)
if(token){
    store.commit('login',token);
    store.commit('changeuser',uname)
    axios.get('/cart',{params:{uname:uname}})
    .then(({data})=>{
        // console.log(data)
        if(data.status===200){
            // console.log('111:',data.data)
            data.data.forEach(item=>{
                 store.commit('add2cart',item)
            })
          
        }else if(data.status==400){
            console.log('400')
        }
    })
    
}

Vue.use(VueLazyload, {
  // error:require('./assets/404.png'),
  error:require('./assets/loading.gif'),
  loading: require('./assets/loading.gif'),//这个是加载的loading过渡效果
  });
Vue.use(MintUI);
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
