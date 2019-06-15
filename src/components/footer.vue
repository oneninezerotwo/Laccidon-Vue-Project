<template>
  <mt-tabbar v-model="selected">
    <div class="cartQty">{{$store.state.goodslist.length}}</div>
    <mt-tab-item
      v-for="item in pages"
      :key="item.name"
      :id="item.path"
      @click.native="goto(item.path)"
    >
      <i slot="icon" :class="item.icon"></i>
      {{item.text}}
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
export default {
  data() {
    return {
      // selected:this.$route.path,
      pages: [
        {
          name: "Home",
          path: "/",
          text: "首页",
          icon: "el-icon-s-home",
          active: "is-selected"
        },
        {
          name: "Nav",
          path: "/nav",
          text: "分类",
          icon: "el-icon-search",
          active: ""
        },
        // {
        //   name: "Find",
        //   path: "/find",
        //   text: "发现",
        //   icon: "el-icon-apple",
        //   active: ""
        // },
        {
          name: "Cart",
          path: "/cart",
          text: "购物车",
          icon: "el-icon-shopping-cart-1",
          active: ""
        },
        {
          name: "Mine",
          path: "/mine",
          text: "我的",
          icon: "el-icon-user-solid",
          active: ""
        }
      ]
    };
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    }
  },
  computed:{
    selected:{
      get(){
        return this.$route.path;
      },
      set(){

      } 
    },
  },
};
</script>
<style scoped>
.mint-tabbar{
  position: relative;
}
.mint-tabbar > .mint-tab-item.is-selected {
  color: deeppink;
}
.mint-tabbar > .mint-tab-item i::before{
  margin-top:10px;
}
.mint-tab-item {
  color: #999;
  margin-top:10px;
}
.cartQty{
  line-height:20px;
  position:absolute;
  right:21%;
  top:93%;
  width: 20px;
  height: 20px;
  background: orange;
  border-radius: 50%;
  /* border-radius: 8px; */
  font-size:12px;
  color:#fff;
}
</style>