<template>
<div class="father">
    <mt-header v-show="$route.path=='/list'"> 
         <mt-button icon="back" slot="left" class="left" @click="goto"></mt-button>
    </mt-header>    
    <mt-search  cancel-text="取消"  placeholder="搜索"> </mt-search> 
        <div class="i_bg" v-show="$route.path=='/'">
            <i class="el-icon-chat-dot-round" ></i>
        </div>       
</div>
</template>

<script>
export default {
    name:"search",
    methods:{
        goto(){
            this.$router.push('/nav');
        }
    }
}
</script>

<style  scoped>
.father{position: relative;display:flex;padding-top:6px;background:rgb(69,139,116);}
.mint-search{height:50px;flex:1;}
.father /deep/ .mint-searchbar-inner{
    border-radius: 30px;
}
.mint-header{
    background-color:transparent;
    margin-top:2px;
}
.father /deep/ .mint-searchbar{
   background:none;
}
.i_bg{
    display: inline-block;
    background:#fff;
    border-radius: 50%; 
    width: 35px;
    height: 35px;
    margin-top:5px;
    margin-right:5px;
    z-index: 2;
    }
 .el-icon-chat-dot-round{
    text-align: center;
    display: block;
    font-size: 20px;
    height: 35px;
    line-height: 35px;
    width: 35px;
     }
</style>

