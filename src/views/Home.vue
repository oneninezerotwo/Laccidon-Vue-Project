<template>
  <div>
    <banner/>
    <el-row class="f_el">
      <el-col :span="4">
        <div class="boxx">
          <i class="el-icon-apple"></i>
        </div>签到有礼
      </el-col>
      <el-col :span="5">
        <div class="boxx" style="background:skyblue;">
          <i class="el-icon-position"></i>
        </div>抢免单
      </el-col>
      <el-col :span="5">
        <div class="boxx" style="background:orange;">
          <i class="el-icon-user"></i>
        </div>拼团
      </el-col>
      <el-col :span="5">
        <div class="boxx" style="background:red;">
          <i class="el-icon-folder-checked"></i>
        </div>9.9
      </el-col>
      <el-col :span="5">
        <div class="boxx" style="background:purple;">
          <i class="el-icon-paperclip"></i>
        </div>充值中心
      </el-col>
    </el-row>

    <ul>
      <li class="listLi" v-for="(item,idx) in listimg" :key="idx">
        <img :src="item.url" height="200px" width="100%" alt>
      </li>
    </ul>
  </div>
</template>

<script>
import banner from "../components/banner.vue";

export default {
  name: "home",
  data() {
    return {
      list: 10,
      listimg: [{
        url:require("../assets/b1.jpg")
      },{
        url:require("../assets/b2.jpg")
      },{
        url:require("../assets/b3.jpg")
      },{
        url:require("../assets/b4.jpg")
      },{
        url:require("../assets/b5.jpg")
      },
        // "../assets/b1.jpg",
        // "../assets/b2.jpg",
        // "../assets/b3.jpg",
        // "../assets/b4.jpg",
        // "../assets/b5.jpg"
      ]
    };
  },
  components: {
    banner
  },

};
</script>
<style scoped>
.f_el /deep/ .el-col {
  margin: 10px 0;
  height: 80px;
  font-size: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.boxx {
  width: 50px;
  height: 50px;
  background: pink;
  border-radius: 50%;
}
i {
  font-size: 30px;
  color: #fff;
  height: 50px;
  line-height: 50px;
}
.ads {
  padding: 10px 0px;
  display: flex;
}
/* .ads img:hover{
    border:2px solid pink;
    box-shadow: 2px 2px 2px pink;
  } */
.ads > img {
  flex: 1;
  width: 200px;
  height: 150px;
}
.ads > div {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.ads2 > img {
  flex: 1;
}

.listLi {
  padding: 5px;
  display: flex;
}
.listLi p {
  flex: 1;
}
.list_R {
  display: flex;
  flex-direction: column;
  padding: 5px 5px 5px 15px;
  flex: 1;
}
.currentPrice {
  color: crimson;
  font-size: 20px;
  margin-right: 10px;
}
.oldPrice {
  color: darkgray;
  font-size: 10px;
  margin-top: 5px;
}
.buyNow {
  margin-left: 20px;
  width: 80px;
  font-size: 14px;
  height: 30px;
}
.listImg {
  flex: 1;
  width: 30%;
  height: 100%;
}
.goods-bottom {
  display: flex;
  justify-content: space-between;
}
img[lazy="loading"] {
  width: 110px;
  height: 90px;
  margin: auto;
}
</style>
