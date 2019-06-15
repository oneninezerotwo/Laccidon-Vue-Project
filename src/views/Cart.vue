<template>
  <div>
    <ul style="margin-bottom:30px; background:#fff;padding-top=30px;">
      <li class="c-box" v-for="item in goodslist" :key="item.guid">
        <el-checkbox name="type" v-model="item.selected"></el-checkbox>
        <div class="message">
          <img :src="require('../'+item.url)" alt>
          <div class="text">
            <p class="name">{{item.name}}</p>
            <div class="text-bottom">
              <p class="price">￥{{item.newprice}}</p>
              <el-input-number size="small" v-model="item.qty" :min="1" :max="10" @click.native="changeQty(item.qty,item.guid)"></el-input-number>
              <!-- <el-button type="danger" icon="el-icon-delete" circle size="mini" @click.native="remove(item._id)"></el-button> -->
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="bottom">
      <el-checkbox label="全选" name="type" v-model="checkAll" value="100" class="checkall"></el-checkbox>
      <p class="total" v-show="edit">总价：<span>￥{{totalPrice}}</span></p>
      <el-button type="danger" size="small" v-show="!status" class="jisuan" @click.native="jiesuan()">结算</el-button>
      <el-button type="danger" size="small" v-show="status" class="delete" @click="remove(getId)">删除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "cart",
  data() {
    return {};
  },
  computed: {
    // 编辑状态切换
    edit(){
      if(this.$store.state.text == "完成"){
        return false;
      }else{
        return true;
      }
    },
    getId() {
      let arr_ielected = this.$store.state.goodslist.filter(
        item => item.selected
      );
      return arr_ielected;
    },
    // 总价
    totalPrice() {
      let total = 0;
      let arr_ielected = this.$store.state.goodslist.filter(
        item => item.selected
      );
      arr_ielected.forEach(element => {
         total += element.newprice*element.qty;
      })
      return total.toFixed(2);
    },
    status() {
      return this.$store.state.cartEdit;
    },
    goodslist() {
      
      return this.$store.state.goodslist;
    },

    checkAll: {
      get() {
        //全选
        let arr_ielected = this.$store.state.goodslist.filter(
          item => item.selected
        );

        return this.$store.state.goodslist.length === arr_ielected.length;
      },
      set(val) {
        this.$store.state.goodslist = this.$store.state.goodslist.map(item => {
          item.selected = val;
          return item;
        });
      }
    }
  },

  components: {},
  methods: {
    changeQty(qty, _id) {
      this.$store.commit("changeQty", { _id, qty });
    },
    remove(arr) {
      this.$messagebox
        .confirm("确定执行此操作?")
        .then(action => {
          this.$store.commit("removeFromCart", { arr });
          let uname = this.$store.state.user[0].uname;
          if(uname!=""){
            _id.forEach(item=>{
              let guid = item._id;
              console.log(item)
              this.$axios.delete('http://139.196.121.18:9527/cart',{params:{_id:guid}})
            })
           
          }
          
          
        })
        .catch(() => {
          console.log("删除取消");
        });
    },
    jiesuan(){
      // 判断是否登陆
      if(this.$store.state.user[0].uname==""){
        this.$router.push('/login');
      }else{
      //  判断购物车非空
        if(this.$store.state.goodslist.length == 0){
          this.$messagebox
          .confirm("您的购物车为空喔！去添加点东西吧(๑′ᴗ‵๑)")
          .then(action => {
            this.$router.push('/nav');
          })
          .catch(() => {

          });
        }else{
          
          this.$axios.delete('/cart',{params:{uname:this.$store.state.user[0].uname}})
          .then(({data})=>{
            let userCart = this.$store.state.goodslist;
            console.log(userCart)
            userCart.forEach(item =>{
              item.uname = this.$store.state.user[0].uname;
            })
            this.$axios.post('/cart',userCart).then(({data})=>{
              this.$messagebox
              .confirm("已加入订单！")
              .then(action => {
                
              })
              .catch(() => {
                
              });
            })
          
          })
          
        
        }
       
      }
      
    }
  }
};
</script>
<style scoped>
.c-box {
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.message {
  display: flex;
}
.text {
  display: flex;
  flex-direction: column;
}
.text-bottom {
  width: 260px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.name {
  margin-bottom: 20px;
}
.el-input-number--small {
  width: 100px;
  line-height: 30px;
}
.bottom {
  display: flex;
  height: 40px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  position: fixed;
  /* top: 630px; */
  bottom:55px;
  border-top: 1px solid #ccc;
  margin-top: -8px;
  z-index: 100;
}
.total{
  margin-left: 130px;
  width: 150px;
}
.total span{
  color:deeppink;
}
.checkall{
  margin-left: 10px;
}
.jisuan,.delete{
  margin-right: 10px;
}
</style>
