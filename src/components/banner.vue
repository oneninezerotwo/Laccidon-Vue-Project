<template>
	<div id="fyy_banner" >
    <el-carousel height="150px">
      <el-carousel-item v-for="item in bannerList" :key="item.id" >
       <el-col :span="24"><img :src="item.idView" class="banner_img"/></el-col>
      </el-carousel-item>
    </el-carousel>
    </div>
</template>

<script>
export default {
  name:"banner",
   data() {
    return {
     bannerList:[
        {id: 0, idView: require('../assets/banner1.jpg')},
        {id: 1, idView: require('../assets/banner2.jpg')},
        {id: 2, idView: require('../assets/banner3.jpg')}
]
    }
   }
}

</script>
<style  >
  
  .banner_img{
    width:100%;
    height:150px; 
  }
  
.el-carousel__button{
    border-radius: 50%;
    height: 10px;
    width: 10px;
}
.el-carousel__indicator.is-active button {
  background:pink;
}
</style>