<template>
  <div id="app">
    <myheader/>
    <keep-alive include="mynav"> 
      <router-view id="mymain"/>
    </keep-alive>
    <myfooter id="myfooter"  v-show="show"/>
  </div>
</template>

<script>
import myheader from "./components/header.vue";
import myfooter from "./components/footer.vue";

export default {
  name: "home",
  components: {
    myheader,
    myfooter
  },
  computed:{
    // 底部导航高亮
    show(){
      let arr=["/", "/nav", "/cart", "/mine"]
      if(arr.indexOf(this.$route.path)==-1){
        return false
      }else{
        return true
      }
    },
  
    carshow(){
      if(this.$route.path == "/cart"){
        return true;
      }else{
        return false;
      }
    }
  }
};
</script>


<style secoped>
*{margin: 0;padding: 0;box-sizing:border-box;}
body,html,#app{
    height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
}
#mymain{
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
}
#myfooter {
  position: static;
}
</style>
