<template>
  <div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1" @click.native.capture="sortPrice">价格</mt-tab-item>
      <mt-tab-item id="2" >发布日期</mt-tab-item>
      <mt-tab-item id="3" >销量</mt-tab-item>
    </mt-navbar>
    <h1 v-show="loading" style="display:flex;flex-direction: column;justify-content:center;align-items:center;height:50%;">
        <img v-lazy>    
    </h1>
    <ul v-lazy>
      <li v-for="item in goods" :key="item._id" class="listLi" @click="goto('/details',item._id)">
        <img v-lazy="item.url" :key="item.url"  class="listImg">
        <div class="list_R">
          <p>{{item.name}}</p>
          <div class="goods-bottom">
            <span class="currentPrice">￥{{item.newprice}}</span>
            <span class="oldPrice">￥{{item.oldprice}}</span>
            <mt-button type="danger" class="buyNow">立即购买</mt-button>
          </div>
          
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:"list",
  data() {
    return {
      loading:true,
      goods:[],
      sortStatus:false,
      selected:"selected"

    };
  },
  methods:{
      goto(path,id){
          this.$router.push({path,query:{id:id}});
         
      },
      // 价格排序，
      sortPrice(){
        this.sortStatus=!this.sortStatus
        this.goods=this.goods.sort((a,b)=>{
            if(this.sortStatus){
              return a.newprice-b.newprice
          }else{
            return b.newprice-a.newprice
          }
          })
        }
      
  },

  mounted(){
        let {type} = this.$route.query;
        this.$axios.get('/list',{params:{type:type}}).then(({data})=>{
            this.loading = false
            this.goods=data.data;                      
            this.goods.forEach(element => {
              element.url = require("../"+element.url)
              // console.log(element.url)
            });
        });
    }
};
</script>
<style scoped>
.tabs {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.grid-content {
  text-align: center;
}
.tabs {
        display:flex;
        justify-content: space-around;
        overflow-x: scroll;
        overflow-y: hidden;
         white-space: nowrap;
         padding-left:200px;
}
.tabBtn{
  width: 100px;
  margin:0 5px;
}
.nav-item :active{color:red;}
.mint-navbar .mint-tab-item.is-selected {
  border: 0;
}
.listLi {
  padding: 5px;
  display: flex;
  height: 100px;
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
  width: 30%;
  height: 100%;
}
.goods-bottom{
  display: flex;
  justify-content: space-between;
}
img[lazy="loading"] {
  width: 110px;
  height: 90px;
  margin: auto;
}
</style>
