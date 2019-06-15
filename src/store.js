import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    text: "编辑",
    cartEdit: false,
    dengluStatus: true,
    user: [
      {
        uname: ""
      }
    ],
    goodslist: []
  },
  mutations: {
    login(state, token) {
      state.token = token
      state.dengluStatus = false
    },
    logout(state){
        state.token = ''
        state.dengluStatus = true;

    },
    changeText(state){
      if(state.text=="编辑"){
        state.text="完成";
      }else if(state.text=="完成"){
        state.text="编辑 ";
      }
    },
    //改变购物车编辑状态
    cartEdit(state) {
      state.cartEdit = !state.cartEdit;
    },
    changeText(state) {
      if (state.text == "编辑") {
        state.text = "完成";
      } else {
        state.text = "编辑";
      }
    },
    // 修改登录注册按钮的显示
    changeDenglu(state, dengluStatus) {
      state.dengluStatus = dengluStatus;
    },
    // 修改用户名
    changeuser(state, uname) {
      state.user[0].uname = uname;
    },
    // 添加商品
    add2cart(state, payload) {
      // state就是store.state
      // payload就是执行add2cart时传入的参数
      state.goodslist.unshift(payload);
    },
    //删除goodslist所有数据
    removeGoods(state){
      state.goodslist = []
    },
    // 删除商品
    removeFromCart(state, { arr }) {
      arr.forEach(element => {
        state.goodslist = state.goodslist.filter(
          goods => goods.guid != element.guid
        );
      });
    },

     // 修改各个商品数量
     changeShu(state,_id){
      state.goodslist.forEach(goods => {
        if (goods.guid == _id) {          
          goods.qty++
        }
      })
    },

    // 修改数量
    changeQty(state, { _id, qty }) {
      state.goodslist = state.goodslist.map(goods => {
        if (goods._id == _id) {
          goods.qty = qty;
        }
        return goods;
      });
    }
  },
  actions: {
    
  }
});
