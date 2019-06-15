<template>
  <div>
     <div class="login-top">
      <img src="../assets/logo.png" height="40" width="40" slot="icon">
      <mt-button @click.native="goto('/login')" v-show="$store.state.dengluStatus"> 登录/注册</mt-button>
      <div v-show="!$store.state.dengluStatus"><p>{{uname}}</p><mt-button class="zhuxiao" @click.native="zhuxiao">注销</mt-button></div>
     </div>
     <div class="dingdan">
       <mt-cell
        title="订单中心"
        to="//github.com"
        is-link
        value="全部订单">
      </mt-cell>
       <mt-navbar>
        <mt-tab-item id="1">待付款</mt-tab-item>
        <mt-tab-item id="2">待发货</mt-tab-item>
        <mt-tab-item id="3">待收货</mt-tab-item>
        <mt-tab-item id="4">待评价</mt-tab-item>
        <mt-tab-item id="5">退货/售后</mt-tab-item>
      </mt-navbar>
      <mt-swipe :auto="2000" style="height:150px;margin:20px 0;">
        <mt-swipe-item><img src="../assets/c1.jpg" height="100%" width="100%" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../assets/c2.jpg" height="100%" width="100%" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../assets/c3.jpg" height="100%" width="100%" alt=""></mt-swipe-item>
      </mt-swipe>
      <mt-cell title="我的拼团" label="" is-link></mt-cell>
      <mt-cell title="我的收藏" label="" is-link></mt-cell>
      <mt-cell title="浏览记录" label="" is-link></mt-cell>
     
     </div>
     
  </div>
</template>
<script>
import Vue from "vue";
import { Button } from 'mint-ui';
import { Navbar, TabItem } from 'mint-ui';
import { Cell } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Cell.name, Cell);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Button.name, Button);
export default {
  data(){
    return {
    }
  },
  methods: {
    goto(path){ 
      this.$router.push(path)
    },
    zhuxiao(){
      this.$store.commit('logout')
      localStorage.removeItem('Authorization');
      this.$store.commit('removeGoods');
      // this.$router.go(0);
      // this.$forceUpdate();
      // this.$router.push("/mine");
    }
   },
  computed:{
    uname(){
      if(this.$store.state.user[0].uname!=""){
        return this.$store.state.user[0].uname
      }else{
        return this.$store.state.user[0].uname
      }
    }  
  }
}
</script>
<style scoped>
#mymain{
  margin:0 3%;
}
.mint-button{
  border-radius:10px;
  float: left;
  height: 30px;
}
.login-top{
  height: 60px;
  line-height: 50px;
  padding-top:15px;
}
.login-top img{
  float: left;
  margin:0 5px;
}
p{
  margin:0 10px;
  float: left;
  height: 20px;
  width: 60px;
}
.zhuxiao{
  margin-top:9px;
  float: right;
}

</style>
