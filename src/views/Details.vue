<template>
<div>
    <!-- <myHead/> -->
    <div class="box">
        <div class="youhua">
           <img v-lazy="goods.newUrl" class="detailsImg"> 
        </div>
       <div class="details">
            <h3 class="price"><span>￥</span>{{goods.newprice}}<span>{{goods.oldprice}}</span></h3>
            <strong class="D_title">{{goods.name}}</strong>
            <p class="detailcontent">我是商品说明</p >
            <p><i class="el-icon-chat-dot-round"></i>海外品牌</p >
            <ul class="xiangqing">
                <li class="listP">已选<i class="el-icon-arrow-right"></i></li>
                <li class="listP"><span style="color:deeppink">·</span><i style="margin-right:15px">自营</i><span style="color:deeppink">·</span><i style="margin-right:15px">满88包邮</i><span style="color:deeppink">·</span><i style="margin-right:15px">7天无理由包换</i><span style="color:deeppink">·</span><i style="margin-right:15px">假一赔十</i><i class="el-icon-arrow-right"></i></li>
            </ul>
            <ul class="xiangqing">
                <li class="post">已选<span style="margin-left:15px;color:black;"><i class="el-icon-location-outline"></i>北京市朝阳区</span><i class="el-icon-arrow-right"></i></li>
                <li class="post">运费<span style="margin-left:15px;color:black;">免运费</span></li>
            </ul>
       </div>
    </div>
    <img src="../assets/d1.jpg" height="400px" width="100%"/>
    <img src="../assets/d2.jpg" height="400px" width="100%"/>
    <img src="../assets/d3.jpg" height="400px" width="100%"/>
    <img src="../assets/d4.jpg" height="400px" width="100%"/>
    <div class="d_bottom">
        <div><i class="el-icon-goods"></i>客服</div>
        <div @click='goto("/cart")'>
            <i class="el-icon-shopping-cart-1"></i>
            购物车
            <span class="cartQty1">{{$store.state.goodslist.length}}</span>
        </div>
        <button @click="addTocart(goods._id,goods.name,goods.url,goods.newprice,goods.text)">加入购物车</button> 
         
    </div>
</div>
</template>

<script>
// import myHead from '../components/mineHead.vue'
export default {
    name:"detail",
    components:{
        // myHead
    },
    data(){
        return{
           goods:{
               name:"",
               text:""
           },
            qty:1
        }
    },
    mounted(){
        let {id} = this.$route.query;
        this.$axios.get('/goods',{params:{id:id}}).then(({data})=>{
             let goods=data.data[0];
             goods.newUrl=require("../"+goods.url)
            this.goods=goods;
        }); 
    },
    methods:{
       goto(path){
           this.$router.push(path)
       },
    //    添加购物车
       addTocart(_id,name,url,newprice,text){
           if(!_id){
               return;
           }
            let params = {_id,name,url,newprice,text};
            let arr =  this.$store.state.goodslist.filter(item => item.guid == params._id)
            this.$message({
                message: '添加成功！'
            });
            if(arr.length==0){
                // 判断购物车内有无该类商品，有则qty+1，否则加入
                let qty = 1;
                this.$store.commit("add2cart",{guid:_id,name,url,newprice,qty,text});
            }else{
                this.$store.commit("changeShu",_id);
            }

           
       }
    }
}
</script>

<style>
.box{
    padding:10px;
    display:flex;
    flex-direction: column;
}
.youhua{
    text-align: center;
}
.detailsImg{
   width: 150px;
   height:150px; 
}

.price{color:deeppink;}
.price span{font-size: 12px;}
.price span:nth-child(2){color:darkgrey;margin-left:10px;text-decoration: line-through}
.detailcontent{
    line-height: 24px;
}
.details p:nth-child(4){
    color:darkgrey;
    font-size: 12px;
    margin-bottom: 10px;
}
.listP{
    border-top: 1px solid rgb(238, 236, 236);
    list-style: none;
    color:darkgrey;
    line-height: 40px;
    font-size: 14px;
}

.D_title{
    font-size: 14px;
    color: rgb(59, 59, 59)
}
.detailcontent{
    font-size: 14px;
    margin-top: 10px;
}
.d_bottom{
    display: flex;
  height: 40px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  position: fixed;
  top: 95.2%;
  border-top: 1px solid #ccc;
  margin-top: -8px;
  z-index: 100;
}
.d_bottom div{
    padding: 7px 0;
    text-align: center;
    height:55px;
    display: flex;
    width:75px;
    flex-direction: column;
    justify-content:space-around;
    background: #fff;
    color:#999;
    border:0;
    /* width: 20%; */
}
.d_bottom button:nth-child(3){
    color:#fff;
    line-height: 55px;
    border:0;
    flex:2;
    /* background-color:deeppink; */
    background:rgb(69,139,116);
}
.post{
    list-style: none;
    font-size: 14px;
    line-height: 40px;
    color:darkgray;
}
.xiangqing li{
    position: relative;
    width: 100%;
}
.el-icon-arrow-right{
    position: absolute;
    top:50%;
    right:0;
}
.cartQty1{
  line-height:20px;
  position:absolute;
  top:-8px;
  left:30%;
  /* left:120px; */
  width: 20px;
  height: 20px;
  background: orange;
  border-radius: 50%;
  /* border-radius: 8px; */
  font-size:12px;
  color:#fff;
}
</style>
