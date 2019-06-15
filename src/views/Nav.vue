<template>
  <div class="nav">
    <el-tabs tab-position="left">
      <el-tab-pane 
      v-for="item in navs"
      :label="item.type" 
      :key="item.type"
      >
      
      <navlist :navs="item.type"></navlist>
        
      </el-tab-pane>
    </el-tabs>
  </div> 
</template>

<script>
import "element-ui/lib/theme-chalk/index.css";
import navlist from "../components/navlist.vue";

export default {
  name:"mynav",
  data() {
    return {
      navs:[]
    };
  },
  mounted(){
    this.$axios.get('/type').then(({data})=>{
        this.navs = data.data
    });
  },
  components:{
       navlist,
  },
  
};
</script>

<style scoped>
.list /deep/ .el-tabs--left .el-tabs__active-bar.is-left{
    right:auto;
    left:0;
    width: 6px;
}
.list /deep/ .el-tabs__item.is-active{
  color:pink;
  background: white;
}
.list /deep/ .el-tabs__item{
  background: #ccc;
}
.list /deep/ .el-tabs__active-bar{
  background:pink;
}
</style>
